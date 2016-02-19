/*---------------------------------------------↓List-----------------------------------------------*/
var listSearchURL = basePath + 'api/listSearch';
var GlobePoint = {
    show: function () {
        MySessionStorage.set('currentPage', 'globe-point');

    },
    render: function (data) {
        console.log("globe point is rendering---", data);
        if (isEmptyObject(data)) {
        }
    },
    search: function (updateSidebar) {  //updateSidebar为boolean，true则更新侧边栏，否则不更新
        console.log("globe point search starts ----wd before search" + MySessionStorage.get('wd'));
        var wd = "";
        if (wd) {
            var success = function (data) {
                },
                noDataFunc = function (data) {
                    console.log("no data", data['errmsg']);
                    //显示无数据提示
                };
            var obj = {
                "url": '',
                "criteria": {
                    "wd": wd
                },
                "success": success,
                "noDataFunc": noDataFunc
            };
            AjaxLoadData(obj);
        }
    }
};