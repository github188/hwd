//分隔符：key_s0s_value（s零s）
var SEPARATOR = '_s0s_';
var $pivots = $('.pivots');
function initSidebar(aggregation) {
    pivotsContainer.hide();
    $.each(aggregation, function (key, value) {
        if (key == 'country@%city') {
            var $country = $('#countryList').find('ol.facet-values');
            if (!isEmptyObject(value)) {
                var countryIdx = 1;
                $.each(value, function (name, cities) {
                    var total = 0,
                        countryLi = genSidebarLi('country', name, total).appendTo($country),
                        id = 'collapse' + name,
                        citiesContainer = $('<div class="collapse" id="' + id + '"></div>').appendTo(countryLi),
                        $cities = $('<ol class="inner-facet-values"></ol>').appendTo(citiesContainer);
                    $.each(cities, function (name, count) {
                        $cities.append(genSidebarLi('city', name, count));
                        total += count;
                    });
                    countryLi.find('div span').first().html('(' + total + ')'); //设置该国家包含的设备数
                });

            } else {
                $country.closest('div.panel').hide();
            }
        } else {
            var $ol = $('#' + key + 'List').find('ol.facet-values');
            if (!isEmptyObject(value)) {
                $.each(value, function (name, count) {
                    $ol.append(genSidebarLi(key, name, count)).closest('div.panel').show();
                });
            } else {
                $ol.closest('div.panel').hide();
            }
        }
    });

    //listeners

    $('.panel-title a').on('click', function () {
        var $this = $(this);
        if ($this.attr('aria-expanded') == 'false') {   //这里竟然是字符串，不是boolean
            $this.find('span').addClass('glyphicon-menu-up').removeClass('glyphicon-menu-down');
        } else {
            $this.find('span').addClass('glyphicon-menu-down').removeClass('glyphicon-menu-up');
        }
    });

    /**-----------------↓functions ---------------**/
    //生成一个聚类的一个条目 ol > li，key为搜索关键字，value为该关键字对应的值，count为查到的条数
    function genSidebarLi(key, value, count) {
        var id = key + SEPARATOR + value,
            li = $('<li class="facet-value"></li>'),
            input = $('<input type="checkbox">').attr({'id': id, 'name': id}),
            div = $('<div class="label-container"></div>'),
            span = $('<span class="facet-count"></span>').html('(' + count + ')'),
            label = $('<label class="facet-label"></label>').attr({
                'for': id,
                'title': id
            }).append('<bdi>' + value + '</bdi>');
        input.on('click', function () {
            var k = this.id.substr(0, this.id.indexOf(SEPARATOR));
            var v = this.id.substr(this.id.indexOf(SEPARATOR) + SEPARATOR.length);
            $('#collapse' + v).collapse('toggle');
            if (this.checked) {
                $pivots.append(genPivot(k, v));
                if ($pivots.find('li').length == 1) {
                    pivotsContainer.show();
                }
            } else {
                $('li[data-li-pivot-value=' + v + '][data-li-pivot-name=' + k + ']').remove();
                if ($pivots.find('li').length <= 0) {
                    pivotsContainer.hide();
                }
            }
        });
        div.append(span).append(label);
        li.append(input).append(div);
        return li;
    }

    //生成一个pivot，key为搜索关键字（也是aggregation中的每一项），value为用户选择的checkbox的值
    function genPivot(key, value) {
        var $pivot = $('<li class="pivot"></li>').attr({
                'data-li-pivot-name': key,
                'data-li-pivot-value': value
            }).html(value),
            closeBtn = $('<button class="remove-pivot" type="submit">&times;</button>').appendTo($pivot);
        closeBtn.on('click', function () {
            var k = $(this).closest('li').attr('data-li-pivot-name'),
                v = $(this).closest('li').attr('data-li-pivot-value');
            //（1）设置对应复选框为非选中状态
            var checkbox = $('#' + key + SEPARATOR + value);
            checkbox.prop('checked', false);
            //（2）移除对应pivot
            $(this).parent('li.pivot').remove();
            if ($pivots.find('li').length <= 0) {
                pivotsContainer.hide();
            }

            //（3）设置wd的值，并重新搜索
            // wd.replace(key+':'+value,'');→SEARCH AGAIN-------------
        });
        return $pivot;
    }

}