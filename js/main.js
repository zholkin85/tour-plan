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