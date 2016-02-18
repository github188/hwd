var Sidebar = {
    wrapper: $('.sidebar'),
    onlyUpdate: false,
    showOnly: function () {
        console.log('show only');
        this.wrapper.show();
    },
    show: function (agg) {
        console.log("FUNCTION CALL: Sidebar.show");
        //Pivot.hide();
        this.render(agg);
        this.wrapper.show();
    },
    hide: function () {
        console.log("FUNCTION CALL: Sidebar.hide");
        this.wrapper.hide();
    },
    render: function (agg) {
        console.log("FUNCTION CALL: Sidebar.render");
        //set sidebar input
        $.each(agg, function (key, value) {
            if (key == 'country@%city') {
                var $country = $('#countryList').find('ol.facet-values').show().html(''); //清空以前的数据
                if (!isEmptyObject(value)) {
                    $.each(value, function (countryName, countryObj) {
                        if (countryName.indexOf('/')) {
                            countryName = countryName.replace('/', '');
                        }
                        var total = countryObj['count'],
                            countryLi = genSidebarCountryLi('country', countryName, total).appendTo($country),
                            id = 'collapse' + countryName,
                            citiesContainer = $('<div class="collapse" id="' + id + '"></div>').appendTo(countryLi),
                            $cities = $('<ol class="inner-facet-values"></ol>').appendTo(citiesContainer);
                        $cities.append(genSidebarLi('country' + CheckboxId_SEPARATOR + countryName, '全国', total));
                        $.each(countryObj['cities'], function (cityName, count) {
                            if (cityName.indexOf('/')) {
                                cityName = cityName.replace('/', '');
                            }
                            var li = genSidebarLi('city', cityName, count);
                            li.find('input:first-child').attr('data-country', countryName);
                            $cities.append(li);
                        });
                    });
                } else {
                    $country.closest('div.panel').hide();
                }
            } else {
                var $ol = $('#' + key + 'List').find('ol.facet-values').html('');   //清空以前的数据
                if (!isEmptyObject(value)) {
                    $.each(value, function (name, count) {
                        $ol.append(genSidebarLi(key, name, count)).closest('div.panel').show();
                    });
                } else {
                    $ol.closest('div.panel').hide();
                }
            }
        });
        //根据pivots，设置复选框的选中状态
        var pivots = MySessionStorage.get('pivots');
        if (pivots) {
            Pivot.init();
            var pivotsList = pivots.trim().split(' ');
            for (var i = 0; i < pivotsList.length; i++) {
                Pivot.add(pivotsList[i]); //添加pivot
                var id = pivotsList[i].replace(PivotId_SEPARATOR, CheckboxId_SEPARATOR);
                var chkbox = $('#' + id).prop('checked', true); //选中复选框
                //展开被选中的项所在的列表
                var panelId = id.split(CheckboxId_SEPARATOR)[0] + 'List';
                if (id.indexOf('city' + CheckboxId_SEPARATOR)) {//如果是城市，则展开国家面板以及该城市所在国家的列表
                    $('#countryList').addClass('in');
                    chkbox.closest('div.collapse').addClass('in');
                }
                $('#' + panelId).addClass('in');
            }
        }

        //listeners for the up and down icon
        $('.panel-title a').on('click', function () {
            var $this = $(this);
            if ($this.attr('aria-expanded') == 'false') {   //这里竟然是字符串，不是boolean
                $this.find('span').addClass('glyphicon-menu-right').removeClass('glyphicon-menu-down');
            } else {
                $this.find('span').addClass('glyphicon-menu-down').removeClass('glyphicon-menu-right');
            }
        });

        /*--------------------------------------↓functions ----------------------------------*/
        //生成一个聚类的一个条目 ol -> li，key为搜索关键字，value为该关键字对应的值，count为查到的条数
        function genSidebarLi(key, value, count) {
            var id = key + CheckboxId_SEPARATOR + value;
            var li = $('<li class="facet-value"></li>'), input;
            if (value == '全国') {
                id = key + '_all_';
                input = $('<input type="checkbox" class="all-city">').attr({'id': id, 'name': id});
            } else {
                input = $('<input type="checkbox" class="city">').attr({'id': id, 'name': id});
            }
            if (value.toLocaleLowerCase() == 'unknown') {
                input = $('<input type="checkbox" disabled>').attr({'id': id, 'name': id});
            }
            var
                div = $('<div class="label-container"></div>'),
                span = $('<span class="facet-count"></span>').html('(' + count + ')'),
                label = $('<label class="facet-label"></label>').attr({
                    'for': id,
                    'title': id
                }).append('<bdi>' + value + '</bdi>');

            //listener
            inputEventHandler(input);

            div.append(span).append(label);
            li.append(input).append(div);
            return li;
        }

        function genSidebarCountryLi(key, value, count) {
            var id = key + CheckboxId_SEPARATOR + value,
                li = $('<li class="facet-value"></li>'),
                input = $('<input type="checkbox" class="country">').attr({'id': id, 'name': id}),
                div = $('<div class="label-container"></div>'),
                span = $('<span class="facet-count"></span>').html('(' + count + ')'),
                label = $('<label class="facet-label"></label>').attr({
                    'for': id,
                    'title': id
                }).append('<bdi>' + value + '</bdi>');

            //listener
            input.css('display', 'none').on('click', function () {
                $('#collapse' + id.split(CheckboxId_SEPARATOR)[1]).collapse('toggle');
            });

            div.append(span).append(label);
            li.append(input).append(div);
            return li;
        }

        function inputEventHandler(input) {
            input.on('click', function () {
                Sidebar.onlyUpdate = true;
                var $this = $(this), siblings = $this.closest('li').siblings("li"), id = this.id;
                if ($this.hasClass('all-city')) {

                    id = id.replace(CountryId_SEPARATOR, '');
                    if (this.checked) {
                        console.log("input all city is clicked");
                        //（1）该国家下所有的城市都被选中，session中都移除,Pivot中都移除
                        siblings.each(function (index, item) {
                            var i = $(item).find('input').prop('checked', true);
                            MySessionStorage.set('checked', i.attr('id'), 'remove');
                            Pivot.remove($('#' + i.attr('id').replace(CheckboxId_SEPARATOR, PivotId_SEPARATOR)));
                        });
                        //（2.a）设置sessionStorage
                        MySessionStorage.set('checked', id, 'add');

                        //（2.b）添加对应的pivot
                        Pivot.add(id.replace(CheckboxId_SEPARATOR, PivotId_SEPARATOR));
                    }
                    else {
                        //（1）设置sessionStorage
                        MySessionStorage.set('checked', id, 'remove');

                        //（2）删除对应的pivot
                        Pivot.remove($('#' + id.replace(CheckboxId_SEPARATOR, PivotId_SEPARATOR)));

                        //（3）该国家下所有的城市都取消选中
                        siblings.each(function (index, item) {
                            var i = $(item).find('input').prop('checked', false);
                        });
                    }
                }
                else if ($this.hasClass('city')) {
                    var all = $this.closest('li').siblings("li:first-child").find('input');
                    //console.log("all is checked or not", all.is(':checked'));
                    if (all.is(':checked') && !this.checked) {
                        console.log("all is checked");
                        siblings.each(function (index, item) {
                            var itemId = $(item).find('input').attr('id');
                            if (itemId != $this.attr('id')) {
                                //（1.a）添加对应的全国所有其他城市sessionStorage
                                MySessionStorage.set('checked', itemId, 'add');
                                //（1.b）添加对应的全国所有其他pivot
                                console.log($this.attr('data-country'));
                                if ($this.attr('data-country')) {
                                    Pivot.add(itemId.replace(CheckboxId_SEPARATOR, PivotId_SEPARATOR), $this.attr('data-country'));
                                } else {
                                    Pivot.add(itemId.replace(CheckboxId_SEPARATOR, PivotId_SEPARATOR));
                                }
                            }
                        });
                        //（2.a）移除全国sessionStorage
                        MySessionStorage.set('checked', all.attr('id'), 'remove');

                        //（2.b）删除对应的全国pivot
                        Pivot.remove($('#' + all.attr('id').replace(CountryId_SEPARATOR, '').replace(CheckboxId_SEPARATOR, PivotId_SEPARATOR)));

                        //（2.c）取消全国checkbox的选中状态
                        all.prop('checked', false);//.checked = true;
                    }
                    else {
                        var pivotId = id.replace(CheckboxId_SEPARATOR, PivotId_SEPARATOR);
                        if (this.checked) {
                            //（1）设置sessionStorage
                            MySessionStorage.set('checked', id, 'add');
                            //（2）添加对应的pivot
                            //Pivot.add(pivotId);
                            if ($this.attr('data-country')) {
                                Pivot.add(pivotId, $this.attr('data-country'));
                            } else {
                                Pivot.add(pivotId);
                            }
                        } else {
                            //（1）设置sessionStorage
                            MySessionStorage.set('checked', id, 'remove');

                            //（2）删除对应的pivot
                            Pivot.remove($('#' + pivotId));
                        }
                    }
                }
                else {
                    if (this.checked) {
                        var pid = id.replace(CheckboxId_SEPARATOR, PivotId_SEPARATOR);
                        //（1）设置sessionStorage
                        MySessionStorage.set('checked', id, 'add');
                        //（2）添加对应的pivot
                        Pivot.add(pid);
                    } else {
                        //（1）设置sessionStorage
                        MySessionStorage.set('checked', id, 'remove');
                        //（2）删除对应的pivot
                        Pivot.remove($('#' + pid));
                    }
                }
                //（3）重新搜索
                Sidebar.searchOnCheckboxChange();
            });
        }
    },
    searchOnCheckboxChange: function () {
        console.log("FUNCTION CALL: Sidebar.searchOnCheckboxChange");
        var currentPage = MySessionStorage.get('currentPage');
        if (currentPage == 'list') {
            List.search(1); //1表示显示第一页
        } else if (currentPage == 'map') {
            MyMap.search(1);
        }
    },
    update: function () {
        Sidebar.onlyUpdate = false;
        $('li.facet-value').find('input').each(function (index, item) {
            //console.log(index, item);

        });
    }
};

