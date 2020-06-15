if($('.js-statistic-slider').length > 0) {
    var statisticSliderWrapper = $('.js-statistic-slider');

    function initStatisticSlider() {
        statisticSliderWrapper.carousel({
            interval: false
        });
        statisticSliderWrapper.addClass('init');
    };

    if($(window).width() < 1280 && !statisticSliderWrapper.hasClass('init')) {
        initStatisticSlider();
    };

    $(window).resize(function() {
        if($(window).width() >= 1280 && statisticSliderWrapper.hasClass('init')) {
            $('.js-statistic-slider').carousel('dispose');
            statisticSliderWrapper.removeClass('init');
        } else {
            initStatisticSlider();
        }
    })
}