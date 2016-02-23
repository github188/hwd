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
<div class="wraper">
    <p class="tr"><a href="#se_user/sl_user_login" class="blue ml10 fz12 to-login">返回登录页&raquo;</a></p>

    <h2 class="green">忘记密码了？别着急，我们帮您找回 ......</h2>

    <div class="tipmsg">
        <p>请输入您注册时使用的E-mail地址，我们将给您发送密码重置邮件。</p>
    </div>
    <form class="form" action="<%=requestURL%>" id="user_pwd_retrieve">
        <ul>
            <li>
                <label class="label" for="pwdRe_email"><span class="need">*</span> E-mail：</label>
                <input type="text" id="pwdRe_email" value="" name="pwdRe_email" class="inputxt"
                <%--autofocus="autofocus"--%>
                       datatype="e"
                       nullmsg="请输入您注册的邮箱"/>
            </li>
        </ul>
        <div class="action">
            <input type="submit" value="发送密码重置邮件"/>
            <a href="#se_user/sl_user_login" class="forward-link to-login">返回登录页</a>
        </div>
    </form>
</div>
<%--<spring:url value="/resources/js/lib/jquery-1.11.3.min.js" var="jQuery"/>
<script src="${jQuery}"></script>
<spring:url value="/resources/js/lib/loading/jquery.showLoading.min.js" var="loading"/>
<script src="${loading}"></script>
<spring:url value="/resources/js/ajax.js" var="ajax"/>
<script src="${ajax}"></script>
<spring:url value="/resources/js/lib/Validform_v5.3.2_min.js" var="validform"/>
<script src="${validform}"></script>--%>

<%--</body>
</html>--%>

