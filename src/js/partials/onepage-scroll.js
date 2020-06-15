var section = $('.js-scroll-section');
var windowWidth = $(window).width();
var breakpoint = 1280;
var isInit = false;
var footer = $('.footer');
var numberSection = section.length - 1;
var mouseEl = $('.main__mouse');
var dotsMainSlider = $(".js-page-scroll-dots li");
var standardScrollElements = '';

dotsMainSlider.eq(0).css({backgroundColor: '#fff'});
dotsMainSlider.eq(0).nextAll().css({backgroundColor: '#A3A3A3'});

function initScrollify() {
    if(windowWidth >= breakpoint && !isInit) {
        isInit = true;
        $.scrollify({
            section : section,
            offset: 1,
            scrollbars: false,
            before: function(index, panels) {
                mouseEl.css({ opacity: '0' });

                var ref = panels[index].attr("data-section-name");
                var targetDot = $(".js-page-scroll-dots").find("li[data-move=\"#" + ref + "\"]");

                $(".js-page-scroll-dots .active").removeClass("active");

                targetDot.addClass("active");

                if(index === 0) {
                    targetDot.css({backgroundColor: '#fff'});
                    targetDot.nextAll().css({backgroundColor: '#A3A3A3'})
                } else {
                    $(".js-page-scroll-dots").find("li").css({backgroundColor: ''})
                }
            },
            after: function(index) {
                if(numberSection === index) {
                    mouseEl.css({ opacity: '0' });
                } else {
                    mouseEl.css({ opacity: '1' });
                }

                if(index !== 0) {
                    mouseEl.css({ color: '#FF8224' })
                } else {
                    mouseEl.css({ color: '#fff' })
                }
            }
        });
    };
};

if($('.js-scroll-section').length > 0) {

    section.eq(section.length - 1).append(footer);

    initScrollify();

    dotsMainSlider.on('click', function(e) {
        $.scrollify.move($(e.target).data('move'));
    })

    // Destroy for mobile
    $(window).resize(function() {
        windowWidth = $(window).width();

        if(windowWidth < breakpoint && isInit) {
            isInit = false;
            $.scrollify.destroy();
        } else {
            initScrollify();
        }
    });
}