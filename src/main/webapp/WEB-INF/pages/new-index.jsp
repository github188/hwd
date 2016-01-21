<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    pageContext.setAttribute("basePath", basePath);// 将 "项目路径basePath" 放入pageContext中，待以后用EL表达式读出。
%>
<base href="<%=basePath%>">
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="keyword" content="cyberspace,device,fingerprint,security,search engine,scan,web">
    <meta name="description" content="本页面的描述">
    <meta name="revised" content="lyp, 2015/11/24/"/>
    <title>Hooray World Device</title>
    <link rel="stylesheet" href="resources/css/bootstrap.min.css">
    <link rel="stylesheet" href="resources/css/new-base.css">
    <link rel="stylesheet" href="resources/css/sidebar.css">
    <link rel="stylesheet" href="resources/css/list.css">
    <link rel="stylesheet" href="resources/css/map.css">
    <link rel="stylesheet" href="resources/css/leaflet.css">
    <link rel="stylesheet" href="resources/css/footer.css">

    <script src="resources/js/lib/jquery-1.11.3.min.js"></script>
    <script src="resources/js/lib/typeahead.bundle.min.js"></script>
    <script src="resources/js/lib/bootstrap.min.js"></script>
    <script> var basePath = '${basePath}';</script>


</head>
<body>
<header class="navbar-fixed-top">
    <div class="wrapper">
        <h2 class="logo-container">
            <a href="#" target="_self" class="logo">HWD</a>
        </h2>

        <form class="navbar-form global-search-form" method="get" action="<%=basePath%>api/search">
            <fieldset>
                <div class="search-scope">备用</div>
                <div class="search-box-container">
                    <input class="global-search-input typeahead" type="text" placeholder="Search Here">
                </div>
                <button type="submit" class="global-search-button" role="button"><span
                        class="glyphicon glyphicon-search"></span>
                </button>
            </fieldset>
            <div class="advs-link-wrapper"><a href="#" class="advs-link">精确搜索</a></div>
        </form>
    </div>
</header>
<div id="main">
    <%@include file="advs.jsp" %>
    <%@include file="sidebar.jsp" %>
    <div id="content" class="carousel slide full-height">
        <div class="carousel-inner full_height" role="listboxt">
            <section class="home item" tag="home" tabindex="1">
                <canvas id="galaxy"></canvas>
            </section>
            <section class="list-wrapper item" tag="list" tabindex="2">
                <%@include file="list.jsp" %>
            </section>
            <section class="map-wrapper item active" tag="map" tabindex="3">
                <%@include file="map.jsp" %>
            </section>
            <section class="globe-point-wrapper item" tag="globe-point" tabindex="4">point</section>
            <section class="globe-line-wrapper item" tag="globe-line" tabindex="5">line</section>
            <section class="charts-wrapper item" tag="charts" tabindex="6">charts</section>
        </div>
    </div>
    <div class="processing-overlay"></div>
</div>
<footer class="navbar-fixed-bottom" style="display: none;">
    <div id="navbar">
        <div class="dash"></div>
        <div class="carousel-progress"></div>
        <div id="navbtns" class="container">
            <div class="navbtn"><a href="">
                <div data-target="home" class="bgd-light-blue">首页</div>
            </a></div>
            <div class="navbtn"><a href="">
                <div data-target="list">搜索</div>
            </a></div>
            <div class="navbtn"><a href="">
                <div data-target="map">定位</div>
            </a></div>
            <div class="navbtn"><a href="">
                <div data-target="globe-point">展示</div>
            </a></div>
            <div class="navbtn"><a href="">
                <div data-target="globe-line">探测</div>
            </a></div>
            <div class="navbtn"><a href="">
                <div data-target="charts">分析</div>
            </a></div>
        </div>
    </div>
</footer>
<script src="resources/js/new-main.js"></script>
<script src="resources/js/new-search.js"></script>
<script src="resources/js/index.js"></script>
<script src="resources/js/sidebar.js"></script>
</body>
</html>