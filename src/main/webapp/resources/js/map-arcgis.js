/*---------------------------------------------分隔线-----------------------------------------------*/
//static global variables
var mapSearchURL = "api/mapSearch",
    baseURL = 'http://10.10.2.81:6080/arcgis/rest/services/China_Community_BaseMap/MapServer',
    countryURL = 'http://10.10.2.81:6080/arcgis/rest/services/world/MapServer/0',
    provinceURL = 'http://10.10.2.81:6080/arcgis/rest/services/area/MapServer/0',
    cityURL = 'http://10.10.2.81:6080/arcgis/rest/services/area/MapServer/1';

/*
 *

 "esri/graphic",
 "esri/SpatialReference",

 //feature layer related↓

 "esri/tasks/FeatureSet",
 "esri/layers/FeatureLayer",

 "esri/symbols/SimpleFillSymbol",
 "esri/symbols/SimpleLineSymbol",
 "esri/renderers/SimpleRenderer",

 "esri/lang",
 "esri/Color",
 "dojo/number",
 "dojo/dom-style",
 "dijit/TooltipDialog",
 "dijit/popup",
 * */

var map, featureInfoTemplate, countryFS = {}, provinceFS = {}, cityFS = {}, featureGL, deviceGL;


require(
    [
        "esri/map",
        "esri/layers/ArcGISTiledMapServiceLayer",
        "esri/layers/GraphicsLayer",
        "esri/InfoTemplate",
        "esri/dijit/HomeButton",

        "esri/tasks/query",
        "esri/tasks/QueryTask",

        "dojo/domReady!"
    ],
    function (Map, ArcGISTiledMapServiceLayer, GraphicsLayer, InfoTemplate, HomeButton,
              Query, QueryTask) {
        //（1）Create map and add layer
        map = new Map("mapHolder", {
            //basemap: 'gray',
            //center: [114.25, 24.1167],
            minZoom: 4,
            zoom: 4,
            sliderPosition: "top-right",
            logo: false
        });
        var basemap = new ArcGISTiledMapServiceLayer(baseURL);
        map.addLayer(basemap);
        featureGL = new GraphicsLayer();
        map.addLayer(featureGL);
        deviceGL = new GraphicsLayer({
            id: "deviceGraphicLayer",
            infoTemplate: new InfoTemplate("${ip}",
                "<b>${location}<b><br><b>${tags}</b><br><b>${timestamp}</b>")
        });
        map.addLayer(deviceGL);

        //（2）Init Home button
        home = new HomeButton({
            map: map
        }, "homeButton").startup();

        //initFeatureSet('country');
        //initFeatureSet('province');
        //initFeatureSet('city');

        map.on("load", function () {
            console.log("on load");
            var devices = sessionStorage.devices,
                agg = sessionStorage.aggregation,
                wd = getWd();
            if (!devices && !agg) {
                if (wd != '') {
                    MyMap.mapSearch();                    //ajax get data, render graphic layers and set sessionStorage
                }
            } else {
                MyMap.render({
                    data: devices,
                    agg: agg
                });
            }
        });

        map.on('zoom-end', function (e) {
            //mapSearch();
            console.log("zoom: " + map.getZoom());
        });

        //------------------------------↓ functions-------------------
        function initFeatureSet(which) {
            function executeQueryTask(url) {
                console.log("task starts at---" + new Date());

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
                        localStorage.countryFS = countryFS;
                        break;
                    case 'province':
                        resp.features.forEach(function (item) {
                            provinceFS[item.attributes.Name_CHN] = item;
                        });
                        console.log("province ends at---" + new Date());
                        localStorage.provinceFS = provinceFS;
                        break;
                    case 'city':
                        resp.features.forEach(function (item) {
                            cityFS[item.attributes.Name_CHN] = item;
                        });
                        localStorage.cityFS = cityFS;
                        console.log("city ends at---" + new Date());
                        break;
                }
            }

            //errorback
            function queryTaskError(err) {
                console.log('Oops, something goes wrong with feature layer. ', err);
            }

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
    });

