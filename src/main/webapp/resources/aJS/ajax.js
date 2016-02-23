/*
 * @function ajaxLoadData
 * @param requestObj:"请求对象",requestObj={url:"string,请求地址",data:"JSONObject,请求参数"，beforeSend:"function,发送请求前执行的操作"，success:"function,成功回调函数"，error:"function,失败回调函数"}
 * @return 无
 * @description ajax提交请求，获取数据
 * @author lyp
 * @date 2016-02-19
 */
function ajaxLoadData(requestObj) {
    var defaultErrorHandler = function (data) {
        console.log("error", data);
    };
    console.log("FUNCTION CALL: AjaxLoadData", requestObj);
    $.ajax({
        url: requestObj.url,
        type: "post",
        contentType: "application/json",
        dataType: "json",
        timeout: 50000,
        data: JSON.stringify(requestObj.data),
        beforeSend: function () {
            //$('body').showLoading();// 添加 loading 标记类
            if (requestObj.beforeSend) {
                requestObj.beforeSend();
            }
        }
    })
        .success(requestObj.success)
        .error(requestObj.error ? requestObj.error : defaultErrorHandler)
        .complete(function (jqXHR, textStatus) {
            //$('body').hideLoading();// 添加 loading 标记类
            $('html, body').scrollTop(0);
        });
}

var LoadData = {
    _variable: (function () {
        return "I am a private variable";
    }()),
    defaultErrorHandler: function (data) {
        console.log("error", data);
    },
//get方式获取数据
    get: function (requestObj) {
        console.log("FUNCTION CALL: AjaxLoadData-get", requestObj);
        $.ajax({
            url: requestObj.url,
            type: "get",
            dataType: "json",
            timeout: 50000,
            beforeSend: function () {
                //$('body').showLoading();// 添加 loading 标记类
                if (requestObj.beforeSend) {
                    requestObj.beforeSend();
                }
            }
        }).success(requestObj.success)
            .error(requestObj.error ? requestObj.error : defaultErrorHandler)
            .complete(function (jqXHR, textStatus) {
                //$('body').hideLoading();// 添加 loading 标记类
                $('html, body').scrollTop(0);
            });
    },
    post: function (requestObj) {

        var defaultErrorHandler = function (data) {
            console.log("error", data);
        };
        console.log("FUNCTION CALL: AjaxLoadData", requestObj);
        $.ajax({
            url: requestObj.url,
            type: "post",
            contentType: "application/json",
            dataType: "json",
            timeout: 50000,
            data: JSON.stringify(requestObj.data),
            beforeSend: function () {
                //$('body').showLoading();// 添加 loading 标记类
                if (requestObj.beforeSend) {
                    requestObj.beforeSend();
                }
            }
        })
            .success(requestObj.success)
            .error(requestObj.error ? requestObj.error : defaultErrorHandler)
            .complete(function (jqXHR, textStatus) {
                //$('body').hideLoading();// 添加 loading 标记类
                $('html, body').scrollTop(0);
            });
    }
};