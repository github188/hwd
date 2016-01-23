function initSidebar(aggregation) {
    if (sessionStorage.currentPage == 'map') {
        $('.sidebar').addClass('map').show();
    }
    //init pivots
    var $pivotsContainer = $('.pivot-bar-container').hide();
    var $pivots = $('.pivots').html('');

    //set sidebar info
    $.each(aggregation, function (key, value) {
        if (key == 'country@%city') {
            var $country = $('#countryList').find('ol.facet-values').html(''); //清空之前的数据
            if (!isEmptyObject(value)) {
                var countryIdx = 1;
                $.each(value, function (name, countryObj) {
                    var total = countryObj['count'],
                        countryLi = genSidebarLi('country', name, total).appendTo($country),
                        id = 'collapse' + name,
                        citiesContainer = $('<div class="collapse" id="' + id + '"></div>').appendTo(countryLi),
                        $cities = $('<ol class="inner-facet-values"></ol>').appendTo(citiesContainer);
                    $.each(countryObj['cities'], function (name, count) {
                        $cities.append(genSidebarLi('city', name, count));
                    });
                });

            } else {
                $country.closest('div.panel').hide();
            }
        } else {
            var $ol = $('#' + key + 'List').find('ol.facet-values').html('');   //清空之前的数据
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

    /**--------------------------------------↓functions ----------------------------------**/
    //生成一个聚类的一个条目 ol > li，key为搜索关键字，value为该关键字对应的值，count为查到的条数
    function genSidebarLi(key, value, count) {
        var id = key + CheckboxId_SEPARATOR + value,
            li = $('<li class="facet-value"></li>'),
            input = $('<input type="checkbox">').attr({'id': id, 'name': id}),
            div = $('<div class="label-container"></div>'),
            span = $('<span class="facet-count"></span>').html('(' + count + ')'),
            label = $('<label class="facet-label"></label>').attr({
                'for': id,
                'title': id
            }).append('<bdi>' + value + '</bdi>');

        //设置复选框的选中状态
        var cd = sessionStorage.checked ? JSON.parse(sessionStorage.checked) : {};
        if (cd) {
            if (cd[key] && cd[key].indexOf(CheckboxId_SEPARATOR + value) >= 0) {
                input.prop('checked', true);
            }
        }

        input.on('click', function () {
            //pivot show
            var k = this.id.substr(0, this.id.indexOf(CheckboxId_SEPARATOR));
            var v = this.id.substr(this.id.indexOf(CheckboxId_SEPARATOR) + CheckboxId_SEPARATOR.length);
            $('#collapse' + v).collapse('toggle');
            if (this.checked) {
                //（1）设置sessionStorage
                setSessionChecked('add', this.id);       //添加

                //（2）显示对应的pivot
                $pivots.append(genPivot(k, v));
                if ($pivots.find('li').length == 1) {
                    $pivotsContainer.show();
                }

                //（3）设置wd的值，并重新搜索
                searchOnCheckboxChange(k, v, 'add');
            } else {
                //（1）设置sessionStorage
                setSessionChecked('remove', this.id);   //移除

                //（2）删除对应的pivot
                $('#' + k + '_pivot_' + v).remove();
                if ($pivots.find('li').length <= 0) {
                    $pivotsContainer.hide();
                }

                //（3）设置wd的值，并重新搜索
                searchOnCheckboxChange(k, v, 'remove');
            }
        });
        div.append(span).append(label);
        li.append(input).append(div);
        return li;
    }

    //生成一个pivot，key为搜索关键字（也是aggregation中的每一项），value为用户选择的checkbox的值
    function genPivot(key, value) {
        var $pivot = $('<li class="pivot"></li>').attr({
                'id': key + '_pivot_' + value
            }).html(value),
            closeBtn = $('<button class="remove-pivot" type="submit">&times;</button>').appendTo($pivot);
        closeBtn.on('click', function () {
            var k_v = $(this).closest('li.pivot').attr('id').split('_pivot_');
            var k = k_v[0],
                v = k_v[1];
            //（1）设置对应复选框为非选中状态
            var checkbox = $('#' + key + CheckboxId_SEPARATOR + value);
            checkbox.prop('checked', false);
            //（2）移除对应pivot
            $(this).parent('li.pivot').remove();
            if ($pivots.find('li').length <= 0) {
                $pivotsContainer.hide();
            }
            //（3）设置wd的值，并重新搜索
            searchOnCheckboxChange(k, v, 'remove');
        });
        return $pivot;
    }

    //key为checkbox id的前一部分，value为后一部分，也是查询条件
//operation目前支持add和remove
    function searchOnCheckboxChange(key, value, operation) {
        switch (operation) {
            case 'add':
                sessionStorage.wd += ' ' + key + ':' + value;
                if (sessionStorage.currentPage == 'list') {
                    ResultList.search();
                } else if (sessionStorage.currentPage == 'map') {
                    MyMap.search();
                }
                break;
            case 'remove':
                sessionStorage.wd.replace(key + ':' + value, '').trim();
                if (sessionStorage.currentPage == 'list') {
                    ResultList.search();
                } else if (sessionStorage.currentPage == 'map') {
                    MyMap.search();
                }
                break;
        }
    }

    /*=============================================此处预留，以后完善代码用，现在先做功能吧----------------------------
     * 处理复选框选中和取消以及由此引发的变化
     * obj={checkbox:,checked:,pivot:}
     *      checkbox为jquery对象
     *      checked为boolean，true为选中，false为取消选中
     *      pivot为对应checkbox的pivot，checkbo和pivot至少传一个
     */
    function setCheckbox(checkbox, checked, pivot) {
        var p = obj.pivot, cb = obj.checkbox, id = cb.attr('id');
        if (!cb && !p)return;
        if (!p) {
            p = $('#' + id.replace(CheckboxId_SEPARATOR, '_pivot_'));
        }
        if (!cb) {
            id = p.attr('id').replace('_pivot_', CheckboxId_SEPARATOR);
            cb = $('#' + id);
        }
        cb.prop('checked', checked);
        if (checked) {
            pivotFun('add', p);
            setSessionChecked('add', id);
        } else {
            pivotFun('remove', p);
            setSessionChecked('remove', id);
        }
    }

    //添加或删除pivot，action可选值为add和remove
    function pivotFun(action, pivot) {
        switch (action) {
            case 'add':
                $pivots.append(pivot);
                if ($pivots.find('li').length == 1) {
                    $pivotsContainer.show();
                }
                break;
            case 'remove':
                pivot.remove();
                if ($pivots.find('li').length < 1) {
                    $pivotsContainer.hide();
                }
                break;
        }
    }
}