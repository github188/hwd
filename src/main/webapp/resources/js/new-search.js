/*
 * ajax查询请求
 * @param：obj为一个对象，key为url、criteria、success、error、searchButton、searchInput
 *          url：ajax请求地址(required)
 *          criteria：查询条件(如果不填，则为$('.global-search-input').val())
 *          success：ajax成功的回调函数(required)
 *          error：ajax失败的回调函数（如果不填，则显示出错界面showErrorPage()）
 *          noDataFunc:ajax成功，但返回数据为空的回调函数（如果不填，则在header的input下方提示没有搜到相关数据）
 *          searchButton：搜索框提交按钮（如果不填，则为$('.global-search-button)
 *          searchInput：搜索框输入按钮(如果不填，则为$('.global-search-input'))
 */
function newSearch(obj) {
    var button = obj.searchButton ? obj.searchButton : $('.global-search-button'),
        input = obj.searchInput ? obj.searchInput : $('.global-search-input'),
        requestData = obj.criteria ? JSON.stringify(obj.criteria) : input.val(),
        errHandler = obj.error ? obj.error : showErrorPage,
        noDataHandler = obj.noDataFunc ? obj.noDataFunc : showNoDataInfo;

    //（1）禁用查询按钮，如果是form查询
    disableButton(button, true);
    //（2）查询数据
    //console.log("requestData: ", requestData);
    $.ajax({
        url: obj.url,
        type: "post",
        contentType: "application/json",
        dataType: "json",
        timeout: 50000,
        data: requestData
    }).success(function (data) {
        var statuscode = data['statuscode'];
        if (statuscode == 200) {
            //设置sessionStorage
            sessionStorage.agg = JSON.stringify(data['aggregation']);
            sessionStorage.devices = JSON.stringify(data['data']);
            sessionStorage.wd = JSON.stringify(data['wd']);
            obj.success(data);
            //WEATHER TO INIT SIDEBAR IS UP TO THE CALLER
        } else if (statuscode == 204) {
            console.log("no data: " + data["errmsg"]);
            noDataHandler();
        } else {
            console.log("ajax success but " + data['statuscode'], data['errmsg']);
            //errHandler();
        }
    }).error(function (e) {
        //（4）启用查询按钮，如果为form查询
        console.log("Error", e);
        disableButton(button, false);
        errHandler();
    }).done(function () {
        //（4）启用查询按钮，如果为form查询
        disableButton(button, false);
    });

    //启用/禁用指定的按钮
    function disableButton(button, flag) {
        if (button) {
            button.prop("disabled", flag);
        }
    }
}

function showErrorPage() {
    window.location.href = basePath + 'error';
}

function showNoDataInfo() {
    console.log("No related data found!");
}