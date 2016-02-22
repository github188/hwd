/**
 * Created by lyp on 2016/2/21.
 */

$(function () {
    var addTooltip4Slides = function () {
        var SEARCH_SLIDE_NAV_TOOLTIPS = ['搜索', '定位', '展示', '探测'];
        var slideNavList = $('.fp-slidesNav a');
        $.each(SEARCH_SLIDE_NAV_TOOLTIPS, function (idx, tip) {
            $(slideNavList[idx]).attr({
                'data-toggle': 'tooltip',
                'title': tip
            });
        });
        slideNavList.tooltip();
    };

    $('.fullpage').fullpage({
        //↓Navigation
        menu: '#menu',
        anchors: ['fp_sec_home', 'fp_sec_search', 'fp_sec_user'],
        navigation: true,
        navigationPosition: 'right',
        navigationTooltips: ['首页', '搜索', '用户'],
        //showActiveTooltip: true,
        slidesNavigation: true,
        slidesNavPosition: 'bottom',

        //↓Accessibility
        animateAnchor: false,//scroll with animation or will directly load on the given section; default to true
        keyboardScrolling: false,

        //↓Design
        controlArrows: false,
        sectionsColor: ['#C63D0F', '#1BBC9B', '#7E8F7C'],
        fixedElements: '.header, .footer, .sidebar, .pivots,.global-search-wrapper',
        resize: true,
        paddingTop: '4rem',     //header height = 3.6rem
        paddingBottom: '2rem',  //footer height = 1.6rem
        //responsiveHeight:900,

        //↓Scrolling
        normalScrollElements: '#mapHolder', //avoid the auto scroll when scrolling over map
        normalScrollElementTouchThreshold: 3,
        scrollOverflow: true,

        //↓events
        afterRender: function () {  //initialize
            addTooltip4Slides();//为设备搜索添加导航提示
            //$('.section:last-child .fp-slidesNav').hide();//去除用户相关操作slide导航
        },
        afterResize: function () {
        },
        onLeave: function (index, nextIndex, direction) {
            if (index == 1) {
                $('#menu li[data-menuanchor="search"]').removeClass('active');
            }
        },
        afterLoad: function (anchorLink, index) {
            //↓修正menu的active项（否则fullpage.js默认将同一section下的所有slide对应的菜单都active）
            $('#menu li[data-menuanchor="fp_sec_search"]').removeClass('active');
            if (anchorLink == 'fp_sec_search') {
                var slideAnchor = $('div.slide.active').attr('data-anchor');
                $('#menu a[href="#fp_sec_search/' + slideAnchor + '"]').closest('li').addClass('active');
            }

        },
        afterSlideLoad: function (anchorLink, index, slideAnchor, slideIndex) {
            $('.fp-slidesNav a').tooltip('hide');//隐藏slide的提示框
            //↓修正menu的active项（否则fullpage.js默认将同一section下的所有slide对应的菜单都active）
            $('#menu li[data-menuanchor="' + anchorLink + '"]').removeClass('active');
            $('#menu a[href="#' + anchorLink + '/' + slideAnchor + '"]').closest('li').addClass('active');

        },
        onSlideLeave: function (anchorLink, index, slideIndex, direction, nextSlideIndex) {
            $('#menu a[href="#' + anchorLink + '/' + slideIndex + '"]').closest('li').removeClass('active');
        }
    });
});