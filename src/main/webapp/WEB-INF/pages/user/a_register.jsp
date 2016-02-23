<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%--<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="utf-8"/>
    <title>新用户注册</title>
    <spring:url value="/resources/newCss/style.css" var="styleCss"/>
    <link rel="stylesheet" href="${styleCss}">
    <spring:url value="/resources/newCss/demo.css" var="demoCss"/>
    <link rel="stylesheet" href="${demoCss}">
    <style>
        .wraper {
            height: 100%;
        }

        .wraper > div:last-child {
            padding-left: .5rem;
            font-size: 120%;
            font-weight: bold;
        }

        .form li {
            padding-bottom: 20px;
        }

        .Validform_checktip {
            margin-left: 10px;
        }

        .form .label {
            display: inline-block;
            width: 70px;
        }

        .action {
            padding-left: 92px;
        }
    </style>
</head>

<body>
<%@ include file="../new-header.jsp" %>
<div class="main">--%>
    <div class="wraper">
        <%--<p class="tr"><a href="javascript:history.go(-1); " class="blue ml10 fz12">返回上一页&raquo;</a></p>--%>

        <h2 class="green">新用户注册</h2>

        <form class="form" action="<%=basePath%>user/api/register" onsubmit="return false;" id="register_form">
            <ul>
                <li>
                    <label class="label"><span class="need">*</span> 用户名：</label>
                    <input type="text" value="" name="username" class="inputxt"
                           ajaxurl="<%=basePath%>user/api/uniqueUserNameCheck"
                           datatype="s6-16"
                           nullmsg="请设置用户名！"
                           errormsg="用户名长度在6~16位之间！"/>
                    <span class="Validform_checktip">用户名长度在6~16位之间</span>
                </li>
                <li>
                    <label class="label"><span class="need">*</span> 密码：</label>
                    <input type="password" value="" name="password" class="inputxt" id="psw"
                           datatype="*6-16"
                           nullmsg="请设置密码！"
                           errormsg="密码长度在6~20位之间！"/>
                    <span class="Validform_checktip">密码长度在6~20位之间</span>
                </li>
                <li>
                    <label class="label"><span class="need">*</span> 确认密码：</label>
                    <input type="password" value="" name="password2" class="inputxt"
                           datatype="*"
                           recheck="password"
                           nullmsg="请再输入一次密码！"
                           errormsg="您两次输入的账号密码不一致！"/>
                    <span class="Validform_checktip">两次输入密码需一致</span>
                </li>
                <li>
                    <label class="label"><span class="need">*</span> 邮箱：</label>
                    <input type="text" value="" name="email" class="inputxt"
                           datatype="e"
                           nullmsg="请填写邮箱！"
                           ajaxurl="<%=basePath%>user/api/uniqueEmailCheck"/>
                    <span class="Validform_checktip">用于接收系统邮件和修改密码</span>
                </li>
                <li>
                    <label class="label"> 姓名：</label>
                    <input class="inputxt" type="text" name="name" datatype="s2-5" ignore="ignore">
                    <span class="Validform_checktip"></span>
                </li>
                <%--<li>
                    <label class="label"> 生日：</label>
                    <input class="inputxt" type="date" name="birthday" ignore="ignore"/>
                </li>--%>
                <li>
                    <label class="label"> 地区：</label>
                    <input class="inputxt" type="text" name="region" datatype="s2-30" ignore="ignore"/>
                </li>
            </ul>
            <div class="action">
                <input type="submit" value="同意协议并注册"/>
                <input type="reset" value="重 置"/>
                <a href="#se_user/sl_user_agreement" class="forward-link">注册协议</a>
            </div>
        </form>
        <div>
            已有账号?<a href="#se_user/sl_user_login" class="forward-link">登录</a>
        </div>
    </div>
<%--</div>--%>

<%--<%@ include file="../new-footer.jsp" %>--%>
<%--<spring:url value="/resources/js/lib/jquery-1.11.3.min.js" var="jQuery"/>
<script src="${jQuery}"></script>--%>
<%--<spring:url value="/resources/js/lib/Validform_v5.3.2_min.js" var="validform"/>
<script src="${validform}"></script>
<spring:url value="/resources/js/lib/jquery.sha1.js" var="sha1"/>
<script src="${sha1}"></script>--%>
<%--<spring:url value="/resources/js/lib/loading/jquery.showLoading.min.js" var="loading"/>
<script src="${loading}"></script>--%>
<%--
<script type="text/javascript">
    $(function () {
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
    })
</script>
</body>
</html>--%>
