$(document).ready(function() {
    const hotelSlider = new Swiper('.hotel-slider', {
        // Optional parameters
        loop: true,

        // Navigation arrows
        navigation: {
            nextEl: '.hotel-slider__button--next',
            prevEl: '.hotel-slider__button--prev',
        },

        effect: 'fade',

        //keyboard control
        keyboard: {
            enabled: true,
        },
    })

    const reviewsSlider = new Swiper('.reviews-slider', {
        // Optional parameters
        loop: true,

        // Navigation arrows
        navigation: {
            nextEl: '.reviews-slider__button--next',
            prevEl: '.reviews-slider__button--prev',
        },

        //keyboard control
        keyboard: {
            enabled: true,
        },

        //autoplay
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
    })
    ymaps.ready(init)

    function init() {
        // Создание карты.
        var myMap = new ymaps.Map('map', {
            center: [7.838358, 98.298838],
            // Уровень масштабирования. Допустимые значения:
            // от 0 (весь мир) до 19.
            zoom: 15,
        })
    }
    // Функция загрузки API Яндекс.Карт по требованию (в нашем случае при наведении)
    function loadScript(url, callback) {
        var script = document.createElement('script')

        if (script.readyState) {
            // IE
            script.onreadystatechange = function() {
                if (script.readyState == 'loaded' || script.readyState == 'complete') {
                    script.onreadystatechange = null
                    callback()
                }
            }
        } else {
            // Другие браузеры
            script.onload = function() {
                callback()
            }
        }

        script.src = url
        document.getElementsByTagName('head')[0].appendChild(script)
    }

    var menuButton = $('.menu-button')
    menuButton.on('click', function() {
        $('.navbar__nav').toggleClass('navbar__nav--visible')
    })

    var modalButton = $('[data-toggle=modal]')
    var closeModalButton = $('.modal__close')
    var closeEsc = $('[data-toggle=modal]')
    modalButton.on('click', openModal)
    closeModalButton.on('click', closeModal)
    closeEsc.on('keydown', escClose)

    function openModal() {
        var targetModal = $(this).attr('data-href')
        $(targetModal).find('.modal__overlay').addClass('modal__overlay--visible')
        $(targetModal).find('.modal__dialog').addClass('modal__dialog--visible')
        $('body').addClass('fix')
    }

    function closeModal(event) {
        event.preventDefault()
        var modalOverlay = $('.modal__overlay')
        var modalDialog = $('.modal__dialog')
        modalOverlay.removeClass('modal__overlay--visible')
        modalDialog.removeClass('modal__dialog--visible')
        $('body').removeClass('fix')
    }
    $('.modal__overlay').on('click', closeModal)

    function escClose() {
        modalButton.keydown(function(event) {
            if (event.which == 27) {
                var modalOverlay = $('.modal__overlay')
                var modalDialog = $('.modal__dialog')
                modalOverlay.removeClass('modal__overlay--visible')
                modalDialog.removeClass('modal__dialog--visible')
            }
        })
    }
    // Обработка формы
    $('.form').each(function() {
            $(this).validate({
                errorClass: 'invalid',
                rules: {
                    name: {
                        required: true,
                        minlength: '2',
                    },
                    phone: {
                        required: true,
                        phone: true,
                    },
                    email: {
                        required: true,
                        email: true,
                    },
                },
                messages: {
                    name: {
                        required: 'Please specify your name',
                        minlength: 'The name must be at least two letters',
                    },
                    email: {
                        required: 'We need your email address to contact you',
                        email: 'Your email address must be in the format of name@domain.com',
                    },
                    phone: {
                        required: 'Phone is required',
                    },
                },
            })
        })
        //маска номера телефона
    $('.phone').each(function() {
        $(this).mask('+7 (999) 999-99-99', { placeholder: '+7 (999) 999-99-99' })
    })
    AOS.init()
})