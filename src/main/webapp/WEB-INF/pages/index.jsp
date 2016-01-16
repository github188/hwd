<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="keyword" content="cyberspace,device,fingerprint,security,search engine,scan,web">
    <meta name="description" content="本页面的描述">
    <meta name="revised" content="lyp, 2015/11/24/"/>
    <title>首页</title>
    <spring:url value="/resources/css/bootstrap.min.css" var="bsCss"/>
    <link href="${bsCss}" rel="stylesheet">
    <spring:url value="/resources/css/base.css" var="baseCss"/>
    <link rel="stylesheet" href="${baseCss}">
    <spring:url value="/resources/css/index.css" var="indexCss"/>
    <link rel="stylesheet" href="${indexCss}">
</head>
<body>
<%@include file="header.jsp" %>
<div id="main">
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12">
                <img src="" class="logo-large">

                <div class="home-search">
                    <form action="<%=basePath%>api/getDevicesAndForwardViaForm/" method="post" role="search"
                          id="home_search_form">
                        <div class="input-group input-group-lg">
                            <input type="search" class="form-control" placeholder="Search" autofocus="autofocus"
                                   id="home_wd" name="home_wd">
                            <span class="input-group-btn" id="home_search_btn">
                                <button type="submit" class="btn btn-default">搜索一下
                                    <%--<i class="glyphicon glyphicon-search"></i>--%>
                                </button>
                            </span>
                        </div>
                        <div class="advanced-search-outer">
                            <div class="advanced-search-inner">
                                <a href="/vsearch/f?adv=true&amp;trk=federated_advs" class="advanced-search" id="advanced-search">Advanced
                                </a>
                            </div>
                        </div>
                        <%--<button type="submit" class="btn"><i class="glyphicon glyphicon-search"></i></button>--%>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<%@include file="footer.jsp" %>
</body>
</html>