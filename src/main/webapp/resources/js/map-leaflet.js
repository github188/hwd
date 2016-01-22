//http://leafletjs.com/examples/choropleth.html
//my access token=pk.eyJ1IjoieWFzZW1pbiIsImEiOiJjaWdya2NraXAwMXpkdjFrb3ZrYnA0Z3N3In0.-eebf1plZJVyYP9HdaU8bg
//my map id=yasemin.cigrkcj2t01zfusm1oqkqlzoc
var map, tiledLayer,
    baseURL = 'http://10.10.2.81:6080/arcgis/rest/services/yiyuanyx2/MapServer';
//http://10.10.2.81:6080/arcgis/rest/services/world/MapServer
//http://10.10.2.81:6080/arcgis/rest/services/area/MapServer
initMap();
function initMap() {
    map = L.map('mapHolder').setView([45.528, -122.680], 13);
    //L.esri.basemapLayer("Gray").addTo(map);
    tiledLayer = L.esri.tiledMapLayer({
        url: baseURL
    }).addTo(map);

    /*    map = L.map('mapHolder').setView([51.505, -0.09], 13);
     L.tileLayer('http://10.10.2.81:6080/arcgis/rest/services/area/MapServer', {
     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
     maxZoom: 18,
     id: 'yasemin.cigrkcj2t01zfusm1oqkqlzoc',
     accessToken: 'pk.eyJ1IjoieWFzZW1pbiIsImEiOiJjaWdya2NraXAwMXpkdjFrb3ZrYnA0Z3N3In0.-eebf1plZJVyYP9HdaU8bg'
     }).addTo(map);*/

    map.on('click', onMapClick);

//functions

    function onMapClick(e) {
        var popup = L.popup();
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(map);
    }

    //returns a color based on population d(argument)
    function getColor(d) {
        return d > 1000 ? '#800026' :
            d > 500 ? '#BD0026' :
                d > 200 ? '#E31A1C' :
                    d > 100 ? '#FC4E2A' :
                        d > 50 ? '#FD8D3C' :
                            d > 20 ? '#FEB24C' :
                                d > 10 ? '#FED976' :
                                    '#FFEDA0';
    }

    //styling function
    function style(feature) {
        return {
            fillColor: getColor(feature.properties.density),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    }

    //event listener for mouseover event:
    function highlightFeature(e) {
        var layer = e.target;

        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });

        if (!L.Browser.ie && !L.Browser.opera) {
            layer.bringToFront();
        }
    }

    //event listener for mouseout event
    function resetHighlight(e) {
        geojson.resetStyle(e.target);
    }

    //click listener that zooms to the feature
    function zoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
    }

    // add the listeners on our feature layers:

    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
        });
    }
}

/*
 * ajax查询请求
 * @param：obj为一个对象，key为url、criteria、success、error、searchButton、searchInput
 *          url：ajax请求地址(required)
 *          criteria：查询条件
 *          success：ajax成功的回调函数(required)
 *          error：ajax失败的回调函数
 *          noDataFunc:ajax成功，但返回数据为空的回调函数
 *          searchButton：搜索框提交按钮
 *          searchInput：搜索框输入按钮
 */
//function mapSearch() {
//
//}

/*
 *
 * //设置查询条件searchCriteria
 function getSearchCriteria(wd) {
 var criteria = {};
 criteria["geo"] = getVisibleExtent();             //获取并设置屏幕所在范围的经纬度geo
 if (wd) {
 criteria["wd"] = wd;
 } else {
 criteria["wd"] = $('#mapSearchInput').val();
 }
 criteria["zoomlevel"] = map.getZoom();            //设置缩放级别zoomlevel
 criteria["lossycompress"] = LOSSY_COMPRESS;    //设置压缩级别lossycompress
 return criteria;
 }
 * */