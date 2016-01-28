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
<div>
    <div class="mapHolder" id="mapHolder"></div>
    <div id="legend-wrapper">
        <div id="legend"></div>
    </div>

    <%--<div id="homeButton"></div>--%>
    <div class="btn-group" role="group" id="tool-wrapper">
        <div class="btn-group" role="group">

            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
                    aria-expanded="false">
                <span class="glyphicon glyphicon-eye-open"></span>
                分布图
                <span class="caret"></span>
            </button>
            <ul class="dropdown-menu">
                <li><a href="#" id="countryLayer">按国家</a></li>
                <li><a href="#" id="provinceLayer">按省份</a></li>
                <li><a href="#" id="cityLayer">按城市</a></li>
            </ul>
        </div>
        <button type="button" class="btn btn-default" id="sidebarCtrl">


            数据列表
        </button>
    </div>

    <div id="mapSidebar">
        <div class="tool-bar">
            <a class="map-sidebar-link advs-link-main" href="#" role="button" aria-controls="mapSidebar">
                <span class="glyphicon glyphicon-menu-right"></span>

            </a>
        </div>
        <div class="clearfix"></div>
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

