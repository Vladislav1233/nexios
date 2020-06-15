$(document).ready(function () {
    @@include('partials/svg.js');
    document.getElementById('svg-sprite').innerHTML = SVG_SPRITE;
    @@include('partials/onepage-scroll.js');
    @@include('partials/toggle-menu.js');
    @@include('partials/stats-slider.js');

    if($('textarea').length > 0) {
        autosize($('textarea'));
    }

    if($('.js-toggle-tab').length > 0) {
        $('.js-toggle-tab').on('click', function(e) {
            e.preventDefault();
            $('a' + '[href=' + '"' + $(this).attr('href') + '"' + ']').tab('show')
        });
    };

    if($('.js-people-slider').length > 0) {

        new Swiper ('.js-people-slider', {
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            slidesPerView: 'auto',
            spaceBetween: 20,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

            breakpoints: {
                767: {
                    slidesPerView: 1,
                    spaceBetween: 0
                },

                1279: {
                    slidesPerView: 'auto',
                    spaceBetween: 20
                }
            }
        })
    };

    if($('.main-page__slider-image').length > 0) {
        $('.main-page__slider-image').each(function(ind, el) {
            var currEl = $(el);
            var images = currEl.data('images').split(', ');
            var randomIndexImage = Math.round(Math.random() * (images.length - 1));
            currEl.attr('src', images[randomIndexImage]);
        })
    }

    if($('.js-how-it-work-link').length > 0) {
        var howItWorkLink = $('.js-how-it-work-link');
        var windowWidthForHowItWork = 0;

        function howItWorkMove() {
            windowWidthForHowItWork = $(window).outerWidth();

            if(windowWidthForHowItWork < 1280) {
                // e.append(s) — add s last in e.
                $('.js-how-it-work-link-mobile').append(howItWorkLink);
            } else {
                $('.stats__footer').append(howItWorkLink);
            }
        };
        howItWorkMove();

        $(window).resize(function() {
            howItWorkMove();
        });
    }
});
