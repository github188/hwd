/**
 * Created by lyp on 2016/2/22.
 */
var User = {
    setNavUsername: function (name) {
        var $usermenus = $('#menu').find('li[data-menuanchor="se_user"]');
        var $logout = $('#logout');
        $usermenus.find('a').hide();
        $logout
            .on('click', function (e) {
                e.preventDefault();
                Session.reset('username');
                $usermenus.find('a[href="#se_user/sl_user_login"]').show();
                $logout.hide().find('span').text('');
            })
            .show().css('display', 'inline-block')
            .find('span').text(name);
    },
    register: function () {
        //console.log('Inside User.register() ======');
        var pswStr = $("#psw").val(),
            pswSha1Str = $.sha1(pswStr),
            formInfoList = [],
            user = {},
            requestObj = {};
        var successCallback = function (data) {
            console.log(data);
            if (data.code == 1) {
                $.Showmsg("注册成功！即将返回到注册前的页面。");
                setTimeout(function () {
                    var uname = data['data']['username'];
                    $.Hidemsg();
                    Session.set('username', uname);//将用户名存入session
                    User.setNavUsername(uname);//将导航条中“登录”设置为用户名+退出
                    history.back();//跳转回登录前的页面，待优化
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

        //表单验证提交
        $("#register_form").Validform({
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
                    url: 'user/api/register',
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
        //console.log('Inside User.login() ======');
        var pswStr = $("#psw").val(),
            pswSha1Str = $.sha1(pswStr),
            formInfoList = [],
            user = {},
            requestObj = {};
        var successCallback = function (data) {
            console.log(data);
            if (data.code == 1) {
                $.Showmsg("登录成功！即将返回到登录前的页面。");
                setTimeout(function () {
                    var uname = data['data']['username'];
                    $.Hidemsg();
                    Session.set('username', uname);//将用户名存入session
                    User.setNavUsername(uname);//将导航条中“登录”设置为用户名+退出
                    history.back();//跳转回登录前的页面，待优化
                }, 2000);
            } else {
                $.Showmsg("操作失败，请稍后再试！");
                setTimeout(function () {
                    $.Hidemsg();
                }, 2000);
            }
        };
        var errorCallback = function () {
            console.log("ajax error!");
        };
        //表单验证和提交
        $("#login_form").Validform({
            tiptype: 3,
            label: '.label',
            showAllError: true,
            beforeSubmit: function (curform) {
                //在验证成功后，表单提交前执行的函数，curform参数是当前表单对象。
//                $('input[type="password"]').val(pswSha1Str);
                formInfoList = curform.serializeArray();
                for (var i = 0; i < formInfoList.length; i++) {
                    var item = formInfoList[i];
                    if (item.name == 'password') {
                        user[item.name] = pswSha1Str;
                    } else {
                        user[item.name] = item.value;
                    }
                }
                requestObj = {
                    url: 'user/api/login',
                    success: successCallback,
                    data: user,
                    error: errorCallback
                };
                ajaxLoadData(requestObj);
                return false;//return false的话，表单不再提交
            }
        });
    },
    pwdRetrieve: function () {
        //console.log('Inside User.pwdRetrieve() ======');
        var requestObj = {};
        var REQUEST_URL = 'http://10.10.2.174:8080/wum/login/forgetpwd.json';
        var successCallback = function (data) {
            console.log(data);
            if (data.code == 1) {
                $.Showmsg("邮件发送成功，即将转到登录页面！");
                setTimeout(function () {
                    $.Hidemsg();
                    window.location.href = 'login';
                }, 3000);
            } else {
                console.log("code != 1");
                errorCallback();
            }
        };
        var errorCallback = function () {
            $.Showmsg("操作失败，请稍后再试！");
            setTimeout(function () {
                $.Hidemsg();
            }, 3000);
        };
        //表单验证提交
        $("#user_pwd_retrieve").Validform({
            tiptype: 3,
            label: '.label',
            showAllError: true,
            postonce: true,//表单提交成功后不能二次提交
            beforeSubmit: function (curform) {
                //在验证成功后，表单提交前执行的函数，curform参数是当前表单对象。
                requestObj = {
                    url: REQUEST_URL + '?email=' + $('#pwdRe_email').val(),
                    success: successCallback,
                    error: errorCallback
                };
                LoadData.get(requestObj);
                return false;//return false的话，表单不再提交
            }
        });
    },
    init: function () {
        var username = Session.get('username');
        if (username && username != '' && username != 'undefined') {
            this.setNavUsername(username);
        }
        $('.wraper a').on('click', function (e) {
            e.preventDefault();
            var hrefList = $(this).attr('href').split('/'), length = hrefList.length;
            if (length >= 2) {
                var section = hrefList[0].replace('#', '');
                var slide = hrefList[1];
                $.fn.fullpage.silentMoveTo(section, slide);
            }
        });
        this.register();
        this.login();
        this.pwdRetrieve();
    }
};