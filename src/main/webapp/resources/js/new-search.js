/*
 * ajax查询请求
 * @param：obj为一个对象，key为url、criteria、success、error、searchButton、searchInput
 *          url：ajax请求地址(required)
 *          criteria：查询条件
 *          success：ajax成功的回调函数(required)
 *          error：ajax失败的回调函数
 *          noDataFunc:ajax成功，但返回数据为空的回调函数
 *          searchButton：搜索框提交按钮
 *          searchInput：搜索框输入按钮
 */
function newSearch(obj) {
    var requestData = obj.criteria ? JSON.stringify(obj.criteria) : '';
    //（1）禁用查询按钮，如果是form查询
    if (obj.searchButton) {
        disableButton(obj.searchButton, true);
    }
    //（2）查询数据
    console.log("requestData: ", requestData);
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
            obj.success(data, false);
        } else if (statuscode == 204) {
            console.log("Error: " + data["errmsg"]);
            if (obj.noDataFunc) {
                obj.noDataFunc(data);
            }
        } else {
            console.log('Error', data['errmsg']);
        }
        //（3）设置搜索框数据为当前查询条件，如果为form查询
        if (obj.searchInput) {
            if (data['wd']) {
                setInputValue(obj.searchInput, data['wd'].trim());
            }
        }
    }).error(function (e) {
        //（4）启用查询按钮，如果为form查询
        if (obj.searchButton) {
            disableButton(obj.searchButton, false);
        }
        if (obj.error) {
            obj.error(e);
        }
    }).done(function () {
        //（4）启用查询按钮，如果为form查询
        if (obj.searchButton) {
            disableButton(obj.searchButton, false);
        }
    });

    //启用/禁用指定的按钮
    function disableButton(button, flag) {
        if (button) {
            button.prop("disabled", flag);
        }
    }

    function setSearchInputValue(input, value) {
        if (input) {
            input.val(value);
        }
    }
}