var Pivot = {
    wrapper: $('.pivot-bar-container'),
    $pivots: $('.pivots'),
    init: function () {
        console.log("FUNCTION CALL: Pivot.init");
        this.wrapper.hide();
        this.$pivots.html('');
        sessionStorage.removeItem('pivots');
    },
    show: function () {
        console.log("FUNCTION CALL: Pivot.show");
        this.wrapper.show();
    },
    hide: function () {
        console.log("FUNCTION CALL: Pivot.hide");
        this.wrapper.hide();
        //this.$pivots.html('');
    },
    add: function (id, dataAttr) {//id,not the jquery object；dataAttr为城市特加的属性，表示该城市所属的国家，可选
        //console.log("FUNCTION CALL: Pivot.add, param = ", id);
        if (id.indexOf(CountryId_SEPARATOR) !== -1) {
            id = id.replace(CountryId_SEPARATOR, '');
        }
        if (!this.$pivots.find('#' + id))return;
        this.$pivots.append(genPivot(id, dataAttr));
        MySessionStorage.set('pivots', id, 'add');
        if (this.$pivots.find('li').length == 1) {
            this.show();
        }

        //生成一个pivot，key为搜索关键字（也是aggregation中的每一项），value为用户选择的checkbox的值
        function genPivot(id, _dataAttr) {
            var $pivot = $('<li class="pivot"></li>').attr({
                'id': id,
                'data-country': _dataAttr
            });

            if (_dataAttr) {
                $pivot.html(_dataAttr + ': ' + id.split(PivotId_SEPARATOR)[1]);
            } else {
                $pivot.html(id.split(PivotId_SEPARATOR)[1]);
            }

            var closeBtn = $('<button class="remove-pivot" type="submit">&times;</button>').appendTo($pivot);

            //listener
            closeBtn.on('click', function () {
                var pid = $(this).closest('li.pivot').attr('id');
                var k_v = pid.split(PivotId_SEPARATOR);
                var k = k_v[0], v = k_v[1];

                //（1）移除对应pivot
                //$(this).parent('li.pivot').remove();
                Pivot.remove($(this).parent('li.pivot'));

                //（2）取消选中复选框
                var checkboxId = pid.replace(PivotId_SEPARATOR, CheckboxId_SEPARATOR);
                if (checkboxId.indexOf('country' + CheckboxId_SEPARATOR) !== -1) {
                    if (checkboxId.indexOf(CountryId_SEPARATOR) < 0) {
                        checkboxId += CountryId_SEPARATOR;
                        $('#' + checkboxId).siblings('li').find('input').each(function (index, item) {
                            $(item).prop('checked', false);
                        });
                    }
                } else {
                    var checkbox = $('#' + checkboxId);
                    checkbox.prop('checked', false);
                }

                //（3）从sessionStorage中移除对应checkbox id
                MySessionStorage.set('checked', checkboxId, 'remove');

                //（4）重新搜索
                Sidebar.searchOnCheckboxChange();
            });
            return $pivot;
        }

    },
    remove: function (pivot) {//jquery object
        console.log("FUNCTION CALL: Pivot.remove");
        if (pivot) {
            pivot.remove();
            console.log(pivot.attr('id'));
            MySessionStorage.set('pivots', pivot.attr('id'), 'remove');
        }
        if (this.$pivots.find('li').length <= 0) {
            this.wrapper.hide();
        }
    },
    getAllPivotsAsStr: function () {
        var result = '';
        console.log("FUNCTION CALL: Pivot.getAllPivotsAsStr");
        this.$pivots.find('li').each(function (idx, item) {
            if ($(item).attr('data-country')) {
                result += 'country:' + $(this).attr('data-country') + ' ';
            }
            result += item.id.replace(PivotId_SEPARATOR, ':') + ' ';
        });
        return result;
    }
};
