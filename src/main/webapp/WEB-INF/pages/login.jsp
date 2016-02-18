<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="keyword" content="cyberspace,device,fingerprint,security,search engine,scan,web">
    <meta name="description" content="本页面的描述">
    <meta name="revised" content="lyp, 2015/11/24/"/>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>用户登录/注册</title>
    <spring:url value="/resources/css/login.css" var="loginCss"/>
    <link rel="stylesheet" href="${loginCss}">
    <spring:url value="/resources/css/validform.css" var="validformCss"/>
    <link rel="stylesheet" href="${validformCss}">
</head>
<body>
<%--<%@ include file="header.jsp" %>--%>
<h1>用户登录/注册<sup>iie@ac</sup></h1>

<div class="container">
    <div class="header">
        <div class="switch" id="switch">
            <a class="switch_btn_focus" id="switchToReg" href="javascript:void(0);" tabindex="7">用户登录</a>
            <a class="switch_btn" id="switchToLogin" href="javascript:void(0);" tabindex="8">快速注册</a>

            <div class="switch-bottom" id="switch_bottom"></div>
        </div>
    </div>
    <!--登录-->
    <div class="login-wrapper">
        <div class="form-wrapper" id="loginInner">
            <form name="login" accept-charset="utf-8" id="login_form" class="login-form" onsubmit="return false;">
                <div class="uinArea" id="uinArea">
                    <label class="login-input-label" for="u">用户名</label>

                    <div class="login-input-wrapper" id="uArea">
                        <input type="text" id="u" name="nam"  datatype="*6-16"
                               errormsg="用户名至少6个字符,最多16个字符"/>
                    </div>
                </div>
                <div class="pwdArea" id="pwdArea">
                    <label class="login-input-label" for="password">密码</label>

                    <div class="login-input-wrapper" id="pArea">
                        <input type="password" id="password" name="psw"/>
                    </div>
                </div>
                <div>
                    <input type="submit" value="登 录" class="button_blue"/>
                    <a href="forgetPwd" class="zcxy">忘记密码？</a>
                </div>
            </form>
        </div>
    </div>
    <!--登录end-->

    <!--注册-->
    <div class="reg-wrapper">
        <div class="form-wrapper">
            <form name="reg" method="post" onsubmit="return false;" id="reg_form">
                <%--                <input type="hidden" name="to" value="reg"/>
                                <input type="hidden" name="did" value="0"/>--%>
                <ul class="reg-form-list" id="reg-ul">
                    <li>
                        <label for="userName" class="reg-input-label"><em>* </em>用户名</label>

                        <div class="reg-input-wrapper">
                            <input type="text" id="userName" class="reg-input-style" name="username"
                                   datatype="*6-16" ajaxurl="http://10.10.2.174:8080/wum/regist/uniqueNameCheck.json"/>
                        </div>
                    </li>
                    <li>
                        <label for="psw1" class="reg-input-label"><em>* </em>密码</label>

                        <div class="reg-input-wrapper">
                            <input type="password" id="psw1" name="upassword" maxlength="20" class="reg-input-style"
                                   datatype="*6-20"/>
                        </div>
                    </li>
                    <li>
                        <label for="repassword" class="reg-input-label"><em>* </em>确认密码</label>

                        <div class="reg-input-wrapper">
                            <input type="password" id="repassword" class="reg-input-style" datatype="*6-20"
                                   recheck="upassword" errormsg="您两次输入的密码不一致！"/>
                        </div>
                    </li>
                    <li>
                        <label for="email" class="reg-input-label"><em>* </em>邮箱</label>

                        <div class="reg-input-wrapper">
                            <input class="reg-input-style" id=email type="email" name="email" datatype="e"
                                   ajaxurl="http://10.10.2.174:8080/regist/uniqueEmailCheck.json"/>
                        </div>
                    </li>
                    <li>
                        <label for="name" class="reg-input-label">姓名</label>

                        <div class="reg-input-wrapper">
                            <input class="reg-input-style" id=name type="text" name="name" datatype="s2-5"
                                   ignore="ignore">
                        </div>
                    </li>
                    <li>
                        <label for="birthday" class="reg-input-label">生日</label>

                        <div class="reg-input-wrapper">
                            <input class="reg-input-style" id=birthday type="date" name="birthday"/>
                        </div>
                    </li>
                    <li>
                        <label for="region" class="reg-input-label">地区</label>

                        <div class="reg-input-wrapper">
                            <input class="reg-input-style" id=region type="text" name="region" datatype="s2-30"
                                   ignore="ignore"/>
                        </div>
                    </li>

                    <li>
                        <div class="inputArea">
                            <input type="hidden" id="type" name="level" value="5">
                            <input type="button" id="regSubmit" class="button_blue"
                                   value="同意协议并注册"/> <a href="agreement" class="zcxy" target="_blank">注册协议</a>
                        </div>
                        <div class="cl"></div>
                    </li>
                </ul>
            </form>
        </div>
    </div>
    <!--注册end-->
</div>
<%--<%@include file="footer.jsp" %>--%>
<spring:url value="/resources/js/lib/jquery-1.11.3.min.js" var="jquery"/>
<script src="${jquery}"></script>
<%--<spring:url value="/resources/js/lib/validform.min.js" var="validformJS"/>
<script src="${validformJS}"></script>--%>
<spring:url value="/resources/js/lib/Validform_v5.3.2_min.js" var="validformJS"/>
<script src="${validformJS}"></script>
<spring:url value="/resources/js/lib/jquery.sha1.js" var="sha1JS"/>
<script src="${sha1JS}"></script>
<spring:url value="/resources/js/login.js" var="loginJs"/>
<script src="${loginJs}"></script>
</body>
</html>