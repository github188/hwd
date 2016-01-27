/*---------------------------------------------↓List-----------------------------------------------*/
var listSearchURL = basePath + 'api/listSearch';
var List = {
    show: function () {
        MySessionStorage.set('currentPage', 'list');
        var data = MySessionStorage.get('data');
        if (data == undefined || data == '') {
            this.search(true, 1);
        } else {
            this.render(data);
        }
    },
    render: function (data) {
        console.log("list is rendering---", data);
        if (isEmptyObject(data)) {
            console.log("data is null");
            //显示无数据提示
            //empty-result-desc-container
            $('.result-col>div').hide();
            $('.empty-result-desc-container').show();
            return;
        }
        Sidebar.show(); //显示侧栏
        //更新查询时间、查询到数据的条数、结果列表、分页、侧栏checked
        $('.duration').text(data['took']);   //时间
        var total = data['total'];
        $('.resultCount').text(total);   //条数
        //$('.result-container').html('<h1>返回的结果</h1><hr><code>' + data + '</code>');
        var list = $('.result-container ul.devices').html('');
        data.data.forEach(function (d) {
            list.append(genDeviceLi(d));
        });
        list.append('<div class="clearfix"></div>');

        //分页
        paginator(total, data['pagesize'], data['currpage'], VISIBLE_PAGE);
        //侧栏
        Sidebar.init(data['aggregation']);

        function genDeviceLi(d) {
            var li = $(' <li class="device"></li>');

            //all tags
            var facets = $('<div class="tags"></div>').appendTo(li);
            var ip = $('<h3><a href="#' + d.ip + d.ip + '"></a></h3>').appendTo(facets);
            if (d.hasOwnProperty('tags') && d.tags != '' && d.tags.length > 0) {
                console.log("devices tags");
                var $tags = $('<div class="tag item">').appendTo(facets);
                d.tags.forEach(function (tag) {
                    $('<span class="label label-default"><a href="#' + tag + '"> ' + tag + ' </a></span>').appendTo($tags);
                });
            }
            var loc = d.location;
            if (loc && loc != '') {
                var $location = $('<div class="location item">').appendTo(facets);
                $('<span class="label label-danger"><a href="#' + loc + '">' +
                '<span class="glyphicon glyphicon-map-marker"></span> ' + loc + ' </a></span>').appendTo($location);
            }
            var time = d.timestamp;
            if (time && time != '') {
                var $time = $('<div class="time item">').appendTo(facets);
                $('<span class="label label-primary"><a href="#' + time + '">' +
                '<span class="glyphicon glyphicon-time"></span> ' + time + ' </a></span>').appendTo($time);
            }
            facets.find('a').on('click', function (e) {
                e.preventDefault();
            });

            //detail info(ports,vuls)
            var info = $('<div class="well info">').appendTo(li);
            info.on('click', function () {
                if (!info.hasClass('active')) {
                    info.addClass('active')
                }
            });
            var ports = d.ports;
            if (ports != '' && ports.length > 0) {
                for (var i = 0; i < ports.length; i++) {
                    for (var key in ports[i]) {
                        var $port = $('<div><h3><a href="#">' + key + '</a></div>').appendTo(info);
                        $('<pre>' + ports[i][key] + '</pre>').appendTo($port);
                    }
                }
            }
            var vuls = d.vuls;
            console.log("devices vuls", vuls);
            if (vuls != '' && vuls.length > 0) {

                for (var key in vuls) {
                    var $vul = $('<div><h3><a href="#">' + key + '</a></div>').appendTo(info);

                    $('<pre>' + vuls[key] + '</pre>').appendTo($vul);
                }
            }
            var closeBtn = $('<button class="close"><span class="glyphicon glyphicon-menu-up"></span></button>').appendTo(info);
            closeBtn.on('click', function () {
                closeBtn.closest('div.info').removeClass('active');
            });
            return li;
            /*
             *             <li class="device">
             <div class="info well active">
             <div class="item">
             <h3><a href="#">http:30</a>
             </h3>

             <div>没有找到相关数据没有找到相关数据没有找到相关数据没有找到相关数据没有找到相关数据没有找到相关数据</div>
             </div>
             <hr>
             <div class="item">
             <h3><a href="#">http:30</a>
             </h3>

             <div>a</div>
             </div>
             </div>
             </div>
             </li>

             * */
        }
    },
    search: function (updateSidebar, pageNumber) {  //updateSidebar为boolean，true则更新侧边栏，否则不更新
        console.log("List search starts ----wd before search" + MySessionStorage.get('wd'));
        var wd = MySessionStorage.get('wd');
        if (wd) {
            var success = function (data) {
                    if (updateSidebar) {
                        Sidebar.init(data['aggregation']);
                    }
                    List.render(data);
                },
                noDataFunc = function (data) {
                    console.log("no data", data['errmsg']);
                    //显示无数据提示
                };
            var obj = {
                "url": listSearchURL,
                "criteria": {
                    "wd": wd,
                    "page": pageNumber
                },
                "success": success,
                "noDataFunc": noDataFunc
            };
            newSearch(obj);
        }
    }
};


/*
 * @param totalCounts：分页的总条目数
 * @param pageSize：每一页的条目数
 * @param currentPage：当前页码
 * @param visiblePages: 最多显示的页码数，默认值7
 */
var PAGE_SIZE = 5, //每一页的条目数
    VISIBLE_PAGE = 5; //页码个数
//调用方法paginator(total, pagesize, currpage, VISIBLE_PAGE);
function paginator(totalCounts, pageSize, currentPageNum, visiblePages) {
    if (visiblePages == undefined) {
        visiblePages = VISIBLE_PAGE;
    }
    var $pagerWrapper = $('#pager').show();
    $pagerWrapper.jqPaginator({
        totalCounts: totalCounts,
        pageSize: pageSize,
        visiblePages: visiblePages,
        currentPage: currentPageNum,
        first: '<li class="first"><a href="javascript:void(0);">首页</a></li>',
        prev: '<li class="prev"><a href="javascript:void(0);"><i class="glyphicon glyphicon-triangle-left"></i>上一页</a></li>',
        next: '<li class="next"><a href="javascript:void(0);">下一页<i class="glyphicon glyphicon-triangle-right"></i></a></li>',
        last: '<li class="last"><a href="javascript:void(0);">末页<\/a></li>',
        page: '<li class="page"><a href="javascript:void(0);">{{page}}</a></li>',
        //设置页码的Html结构,其中可以使用{{page}}代表当前页，{{totalPages}}代表总页数，{{totalCounts}}代表总条目数
        onPageChange: function (num, type) { //num: 目标页；type:“init”（初始化），“change”（点击分页）
            if (type == 'change') {
                //console.log('{{page}}');
                //console.log(num + ", " + type);
                //searchViaAjax(URL, $('#wd').val(), num);
                var currPage = MySessionStorage.get('currentPage');
                if (currPage == 'list') {
                    List.search(false, num);
                } else if (currPage == 'map') {
                    MyMap.search(false, num);
                }
            }
        }
    })

}