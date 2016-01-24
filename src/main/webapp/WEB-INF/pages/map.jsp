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
    <%--<div id="homeButton"></div>--%>
    <div id="info">
        <div id="legend"></div>
    </div>
    <div id="mapSidebar">
        <div class="tool-bar"></div>
        <div class="clearfix"></div>
        <div class="content">
            <ul></ul>
        </div>
    </div>
    <%--<div class="menu-wrap">
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
    </div>--%>

    <button class="menu-button" id="open-button">Open Menu</button>
</div>
<div class="clearfix"></div>
<script src="resources/js/map-arcgis.js"></script>

