var $window = $(window),
    $body = $('body'),
    $index = $('#main'),
    $list = $('#listWrapper'),
    $advs = $('#advs'); //all the containers
$(function () {
    //监听高级查找按钮事件
    $('#advs_link').on('click', function (e) {
        e.preventDefault();
        $index.hide();
        $list.show();
        $advs.addClass('active').fadeIn(1000);
    });
});
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
