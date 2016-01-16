<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>设备搜索Map</title>
    <spring:url value="/resources/css/bootstrap.min.css" var="bsCss"/>
    <link href="${bsCss}" rel="stylesheet">
    <spring:url value="/resources/css/base.css" var="baseCss"/>
    <link rel="stylesheet" href="${baseCss}">
    <spring:url value="/resources/css/fast-fonts.css" var="fonts"/>
    <link rel="stylesheet" href="${fonts}">
    <spring:url value="/resources/css/device-map.css" var="mapCss"/>
    <link rel="stylesheet" href="${mapCss}">
    <%--arcgis api for javascript--%>
    <link rel="stylesheet" type="text/css"
          href="http://localhost:8080/arcgis_js_api/library/3.15/3.15/dijit/themes/tundra/tundra.css">
    <link rel="stylesheet" type="text/css"
          href="http://localhost:8080/arcgis_js_api/library/3.15/3.15/esri/css/esri.css"/>
    <script type="text/javascript">
        var djConfig = {parseOnLoad: true}
    </script>
    <script type="text/javascript" src="http://localhost:8080/arcgis_js_api/library/3.15/3.15/init.js"></script>
    <%--<script type="text/javascript">
        dojo.require("dijit.layout.AccordionContainer");
        dojo.require("dijit.layout.BorderContainer");
        dojo.require("dijit.layout.ContentPane");
        dojo.require("dijit.form.Button");
    </script>--%>
</head>
<body class="tundra">
<%@include file="header.jsp" %>
<div id="mapDiv"></div>
<div id="homeButton"></div>
<div id="search">
    <form id="mapSearchForm">
        <div class="form-group">
            <div class="input-group">
                <input type="text" class="form-control" placeholder="搜索设备" id="mapSearchInput" name="search_input">
                <span class="input-group-btn">
                    <button class="btn btn-default" type="submit" id="mapSearchButton">
                        <i class="glyphicon glyphicon-search"></i>
                    </button>
                </span>
            </div>
        </div>
    </form>
</div>

<!--SIDE BAR CONTAINER-->
<div id="sidebar">
    <div class="tool close">
        <%--<div class="glyphicon glyphicon-chevron-left xwcms"></div>--%>
    </div>
    <div class="clearfix"></div>
    <div class="content">

        <%--<h3>相关设备</h3>--%>
        <form>
            <input type="search" placeholder=" Search for ip" id="ipInput">
        </form>
        <div class="ipList well">
            <ul></ul>
        </div>
        <div class="detail well">
            <div class="row" id="ip">
                <div class="col-xs-5">设备IP：</div>
                <div class="col-xs-7"></div>
            </div>
            <div class="row" id="location">
                <div class="col-xs-5">地址：</div>
                <div class="col-xs-7"></div>
            </div>
            <div class="row" id="type">
                <div class="col-xs-5">设备类型：</div>
                <div class="col-xs-7"></div>
            </div>
            <div class="row" id="os">
                <div class="col-xs-5">操作系统：</div>
                <div class="col-xs-7"></div>
            </div>
            <div class="row" id="portsDetail">
                <div class="col-xs-5">开放的端口：</div>
                <div class="col-xs-7"></div>
            </div>
            <div class="row" id="vulsDetail">
                <div class="col-xs-5">已知漏洞：</div>
                <div class="col-xs-7"></div>
            </div>
        </div>
        <div><a href="javascript:void(0)" class="to-list">没有找到您要的信息？</a></div>
    </div>
</div>
<%--
<div class="menu-wrap">
    <nav class="menu">
        <div class="icon-list">
            <a href="#"><i class="fa fa-fw fa-star-o"></i><span>Favorites</span></a>
            <a href="#"><i class="fa fa-fw fa-bell-o"></i><span>Alerts</span></a>
            <a href="#"><i class="fa fa-fw fa-envelope-o"></i><span>Messages</span></a>
            <a href="#"><i class="fa fa-fw fa-comment-o"></i><span>Comments</span></a>
            <a href="#"><i class="fa fa-fw fa-bar-chart-o"></i><span>Analytics</span></a>
            <a href="#"><i class="fa fa-fw fa-newspaper-o"></i><span>Reading List</span></a>
        </div>
    </nav>
    <button class="close-button" id="close-button">Close Menu</button>
    <div class="morph-shape" id="morph-shape"
         data-morph-open="M-7.312,0H15c0,0,66,113.339,66,399.5C81,664.006,15,800,15,800H-7.312V0z;M-7.312,0H100c0,0,0,113.839,0,400c0,264.506,0,400,0,400H-7.312V0z">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 800"
             preserveAspectRatio="none">
            <path d="M-7.312,0H0c0,0,0,113.839,0,400c0,264.506,0,400,0,400h-7.312V0z"/>
        </svg>
    </div>
</div>
<button class="menu-button" id="open-button">Open Menu</button>--%>
<%@include file="footer.jsp" %>
<script type="text/javascript">
    var wd = '${wd}';
</script>
<spring:url value="/resources/js/device-map.js" var="mapJs"/>
<script src="${mapJs}"></script>
<%--<spring:url value="/resources/js/classie.js" var="classieJs"/>
<script src="${classieJs}"></script>
<spring:url value="/resources/js/sidebar.js" var="sidebarJs"/>
<script src="${sidebarJs}"></script>--%>
</body>
</html>