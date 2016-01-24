/*---------------------------------------------↓Map-----------------------------------------------*/
//static global variables
var mapSearchURL = "api/mapSearch",
    baseURL = 'http://10.10.2.81:6080/arcgis/rest/services/China_Community_BaseMap/MapServer',
    countryURL = 'http://10.10.2.81:6080/arcgis/rest/services/world/MapServer/0',
    provinceURL = 'http://10.10.2.81:6080/arcgis/rest/services/area/MapServer/0',
    cityURL = 'http://10.10.2.81:6080/arcgis/rest/services/area/MapServer/1';
var MAP_PAGE_SIZE = 5;
/*
 *

 "esri/tasks/query",
 "esri/tasks/QueryTask",
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

var map, countryFS = {}, provinceFS = {}, cityFS = {}, featureGL, deviceGL;
initMap();
function initMap() {
    require(
        [
            "esri/map",
            "esri/layers/ArcGISTiledMapServiceLayer",
            "esri/layers/GraphicsLayer",
            "esri/InfoTemplate",
            "esri/dijit/HomeButton"

            //"dojo/domReady!"
        ],
        function (Map, ArcGISTiledMapServiceLayer, GraphicsLayer, InfoTemplate, HomeButton) {
            //（1）Create map and add layer
            map = new Map("mapHolder", {
                //basemap: 'gray',
                //center: [114.25, 24.1167],
                minZoom: 1,
                maxZoom: 8,
                zoom: 4,
                sliderPosition: "top-right",
                logo: false
            });
            //（1）添加底图
            var basemap = new ArcGISTiledMapServiceLayer(baseURL);
            map.addLayer(basemap);
            //（2）添加区域层
            featureGL = new GraphicsLayer({
                id: "deviceGraphicLayer",
                infoTemplate: new InfoTemplate("${Name_CHN}",
                    "国家：<b>${Name_CHN}<b><br>共发现目标：<b>${count}</b>个"),
                visibleAtMapScale: true
            });
            featureGL.on('mouse-move', function (e) {
                //console.log(e);
                //map.infoWindow.show(e.mapPoint);
            });
            featureGL.on('mouse-out', function (e) {
                //console.log(e);
                //map.infoWindow.hide();
            });
            map.addLayer(featureGL);

            //（3）添加设备点层
            deviceGL = new GraphicsLayer({
                //id: "deviceGraphicLayer",
                infoTemplate: new InfoTemplate("${ip}",
                    "<b>${location}<b><br><b>${tags}</b><br><b>${timestamp}</b>"),
                visibleAtMapScale: true
            });
            map.addLayer(deviceGL);

            deviceGL.on('click', function (e) {
                //map.infoWindow.show(e.mapPoint);
            });

            //（2）Init Home button
            home = new HomeButton({
                map: map
            }, "homeButton").startup();


            map.on("load", function () {
                console.log("map loaded");
            });

            map.on('zoom-end', function (e) {
                //mapSearch();
                console.log("zoom: " + map.getZoom());
            });
        });
}
//=============================public function related to map, not elegant at some point-----------------
var MyMap = {
    map: {},
    render: function (data) {
        console.log("map render function starts--", data);
        if (isEmptyObject(data)) {
            //console.log(data);
            return;
        }
        if (!map) {
            console.log('map is undefined');
            return;
        }

        addFeatureGraphicLayer(data.aggregation, map.getZoom());
        //addDeviceGraphicLayer(data.data);
        addClusters(data.data);
        this.setMapSidebar(data.data);
        /*
         * 分布图，根据区域中存在设备的数量来填充颜色
         * featureSet:
         * 　　countryFS:item.attributes.NAME 和 item.geometry
         *     provinceFS:item.attributes.Name_CHN 和 item.geometry
         *     cityFS:item.attributes.Name_CHN 和 item.geometry
         * aggregation: countryAgg/provinceAgg/cityAgg: [{name,count},]
         */
        function addFeatureGraphicLayer(agg, zoom) {
            if (!agg) {
                console.log("aggg is null");
                return;
            }
            console.log("addFeatureGraphicLayer------------starts");
            if (!featureSets) {
                console.log("feature set is empty");
                /*if (localStorage.featureSets && !isEmptyObject(JSON.parse(localStorage.featureSets))) {
                 fss = JSON.parse(localStorage.featureSets);
                 } else if (sessionStorage.featureSets && !isEmptyObject(JSON.parse(sessionStorage.featureSets))) {
                 fss = JSON.parse(sessionStorage.featureSets);
                 }*/
            }
            if (featureSets && !isEmptyObject(featureSets)) {
                renderFeatureLayer(agg, featureSets, zoom);
            } else {
                $.ajax({
                    url: getFeatureSetsURL ? getFeatureSetsURL : basePath + 'api/getFeatureSets',
                    type: 'post',
                    dataType: 'json',
                    contentType: "application/json"
                }).success(function (data) {
                    //console.log("ajax get feature sets succeed ", data);
                    renderFeatureLayer(agg, data, zoom);
                }).error(function () {
                    console.log("Getting feature set error!");
                }).fail(function () {
                    console.log("Getting feature set failed!");
                });
            }

            function renderFeatureLayer(agg, fss, zoom) {
                console.log("renderFeatureLayer starts================");
                require([
                    "esri/graphic",
                    "esri/renderers/SimpleRenderer", "esri/Color",
                    "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol"
                ], function (Graphic, SimpleRenderer, Color, SimpleFillSymbol, SimpleLineSymbol) {
                    featureGL.clear();
                    if (agg.hasOwnProperty('country@%city') && !isEmptyObject(agg['country@%city'])) {
                        var countries = agg['country@%city'], min = Number.MAX_VALUE, max = 0;
                        if (zoom < 50) { //国家级别
                            for (var key in countries) {
                                var features = fss.countryFS.features;
                                var country = countries[key];
                                if (features.hasOwnProperty(country.en)) {
                                    var f = features[country.en];
                                    f.attributes.count = country.count;
                                    f.attributes.Name_CHN = key;
                                    var g = new Graphic(f);
                                    featureGL.add(g);
                                    setMinMax(country.count);
                                }
                            }
                        } else if (zoom < 7) {
                            //省份级别,目前也按照市来做
                            console.log("5<zoom<7", zoom);
                            min = 0;
                            max = 999999;

                        } else {
                            //城市级别
                            console.log("zoom>=7", zoom);
                            min = 0;
                            max = 999999;
                        }
                        //调整min和max ，防止max过大、min过小造成显示太难看
                        min = (max.length - 2) > 0 ? (max.length - 2) * 10 : min;
                        var sfs = new SimpleFillSymbol().setOutline(new SimpleLineSymbol().setWidth(0.1).setColor(new Color([128, 128, 128])));
                        var renderer = new SimpleRenderer(sfs);
                        renderer.setColorInfo({
                            field: "count",
                            minDataValue: min,
                            maxDataValue: max,
                            colors: [
                                new Color([220, 199, 224, 0.75]),
                                new Color([172, 120, 180, 0.75]),
                                new Color([120, 37, 134, 0.75])
                            ]
                        });
                        featureGL.setRenderer(renderer);
                    }

                    function setMinMax(count) {
                        if (count < min) {
                            min = count;
                        }
                        if (count > max) {
                            max = count;
                        }
                    }
                });

            }
        }

        /*
         * 在地图上用图标将设备标示出来
         * devices: [{ lon:10.2, lat:1.2, country:'china', tags:[], timestamp:''},..]
         */
        function addDeviceGraphicLayer(devices) {
            if (!devices)return;
            require([
                "esri/symbols/PictureMarkerSymbol",
                "esri/graphic",
                "esri/geometry/Point",
                "esri/symbols/SimpleLineSymbol",
                "esri/renderers/SimpleRenderer"
            ], function (PictureMarkerSymbol, Graphic, Point) {
                console.log("add device graphic layer=========");
                deviceGL.clear();
                var pms = new PictureMarkerSymbol(imgUrl + "red.png", 40, 40).setOffset(0, 15);
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
                        "timestamp": dateLocalize()
                    };
                    var pt = new Point(d.lon, d.lat, map.spatialReference);
                    //console.log("lng-- " + d.lon, "lat-- " + d.lat);
                    var gc = new Graphic(pt, pms, attr);
                    //console.log(gc);
                    deviceGL.add(gc);//（1）添加到graphics层
                });
            });
        }

        function addClusters(devices) {
            require([
                "esri/SpatialReference",
                "esri/dijit/PopupTemplate",
                "esri/geometry/Point",
                "esri/geometry/webMercatorUtils",

                "extras/ClusterLayer",
                "esri/symbols/SimpleLineSymbol",
                "esri/symbols/SimpleMarkerSymbol",
                "esri/symbols/PictureMarkerSymbol",
                "esri/renderers/ClassBreaksRenderer",
                "esri/symbols/SimpleFillSymbol"

            ], function (SpatialReference, PopupTemplate, Point, webMercatorUtils, ClusterLayer,
                         SimpleLineSymbol, SimpleMarkerSymbol, PictureMarkerSymbol, ClassBreaksRenderer, SimpleFillSymbol) {

                var devicesInfo = {};
                var wgs = new SpatialReference({
                    "wkid": 4326
                });
                devicesInfo.data = $.map(devices, function (d) {
                    var latlng = new Point(parseFloat(d.lon), parseFloat(d.lat), wgs);
                    var webMercator = webMercatorUtils.geographicToWebMercator(latlng);
                    var attributes = {
                        "IP": d.ip,
                        "Location": d.location,
                        "Ports": d.ports,
                        "Tags": d.tags,
                        "Vuls": d.vuls,
                        "Timestamp": d.timestamp,
                        "Image": basePath + "resources/img/home.png",
                        "Link": d.link
                    };
                    return {
                        "x": webMercator.x,
                        "y": webMercator.y,
                        "attributes": attributes
                    };
                });

                // popupTemplate to work with attributes specific to this dataset
                var popupTemplate = new PopupTemplate({
                    "title": "",
                    "fieldInfos": [{
                        "fieldName": "Ip",
                        visible: true
                    }, {
                        "fieldName": "Location",
                        "label": "@",
                        visible: true
                    }, {
                        "fieldName": "Ports",
                        "label": "服务：",
                        visible: true
                    }, {
                        "fieldName": "Vuls",
                        "label": "漏洞：",
                        visible: true
                    }, {
                        "fieldName": "Tags",
                        "label": "标签：",
                        visible: true
                    }, {
                        "fieldName": "Timestamp",
                        "label": "更新时间：",
                        visible: true
                    }],
                    "mediaInfos": [{
                        "title": "",
                        "caption": "",
                        "type": "image",
                        "value": {
                            "sourceURL": "{Image}",
                            "linkURL": "{Image}"
                        }
                    }]
                });

                // cluster layer that uses OpenLayers style clustering
                clusterLayer = new ClusterLayer({
                    "data": devicesInfo.data,
                    "distance": 100,
                    "id": "clusters",
                    "labelColor": "#fff",
                    "labelOffset": 10,
                    "resolution": map.extent.getWidth() / map.width,
                    "singleColor": "#888",
                    "singleTemplate": popupTemplate
                });
                var defaultSym = new SimpleMarkerSymbol().setSize(4);
                var renderer = new ClassBreaksRenderer(defaultSym, "clusterCount");

                var picBaseUrl = imgUrl;
                //var blue = new PictureMarkerSymbol(picBaseUrl + "blue.png", 32, 32).setOffset(0, 15);
                var green = new PictureMarkerSymbol(picBaseUrl + "green.png", 64, 64).setOffset(0, 15);
                var red = new PictureMarkerSymbol(picBaseUrl + "red.png", 72, 72).setOffset(0, 15);
                //renderer.addBreak(0, 2, blue);
                renderer.addBreak(0, 200, green);
                renderer.addBreak(200, 1001, red);

                clusterLayer.setRenderer(renderer);
                map.addLayer(clusterLayer);

                /*var center = devicesInfo.data[0];
                 map.centerAndZoom(new Point(center.x, center.y, wgs), 8);*/

                // close the info window when the map is clicked
                //map.on("click", cleanUp);
                // close the info window when esc is pressed
                map.on("key-down", function (e) {
                    if (e.keyCode === 27) {
                        cleanUp();
                    }
                });

            });
        }

        function cleanUp() {
            console.log("zoom ");
            map.infoWindow.hide();
            clusterLayer.clearSingles();
        }
    },

    //updateSidebar, boolean，如果是搜索框检索，则为true，更新sidebar，如果是用户点击某个复选框，则不改变，设为false
    search: function (updateSidebar) {
        console.log("map search function starts--");
        var currentExtent = getVisibleExtent();//获取并设置屏幕所在范围的经纬度geo
        sessionStorage.currentExtent = currentExtent;

        var criteria = {
            //"geo": currentExtent,
            "wd":getWd(),
            "zoomlevel": map.getZoom(),
            "pagesize": MAP_PAGE_SIZE
        };
        console.log("map search function starts", criteria);
        var success = function (data) {
            console.log("map search succeed", data);
            if (updateSidebar) {
                initSidebar(data['aggregation']);
            }
            MyMap.render(data);
        };
        var noDataFunc = function () {
            alert("no related data found!");
            console.log("map no data found!");
        };
        var searchObj = {
            "url": basePath + mapSearchURL,
            "success": success,
            "noDataFunc": noDataFunc,
            "criteria": criteria
        };
        newSearch(searchObj);

        //获取地图的可视范围的经纬度
        function getVisibleExtent() {
            var polygonCCW;
            require([
                "esri/geometry/ScreenPoint",
                "esri/geometry/webMercatorUtils"
            ], function (ScreenPoint, webMercatorUtils) {
                var windowHeight = $(window).height(), windowWidth = $(window).width();
                var sLeftTop = new ScreenPoint(0, 0),
                    sRightBottom = new ScreenPoint(windowWidth, windowHeight);
                /* var mLeftTop = webMercatorUtils.webMercatorToGeographic(map.toMap(sLeftTop)),
                 mRightBottom = webMercatorUtils.webMercatorToGeographic(map.toMap(sRightBottom));*/
                var mLeftTop = map.toMap(sLeftTop),
                    mRightBottom = map.toMap(sRightBottom);

                var xL = mLeftTop.x, xR = mRightBottom.x, yT = mLeftTop.y, yB = mRightBottom.y;
                //逆时针，4个点，首尾闭合
                polygonCCW = 'polygon(' +
                xL + ' ' + yT + ',' +             //左上
                xL + ' ' + yB + ',' +             //左下
                xR + ' ' + yB + ',' +             //右下
                xR + ' ' + yT + ',' +             //右上
                xL + ' ' + yT + ')';              //首尾闭合
            });
            return polygonCCW;
        }
    },

    setMapSidebar: function (devices) {//-------------------------------------遗留
        console.log("set map sidebar", devices);
    },
    //将一个设备添加到地图的右侧边栏
    deviceOnClick: function (device) {//--------------------------------------遗留
        console.log('add to side bar');
    }
};


//------------------------------↓ functions not in use currently-------------------
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
                localStorage.featureSets.countryFS = countryFS;
                break;
            case 'province':
                resp.features.forEach(function (item) {
                    provinceFS[item.attributes.Name_CHN] = item;
                });
                console.log("province ends at---" + new Date());
                localStorage.featureSets.provinceFS = provinceFS;
                break;
            case 'city':
                resp.features.forEach(function (item) {
                    cityFS[item.attributes.Name_CHN] = item;
                });
                localStorage.featureSets.cityFS = cityFS;
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