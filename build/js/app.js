'use strict';

$(document).ready(function () {
    window.SVG_SPRITE = '<svg xmlns="http://www.w3.org/2000/svg"><symbol id="arrow-left" viewBox="0 0 37.765 28.224"><g data-name="Group 92" fill="none" stroke-linecap="round" stroke-width="5"><path data-name="Line 5" d="M35.265 14.112H3.535"/><path data-name="Line 6" d="M14.112 24.689L3.535 14.112"/><path data-name="Line 7" d="M3.535 14.112L14.112 3.535"/></g></symbol><symbol id="arrow-right" viewBox="0 0 37.765 28.224"><g data-name="Group 90" fill="none" stroke-linecap="round" stroke-width="5"><path data-name="Line 5" d="M2.5 14.113h31.73"/><path data-name="Line 6" d="M23.653 3.536L34.23 14.113"/><path data-name="Line 7" d="M34.23 14.113L23.653 24.69"/></g></symbol><symbol id="close" viewBox="0 0 27.657 27.657"><path d="M2.828 24.828l22-22m0 22l-22-22" fill="none" stroke-linecap="round" stroke-width="4"/></symbol><symbol id="menu" viewBox="0 0 35.113 24.742"><path d="M17.556 2H2m31.113 10.371H2m21.779 10.371H2" fill="none" stroke-linecap="round" stroke-width="4"/></symbol><symbol id="mouse" viewBox="0 0 23 49.5"><g data-name="Group 121" fill="none"><g data-name="Rectangle 71"><rect width="23" height="30" rx="10"/><rect x="1" y="1" width="21" height="28" rx="9"/></g><g data-name="Rectangle 72" transform="translate(9 6)"><rect width="5" height="11" rx="2.5"/><rect x="1" y="1" width="3" height="9" rx="1.5"/></g><g data-name="Group 122" stroke-linecap="round" stroke-width="2"><path data-name="Line 16" d="M5.75 34.548V45.5"/><path data-name="Line 18" d="M17.798 34.548V48.5"/><path data-name="Line 17" d="M11.774 37.286v6.024"/></g></g></symbol><symbol id="search" viewBox="0 0 33.105 33.483"><g fill="none" stroke-width="4"><g transform="rotate(-45 19.474 8.066)"><circle cx="11.408" cy="11.408" r="11.408"/><circle cx="11.408" cy="11.408" r="9.408"/></g><path d="M30.277 30.654l-5.899-5.899"/></g></symbol></svg>';;
    document.getElementById('svg-sprite').innerHTML = SVG_SPRITE;
    var section = $('.js-scroll-section');
    var windowWidth = $(window).width();
    var breakpoint = 1280;
    var isInit = false;
    var footer = $('.footer');
    var numberSection = section.length - 1;
    var mouseEl = $('.main__mouse');
    var dotsMainSlider = $(".js-page-scroll-dots li");
    var standardScrollElements = '';

    dotsMainSlider.eq(0).css({ backgroundColor: '#fff' });
    dotsMainSlider.eq(0).nextAll().css({ backgroundColor: '#A3A3A3' });

    function initScrollify() {
        if (windowWidth >= breakpoint && !isInit) {
            isInit = true;
            $.scrollify({
                section: section,
                offset: 1,
                scrollbars: false,
                before: function before(index, panels) {
                    mouseEl.css({ opacity: '0' });

                    var ref = panels[index].attr("data-section-name");
                    var targetDot = $(".js-page-scroll-dots").find("li[data-move=\"#" + ref + "\"]");

                    $(".js-page-scroll-dots .active").removeClass("active");

                    targetDot.addClass("active");

                    if (index === 0) {
                        targetDot.css({ backgroundColor: '#fff' });
                        targetDot.nextAll().css({ backgroundColor: '#A3A3A3' });
                    } else {
                        $(".js-page-scroll-dots").find("li").css({ backgroundColor: '' });
                    }
                },
                after: function after(index) {
                    if (numberSection === index) {
                        mouseEl.css({ opacity: '0' });
                    } else {
                        mouseEl.css({ opacity: '1' });
                    }

                    if (index !== 0) {
                        mouseEl.css({ color: '#FF8224' });
                    } else {
                        mouseEl.css({ color: '#fff' });
                    }
                }
            });
        };
    };

    if ($('.js-scroll-section').length > 0) {

        section.eq(section.length - 1).append(footer);

        initScrollify();

        dotsMainSlider.on('click', function (e) {
            $.scrollify.move($(e.target).data('move'));
        });

        // Destroy for mobile
        $(window).resize(function () {
            windowWidth = $(window).width();

            if (windowWidth < breakpoint && isInit) {
                isInit = false;
                $.scrollify.destroy();
            } else {
                initScrollify();
            }
        });
    };
    var toggleMenuButton = $('.js-toggle-menu');
    var menuState = $('.js-menu-state');
    var isMenuOpen = false;
    var classToDetermineState = 'menu-open';
    var $window = $(window);
    var howTop = $(window).scrollTop();

    toggleMenuButton.on('click', function () {
        isMenuOpen = menuState.hasClass(classToDetermineState);

        if (isMenuOpen) {
            // Close menu
            menuState.removeClass(classToDetermineState);

            if (!menuState.hasClass('modal-open')) {
                $('html').removeClass('no-scroll');
                $(window).scrollTop(howTop);
                $.scrollify.enable();
            }
        } else {
            // Opening menu
            $.scrollify.disable();
            menuState.addClass(classToDetermineState);

            isInit = false;
            howTop = $(window).scrollTop();
            $('html').addClass('no-scroll');
            $('.main-container').scrollTop(howTop);
        };
    });;
    if ($('.js-stats-slider').length > 0) {
        var initStatisticSlider = function initStatisticSlider() {
            statsSliderWrapper.carousel({
                interval: false
            });
            statsSliderWrapper.addClass('init');
        };

        var statsSliderWrapper = $('.js-stats-slider');

        ;

        if ($(window).outerWidth() < 1024 && !statsSliderWrapper.hasClass('init')) {
            initStatisticSlider();
        };

        $(window).resize(function () {
            if ($(window).outerWidth() >= 1024 && statsSliderWrapper.hasClass('init')) {
                $('.js-stats-slider').carousel('dispose');
                statsSliderWrapper.removeClass('init');
            } else {
                initStatisticSlider();
            }
        });
    };

    if ($('textarea').length > 0) {
        autosize($('textarea'));
    }

    if ($('.js-toggle-tab').length > 0) {
        $('.js-toggle-tab').on('click', function (e) {
            e.preventDefault();
            $('a' + '[href=' + '"' + $(this).attr('href') + '"' + ']').tab('show');
        });
    };

    if ($('.js-people-slider').length > 0) {

        new Swiper('.js-people-slider', {
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            slidesPerView: 'auto',
            spaceBetween: 20,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
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
        });
    };

    if ($('.main-page__slider-image').length > 0) {
        $('.main-page__slider-image').each(function (ind, el) {
            var currEl = $(el);
            var images = currEl.data('images').split(', ');
            var randomIndexImage = Math.round(Math.random() * (images.length - 1));
            currEl.attr('src', images[randomIndexImage]);
        });
    }

    if ($('.js-how-it-work-link').length > 0) {
        var howItWorkMove = function howItWorkMove() {
            windowWidthForHowItWork = $(window).outerWidth();

            if (windowWidthForHowItWork < 1280) {
                // e.append(s) — add s last in e.
                $('.js-how-it-work-link-mobile').append(howItWorkLink);
            } else {
                $('.stats__footer').append(howItWorkLink);
            }
        };

        var howItWorkLink = $('.js-how-it-work-link');
        var windowWidthForHowItWork = 0;

        ;
        howItWorkMove();

        $(window).resize(function () {
            howItWorkMove();
        });
    }
});