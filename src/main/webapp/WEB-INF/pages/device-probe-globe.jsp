<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title></title>
    <spring:url value="/resources/css/bootstrap.min.css" var="bsCss"/>
    <link href="${bsCss}" rel="stylesheet">
    <spring:url value="/resources/css/base.css" var="baseCss"/>
    <link rel="stylesheet" href="${baseCss}">
    <spring:url value="/resources/css/device-probe-globe.css" var="probeCss"/>
    <link rel="stylesheet" href="${probeCss}">
</head>
<body>
<%@include file="header.jsp" %>
<div id="main">
    <div id="globe4LineHolder"></div>
</div>
<%@include file="footer.jsp" %>
<spring:url value="resources/plugins/echarts-2.2.7/build/dist/echarts.js" var="echarts"/>
<script src="${echarts}"></script>
<spring:url value="resources/plugins/echarts-x/build/dist/echarts-x.js" var="echartsX"/>
<script src="${echartsX}"></script>
<spring:url value="/resources/js/device-probe-globe.js" var="probeJs"/>
<script src="${probeJs}"></script>
</body>
</html>