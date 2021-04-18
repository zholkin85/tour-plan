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
        var myMap

        $('#toggle').bind({
            mouseenter: function() {
                if (!myMap) {
                    myMap = new ymaps.Map(
                        'map', {
                            center: [7.838358, 98.298838],
                            zoom: 15,
                        }, {
                            searchControlProvider: 'yandex#search',
                        },
                    )
                } else {
                    myMap.destroy() // Деструктор карты
                    myMap = null
                    $('#toggle').attr('value', 'Показать карту снова')
                }
            },
        })
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
        var paddingOffset = innerWidth - document.body.offsetWidth + 'px'
        var marginOffset = document.body.offsetWidth - innerWidth + 'px'
        $('body').addClass('fix')
        $('body').css('padding-right', paddingOffset)
        $('body').css('margin-right', marginOffset)
        $('body').css('margin-left', marginOffset)
    }

    function closeModal(event) {
        event.preventDefault()
        var modalOverlay = $('.modal__overlay')
        var modalDialog = $('.modal__dialog')
        modalOverlay.removeClass('modal__overlay--visible')
        modalDialog.removeClass('modal__dialog--visible')
        $('body').removeClass('fix')
        $('body').css('padding', 0)
        $('body').css('margin', 0)
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
                nameFoot: {
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
                    minlength: '2',
                },
            },
            messages: {
                name: {
                    required: 'Please specify your name',
                    minlength: 'The name must be at least two letters',
                },
                nameFoot: {
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
                emailSub: {
                    required: 'We need your email address to contact you',
                    email: 'Your email address must be in the format of name@domain.com',
                },
            },
        })
        $.validator.addMethod(
            'phone',
            function(phone_number, element) {
                var ruPhone_number = phone_number.replace(/\(|\)|\s+|-/g, '')
                return this.optional(element) || (ruPhone_number.length > 9 && /^((\+7|7|8)+([0-9]){10})$/.test(ruPhone_number))
            },
            'Please specify a valid mobile number',
        )
    })

    //маска номера телефона
    $('.phone').each(function() {
        $(this).mask('+7 (999) 999-99-99', { placeholder: '+7 (999) 999-99-99' })
    })
    AOS.init()

    // Отправка данных на сервер
    function send(event, php) {
        console.log('Отправка запроса')
        event.preventDefault ? event.preventDefault() : (event.returnValue = false)
        var req = new XMLHttpRequest()
        req.open('POST', php, true)
        req.onload = function() {
            if (req.status >= 200 && req.status < 400) {
                json = JSON.parse(this.response) // Ебанный internet explorer 11
                console.log(json)

                // ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
                if (json.result == 'success') {
                    // Если сообщение отправлено
                    alert('Сообщение отправлено')
                } else {
                    // Если произошла ошибка
                    alert('Ошибка. Сообщение не отправлено')
                }
                // Если не удалось связаться с php файлом
            } else {
                alert('Ошибка сервера. Номер: ' + req.status)
            }
        }

        // Если не удалось отправить запрос. Стоит блок на хостинге
        req.onerror = function() {
            alert('Ошибка отправки запроса')
        }
        req.send(new FormData(event.target))
    }
})