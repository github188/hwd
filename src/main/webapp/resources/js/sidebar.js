var Sidebar = {
    wrapper: $('.sidebar'),
    onlyUpdate: false,
    showOnly: function () {
        console.log('show only');
        this.wrapper.show();
    },
    show: function (agg) {
        console.log("FUNCTION CALL: Sidebar.show");
        Pivot.hide();
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
            if (JSON.stringify(value).indexOf('/') < 0) {
                if (key == 'country@%city') {
                    var $country = $('#countryList').find('ol.facet-values').html(''); //清空以前的数据
                    if (!isEmptyObject(value)) {
                        $.each(value, function (name, countryObj) {
                            var total = countryObj['count'],
                                countryLi = genSidebarCountryLi('country', name, total).appendTo($country),
                                id = 'collapse' + name,
                                citiesContainer = $('<div class="collapse" id="' + id + '"></div>').appendTo(countryLi),
                                $cities = $('<ol class="inner-facet-values"></ol>').appendTo(citiesContainer);
                            $cities.append(genSidebarLi('country' + CheckboxId_SEPARATOR + name, '全国', total));
                            $.each(countryObj['cities'], function (name, count) {
                                $cities.append(genSidebarLi('city', name, count));
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
            }

        });

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
                    console.log("all is checked or not", all.is(':checked'));

                    if (all.is(':checked') && !this.checked) {
                        console.log("all is checked");
                        siblings.each(function (index, item) {
                            var itemId = $(item).find('input').attr('id');
                            if (itemId != $this.attr('id')) {
                                //（1.a）添加对应的全国所有其他城市sessionStorage
                                MySessionStorage.set('checked', itemId, 'add');
                                //（1.b）添加对应的全国所有其他pivot
                                Pivot.add(itemId.replace(CheckboxId_SEPARATOR, PivotId_SEPARATOR));
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
                            Pivot.add(pivotId);
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
        /*//设置checkbox的选中状态和pivot的显示
         var cd = MySessionStorage.get('checked');
         if (cd) {
         $.each(cd, function (key, value) {
         $('#' + key).prop('checked', true);
         Pivot.add(key.replace(CheckboxId_SEPARATOR, PivotId_SEPARATOR));//添加pivot
         if (key.indexOf('country' + CheckboxId_SEPARATOR) !== -1) {    //如果国家被选中，则其所有城市均被选中;
         $('#collapse' + key.split(CheckboxId_SEPARATOR)[1] + ' ol li').find('input').prop('checked', true);
         //展开
         $('#collapse' + key.split(CheckboxId_SEPARATOR)[1]).collapse('show');
         }
         });
         }*/
    }
};

var Pivot = {
    wrapper: $('.pivot-bar-container'),
    $pivots: $('.pivots'),
    init: function () {
        console.log("FUNCTION CALL: Pivot.init");
        this.wrapper.hide();
        this.$pivots.html('');
    },
    show: function () {
        console.log("FUNCTION CALL: Pivot.show");
        this.wrapper.show();
    },
    hide: function () {
        console.log("FUNCTION CALL: Pivot.hide");
        this.wrapper.hide();
        this.$pivots.html('');
    },
    add: function (id) {//id,not the jquery object
        console.log("FUNCTION CALL: Pivot.add, param = ", id);
        if (id.indexOf(CountryId_SEPARATOR) !== -1) {
            id = id.replace(CountryId_SEPARATOR, '');
        }
        if (!this.$pivots.find('#' + id))return;
        this.$pivots.append(genPivot(id));
        console.log("add pivot succeed.");
        if (this.$pivots.find('li').length == 1) {
            this.show();
        }

        //生成一个pivot，key为搜索关键字（也是aggregation中的每一项），value为用户选择的checkbox的值
        function genPivot(id) {
            var $pivot = $('<li class="pivot"></li>').attr({
                    'id': id
                    //'id': key + PivotId_SEPARATOR + value
                }).html(id.split(PivotId_SEPARATOR)[1]),
                closeBtn = $('<button class="remove-pivot" type="submit">&times;</button>').appendTo($pivot);
            //listener
            closeBtn.on('click', function () {
                var pid = $(this).closest('li.pivot').attr('id');
                var k_v = pid.split(PivotId_SEPARATOR);
                var k = k_v[0], v = k_v[1];

                //（1）移除对应pivot
                $(this).parent('li.pivot').remove();

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
        }
        if (this.$pivots.find('li').length <= 0) {
            this.wrapper.hide();
        }
    }
};
