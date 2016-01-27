/*---------------------------------------------↓Map-----------------------------------------------*/
var mapSearchURL = "api/mapSearch",
    basemapURL = 'http://10.10.2.81:6080/arcgis/rest/services/China_Community_BaseMap/MapServer',
    countryLayerURL = 'http://10.10.2.81:6080/arcgis/rest/services/world/MapServer/0',
    provinceLayerURL = 'http://10.10.2.81:6080/arcgis/rest/services/sheng/MapServer/0',
    cityLayerURL = 'http://10.10.2.81:6080/arcgis/rest/services/area/MapServer/1';
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

var map, countryFS = {}, provinceFS = {}, cityFS = {}, featureGL, deviceGL, countryLayer, provinceLayer, cityLayer;
var clusterLayer;

initMap();
function initMap() { //网站加载时调用此方法
    console.log("start to load map --- ");
    require(
        [
            "esri/map",
            "esri/layers/ArcGISTiledMapServiceLayer",
            "esri/layers/GraphicsLayer",
            "esri/InfoTemplate",
            "esri/layers/FeatureLayer",
            "esri/dijit/HomeButton",
            "esri/tasks/query",
            "esri/tasks/QueryTask",
            "esri/symbols/SimpleFillSymbol",
            "dojo/domReady!"
        ],
        function (Map, ArcGISTiledMapServiceLayer, GraphicsLayer, InfoTemplate, FeatureLayer, HomeButton, Query, QueryTask, SimpleFillSymbol) {
            //（1）Create map and add layer
            map = new Map("mapHolder", {
                //basemap: 'gray',
                //center: [114.25, 24.1167],
                minZoom: 1,
                maxZoom: 8,
                zoom: 4,
                sliderPosition: "bottom-right",
                logo: false
            });
            //（1）添加底图
            var basemap = new ArcGISTiledMapServiceLayer(basemapURL);
            map.addLayer(basemap);

            //（2）添加设备点层
            deviceGL = new GraphicsLayer({
                id: "deviceGraphicLayer",
                infoTemplate: new InfoTemplate("${ip}",
                    "<b>${location}<b><br><b>${tags}</b><br><b>${timestamp}</b>"),
                visibleAtMapScale: true
            });
            map.addLayer(deviceGL, 1);

            //（3）添加feature layers
            var featureLayerInfoTemplate = new InfoTemplate("${Name_CHN}", "国家：<b>${Name_CHN}<b><br>共发现目标：<b>${count}</b>个");
            var featureLayerOption = {
                outFields: ["*"],
                mode: FeatureLayer.MODE_SNAPSHOT,
                //mode:FeatureLayer.FeatureLayer.MODE_ONDEMAND,
                visible: false, //default is true
                infoTemplate: featureLayerInfoTemplate
            };
            countryLayer = new FeatureLayer(countryLayerURL, featureLayerOption);
            map.addLayer(countryLayer, 2);
            provinceLayer = new FeatureLayer(provinceLayerURL, featureLayerOption);
            map.addLayer(provinceLayer, 3);
            cityLayer = new FeatureLayer(cityLayerURL, featureLayerOption);
            map.addLayer(provinceLayer, 4);

            //（4）Init Home button
           /* home = new HomeButton({
                map: map
            }, "homeButton").startup();*/

            map.on("load", function () {
                console.log("map loaded");

                /*                function getFeatureSetByName(which, name) {
                 console.log(which + "getFeatureSetByName starts-------", new Date());


                 function executeQueryTask(url) {
                 var qt = new QueryTask(url);
                 qt.execute(query, queryTaskComplete, queryTaskError);
                 }

                 //callback
                 function queryTaskComplete(resp) {
                 console.log(which + " complete：" + new Date(), resp.features);
                 //init data
                 switch (which) {
                 case 'country':
                 //将features转换为map，方便以后使用， key：名称，value：feature
                 resp.features.forEach(function (item) {
                 countryFS[item.attributes.NAME] = item;
                 });
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
                 //将feature添加到graphicLayer，并显示
                 var sys = new SimpleFillSymbol();
                 sys.color = 0xff0000;
                 item.symbol = sys;
                 deviceGL.add(g);
                 });
                 console.log("city ends at---" + new Date());
                 break;
                 }
                 }

                 //errorback
                 function queryTaskError(err) {
                 console.log('Oops, something goes wrong with feature layer. ', err);
                 }

                 $.ajax({
                 url: getFeatureSetsURL ? getFeatureSetsURL : basePath + 'api/getFeatureSets',
                 type: 'post',
                 dataType: 'json',
                 contentType: "application/json"
                 }).success(function (data) {
                 console.log("ajax get feature sets succeed ", data);
                 queryTaskComplete(data);
                 }).error(function () {
                 console.log("Getting feature set error!");
                 }).fail(function () {
                 console.log("Getting feature set failed!");
                 });


                 //（setFeatureSet --> 1）initialize query
                 */
                /*  var query = new Query();
                 query.returnGeometry = true;
                 query.outSpatialReference = map.spatialReference;
                 query.outFields = ["Name_CHN", "Name_ENG"];
                 //query.where = "'OBJECTID'>'0'";
                 var url;
                 switch (which) {
                 case 'country':
                 url = countryLayerURL;   //（setFeatureSet --> 2）initialize query task (not yet start, just using this parameter)
                 query.where = "'Shape'='面'";
                 query.outFields = ["NAME", "REGION"];
                 break;
                 case 'province':
                 url = provinceLayerURL;
                 break;
                 case 'city':
                 url = cityLayerURL;
                 query.where = "'Name_CHN'=" + name;
                 query.outFields = ["*"];
                 break;
                 default:
                 break;
                 }
                 executeQueryTask(url);*/
                /*
                 }*/

                /*var capabilities = featureLayer.getEditCapabilities();
                 console.log("This layer can be updated:", capabilities);
                 console.log("this layer is editable? " + featureLayer.isEditable());*/
            });

            map.on('zoom-end', function (e) {
                console.log("zoom levle: " + map.getZoom());
                //MyMap.search(false, 1);
            });
        });
}

