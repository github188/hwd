<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "";
    pageContext.setAttribute("basePath", basePath);// 将 "项目路径basePath" 放入pageContext中，待以后用EL表达式读出。
    String basePathNoPort = request.getScheme() + "://" + request.getServerName();
%>
<base href="<%=basePath%>">
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="keyword" content="cyberspace,device,fingerprint,security,search engine,scan,web">
    <meta name="description" content="本页面的描述">
    <meta name="revised" content="lyp, 2015/11/24/"/>
    <meta name="renderer" content="webkit">
    <title>Hooray World Device</title>
    <link rel="stylesheet" href="resources/css/bootstrap.min.css">
    <link rel="stylesheet" href="resources/css/new-base.css">
    <link rel="stylesheet" href="resources/css/home.css">
    <link rel="stylesheet" href="resources/css/sidebar.css">
    <link rel="stylesheet" href="resources/css/list.css">
    <link rel="stylesheet" href="resources/css/map.css">
    <link rel="stylesheet" href="resources/css/footer.css">
    <link rel="stylesheet" href="resources/css/media.css">
    <%--<script src="http://leaverou.github.com/prefixfree/prefixfree.min.js"></script>--%>
    <script src="resources/js/lib/jquery-1.11.3.min.js"></script>
    <script src="resources/js/lib/typeahead.bundle.min.js"></script>
    <script src="resources/js/lib/bootstrap.min.js"></script>
    <script>
        var basePath = '${basePath}';
    </script>

    <script src="resources/js/lib/jquery-migrate-1.0.0.js"></script>
    <script src="resources/js/sessionStorage.js"></script>
    <script src="resources/js/lib/jquery.address-1.5.min.js"></script>
    <script src="resources/js/lib/deserialize.js"></script>
    <script src="resources/js/lib/loading/jquery.showLoading.min.js"></script>
    <script src="resources/js/history.js"></script>
    <script src="resources/js/new-main.js"></script>
    <style>
        .tbd {
            width: 100%;
            height: 100%;
            text-align: center;
            border: none;
        }
    </style>
</head>
<body>
<header class="navbar-fixed-top">
    <div class="wrapper">
        <h2 class="logo-container">
            <a href="#" target="_self" class="logo">HWD</a>
        </h2>

        <form class="navbar-form global-search-form" method="get" action="api/search">
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
        <div class="carousel-inner full_height" role="listbox">
            <section class="item home active" tag="home" tabindex="1">
                <%--<canvas id="galaxy"></canvas>--%>
                <div class="home-search">
                    <form class="form-inline home-search-form">
                        <%--onsubmit="Homepage.search(this)"--%>
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Search"
                                   autofocus="autofocus"
                                   id="home_search_input" name="home_search_input">
                            <button type="submit" class="btn btn-default" id="home_search_btn">搜索一下</button>
                            <div class="advs-link-wrapper">
                                <a href="#" class="advs-link" id="advanced-search">精确搜索</a>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
            <section class="list-wrapper item" tag="list" tabindex="2">
                <%@include file="list.jsp" %>
            </section>
            <section class="map-wrapper item" tag="map" tabindex="3">
                <%@include file="map.jsp" %>
            </section>
            <section class="globe-point-wrapper tbd item" tag="globe-point" tabindex="4">
                <iframe src="device-globe" class="tbd" id="point" name="point"></iframe>


                <%-- <div><p>原3D地球设备展示，暂未合并</p>

                     <p><a href="http://10.10.2.174:8080/device-globe">过去看看</a></p></div>--%>
                <%--<%@include file="globe-line.jsp" %>--%>
            </section>
            <section class="globe-line-wrapper tbd item" tag="globe-line" tabindex="5">
                <%--<div><p>原3D数据流，暂未合并</p>--%>
                <iframe src="device-probe-globe" class="tbd" id="line" name="line" ></iframe>

                <%--<p><a href="http://10.10.2.174:8080/device-probe-globe">过去看看</a></p></div>--%>
            </section>
            <section class="charts-wrapper item tbd" tag="charts" tabindex="6">
                <p>TBD & 待续 ...</p>
            </section>
        </div>
    </div>
    <div class="processing-overlay"></div>
</div>
<footer class="navbar-fixed-bottom">
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
                <div data-target="charts">TBD...</div>
            </a></div>
        </div>
    </div>
</footer>
<script src="resources/js/new-search.js"></script>
<script src="resources/js/sidebar.js"></script>
<script src="resources/js/homepage.js"></script>
<script src="resources/js/error.js"></script>
<%--<script src="resources/js/device-globe.js"></script>--%>
</body>
</html>