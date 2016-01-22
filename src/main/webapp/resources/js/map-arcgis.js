/*---------------------------------------------分隔线-----------------------------------------------*/
//static global variables
var mapSearchURL = "api/getResponse4Map",
    baseURL = 'http://10.10.2.81:6080/arcgis/rest/services/China_Community_BaseMap/MapServer',
    countryURL = 'http://10.10.2.81:6080/arcgis/rest/services/world/MapServer/0',
    provinceURL = 'http://10.10.2.81:6080/arcgis/rest/services/area/MapServer/2',
    cityURL = 'http://10.10.2.81:6080/arcgis/rest/services/area/MapServer/1';

var LOSSY_COMPRESS = 1;    //压缩级别

var map, featureGL, deviceGL, featureInfoTemplate, countryFS = {}, provinceFS = {}, cityFS = {};
var MyMap = {
    mapFunObj: new Object,
    init: function () {
        console.log("init map----------------------");
        $('.sidebar').hide();//临时隐藏侧边栏，开发时使用的
        require(
            [
                "esri/map",
                "esri/graphic",
                "esri/dijit/HomeButton",
                "esri/layers/ArcGISTiledMapServiceLayer",
                "esri/SpatialReference",

                "esri/geometry/ScreenPoint",
                "esri/geometry/webMercatorUtils",

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
                      ScreenPoint, webMercatorUtils,
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
                //setFeatureSet('province');
                //setFeatureSet('city');

                //从地图服务器获取FeatureSets初始化

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
                                localStorage.countryFS = countryFS;
                                break;
                            case 'province':
                                resp.features.forEach(function (item) {
                                    provinceFS[item.attributes.Name_CHN] = item;
                                });
                                localStorage.provinceFS = provinceFS;
                                break;
                            case 'city':
                                resp.features.forEach(function (item) {
                                    cityFS[item.attributes.Name_CHN] = item;
                                });
                                localStorage.cityFS = cityFS;
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

                map.on("load", function () {
                    console.log("on load");
                    var devices = sessionStorage.devices,
                        agg = sessionStorage.aggregation,
                        wd = sessionStorage.wd;
                    if (!devices && !agg) {
                        if (wd) {
                            //ajax get data, render graphic layers and set sessionStorage
                            mapSearch();
                        }

                    } else {
                        this.render({
                            data: devices,
                            agg: agg
                        });
                    }

                });

                map.on('zoom', function (e) {
                    console.log(map.getZoom());
                    //mapSearch();
                });

                // ==============================functions=======================


            }
        );
    },
    render: function renderMap(data) {
        console.log('init map render=============');
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
        if (zoom < 4) {
            //国家级别
            var countryNames = [];
            if (agg.hasOwnProperty('country@%city')) {
                var cc = agg['country@%city'];
                if (localStorage.countryFS) {
                    //添加到featureLayer
                    for (var key in cc) {
                        countryNames.push({ke: key});
                    }
                } else {
                    //查询远程地图服务
                }

            }

        } else if (zoom < 8) {
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
        console.log("add device graphic layer");
    },


//获取地图的可视范围的经纬度
    getVisibleExtent: function () {
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
        console.log('getVisibleExtent', polygonCCW);
        return polygonCCW;
    },

//设置查询条件searchCriteria
    getSearchCriteria: function () {
        var criteria = {};
        criteria["geo"] = getVisibleExtent();             //获取并设置屏幕所在范围的经纬度geo
        criteria["wd"] = getWd();
        criteria["zoomlevel"] = map.getZoom();            //设置缩放级别zoomlevel
        criteria["lossycompress"] = LOSSY_COMPRESS;    //设置压缩级别lossycompress
        return criteria;
    },


    mapSearch: function () {
        var searchObj = {};
        searchObj["geo"] = getVisibleExtent();             //获取并设置屏幕所在范围的经纬度geo
        searchObj["wd"] = getWd();
        searchObj["zoomlevel"] = map.getZoom();            //设置缩放级别zoomlevel
        searchObj["lossycompress"] = LOSSY_COMPRESS;    //设置压缩级别lossycompress
        searchObj['url'] = basePath + mapSearchURL;
        searchObj['success'] = mapSearchSuccessHandler;
        searchObj['criteria'] = getSearchCriteria();
        newSearch(searchObj);
    },

    mapSearchSuccessHandler: function (resp) {
        this.render(resp);
    }

};
function setMapSidebar(devices) {
}
//-------------
MyMap.init();