//=============================public function related to map, not elegant at some point-----------------
var MyMap = {
    RENDER_ZOOM: 4,
    show: function () { //滑动到地图页时调用此方法
        console.log("map is showing---");
        $('header').show();
        var data = MySessionStorage.get('data');
        if (data || !isEmptyObject(data)) {
            //（1）显示左侧边栏
            Sidebar.init(data['aggregation']);
            //（2）渲染地图
            this.render(data);
            //（3）监听tool bar
            $('#featureLayer').on('click', function () {
                    if (map.getZoom() < 4) {
                        FeatureLayer.show(countryLayer, data.aggregation);
                    } else if (map.getZoom() < 7) {
                        FeatureLayer.show(provinceLayer, data.aggregation);
                    } else {
                        FeatureLayer.show(cityLayer, data.aggregation);
                    }
                }
            );
        }
    },
    render: function (data) {//像地图添加设备标注
        console.log("map render starts--", data);
        if (!data || isEmptyObject(data)) {
            console.log('in map render data is undefined or empty');
            return;
        }

        /*if (!map) {
         console.log('map is undefined');
         return;
         }*/

        var interval = setInterval(function () {
            if (map) {
                //（1）添加设备层
                addClusters(data['data']);

                //（2）显示地图右侧边栏
                MapSidebar.init(data['data']);
                MapSidebar.show();
                clearInterval(interval);
            }
        }, 1000);

        function addClusters(devices) {
            console.log("add cluster -----", devices);
            if (!devices) {
                return;
            }
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
                         SimpleLineSymbol, SimpleMarkerSymbol, PictureMarkerSymbol, ClassBreaksRenderer) {
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
                        "label": "位置：",
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

                var green = new PictureMarkerSymbol(imgUrl + "green.png", 64, 64).setOffset(0, 15);
                var red = new PictureMarkerSymbol(imgUrl + "red.png", 72, 72).setOffset(0, 15);
                renderer.addBreak(0, 200, green);
                renderer.addBreak(200, 1001, red);

                clusterLayer.setRenderer(renderer);
                map.addLayer(clusterLayer);

                clusterLayer.on('click', function (e) {
                    console.log("cluster layer's feature is clicked");
                    e.preventDefault();
                });

                /*// close the info window when the map is clicked
                 map.on("click", cleanUp);*/

                // close the info window when esc is pressed
                map.on("key-down", function (e) {
                    if (e.keyCode === 27) {
                        cleanUp();
                    }
                });
            });
        }

        function cleanUp() {
            map.infoWindow.hide();
            clusterLayer.clearSingles();
        }
    },

    search: function (updateSidebar, page) {//updateSidebar, boolean，true，表示更新sidebar，否则不更新
        console.log("map search function starts--");
        var extent = getVisibleExtent();//获取并设置屏幕所在范围的经纬度geo
        MySessionStorage.set('mapExtent', extent);

        var criteria = {
            "geo": extent,
            "wd": MySessionStorage.get('wd'),
            "zoomlevel": map.getZoom(),
            "pagesize": MAP_PAGE_SIZE,
            "page": page
        };
        var success = function (data) {
            console.log("map search succeed", data);
            if (updateSidebar) {
                Sidebar.init(data['aggregation']);
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
            var polygonCCW = '';
            require([
                "esri/geometry/ScreenPoint",
                "esri/geometry/webMercatorUtils"
            ], function (ScreenPoint, webMercatorUtils) {
                var windowHeight = $(window).height(), windowWidth = $(window).width();
                var sLeftTop = new ScreenPoint(0, 0),
                    sRightBottom = new ScreenPoint(windowWidth, windowHeight);
                var mLeftTop = webMercatorUtils.webMercatorToGeographic(map.toMap(sLeftTop)),
                    mRightBottom = webMercatorUtils.webMercatorToGeographic(map.toMap(sRightBottom));
                /* var mLeftTop = map.toMap(sLeftTop),
                 mRightBottom = map.toMap(sRightBottom);*/

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
    }
};

var FeatureLayer = {
    show: function (layer, agg) {
        render();
        map.reorderLayer(layer, 10);
        layer.show();

        function render(layer, agg) {
            console.log("feature layer is rendering");
            require([
                "esri/map", "esri/geometry/Extent",
                "esri/layers/FeatureLayer", "esri/InfoTemplate", "esri/dijit/Legend",
                "esri/renderers/SimpleRenderer", "esri/Color",
                "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol",
                "dojo/domReady!"
            ], function (Map, Extent, FeatureLayer, InfoTemplate, Legend,
                         SimpleRenderer, Color, SimpleFillSymbol, SimpleLineSymbol) {

                //（1）修改layer的参数
                var min, max;
                console.log("in feature layer render function", cityLayer);

                //（2）设置renderer
                var renderer = new SimpleRenderer(new SimpleFillSymbol().setOutline(new SimpleLineSymbol().setWidth(0.1).setColor(new Color([128, 128, 128]))));
                renderer.setColorInfo({
                    field: "count",
                    minDataValue: min,
                    maxDataValue: max,
                    colors: [
                        new Color([255, 255, 255, 0.2]),
                        new Color([244, 238, 246, 0.75]),
                        new Color([121, 37, 135, 0.75])
                    ]
                });
                layer.setRenderer(renderer);
                // （3）启动legend
                var legend = new Legend({
                    map: map,
                    layerInfos: [{title: "", layer: layer}]
                }, "legend");
                legend.startup();
            });
        }
    },
    hide: function () {
        countryLayer.hide();
        provinceLayer.hide();
        cityLayer.hide();
    }
};

var MapSidebar = {
    show: function () {
        $('#mapSidebar').show();
    },
    init: function (devices) {
        //popup_sidepanel， ArcGis 自带的侧边栏
        console.log("init map sidebar", devices);
        $('.map-device-list').html('');
        //添加设备，待补充
        function addDevice(device) {
            var $li = $('<li id="' + device.ip + '"></li>').appendTo($('.map-device-list'));
            var $title = $('<a href="#" class="title">' + device.ip + '</a>').appendTo($li);
            var $info = $('<div class="info"></div>').appendTo($li);
            var loc = device.location, time = device.timestamp, tags = device.tags, ports = device.ports, vuls = device.vuls;
            if (loc && loc != '') {
                $info.append($('<span class="label label-default location">' + loc + '</span>'));
            }
            if (time && time != '') {
                $info.append($('<span class="label label-default timestamp">' + dateLocalize(time) + '</span>'));
            }
            if (tags && tags != '') {
                $info.append($('<span class="label label-default tags">' + tags + '</span>'));
            }

            if (ports && ports != '' & ports.length > 0) {
                for (var p in ports) {

                }
            }
            if (vuls && vuls != '') {
                for (var p in vuls) {

                }
            }
        }
    },
    onSelectionChange: function () {    //用户选择了一个设备的时候，在地图上弹出对应设备的infowindow
        var selected = map.infoWindow.getSelectedFeature();
        console.log("on selection  change, selected = ", selected);
    }
};

//------------------------------↓ functions not in use currently-------------------
function initFeatureSetByNames(which, names) {
    console.log(which + "starts-------");
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
    //query.where = "'OBJECTID'>'0'";
    var url;
    switch (which) {
        case 'country':
            url = countryLayerURL;   //（setFeatureSet --> 2）initialize query task (not yet start, just using this parameter)
            query.where = "'Shape'='面'";
            query.outFields = ["NAME", "REGION"];
            break;
        case 'province':
            url = provinceLayerURL;
            break;
        case 'city':
            url = cityLayerURL;
            query.objectIds = [1, 2];
            //query.where = "'OBJECTID'='[1,2]'";
            query.outFields = ["*"];
            break;
        default:
            break;
    }
    executeQueryTask(url);
}

/*
 * 分布图，根据区域中存在设备的数量来填充颜色
 * featureSet:
 * 　　countryFS:item.attributes.NAME 和 item.geometry
 *     provinceFS:item.attributes.Name_CHN 和 item.geometry
 *     cityFS:item.attributes.Name_CHN 和 item.geometry
 * agg: data.aggregation
 */
function addFeatureGraphicLayer(agg, zoom) {
    console.log("addFeatureGraphicLayer------------starts");
    if (!agg || isEmptyObject(agg)) {
        console.log("addFeatureGraphicLayer agg is null");
        return;
    }
    if (!zoom || zoom == '') {
        zoom = map.getZoom() ? map.getZoom() : this.RENDER_ZOOM;
    }
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
            "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol",
            "esri/dijit/Legend"
        ], function (Graphic, SimpleRenderer, Color, SimpleFillSymbol, SimpleLineSymbol, Legend) {
            featureGL.clear();
            if (agg.hasOwnProperty('country@%city') && !isEmptyObject(agg['country@%city'])) {
                var countries = agg['country@%city'], min = Number.MAX_VALUE, max = 0;
                if (zoom < 4) { //国家级别
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
                } else if (zoom < 10) {
                    var map = '{"福建省":558,"西藏自治区":62,"贵州省":115,"上海市":616,"广东省":824,"湖北省":325,"湖南省":471,"澳门特别行政区":30,"香港特别行政区":30,"四川省":358,"安徽省":260,"新疆维吾尔自治区":560,"江苏省":456,"吉林省":337,"宁夏回族自治区":78,"河北省":670,"河南省":325,"广西壮族自治区":148,"海南省":34,"江西省":366,"重庆市":463,"云南省":207,"北京市":887,"甘肃省":275,"山东省":476,"陕西省":55,"浙江省":741,"内蒙古自治区":228,"青海省":98,"天津市":443,"辽宁省":424,"台湾省":1022,"黑龙江省":316,"山西省":279}';
                    map = JSON.parse(map);
                    var ff = featureSets.provinceFS.features;
                    //省份级别,目前也按照市来做
                    console.log("4<zoom<10", ff);
                    var i = 1;
                    for (var p in ff) {
                        i++;
                        console.log(p, ff[p]);
                        var count = map[ff[p].attributes.Name_CHN];
                        ff[p].attributes.count = count;
                        var g = new Graphic(ff[p]);
                        featureGL.add(g);
                        setMinMax(count);
                    }
                    /* if (features.hasOwnProperty(country.en)) {
                     var f = features[country.en];
                     f.attributes.count = country.count;
                     f.attributes.Name_CHN = key;
                     var g = new Graphic(f);
                     featureGL.add(g);
                     setMinMax(country.count);
                     }*/

                } else {
                    //城市级别
                    var names = "北京郊县";
                    console.log("zoom>=6", zoom);
                    var cityFeatures = fss.cityFS.features;
                    $.ajax({
                        url: basePath + 'api/getFeatureSetsByNames',
                        type: "post",
                        contentType: "application/json",
                        dataType: "json",
                        timeout: 5000000,
                        data: names
                    }).success(function (data) {
                        console.log(data);
                    });

                    //console.log("city features : ", cityFeatures);
                    for (var c in countries) {
                        var cities = countries[c]['cities'];
                        console.log("cities in agg: " + cities);
                        for (var ck in cities) {
                            console.log("city name: " + ck + ", count:" + cities[ck]);
                            if (cityFeatures.hasOwnProperty(ck)) {
                                console.log("in if" + ck);
                                var cf = cityFeatures[ck];
                                cf.attributes.count = cities[ck];
                                var cg = new Graphic(cf);
                                featureGL.add(cg);
                                console.log(cg);
                                setMinMax(cities[ck]);
                            }
                        }
                    }
                }
                var legend = new Legend({
                    map: map,
                    layerInfos: [{layer: featureGL}]
                }, "legend");


                //调整min和max ，防止max过大、min过小造成显示太难看
                min = (max.length - 2) > 0 ? (max.length - 2) * 10 : min;
                var sfs = new SimpleFillSymbol().setOutline(new SimpleLineSymbol().setWidth(0.1).setColor(new Color([128, 128, 128])));
                var renderer = new SimpleRenderer(sfs);
                renderer.setColorInfo({
                    field: "count",
                    minDataValue: min,
                    maxDataValue: max,
                    colors: [
                        /*new Color([220, 199, 224, 0.75]),
                         new Color([166, 110, 175, 0.75]),
                         new Color([172, 120, 180, 0.75]),
                         new Color([120, 37, 134, 0.75]),
                         new Color([244, 238, 245, 0.75])*/
                        //new Color([247, 247, 247]),
                        new Color([153, 209, 244, 0.75]),
                        new Color([0, 110, 221, 0.75])
                        //rgb(220, 198, 223)
                        /*new Color([244, 238, 246, 0.75]),
                         new Color([121, 37, 135, 0.75])*/

                    ]
                });
                featureGL.setRenderer(renderer);
                legend.startup();
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

//map.reorderLayer(layer, index);