//=============================public function realted to map, not elegant in someway-----------------
var MyMap = {
    render: function (data) {
        console.log('map is rendering=============');
        this.addDeviceGraphicLayer(data.data);
        setMapSidebar(data.data);
        this.addFeatureGraphicLayer(data.aggregation, map.getZoom());
    },

    /*
     * 分布图，根据区域中存在设备的数量来填充颜色
     * featureSet:
     * 　　countryFS:item.attributes.NAME 和 item.geometry
     *     provinceFS:item.attributes.Name_CHN 和 item.geometry
     *     cityFS:item.attributes.Name_CHN 和 item.geometry
     * aggregation: countryAgg/provinceAgg/cityAgg: [{name,count},]
     */
    addFeatureGraphicLayer: function (agg, zoom) {
        if (zoom < 5) {
            //国家级别
            var countryNames = [];
            if (agg.hasOwnProperty('country@%city')) {
                var cc = agg['country@%city'];
                if (localStorage.countryFS) {
                    //添加到featureGraphicLayer

                } else {
                    //查询远程地图服务
                }
            }
        } else if (zoom < 7) {
            //省份级别,目前也按照市来做

        } else {
            //城市级别
        }
        //var featureInfoTemplate = new esri.InfoTemplate("${NAME}", "Name : ${CITY_NAME}<br/> 目标数量：${STATE_NAME}<br />Population : ${POP1990}");
    },

    /*
     * 在地图上用图标将设备标示出来
     * devices: [{ lon:10.2, lat:1.2, country:'china', tags:[], timestamp:''},..]
     */
    addDeviceGraphicLayer: function (devices) {
        require([
            "esri/symbols/PictureMarkerSymbol",
            "esri/graphic",
            "esri/geometry/Point",
            "esri/symbols/SimpleLineSymbol",
            "esri/renderers/SimpleRenderer"
        ], function (PictureMarkerSymbol, Graphic, Point) {
            console.log("add device graphic layer=========");
            var pms = new PictureMarkerSymbol(imgUrl + "red.png", 72, 72).setOffset(0, 15);
            devices.forEach(function (d) {
                var attr = {
                    "ip": d.ip,
                    "location": d.location,
                    "tags": d.tags,
                    "ports": d.ports.map(function (port) {
                        var result;
                        for (var key in port) {
                            result += key;
                        }
                        return result;
                    }),
                    "vuls": d.ports.map(function (vul) {
                        var result;
                        for (var key in vul) {
                            result += key;
                        }
                        return result;
                    }),
                    "timestamp": dateLocalize(d.timestamp)
                };
                var pt = new Point(d.lon, d.lat, map.spatialReference);
                var graphic = new Graphic(pt, pms, attr);

                deviceGL.add(graphic);//（1）添加到graphics层
                addToSidebar(d);//（2）添加到侧栏
            });
        });
    },

//获取地图的可视范围的经纬度
    getVisibleExtent: function () {
        require([
            "esri/geometry/ScreenPoint",
            "esri/geometry/webMercatorUtils"
        ], function (ScreenPoint, webMercatorUtils) {
            var windowHeight = $(window).height(), windowWidth = $(window).width();
            var sLeftTop = new ScreenPoint(0, 0),
                sRightBottom = new ScreenPoint(windowWidth, windowHeight);
            var mLeftTop = webMercatorUtils.webMercatorToGeographic(map.toMap(sLeftTop)),
                mRightBottom = webMercatorUtils.webMercatorToGeographic(map.toMap(sRightBottom));

            var xL = mLeftTop.x, xR = mRightBottom.x, yT = mLeftTop.y, yB = mRightBottom.y;
            //逆时针，4个点，首尾闭合
            var polygonCCW = 'polygon(' +
                xL + ' ' + yT + ',' +             //左上
                xL + ' ' + yB + ',' +             //左下
                xR + ' ' + yB + ',' +             //右下
                xR + ' ' + yT + ',' +             //右上
                xL + ' ' + yT + ')';              //首尾闭合
            console.log('getVisibleExtent: ', polygonCCW);
            return polygonCCW;
        });
    },

    mapSearch: function () {
        console.log("this mapSearch");
        return;
        var criteria = {
            "geo": this.getVisibleExtent(),             //获取并设置屏幕所在范围的经纬度geo
            "wd": getWd(),
            "zoomlevel": map.getZoom()
        };
        var noDataFunc = function () {
            console.log("map no data found!");
        };
        var searchObj = {
            "url": basePath + mapSearchURL,
            "success": this.render,
            "noDataFunc": noDataFunc,
            "criteria": criteria
        };
        newSearch(searchObj);
    },

    mapSearchSuccessHandler: function (resp) {
        this.render(resp);
    }

};
function setMapSidebar(devices) {
    console.log(devices);
}

//将一个设备添加到地图的右侧边栏
function addToSidebar(device) {
    console.log('add to side bar');
}
