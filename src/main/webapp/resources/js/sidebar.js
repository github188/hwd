var Sidebar = {
    wrapper: $('.sidebar'),
    init: function (aggregation) {
        //init pivots
        Pivot.init();

        //set sidebar info
        $.each(aggregation, function (key, value) {
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
            if (value == '全国') {
                id = key + '_all_';
            }
            var li = $('<li class="facet-value"></li>'),
                input = $('<input type="checkbox">').attr({'id': id, 'name': id});
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

            /*            //设置复选框的选中状态
             var cd = MySessionStorage.get('checked'),
             cdItem = key + ":" + value;
             if (cd && cd.search(new RegExp("\\s" + cdItem + "\\s", "gim")) >= 0) {
             input.prop('checked', true);
             }*/

            //listener
            input.on('click', function () {
                var k_v = this.id.split(CheckboxId_SEPARATOR);
                var k = k_v[0], v = k_v[1];
                $('#collapse' + v).collapse('toggle');
                if (this.checked) {
                    //（1）设置sessionStorage
                    MySessionStorage.set('checked', this.id, 'add');

                    //（2）添加对应的pivot
                    Pivot.add(k, v);

                    //（3）重新搜索
                    searchOnCheckboxChange();
                } else {
                    //（1）设置sessionStorage
                    MySessionStorage.set('checked', this.id, 'remove');

                    //（2）删除对应的pivot
                    Pivot.remove($('#' + k + PivotId_SEPARATOR + v));

                    //（3）重新搜索
                    searchOnCheckboxChange();
                }
            });

            div.append(span).append(label);
            li.append(input).append(div);
            return li;
        }

        function genSidebarCountryLi(key, value, count) {
            var id = key + CheckboxId_SEPARATOR + value,
                li = $('<li class="facet-value"></li>'),
                input = $('<input type="checkbox">').attr({'id': id, 'name': id}),
                div = $('<div class="label-container"></div>'),
                span = $('<span class="facet-count"></span>').html(''),
                label = $('<label class="facet-label"></label>').attr({
                    'for': id,
                    'title': id
                }).append('<bdi>' + value + '</bdi>');


            //listener
            input.on('click', function () {
                var k_v = this.id.split(CheckboxId_SEPARATOR);
                var k = k_v[0], v = k_v[1];
                $('#collapse' + v).collapse('toggle');
            });

            div.append(span).append(label);
            li.append(input).append(div);
            return li;
        }

        /*
         * key为checkbox id的前一部分，value为后一部分，也是查询条件,
         * operation目前支持add和remove
         */
        function searchOnCheckboxChange() {
            var currentPage = MySessionStorage.get('currentPage');
            if (currentPage == 'list') {
                List.search(false, 1);
            } else if (currentPage == 'map') {
                MyMap.search(false, 1);
            }
        }

    },
    show: function (agg) {
        Pivot.hide();
        this.render(agg);
        this.wrapper.show();
    },
    hide: function () {
        this.wrapper.hide();
    },
    render: function (agg) {
        //set sidebar input
        $.each(agg, function (key, value) {
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
        });

        //设置checkbox的选中状态
        var cd = MySessionStorage.get('checked');
        if (cd) {
            $.each(cd, function (key, value) {
                $('#' + key).prop('checked', true);
            });
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
            if (value == '全国') {
                id = key + '_all_';
            }
            var li = $('<li class="facet-value"></li>'),
                input = $('<input type="checkbox">').attr({'id': id, 'name': id});
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
            input.on('click', function () {
                var k_v = this.id.split(CheckboxId_SEPARATOR);
                var k = k_v[0], v = k_v[1];
                $('#collapse' + v).collapse('toggle');
                if (this.checked) {
                    //（1）设置sessionStorage
                    MySessionStorage.set('checked', this.id, 'add');

                    //（2）添加对应的pivot
                    Pivot.add(k, v);
                } else {
                    //（1）设置sessionStorage
                    MySessionStorage.set('checked', this.id, 'remove');

                    //（2）删除对应的pivot
                    Pivot.remove($('#' + k + PivotId_SEPARATOR + v));
                }

                //（3）重新搜索
                this.searchOnCheckboxChange();
            });

            div.append(span).append(label);
            li.append(input).append(div);
            return li;
        }

        function genSidebarCountryLi(key, value, count) {
            var id = key + CheckboxId_SEPARATOR + value,
                li = $('<li class="facet-value"></li>'),
                input = $('<input type="checkbox">').attr({'id': id, 'name': id}),
                div = $('<div class="label-container"></div>'),
                span = $('<span class="facet-count"></span>').html(''),
                label = $('<label class="facet-label"></label>').attr({
                    'for': id,
                    'title': id
                }).append('<bdi>' + value + '</bdi>');


            //listener
            input.on('click', function () {
                var k_v = this.id.split(CheckboxId_SEPARATOR);
                var k = k_v[0], v = k_v[1];
                $('#collapse' + v).collapse('toggle');
            });

            div.append(span).append(label);
            li.append(input).append(div);
            return li;
        }
    },
    /*
     * key为checkbox id的前一部分，value为后一部分，也是查询条件,
     * operation目前支持add和remove
     */
    searchOnCheckboxChange: function () {
        var currentPage = MySessionStorage.get('currentPage');
        if (currentPage == 'list') {
            List.search(1); //1表示显示第一页
        } else if (currentPage == 'map') {
            MyMap.search(1);
        }
    }
};

var Pivot = {
    wrapper: $('.pivot-bar-container'),
    $pivots: $('.pivots'),
    init: function () {
        this.wrapper.hide();
        this.$pivots.html('');
    },
    show: function () {
        this.wrapper.show();
    },
    hide: function () {
        this.wrapper.hide();
        this.$pivots.html('');
    },
    add: function (k, v) {
        this.$pivots.append(genPivot(k, v));
        if (this.$pivots.find('li').length == 1) {
            this.wrapper.show();
        }

        //生成一个pivot，key为搜索关键字（也是aggregation中的每一项），value为用户选择的checkbox的值
        function genPivot(key, value) {
            var $pivot = $('<li class="pivot"></li>').attr({
                    'id': key + PivotId_SEPARATOR + value
                }).html(value),
                closeBtn = $('<button class="remove-pivot" type="submit">&times;</button>').appendTo($pivot);
            //listener
            closeBtn.on('click', function () {
                var k_v = $(this).closest('li.pivot').attr('id').split(PivotId_SEPARATOR);
                var k = k_v[0], v = k_v[1];

                //（1）移除对应pivot
                $(this).parent('li.pivot').remove();

                //（2）取消选中复选框
                var checkboxId = key + CheckboxId_SEPARATOR + value;
                var checkbox = $('#' + checkboxId);
                checkbox.prop('checked', false);

                //（3）从sessionStorage中移除对应checkbox id
                MySessionStorage.set('checked', checkboxId, 'remove');

                //（4）重新搜索
                Sidebar.searchOnCheckboxChange();
            });
            return $pivot;
        }

    },
    remove: function (pivot) {
        pivot.remove();
        if (this.$pivots.find('li').length <= 0) {
            this.wrapper.hide();
        }
    }
};

/*
 var Sidebar = {
 sidebar: $('.sidebar'),
 init: function (aggregation) {
 */
/*if (MySessionStorage.get('currentPage') == 'map') {
 $('.sidebar').show();
 //$('.sidebar').addClass('mapSidebar').show();
 }*//*

 //init pivots
 Pivot.init();

 //set sidebar info
 $.each(aggregation, function (key, value) {
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

 */
/*--------------------------------------↓functions ----------------------------------*//*

 //生成一个聚类的一个条目 ol -> li，key为搜索关键字，value为该关键字对应的值，count为查到的条数
 function genSidebarLi(key, value, count) {
 var id = key + CheckboxId_SEPARATOR + value;
 if (value == '全国') {
 id = key + '_all_';
 }
 var li = $('<li class="facet-value"></li>'),
 input = $('<input type="checkbox">').attr({'id': id, 'name': id});
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

 //设置复选框的选中状态
 var cd = MySessionStorage.get('checked'),
 cdItem = key + ":" + value;
 if (cd && cd.search(new RegExp("\\s" + cdItem + "\\s", "gim")) >= 0) {
 input.prop('checked', true);
 }

 //listener
 input.on('click', function () {
 var k_v = this.id.split(CheckboxId_SEPARATOR);
 var k = k_v[0], v = k_v[1];
 $('#collapse' + v).collapse('toggle');
 if (this.checked) {
 //（1）设置sessionStorage
 MySessionStorage.set('checked', this.id, 'add');
 //setSessionChecked('add', this.id);
 console.log("input on click id = " + this.id, "checked in session = " + MySessionStorage.get('checked'));

 //（2）添加对应的pivot
 Pivot.add(k, v);

 //（3）重新搜索
 searchOnCheckboxChange();
 } else {
 //（1）设置sessionStorage
 MySessionStorage.set('checked', this.id, 'remove');
 //setSessionChecked('remove', this.id);   //移除

 //（2）删除对应的pivot
 Pivot.remove($('#' + k + PivotId_SEPARATOR + v));

 //（3）重新搜索
 searchOnCheckboxChange();
 }
 });

 div.append(span).append(label);
 li.append(input).append(div);
 return li;
 }

 function genSidebarCountryLi(key, value, count) {
 var id = key + CheckboxId_SEPARATOR + value,
 li = $('<li class="facet-value"></li>'),
 input = $('<input type="checkbox">').attr({'id': id, 'name': id}),
 div = $('<div class="label-container"></div>'),
 span = $('<span class="facet-count"></span>').html(''),
 label = $('<label class="facet-label"></label>').attr({
 'for': id,
 'title': id
 }).append('<bdi>' + value + '</bdi>');


 //listener
 input.on('click', function () {
 var k_v = this.id.split(CheckboxId_SEPARATOR);
 var k = k_v[0], v = k_v[1];
 $('#collapse' + v).collapse('toggle');
 });

 div.append(span).append(label);
 li.append(input).append(div);
 return li;
 }

 */
/*
 * key为checkbox id的前一部分，value为后一部分，也是查询条件,
 * operation目前支持add和remove
 *//*

 function searchOnCheckboxChange() {
 var currentPage = MySessionStorage.get('currentPage');
 if (currentPage == 'list') {
 List.search(false, 1);
 } else if (currentPage == 'map') {
 MyMap.search(false, 1);
 }
 }

 },
 show: function () {
 this.sidebar.show();
 },
 hide: function () {
 this.sidebar.hide();
 }
 };*/
