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
    <link rel="stylesheet" href="resources/css/list.css">
    <link rel="stylesheet" href="resources/css/sidebar.css">
    <link rel="stylesheet" href="resources/css/footer.css">
    <script src="resources/js/lib/jquery-1.11.3.min.js"></script>
    <script src="resources/js/lib/typeahead.bundle.min.js"></script>
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
                <button type="submit" class="search-button" role="button"><span
                        class="glyphicon glyphicon-search"></span>
                </button>
            </fieldset>
            <div class="advs-link-wrapper"><a href="#" class="advs-link">精确搜索</a></div>
        </form>
    </div>
</header>
<div id="main">
    <div class="advs-wrapper" id="advs-wrapper">
        <h3>精确搜索</h3>

        <div class="advs-controls">
            <input type="reset" class="text-button reset-advs" value="重置">
            <button class="text-button close-advs">关闭</button>
        </div>
        <div class="advs-form-container">
            <form action="" class=".form-horizontal" method="post" id="advs">
                <fieldset class="keywords">
                    <legend>使用以下条件来搜索</legend>
                    <div class="row form-group">
                        <label class="col-sm-2" for="must">包含以下全部字词：</label>
                        <input type="text" class="col-sm-8" id="must" name="must">
                        <span class="col-sm-2">多个字词用空格分隔</span>
                    </div>
                    <div class="row form-group">
                        <label class="col-sm-2" for="should">包含以下任意字词：</label>
                        <input type="text" class="col-sm-8" id="should" name="should">
                        <span class="col-sm-2">多个字词用空格分隔</span>
                    </div>
                    <div class="row form-group">
                        <label class="col-sm-2" for="mustnot">不包含以下任意字词：</label>
                        <input type="text" class="col-sm-8" id="mustnot" name="mustnot">
                        <span class="col-sm-2">多个字词用空格分隔</span>
                    </div>
                </fieldset>
                <fieldset class="extra">
                    <legend>并用以下条件缩小搜索范围</legend>
                    <div class="row form-group">
                        <label for="ip">IP（段）</label>

                        <div class="col-lg-offset-1 col-sm-11">
                            <div class="row">
                                <input type="text" id="ip" class="col-sm-offset-1 col-sm-11" name="ip"
                                       placeholder="多个IP之间用空格分隔，IP段使用“-”连接。如，1.1.1.1  1.1.1.2-1.1.1.254">
                                <%--<label class="col-sm-1" for="ip">单IP</label>
                                <input type="text" id="ip" class="col-sm-3" name="ip" value="1.2.3.4">
                                <label class="col-sm-1" for="ip_from"><span class="pull-left">|</span> 从</label>
                                <input type="text" id="ip_from" class="col-sm-3" name="ip_from" value="1.1.1.1">
                                <label class="col-sm-1" for="ip_to">到</label>
                                <input type="text" id="ip_to" class="col-sm-3" name="ip_to" value="1.1.1.254">--%>
                            </div>
                        </div>
                    </div>
                    <div class="row form-group">
                        <label>地理位置</label>

                        <div class="col-lg-offset-1 col-sm-11">
                            <div class="row">
                                <label class="col-sm-1" for="country">国家</label>
                                <input type="text" id="country" name="country" class="col-sm-3"
                                       placeholder="中国  印度  巴西">
                                <label class="col-sm-1" for="province">省份</label>
                                <input type="text" id="province" name="province" class="col-sm-3" placeholder="北京  江苏">
                                <label class="col-sm-1" for="city">城市</label>
                                <input type="text" id="city" name="city" class="col-sm-3" placeholder="北京  南京">
                            </div>
                        </div>
                    </div>
                    <div class="row form-group">
                        <label>设备属性</label>

                        <div class="col-lg-offset-1 col-sm-11">
                            <div class="row">
                                <label class="col-sm-1" for="type">类型</label>
                                <input type="text" id="type" class="col-sm-3" name="type" placeholder="Webcam">
                                <label class="col-sm-1" for="brand">品牌</label>
                                <input type="text" id="brand" class="col-sm-3" name="brand" placeholder="Hikvision">
                                <label class="col-sm-1" for="model">型号</label>
                                <input type="text" id="model" class="col-sm-3" name="model" placeholder="DE34">
                            </div>
                        </div>
                    </div>
                    <div class="row form-group">
                        <label>服务</label>

                        <div class="col-lg-offset-1 col-sm-11">
                            <div class="row">
                                <label class="col-sm-1" for="protocol">协议</label>
                                <input type="text" id="protocol" name="protocol" class="col-sm-3"
                                       placeholder="http  ftp">
                                <label class="col-sm-1" for="port">端口</label>
                                <input type="text" id="port" class="col-sm-3" name="port" placeholder="80  21">
                                <label class="col-sm-1" for="banner">banner</label>
                                <input type="text" id="banner" class="col-sm-3" name="banner">
                            </div>
                        </div>
                    </div>
                    <div class="row form-group">
                        <label>已知漏洞</label>

                        <div class="col-lg-offset-1 col-sm-11">
                            <div class="row">
                                <label class="col-sm-1" for="vulId">ID</label>
                                <input type="text" id="vulId" class="col-sm-3" name="vulId" placeholder="CVE-2009_5149">
                                <label class="col-sm-1" for="vulType">类型</label>
                                <input type="text" id="vulType" class="col-sm-3" name="vulType"
                                       placeholder="weak_password">
                                <label class="col-sm-1" for="vulName">名称</label>
                                <input type="text" id="vulName" class="col-sm-3" name="vulName" placeholder="dots_POC">
                            </div>
                        </div>
                    </div>
                    <div class="row form-group">
                        <label for="os">操作系统</label>

                        <div class="col-lg-offset-1 col-sm-11">
                            <div class="row">
                                <input type="text" id="os" class="col-sm-offset-1 col-sm-11" name="os"
                                       placeholder="多个操作系统之间用空格分隔。如，Linux  Unix">

                            </div>
                        </div>
                    </div>
                    <div class="row form-group">
                        <label for="taskId">任务ID</label>

                        <div class="col-lg-offset-1 col-sm-11">
                            <div class="row">
                                <input type="text" id="taskId" class="col-sm-offset-1 col-sm-11" name="taskId"
                                       placeholder="DS001">

                            </div>
                        </div>
                        <span class="right-tip">(仅内部开放)</span>
                    </div>
                    <div class="row form-group">
                        <label for="vpsIp">IP（段）</label>

                        <div class="col-lg-offset-1 col-sm-11">
                            <div class="row">
                                <input type="text" id="vpsIp" class="col-sm-offset-1 col-sm-11" name="vpsIp"
                                       placeholder="多个IP之间用空格分隔，IP段使用-连接。如，1.1.1.1  1.1.1.2-1.1.1.254">
                            </div>
                        </div>
                        <span class="right-tip">(仅内部开放)</span>
                    </div>
                    <div class="row form-group">
                        <label>更新日期</label>

                        <div class="col-lg-offset-1 col-sm-11">
                            <div class="row">
                                <label class="col-sm-1" for="time_from">从</label>
                                <input type="date" id="time_from" name="time_from" class="col-sm-5">
                                <label class="col-sm-1" for="time_to">到</label>
                                <input type="date" id="time_to" name="time_to" class="col-sm-5">
                            </div>
                        </div>
                        <span class="right-tip">默认为当前日期之前</span>
                    </div>
                </fieldset>
                <div class="form-controls">
                    <input type="submit" value="搜索" name="submit" class="submit-advs">
                    <input type="reset" class="reset-advs text-button" value="重置">
                </div>
            </form>
        </div>
    </div>
    <%@include file="sidebar.jsp" %>
    <div id="content" class="carousel slide full-height">
        <div class="carousel-inner full_height" role="listboxt">
            <section class="home item" tag="home" tabindex="1">
                <canvas id="galaxy"></canvas>
            </section>
            <section class="list-wrapper item active" tag="list" tabindex="2">
                <%@include file="list.jsp" %>
            </section>
            <section class="map-wrapper item" tag="map" tabindex="3">map</section>
            <section class="globe-point-wrapper item" tag="globe-point" tabindex="4">point</section>
            <section class="globe-line-wrapper item" tag="globe-line" tabindex="5">line</section>
            <section class="charts-wrapper item" tag="charts" tabindex="6">charts</section>
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
                <div data-target="charts">分析</div>
            </a></div>
        </div>
    </div>
</footer>

<script src="resources/js/lib/bootstrap.min.js"></script>
<script src="resources/js/new-search.js"></script>
<script src="resources/js/new-main.js"></script>
<script src="resources/js/index.js"></script>
<script src="resources/js/sidebar.js"></script>
<script>

</script>
</body>
</html>