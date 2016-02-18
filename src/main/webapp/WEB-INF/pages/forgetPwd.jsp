<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>找回密码</title>
    <spring:url value="/resources/css/forgetPwd.css" var="forgetPwd"/>
    <link rel="stylesheet" href="${forgetPwd}">
</head>
<body>
<section class="sec-wholepage sec-forget">
    <header class="clearfix sec-hd">
        <h1>忘记密码了？我们帮您找回，别着急...</h1>
        <%--        <div class="extra">
                    <a href="login">返回登录页</a>
                </div>--%>
    </header>
    <div class="sec-bd">
        <%--        <ul class="flow">
                    <li class="first"><span>1. 选择找回方式</span></li>
                    <li><span class="current">2. 确认验证信息</span></li>
                    <li><span>3. 修改密码</span></li>
                    <li class="last"><span>4. 修改成功</span></li>
                </ul>--%>
        <form class="form form-v form-forget" action="http://10.10.2.174:8080/wum/login/forgetPwd/sendMail"
              method="post">
            <h2>请输入您注册时使用的E-mail地址，我们将给您发送密码重置邮件。</h2>

            <div class="clearfix required row">
                <div class="label"><label for="ipt-email">输入E-mail地址</label></div>
                <div class="enter">
                    <input id="ipt-email" class="text w8 required v-email" type="email" name="data[email]"/>
                </div>
                <%--                <div class="msg" title="请输入您注册时绑定的邮箱">
                                    <span class="icon">.</span>
                                </div>--%>
            </div>
            <div class="clearfix row row-submit">
                <div class="submit">
                    <span class="btnwrap btnpositive"><span class="inner"><button class="btn" type="submit">发送密码重置邮件
                    </button></span></span>
                </div>
            </div>
        </form>
        <div class="extra">
            <a href="login">返回登录页</a>
        </div>
    </div>
</section>

<%--<div class="container findpwd">
    <h1>找回密码</h1>

    <div class="content">
        <form id="findForm" action="http://10.10.2.174:8080/wum/login/forgetPwd/sendMail" method="post">
            <input type="text" name="email" placeholder="请输入您注册时所用的邮箱地址" datatype="e"
                   ajaxurl="http://10.10.2.174:8080/wum/regist/hasEmail"/>
            <button type="submit">提交</button>
        </form>
        &lt;%&ndash;<div class="info">${info!}</div>&ndash;%&gt;
    </div>
</div>--%>
<spring:url value="/resources/js/lib/jquery-1.11.3.min.js" var="jquery"/>
<script src="${jquery}"></script>
<spring:url value="/resources/js/lib/validform.min.js" var="validformJS"/>
<script src="${validformJS}"></script>
<script>
    //    $('#findForm').Validform({});
</script>
</body>
</html>