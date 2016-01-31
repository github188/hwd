<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%--arcgis api for javascript--%>
<link rel="stylesheet" type="text/css"
      href="http://localhost:8080/arcgis_js_api/library/3.15/3.15/dijit/themes/tundra/tundra.css">
<link rel="stylesheet" type="text/css"
      href="http://localhost:8080/arcgis_js_api/library/3.15/3.15/esri/css/esri.css"/>
<script type="text/javascript">
    var djConfig = {parseOnLoad: true}
</script>
<script type="text/javascript" src="http://localhost:8080/arcgis_js_api/library/3.15/3.15/init.js"></script>
<div class="map-wrapper-inner">
    <div class="mapHolder" id="mapHolder"></div>
    <div id="legend-wrapper">
        <div id="legend"></div>
    </div>

    <%--<div id="homeButton"></div>--%>
    <div class="btn-group" role="group" id="tool-wrapper">
        <button type="button" class="btn btn-default open" id="sidebarCtrl">
            <span class="glyphicon glyphicon-triangle-left"></span>
            隐藏侧栏
        </button>
        <div class="btn-group" role="group">
            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
                    aria-expanded="false">
                分布图
                <span class="caret"></span>
            </button>
            <ul class="dropdown-menu">
                <li class="map-layer"><a href="#" id="country" class="">按国家 <span
                        class="glyphicon"></span></a>
                </li>
                <li class="map-layer"><a href="#" id="province" class="">按省份 <span
                        class="glyphicon"></span></a>
                </li>
                <li class="map-layer"><a href="#" id="city" class="">按城市 <span
                        class="glyphicon"></span></a>
                </li>
            </ul>
        </div>
        <button type="button" class="btn btn-default" id="mapSidebarCtrl">显示数据
            <span class="glyphicon glyphicon-triangle-right"></span>
        </button>
    </div>
    <div id="featureInfo">
        地理位置：<strong class="f-country"></strong><br>
        目标数量：<strong class="f-count"></strong></div>
    <div id="mapSidebar" class="">
        <div class="tool-bar">
            <a class="map-sidebar-link advs-link-main" href="#" role="button" aria-controls="mapSidebar">
                <span class="glyphicon glyphicon-menu-right"></span>

            </a>
        </div>
        <div class="clearfix"></div>
        <div></div>
        <div class="content">
            <ul class="map-device-list">
            </ul>
        </div>
        <div class="pager-wrapper demo4 customBootstrap map">
            <%--<p id="demo4-text"></p>--%>
            <ul id="map_pager" class="pagination pagination4"></ul>
        </div>
    </div>

    <%--<button class="menu-button" id="open-button">Open Menu</button>--%>
</div>
<div class="clearfix"></div>
<%--<script src="resources/js/map.js"></script>--%>
<script src="resources/js/map-arcgis.js"></script>

