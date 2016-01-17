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
    <script src="resources/js/lib/jquery-1.11.3.min.js"></script>
    <script src="resources/js/lib/typeahead.bundle.min.js"></script>
</head>
<body>
<div id="header" class="navbar-fixed-top">
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
</div>
<div id="main">
    <div class="advs-wrapper">
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
                        <input type="text" class="col-sm-8" id="must">
                        <span class="col-sm-2">多个字词用空格分隔</span>
                    </div>
                    <div class="row form-group">
                        <label class="col-sm-2" for="should">包含以下任意字词：</label>
                        <input type="text" class="col-sm-8" id="should">
                        <span class="col-sm-2">多个字词用空格分隔</span>
                    </div>
                    <div class="row form-group">
                        <label class="col-sm-2" for="not">不包含以下任意字词：</label>
                        <input type="text" class="col-sm-8" id="not">
                        <span class="col-sm-2">多个字词用空格分隔</span>
                    </div>
                </fieldset>
                <fieldset class="extra">
                    <legend>并用以下条件缩小搜索范围</legend>
                    <div class="row form-group">
                        <label class="col-sm-2">IP（段）：</label>

                        <div class="col-sm-8">
                            <div class="row">
                                <label class="col-sm-1" for="ip">单IP</label>
                                <input type="text" id="ip" class="col-sm-3">
                                <label class="col-sm-1" for="ip_from">/ 从</label>
                                <input type="text" id="ip_from" class="col-sm-3">
                                <label class="col-sm-1" for="ip_to">到</label>
                                <input type="text" id="ip_to" class="col-sm-3">
                            </div>
                        </div>
                    </div>
                    <div class="row form-group">
                        <label class="col-sm-2">地理位置：</label>

                        <div class="col-sm-8">
                            <div class="row">
                                <label class="col-sm-1" for="country">国家</label>
                                <input type="text" id="country" class="col-sm-3" placeholder="中国 印度 巴西">
                                <label class="col-sm-1" for="province">省份</label>
                                <input type="text" id="province" class="col-sm-3" placeholder="北京 南京">
                                <label class="col-sm-1" for="city">城市</label>
                                <input type="text" id="city" class="col-sm-3" placeholder="北京 连云港">
                            </div>
                        </div>
                    </div>
                    <div class="row form-group">
                        <label class="col-sm-2">设备属性：</label>

                        <div class="col-sm-8">
                            <div class="row">
                                <label class="col-sm-1" for="type">类型</label>
                                <input type="text" id="type" class="col-sm-3">
                                <label class="col-sm-1" for="brand">品牌</label>
                                <input type="text" id="brand" class="col-sm-3">
                                <label class="col-sm-1" for="model">型号</label>
                                <input type="text" id="model" class="col-sm-3">
                            </div>
                        </div>
                    </div>
                    <div class="row form-group">
                        <label class="col-sm-2">服务：</label>

                        <div class="col-sm-8">
                            <div class="row">
                                <label class="col-sm-1" for="protocol">协议</label>
                                <input type="text" id="protocol" class="col-sm-3" placeholder="http ftp">
                                <label class="col-sm-1" for="port">端口</label>
                                <input type="text" id="port" class="col-sm-3" placeholder="80 21">
                                <label class="col-sm-1" for="banner">标语</label>
                                <input type="text" id="banner" class="col-sm-3">
                            </div>
                        </div>
                    </div>
                    <div class="row form-group">
                        <label class="col-sm-2">已知漏洞：</label>

                        <div class="col-sm-8">
                            <div class="row">
                                <label class="col-sm-1" for="vul_id">ID</label>
                                <input type="text" id="vul_id" class="col-sm-3">
                                <label class="col-sm-1" for="vul_type">类型</label>
                                <input type="text" id="vul_type" class="col-sm-3">
                                <label class="col-sm-1" for="vul_name">名称</label>
                                <input type="text" id="vul_name" class="col-sm-3">
                            </div>
                        </div>
                    </div>
                    <div class="row form-group">
                        <label class="col-sm-2" for="os">操作系统：</label>
                        <input type="text" class="col-sm-8" id="os">
                    </div>
                    <div class="row form-group">
                        <label class="col-sm-2">最后更新日期：</label>

                        <div class="col-sm-8">
                            <div class="row">
                                <label class="col-sm-1" for="time_from">从</label>
                                <input type="datetime-local" id="time_from" class="col-sm-5">
                                <label class="col-sm-1" for="time_to">到</label>
                                <input type="datetime-local" id="time_to" class="col-sm-5">
                            </div>
                        </div>
                    </div>
                </fieldset>
                <div class="form-controls">
                    <input type="submit" value="搜索" name="submit" class="submit-advs">
                    <input type="reset" class="reset-advs text-button" value="重置">
                </div>
            </form>
        </div>
    </div>
    <section class="list-wrapper"></section>
    <section class="map-wrapper"></section>
    <section class="globe-wrapper"></section>
    <section class="globe-line-wrapper"></section>
    <section class="chart-wrapper"></section>
    <div class="processing-overlay"></div>
</div>
<div id="footer"></div>
<script src="resources/js/new-search.js"></script>
<script src="resources/js/new-index.js"></script>
</body>
</html>