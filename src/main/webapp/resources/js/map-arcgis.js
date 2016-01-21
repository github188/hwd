initMap();

/*---------------------------------------------分隔线-----------------------------------------------*/
//static global variables
var mapSearchURL = "api/getResponse4Map",
    baseURL = 'http://10.10.2.81:6080/arcgis/rest/services/China_Community_BaseMap/MapServer',
    countryURL = 'http://10.10.2.81:6080/arcgis/rest/services/world/MapServer/0',
    provinceURL = 'http://10.10.2.81:6080/arcgis/rest/services/area/MapServer/2',
    cityURL = 'http://10.10.2.81:6080/arcgis/rest/services/area/MapServer/1';

var map, featureGL, deviceGL, featureInfoTemplate, countryFS = {}, provinceFS = {}, cityFS = {};
function initMap() {
    $('.sidebar').hide();//临时隐藏侧边栏，开发时使用的
    require(
        [
            "esri/map",
            "esri/graphic",
            "esri/dijit/HomeButton",
            "esri/layers/ArcGISTiledMapServiceLayer",
            "esri/SpatialReference",

            //feature layer related↓
            "esri/tasks/query",
            "esri/tasks/QueryTask",
            "esri/tasks/FeatureSet",
            "esri/layers/FeatureLayer",

            "esri/layers/GraphicsLayer",
            "esri/symbols/SimpleFillSymbol",
            "esri/symbols/SimpleLineSymbol",
            "esri/renderers/SimpleRenderer",

            "esri/lang",
            "esri/Color",
            "dojo/number",
            "dojo/dom-style",
            "dijit/TooltipDialog",
            "dijit/popup",

            "dojo/domReady!"
        ],
        function (Map, Graphic, HomeButton, ArcGISTiledMapServiceLayer, SpatialReference,
                  Query, QueryTask, FeatureSet, FeatureLayer,
                  GraphicsLayer, SimpleFillSymbol, SimpleLineSymbol, SimpleRenderer,
                  esriLang, Color, number, domStyle, TooltipDialog, dijitPopup) {

            //（1）Create map and add layer
            map = new Map("mapHolder", {
                //basemap: 'gray',
                //center: [114.25, 24.1167],
                minZoom: 3,
                zoom: 3,
                sliderPosition: "top-right",
                logo: false
            });
            var dynamicLayer = new ArcGISTiledMapServiceLayer(baseURL);
            map.addLayer(dynamicLayer);

            //（2）Init Home button
            home = new HomeButton({
                map: map
            }, "homeButton").startup();

            //（3）Initialize FeatureSets,开一个web worker加载FeatureSet
            setFeatureSet('country');
            setFeatureSet('province');
            setFeatureSet('city');

            map.on("load", function () {
                console.log("on load");
                console.log(map.spatialReference);
                //（4）Initialize the FeatureLayer(areas) and GraphicLayer(devices)
                addFeatureGraphicLayer(map.getZoom());
                addDeviceGraphicLayer(localStorage['currentDevices']);
            });

            map.on('zoom', function (e) {
                console.log(map.getZoom());
            });


            // ==============================functions=======================
            /*
             * 分布图，根据区域中存在设备的数量来填充颜色
             * featureSet:
             * 　　countryFS:item.attributes.NAME 和 item.geometry
             *     provinceFS:item.attributes.Name_CHN 和 item.geometry
             *     cityFS:item.attributes.Name_CHN 和 item.geometry
             * aggregation: countryAgg/provinceAgg/cityAgg: [{name,count},]
             */
            function addFeatureGraphicLayer(zoom) {
                var currentFS = {};
                if (zoom < 4) {
                    //国家级别

                } else if (zoom < 8) {
                    //省份级别

                } else {
                    //城市级别
                }
                //var featureInfoTemplate = new esri.InfoTemplate("${NAME}", "Name : ${CITY_NAME}<br/> 目标数量：${STATE_NAME}<br />Population : ${POP1990}");
            }

            /*
             * 在地图上用图标将设备标示出来
             * devices: [{ lon:10.2, lat:1.2, country:'china', tags:[], timestamp:''},..]
             */
            function addDeviceGraphicLayer(devices) {

            }

            function setFeatureSet(which) {
                //------------↓functions---------------//
                function executeQueryTask(url) {
                    var qt = new QueryTask(url);
                    qt.execute(query, queryTaskComplete, queryTaskError);
                }

                //callback
                function queryTaskComplete(resp) {
                    //console.log(which + " complete：" + new Date(), resp.features);
                    //init data
                    switch (which) {
                        case 'country':
                            //将features转换为map，方便以后使用， key：名称，value：feature
                            resp.features.forEach(function (item) {
                                countryFS[item.attributes.NAME] = item;
                            });
                            localStorage['countryFS'] = countryFS;
                            break;
                        case 'province':
                            resp.features.forEach(function (item) {
                                provinceFS[item.attributes.Name_CHN] = item;
                            });
                            localStorage['provinceFS'] = provinceFS;
                            break;
                        case 'city':
                            resp.features.forEach(function (item) {
                                cityFS[item.attributes.Name_CHN] = item;
                            });
                            localStorage['cityFS'] = cityFS;
                            break;
                    }
                }

                //errorback
                function queryTaskError(err) {
                    console.log('Oops, something goes wrong with feature layer. ', err);
                }

                //-------------functions↑---------------//

                // process starts here......
                //（setFeatureSet --> 1）initialize query
                var query = new Query();
                query.returnGeometry = true;
                query.outSpatialReference = map.spatialReference;
                query.outFields = ["Name_CHN", "Name_ENG"];
                query.where = "'OBJECTID'>'0'";
                var url;
                switch (which) {
                    case 'country':
                        url = countryURL;   //（setFeatureSet --> 2）initialize query task (not yet start, just using this parameter)
                        query.where = "'Shape'='面'";
                        query.outFields = ["NAME", "REGION"];
                        //（setFeatureSet --> 3）initialize InfoTemplate
                        break;
                    case 'province':
                        url = provinceURL;
                        break;
                    case 'city':
                        url = cityURL;
                        break;
                    default:
                        break;
                }
                executeQueryTask(url);
            }
        }
    );
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
function mapSearch() {

}