<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="keyword" content="cyberspace,device,fingerprint,security,search engine,scan,web">
    <meta name="description" content="本页面的描述">
    <meta name="revised" content="lyp, 2015/11/24/"/>
    <title>登录</title>
    <spring:url value="/resources/css/bootstrap.min.css" var="bsCss"/>
    <link href="${bsCss}" rel="stylesheet">
    <spring:url value="/resources/css/base.css" var="baseCss"/>
    <link rel="stylesheet" href="${baseCss}">
</head>
<body>
<%@ include file="header.jsp" %>
<div id="main">
    <div class="container-fluid" style="border: 1px green solid">
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12">
                登录页面
            </div>
        </div>
    </div>
</div>
<%@include file="footer.jsp" %>
</body>
</html>