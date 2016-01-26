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
            return;
        }
        Sidebar.show(); //显示侧栏
        //更新查询时间、查询到数据的条数、结果列表、分页、侧栏checked
        $('.duration').val(data['took']);   //时间
        $('.resultCount').val(data['total']);   //条数
        $('.result-container').html('<h1>返回的结果</h1><hr><code>' + data + '</code>');
        //分页
        //侧栏
    },
    search: function (updateSidebar, pageNumber) {  //updateSidebar为boolean，true则更新侧边栏，否则不更新
        console.log("List search starts ----" + sessionStorage.wd);
        var obj = {
            "url": listSearchURL,
            "criteria": {
                "wd": MySessionStorage.get('wd'),
                "page": pageNumber
            },
            "success": success,
            "noDataFunc": noDataFunc
        };
        newSearch(obj);


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
    }
};