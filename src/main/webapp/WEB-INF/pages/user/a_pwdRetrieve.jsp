<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%--<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>--%>
<%
    String requestURL = "http://10.10.2.174:8080/wum/login/forgetpwd.json";
    pageContext.setAttribute("requestURL", requestURL);// 将 "requestURL" 放入pageContext中，待以后用EL表达式读出
%>
<%--<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="utf-8"/>
    <title>密码找回</title>
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

<body>--%>
<div class="main">
    <div class="wraper">
        <p class="tr"><a href="login " class="blue ml10 fz12">返回登录页&raquo;</a></p>

        <h2>忘记密码了？别着急，我们帮您找回 ......</h2>

        <div class="tipmsg">
            <p>请输入您注册时使用的E-mail地址，我们将给您发送密码重置邮件。</p>
        </div>
        <form class="form" action="<%=requestURL%>">
            <ul>
                <li>
                    <label class="label" for="email"><span class="need">*</span> E-mail：</label>
                    <input type="text" value="" name="email" class="inputxt" autofocus="autofocus" id="email"
                           datatype="e"
                           nullmsg="请输入您注册的邮箱"/>
                </li>
            </ul>
            <div class="action">
                <input type="submit" value="发送密码重置邮件"/>
                <a href="login" class="forward-link">返回登录页</a>
            </div>
        </form>
    </div>
</div>
<%--<spring:url value="/resources/js/lib/jquery-1.11.3.min.js" var="jQuery"/>
<script src="${jQuery}"></script>
<spring:url value="/resources/js/lib/loading/jquery.showLoading.min.js" var="loading"/>
<script src="${loading}"></script>
<spring:url value="/resources/js/ajax.js" var="ajax"/>
<script src="${ajax}"></script>
<spring:url value="/resources/js/lib/Validform_v5.3.2_min.js" var="validform"/>
<script src="${validform}"></script>--%>
<script type="text/javascript">
    $(function () {
        var requestObj = {};
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

        //导航处理
        $('.nav').find('a').removeClass('current');
        $('.user-nav').find('a').addClass('current');

        //表单验证提交
        $(".form").Validform({
            tiptype: 3,
            label: '.label',
            showAllError: true,
            postonce: true,//表单提交成功后不能二次提交
            beforeSubmit: function (curform) {
                //在验证成功后，表单提交前执行的函数，curform参数是当前表单对象。
                requestObj = {
                    url: '${requestURL}?email=' + $('#email').val(),
                    success: successCallback,
                    error: errorCallback
                };
                LoadData.get(requestObj);
                return false;//return false的话，表单不再提交
            }
        });
    })
</script>
<%--</body>
</html>--%>

