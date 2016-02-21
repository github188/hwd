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
        anchors: ['home', 'search', 'user'],
        navigation: true,
        navigationPosition: 'right',
        navigationTooltips: ['首页', '搜索', '用户'],
        //showActiveTooltip: true,
        slidesNavigation: true,
        slidesNavPosition: 'bottom',

        //↓Accessibility
        animateAnchor: false,//scroll with animation or will directly load on the given section; default to true

        //↓Design
        controlArrows: false,
        sectionsColor: ['#C63D0F', '#1BBC9B', '#7E8F7C'],
        fixedElements: '.header, .footer, .sidebar, .pivots',
        resize: true,
        paddingTop: '4rem',     //header height = 3.6rem
        paddingBottom: '2rem',  //footer height = 1.6rem

        //↓Scrolling
        normalScrollElements: '#mapHolder', //avoid the auto scroll when scrolling over map
        normalScrollElementTouchThreshold: 3,
        scrollOverflow: true,

        //↓events
        afterRender: function () {  //initialize
            addTooltip4Slides();//为设备搜索添加导航提示
            $('.section:last-child .fp-slidesNav').hide();//去除用户相关操作slide导航
        },
        afterResize: function () {
        },
        onLeave: function (index, nextIndex, direction) {
        },
        afterLoad: function (anchorLink, index) {
        },
        afterSlideLoad: function (anchorLink, index, slideAnchor, slideIndex) {
        },
        onSlideLeave: function (anchorLink, index, slideIndex, direction, nextSlideIndex) {
        }
    });
});