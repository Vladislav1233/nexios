if($('.js-stats-slider').length > 0) {
    var statsSliderWrapper = $('.js-stats-slider');

    function initStatisticSlider() {
        statsSliderWrapper.carousel({
            interval: false
        });
        statsSliderWrapper.addClass('init');
    };

    if($(window).outerWidth() < 1024 && !statsSliderWrapper.hasClass('init')) {
        initStatisticSlider();
    };

    $(window).resize(function() {
        if($(window).outerWidth() >= 1024 && statsSliderWrapper.hasClass('init')) {
            $('.js-stats-slider').carousel('dispose');
            statsSliderWrapper.removeClass('init');
        } else {
            initStatisticSlider();
        }
    })
}