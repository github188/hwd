/**
 * Created by lyp on 2016/2/22.
 */
var User = {
    register: function () {
        var pswStr = $("#psw").val(),
            pswSha1Str = $.sha1(pswStr),
            formInfoList = [],
            user = {},
            requestObj = {};
        var successCallback = function (data) {
            console.log(data);
            if (data.code == 1) {
                $.Showmsg("注册成功！");
                setTimeout(function () {
                    $.Hidemsg();
                    //将导航条中登录/注册设置为用户名
                    //跳转回登录前的页面
                    window.location.href = sessionStorage.getItem('beforeRegister');
                }, 2000);
            } else {
                $.showmsg("注册失败，请稍后重新注册！");
                setTimeout(function () {
                    $.Hidemsg();
                }, 2000);
            }
        };
        var errorCallback = function () {
            console.log("ajax error!");
        };

        //导航设置
        $('.nav').find('a').removeClass('current');
        $('.user-nav').find('a').addClass('current').text('注册');

        //表单验证提交
        $(".form").Validform({
            tiptype: 3,
            beforeSubmit: function (curform) {
                //在验证成功后，表单提交前执行的函数，curform参数是当前表单对象。
//                $('input[type="password"]').val(pswSha1Str);
                formInfoList = curform.serializeArray();
                for (var i = 0; i < formInfoList.length; i++) {
                    var item = formInfoList[i];
                    if (item.name == 'password2')continue;
                    if (item.name == 'password') {
                        user[item.name] = pswSha1Str;
                    } else {
                        user[item.name] = item.value;
                    }
                }
                requestObj = {
                    url: '${basePath}user/api/register',
                    data: user,
                    success: successCallback,
                    error: errorCallback
                };
                ajaxLoadData(requestObj);   //也可以使用validform.js的ajaxPost方式提交，但为了前后端数据请求统一处理，所以在这里提交
                return false;//return false的话，表单不再提交
            }
        });
    },
    login: function () {
    },
    forgetPwd: function () {
    }
};