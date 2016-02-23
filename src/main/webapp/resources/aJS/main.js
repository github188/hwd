/**
 * Created by lyp on 2016/2/21.
 * !!IMPORTANT never use fonts of bootstrap, which do not compatible with the fullpagejs
 */

$(function () {
    //variables
    var SEARCH_SLIDE_NAV_TOOLTIPS = ['搜索', '定位', '展示', '探测'],
        SECTION_NAV_TOOLTIP_LIST = ['首页', '搜索', '用户'],
        SECTION_BACKGROUND_LIST = ['#686868', '#1BBC9B', ''];//gray,

    //functions
    var addTooltip4Slides = function () {
        var slideNavList = $('.fp-slidesNav a');
        $.each(SEARCH_SLIDE_NAV_TOOLTIPS, function (idx, tip) {
            $(slideNavList[idx]).attr({
                'data-toggle': 'tooltip',
                'title': tip
            });
        });
        slideNavList.tooltip();
    };
    var correctMenu = function () {
        //console.log('Inside correctMenu() ==========');
        var currentSection = $('.fp-section.active');
        var currentSectionAnchor = currentSection.attr('data-anchor');
        if (currentSection.find('div.fp-slides')) {
            var currentSlide = currentSection.find('.fp-slide.active');
            var currentSlideAnchor = currentSlide.attr('data-anchor');
            var activeMenuItem = $('a[href="#' + currentSectionAnchor + '/' + currentSlideAnchor + '"]');
            if (activeMenuItem.length == 0) {
                activeMenuItem = $('a[href="#' + currentSectionAnchor);
            }
            $('#menu').find('li[data-menuanchor="' + currentSectionAnchor + '"]').removeClass('active');
            activeMenuItem.closest('li').addClass('active');
        }
    };

    //execute
    InputSuggest.init();
    HomeSearch.init();
    User.init();
    $('.fullpage').fullpage({
        //↓Navigation
        menu: '#menu',
        //navigation: true,
        navigationPosition: 'right',
        navigationTooltips: SECTION_NAV_TOOLTIP_LIST,
        slidesNavigation: true,
        slidesNavPosition: 'bottom',

        //↓Accessibility
        animateAnchor: false,//scroll with animation or will directly load on the given section; default to true
        keyboardScrolling: false,

        //↓Design
        controlArrows: false,
        sectionsColor: SECTION_BACKGROUND_LIST,
        fixedElements: '.header, .footer, .sidebar, .pivots,.global-search-wrapper',
        resize: false,
        paddingTop: '4.8rem',     //header height = 4.6rem
        paddingBottom: '2.8rem',  //footer height = 2.6rem
        //responsiveHeight:900,

        //↓Scrolling
        normalScrollElements: '#mapHolder', //avoid the auto scroll when scrolling over map
        normalScrollElementTouchThreshold: 3,
        scrollOverflow: true,

        //↓events
        afterRender: function () {  //initialize
            console.log('Inside afterRender() ==========');
            //（init-1）updates the DOM structure to fit the new window
            $.fn.fullpage.reBuild();
            //（init-2）add slides nav tips for devices search
            addTooltip4Slides();
            //（init-3   ）hide slides nav for user operation
            $('.section:last-child .fp-slidesNav').hide();
        },
        afterResize: function () {
            console.log('Inside afterResize() ==========');
        },
        onLeave: function (index, nextIndex, direction) {
            console.log('Inside onLeave() ==========, index = ' + index + ', nextIndex = ' + nextIndex + ', direction = ' + direction);
            //BE CAREFUL! 这里的index和nextIndex的值要严格和HTML的DOM中的section一一对应
            //↓如果下一个section是用户登陆、注册等操作，则隐藏全局搜索框
            if ((nextIndex == 1 || nextIndex == 3) && !GlobalSearchForm.isHidden()) {
                GlobalSearchForm.hide();
            }
        },
        afterLoad: function (anchorLink, index) {
            console.log('Inside afterLoad() ==========, anchorLink = ' + anchorLink + ', index = ' + index);
            correctMenu();  //(1)
            if (index == 3 || index == 1) {
                GlobalSearchForm.hide();
            } else if (GlobalSearchForm.isHidden()) {
                GlobalSearchForm.show();
            }
        },
        afterSlideLoad: function (anchorLink, index, slideAnchor, slideIndex) {
            console.log('Inside afterSlideLoad() ==========, anchorLink = ' + anchorLink + ', index = ' + index + ', slideAnchor = ' + slideAnchor + ', slideIndex = ' + slideAnchor);
            correctMenu();
            $('.fp-slidesNav a').tooltip('hide');//隐藏slide的tooltip
        },
        onSlideLeave: function (anchorLink, index, slideIndex, direction, nextSlideIndex) {
            console.log('Inside onSlideLeave() ==========, anchorLink = ' + anchorLink + ', index = ' + index + ', slideIndex = ' + slideIndex + ', nextSlideIndex = ' + nextSlideIndex);
        }
    });
});