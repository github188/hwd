/*---------------------------------------------↓List-----------------------------------------------*/
var listSearchURL = basePath + 'api/listSearch';
var List = {

    render: function (data) {
        console.log("list is rendering---", data);
        if (isEmptyObject(data)) {//如果data为空，则返回首页
            console.log("data is null");
            /*$carousel.carousel({
             interval: false
             });
             $carousel.carousel(0);*/
        }
        console.log("result list render", data);
        //更新查询时间、查询到数据条数、结果列表、分页、侧栏checked
        $('.result-container').html('<h1>返回的结果</h1><hr><code>' + data + '</code>');
    },
    search: function (updateSidebar, page) {  //updataSidebar为boolean，true则更新侧边栏，否则不更新
        var success = function (data) {
                if (updateSidebar) {
                    initSidebar(data['aggregation']);
                }
                List.render(data);
            },
            nodataFunc = function (data) {
                console.log("no data", data['errmsg']);
            };

        console.log("List search starts ----" + sessionStorage.wd);
        var obj = {
            "url": listSearchURL,
            "criteria": {
                "wd": getWd().replace(sessionStorage.currentExtent, ''),
                "page": page
            },
            "success": success,
            "noDataFunc": nodataFunc
        };
        newSearch(obj);
    }
};