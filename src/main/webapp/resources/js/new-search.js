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
            obj.success(data);
            //设置sessionStorage
            sessionStorage.agg = data['aggregation'];
            sessionStorage.wd = data['wd'];
            sessionStorage.devices = data['data'];
            if (obj.searchButton) {
                //只要searchButton有值即为表单提交，所以要更新sidebar
                initSidebar(data['aggregation']);
            }
        } else if (statuscode == 204) {
            console.log("Error: " + data["errmsg"]);
            noDataHandler();
        } else {
            errHandler();
        }
        //（3）设置搜索框数据为当前查询条件，如果为form查询
        //setInputValue(obj.searchInput, data['wd'].trim());//不需要设置input的值
    }).error(function (e) {
        //（4）启用查询按钮，如果为form查询
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