/*
 * ajax查询请求
 * @param：obj为一个对象，key为url、criteria、success、error、searchButton、searchInput
 *          url：ajax请求地址(required)
 *          criteria：查询条件(如果不填，则为$('.global-search-input').val())
 *          success：ajax成功的回调函数(required)
 *          error：ajax失败的回调函数（如果不填，则显示出错界面showErrorPage()）
 *          noDataFunc:ajax成功，但返回数据为空的回调函数（如果不填，则在header的input下方提示没有搜到相关数据）
 *          searchButton：搜索框提交按钮（如果不填，则为$('.global-search-button)和$('#home_search_btn')
 *          searchInput：搜索框输入按钮(如果不填，则为$('.global-search-input'))
 */
function newSearch(obj) {
    console.log('new SEARCH WD = ', obj.criteria);
    var button = obj.searchButton ? obj.searchButton : $('.global-search-button'),
        input = obj.searchInput ? obj.searchInput : $('.global-search-input'),
        requestData = obj.criteria ? JSON.stringify(obj.criteria) : input.val(),
        errHandler = obj.error ? obj.error : showErrorPage,
        noDataHandler = obj.noDataFunc ? obj.noDataFunc : showNoDataInfo;
    //（1）禁用查询按钮，如果是form查询
    disableButton(button, true);
    disableButton($('#home_search_btn'), true);
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
            var wd = data['wd'] ? data['wd'] : data['q'];
            MySessionStorage.set('wd', wd);
            MySessionStorage.set('data', data);
            obj.success(data);
        } else if (statuscode == 204) {
            alert("no data found");
            MySessionStorage.set('wd', '');
            MySessionStorage.set('data', data);
            noDataHandler();
        } else {
            console.log("ajax success but " + data['statuscode'], data['errmsg']);
            alert("ajax search error");
            errHandler();
        }
    }).error(function (e) {
        //（4）启用查询按钮，如果为form查询
        console.log("Error", e);
        disableButton(button, false);
        disableButton($('#home_search_btn'), false);
        //errHandler();
    }).done(function () {
        //（4）启用查询按钮
        disableButton(button, false);
        disableButton($('#home_search_btn'), false);
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