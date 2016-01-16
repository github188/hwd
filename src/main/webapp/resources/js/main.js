var $window = $(window), $body = $('body'), $footer = $('footer');
$(function () {
    scrollUp(); //回到顶部
    activeCurrentNav(); //激活当前页的导航
    /*=================================== ↓ new==============================================*/
    nav.init();
    /*=================================== ↑ new==============================================*/

});
/*=================================== ↓ new==============================================*/
//----------nav-------------------//
var nav = {
    init: function () {
        var ul = $("#navs"), li = $("#navs li"), i = li.length, n = i - 1, r = 120;
        ul.click(function () {
            $(this).toggleClass('active');
            if ($(this).hasClass('active')) {
                for (var a = 0; a < i; a++) {
                    li.eq(a).css({
                        'transition-delay': "" + (30 * a) + "ms",
                        '-webkit-transition-delay': "" + (30 * a) + "ms",
                        '-o-transition-delay': "" + (30 * a) + "ms",
                        'transform': "translate(" + (r * Math.cos(90 / n * a * (Math.PI / 180))) + "px," + (-r * Math.sin(90 / n * a * (Math.PI / 180))) + "px",
                        '-webkit-transform': "translate(" + (r * Math.cos(90 / n * a * (Math.PI / 180))) + "px," + (-r * Math.sin(90 / n * a * (Math.PI / 180))) + "px",
                        '-o-transform': "translate(" + (r * Math.cos(90 / n * a * (Math.PI / 180))) + "px," + (-r * Math.sin(90 / n * a * (Math.PI / 180))) + "px",
                        '-ms-transform': "translate(" + (r * Math.cos(90 / n * a * (Math.PI / 180))) + "px," + (-r * Math.sin(90 / n * a * (Math.PI / 180))) + "px"
                    });
                }
            } else {
                li.removeAttr('style');
            }
        });
    }
};

//--------------search------------//

/*=================================== ↑ new==============================================*/




















/*------------↓Nav -------------------*/
//激活导航
var activeCurrentNav = function () {
    var activeId = window.location.href.split("/").reverse()[0];
    if (activeId === '')activeId = '/';//首页特例
    $('.navbar-nav>li>a[href$="' + activeId + '"]').addClass('active');
};
/*------------↑Nav -------------------*/

/*------------↓Footer -------------------*/
//回到顶部
var scrollUp = function () {
    "use strict";
    var $scroll_up = $('#scroll_up'), THRESHOLD = 0.55, DURATION = 500;
    $window
        .scroll(function () {
            if ($window.scrollTop() > $window.height() * THRESHOLD) {
                $scroll_up.fadeIn(1000);
            } else {
                $scroll_up.fadeOut(1000);
            }
        })
        .resize(function () {
            var ALIGN_CLASS = "stick-bottom";
            if ($body.height() < $window.height()) {
                $footer.addClass(ALIGN_CLASS);
            } else {
                $footer.removeClass(ALIGN_CLASS);
            }
        })
        .trigger('scroll');

    $scroll_up.on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({scrollTop: 0}, DURATION);
    });
};
/*------------↑Footer -------------------*/

/*------------↓Error -------------------*/
var displayErrorPage = function () {
    window.location.href = basePath + 'error';
};
/*------------↑Error -------------------*/

/*----------------Helper------------------*/
//判断对象是否为空
function isEmptyObject(obj) {
    for (var n in obj) {
        return false
    }
    return true;
}

//绑定json数据，调用方法：bindJson(jsonObject);前提：json对象的属性，必须和其所在dom的id一致
function bindJson(jsonObj) {
    //console.log(jsonObj);
    for (var o in jsonObj) {
        if (jsonObj.hasOwnProperty(o)) {
            var domObj = $('#' + o.toString());
            if (!domObj) {
                if (o.toString() == 'time') {
                    domObj.html(formatDate(jsonObj[o]));
                } else {
                    domObj.html(jsonObj[o].toString());
                }
            }
            if (typeof(jsonObj[o]) == "object") {
                bindJson(jsonObj[o]);
            }
        }
    }
}

function dateLocalize(timestamp) {
    if (timestamp)  return (new Date(parseInt(timestamp))).toLocaleDateString();
    return timestamp;

}