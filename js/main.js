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

var menuButton = document.querySelector('.menu-button')
menuButton.addEventListener('click', function() {
    console.log('Клик по кнопке меню')
    document.querySelector('.navbar__nav').classList.toggle('navbar__nav--visible')
})