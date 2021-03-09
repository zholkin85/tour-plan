const swiper = new Swiper('.swiper-container', {
    // Optional parameters
    loop: true,

    // Navigation arrows
    navigation: {
        nextEl: '.slider-button--next',
        prevEl: '.slider-button--prev',
    },

    effect: 'fade',

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