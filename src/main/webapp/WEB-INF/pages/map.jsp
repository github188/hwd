<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%--arcgis api for javascript--%>
<link rel="stylesheet" type="text/css"
      href="http://10.10.12.116:8080/arcgis_js_api/library/3.15/3.15/dijit/themes/tundra/tundra.css">
<link rel="stylesheet" type="text/css"
      href="http://10.10.12.116:8080/arcgis_js_api/library/3.15/3.15/esri/css/esri.css"/>
<script type="text/javascript">
    var djConfig = {parseOnLoad: true}
</script>
<script type="text/javascript" src="http://10.10.12.116:8080/arcgis_js_api/library/3.15/3.15/init.js"></script>
<div class="tundra">
    <div class="mapHolder" id="mapHolder"></div>
    <div id="homeButton"></div>
    <div id="info">
        <div id="legendDiv"></div>
    </div>
</div>
<div class="clearfix"></div>
<script src="resources/js/map-arcgis.js"></script>

