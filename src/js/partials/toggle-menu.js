var toggleMenuButton = $('.js-toggle-menu');
var menuState = $('.js-menu-state');
var isMenuOpen = false;
var classToDetermineState = 'menu-open';
var $window = $(window);
var howTop = $(window).scrollTop();

toggleMenuButton.on('click', function() {
    isMenuOpen = menuState.hasClass(classToDetermineState);

    if(isMenuOpen) { // Close menu
        menuState.removeClass(classToDetermineState);

        if(!menuState.hasClass('modal-open')) {
            $('html').removeClass('no-scroll');
            $(window).scrollTop(howTop);
            $.scrollify.enable();
        }

    } else { // Opening menu
        $.scrollify.disable();
        menuState.addClass(classToDetermineState);

        isInit = false;
        howTop = $(window).scrollTop();
        $('html').addClass('no-scroll');
        $('.main-container').scrollTop(howTop);
    };
});