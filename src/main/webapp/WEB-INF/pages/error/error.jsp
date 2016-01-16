<%--
  Created by IntelliJ IDEA.
  User: lyp
  Date: 2015-12-03
  Time: 10:24
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%
    Exception e = (Exception) request.getAttribute("ex");
    System.out.println(e);
%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>出错啦</title>
    <spring:url value="/resources/css/bootstrap.min.css" var="bsCss"/>
    <link rel="stylesheet" href="${bsCss}">
    <spring:url value="/resources/css/base.css" var="baseCss"/>
    <link rel="stylesheet" href="${baseCss}">
    <style rel="stylesheet" type="text/css">
        .title {
            padding-top: 9rem;
            text-align: center;
            color: #6db33f;;
        }

        .content {
            text-align: center;
        }

        a {
            color: #6db33f;
        }
    </style>
</head>
<body>
<%@include file="../header.jsp" %>
<h2 class="title">服务器开小差啦</h2>

<div class="content">
    <h4>
        查询的内容走丢啦，您可以尝试<a href="<%=basePath%>/"> 返回首页</a>
    </h4>
</div>
<%@include file="../footer.jsp" %>
</body>
</html>
