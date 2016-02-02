/*---------------------------------------------↓Map-----------------------------------------------*/
var mapSearchURL = "api/mapSearch",
    basemapURL = 'http://10.10.2.81:6080/arcgis/rest/services/China_Community_BaseMap/MapServer',
    countryLayerURL = 'http://10.10.2.81:6080/arcgis/rest/services/world/MapServer/0',
    provinceLayerURL = 'http://10.10.2.81:6080/arcgis/rest/services/testprovince1/FeatureServer/1',
//cityLayer = 'http://10.10.2.81:6080/arcgis/rest/services/testprovince1/FeatureServer/2';
    cityLayerURL = 'http://10.10.2.81:6080/arcgis/rest/services/area/MapServer/1';
var MAP_PAGE_SIZE = 5, featuresDisplayed = {};
var map, countryFS = {}, provinceFS = {}, cityFS = {}, cityLayer, clusterLayer, featureLayer;

function initMap() {
    console.log("FUNCTION CALL: initMap");
    require(
        [
            "esri/map",
            "esri/layers/ArcGISTiledMapServiceLayer",
            "esri/layers/GraphicsLayer",
            "esri/InfoTemplate",
            "esri/layers/FeatureLayer",
            //"esri/dijit/HomeButton",
            //"esri/dijit/Legend",
            "dojo/domReady!"
        ],
        function (Map, ArcGISTiledMapServiceLayer, GraphicsLayer, InfoTemplate, FeatureLayer, HomeButton, Legend) {
            //（1）Create map and add layer
            map = new Map("mapHolder", {
                //basemap: 'gray',
                center: [114.25, 24.1167],
                minZoom: 3,
                maxZoom: 8,
                zoom: 4,
                sliderPosition: "top-right",
                logo: false
            });
            //（1）添加底图
            var basemap = new ArcGISTiledMapServiceLayer(basemapURL);
            map.addLayer(basemap);

            //（2）添加用于显示分布图的graphic layer
            var featureLayerInfoTemplate = new InfoTemplate("${Name_CHN}", "国家：<b>${Name_CHN}<b><br>共发现目标：<b>${count}</b>个");
            featureLayer = new GraphicsLayer(featureLayerInfoTemplate);
            featureLayer.on('click', function (evt) {
                console.log("aaa");
                var attr = evt.graphic.attributes;
                var name = attr.Name_CHN ? attr.Name_CHN : attr.NAME;
                $('.f-country').text(name);
                $('.f-count').text(attr.count);
            });
            /* var legend = new Legend({
             map: map,
             layerInfos: [{layer: featureLayer}]
             }, "legend");
             legend.startup();
             */
            map.addLayer(featureLayer);

            map.on('load', function () {
                console.log("map loaded");
                //（3）添加城市featureLayer
                cityLayer = new FeatureLayer(cityLayerURL, {
                    outFields: ["*"]
                });
                cityLayer.setMaxAllowableOffset(map.extent.getWidth() / map.width);
                //map.addLayer(cityLayer);

                //（4）listener
                $('#sidebarCtrl').on('click', function (e) {
                    e.preventDefault();
                    var $this = $(this);
                    $this.toggleClass('open');
                    if ($this.hasClass('open')) {
                        Sidebar.showOnly();
                        $this.html('<span class="glyphicon glyphicon-triangle-left"></span>' + '显示侧栏');
                    } else {
                        Sidebar.hide();
                        $this.html('<span class="glyphicon glyphicon-triangle-right"></span>' + '显示侧栏');
                    }
                });
                $('#mapSidebarCtrl').on('click', function (e) {
                    e.preventDefault();
                    var $this = $(this), mapSidebar = $('#mapSidebar');
                    //mapSidebar.toggleClass('active');
                    if (!mapSidebar.hasClass('active')) {
                        MapSidebar.show();
                        $this.html('隐藏数据' + '<span class="glyphicon glyphicon-triangle-left"></span>');
                    } else {
                        MapSidebar.hide();
                        $this.html('显示数据' + '<span class="glyphicon glyphicon-triangle-right"></span>');
                    }
                });
                $('.map-sidebar-link')
                    .on('click', function (e) {
                        e.preventDefault();
                        $('#mapSidebar').toggleClass('active')
                    })
                    .on('hover', function (e) {
                        e.preventDefault();
                        $('#mapSidebar').addClass('onHover');
                    });
                //监听tool bar的分布图点击事件
                $('.map-layer a')
                    .on('click', function (e) {
                        e.preventDefault();
                        var $this = $(this);
                        $this.toggleClass('open');
                        if ($this.hasClass('open')) {
                            $('.map-layer a').removeClass('open').find('span').removeClass('glyphicon-eye-open');
                            $this.addClass('open').find('span').addClass('glyphicon-eye-open');
                            MyFeatureLayer.show($this.attr('id'));
                            $('#featureInfo').show()
                        } else {
                            MyFeatureLayer.hide();
                            $this.removeClass('open').find('span').removeClass('glyphicon-eye-open');
                            $('#featureInfo').hide()
                        }
                    });
            });
            map.on('zoom-end', function (e) {
                console.log("zoom levle: " + map.getZoom());
                //research on zoom------------需要添加这样一个按钮（如果用户点击了则执行MyMap.search，否则缩放不重新搜索）
                //MyMap.search(1);
                if ($('#city').hasClass('open')) {
                    MyFeatureLayer.updateCityLayer(featuresDisplayed);
                }
            });

            map.on('pan-end', function (e) {
                console.log("paning: " + map.getZoom());
                //MyMap.search(false, 1);
            });
        });
}

initMap();
//-----------------------------------------分隔线---------------------------
var MyMap = {
    mapPageNum: 1,
    wrapper: $('.map-wrapper-inner'),
    show: function (data) { //滑动到地图页时调用此方法
        console.log("FUNCTION CALL: MyMap.show");

        MySessionStorage.set('currentPage', 'map');
        $('header').css('visibility', ' visible').show();
        if (data) {
            if (data['statuscode'] == 200) {
                //（1）渲染地图
                this.render(data);
                //（2）显示左侧边栏
                if (!Sidebar.onlyUpdate) {
                    Sidebar.show(data['aggregation']);
                } else {
                    Sidebar.update();
                }
            } else {
                this.search(1);
            }
        }
        this.wrapper.show();
    },
    hide: function () {
        console.log("FUNCTION CALL: MyMap.hide");
        this.wrapper.hide();
    },
    render: function (data) {//向地图添加设备标注
        console.log("FUNCTION CALL: MyMap.render");
        if (map) {
            //（1）添加设备层
            addClusters(data['data']);
            //（2）显示地图右侧边栏
            MapSidebar.init(data);
        } else {
            var interval = setInterval(function () {
                if (map) {
                    //（1）添加设备层
                    addClusters(data['data']);
                    //（2）显示地图右侧边栏
                    MapSidebar.init(data);
                    clearInterval(interval);
                }
            }, 1000);
        }

        function addClusters(devices) {
            //监听设备点击事件：缩放，并在地图侧边栏高亮这些设备的。缩放到最大级别时显示windowTemplate----------待添加
            console.log("add cluster -----", devices);
            if (!devices) {
                return;
            }
            if (clusterLayer) {
                map.removeLayer(clusterLayer);
                clusterLayer.clear();
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
                    var ports = d.ports, vuls = d.vuls, portsStr = '', vulsStr = '', imgArr = [];
                    for (var i = 0; i < ports.length; i++) {
                        for (var p in ports[i]) {
                            portsStr += p + ' ';
                        }
                    }
                    for (var j = 0; j < vuls.length; j++) {
                        for (var key in vuls[j]) {
                            vulsStr += key + " ";
                            if (vuls[j][key].hasOwnProperty('imgURL') && vuls[j][key]['imgURL'] != '') {
                                imgArr.push(vuls[j][key]['imgURL']);
                            }
                        }
                    }

                    var attributes = {
                        "IP": d.ip,
                        "Location": d.location,
                        //"Ports": portsStr.substr(0, portsStr.length - 2),
                        "Ports": portsStr,
                        "Tags": d.tags,
                        "Vuls": vulsStr,
                        //"Vuls": vulsStr.substr(0, vulsStr.length - 2),
                        "Timestamp": d.timestamp,
                        "Image": imgArr[0]
                        //"Link": d.link
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
                        "fieldName": "IP",
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
                    }/*, {
                     "fieldName": "Timestamp",
                     "label": "更新时间：",
                     visible: true
                     }*/],
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
                clusterLayer.redraw();

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
    search: function (pageNum) {//updateSidebar, boolean，true，表示更新sidebar，否则不更新
        console.log("FUNCTION CALL: MyMap.search");
        var gValue = $('.global-search-input').val();
        var wd = gValue ? gValue : MySessionStorage.get('wd');
        var checkedStr = MySessionStorage.getCheckedAsStr();
        if (wd && wd != '') {
            var extent = getVisibleExtent();//获取并设置屏幕所在范围的经纬度geo
            var criteria = {
                "geo": extent,
                "wd": wd + checkedStr,
                //"zoomlevel": map.getZoom(),
                "pagesize": MAP_PAGE_SIZE,
                "page": pageNum ? pageNum : this.mapPageNum
            };
            var searchObj = {
                "url": mapSearchURL,
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
    },
    showNoData: function () {
        console.log("FUNCTION CALL: MyMap.showNoData");
        console.log("map no data");
    }
};

var MyFeatureLayer = {
    show: function (which) {
        console.log("FUNCTION CALL: MyFeatureLayer.show");
        var dd = MySessionStorage.get('data');
        if (dd && dd['statuscode'] == 200) {
            map.removeLayer(featureLayer);
            featureLayer.clear();
            switch (which) {
                case 'country':
                    showCountry(dd['aggregation']);
                    break;
                case 'province':
                    showProvince(dd['aggregation']);
                    break;
                case 'city':
                    showCityFromArcGis(dd['aggregation']);
                    break;
            }
        } else {
            MyMap.showNoData();
        }

        function showCountry(agg) {
            //console.log("country is rendering ---------countries==", agg['country@%city']);
            if (!agg['country@%city'] || isEmptyObject(agg['country@%city']))return;
            if (countryFS && countryFS.features && !isEmptyObject(countryFS.features)) {
                render(agg['country@%city'], countryFS.features);
            } else {
                console.log("country layer is not loaded yet. wait...");
                var wait = setInterval(function () {
                    if (countryFS && countryFS.features && !isEmptyObject(countryFS.features)) {
                        render(agg['country@%city'], countryFS.features);
                    }
                }, 1000);
            }
            function render(countries, features) {
                console.log("countryLayer is rendering...");
                var min = Number.MAX_VALUE, max = 0;
                require(["esri/graphic"], function (Graphic) {
                    for (var key in countries) {
                        var country = countries[key];
                        if (country.en && features.hasOwnProperty(country.en)) {
                            var g = features[country.en];
                            g.attributes.count = country.count;
                            g.attributes.Name_CHN = key;
                            featureLayer.add(new Graphic(g));
                            setMinMax(country.count);
                        }
                    }
                    renderFeatureLayer(featureLayer, min, max);
                });
                function setMinMax(count) {
                    if (count < min) {
                        min = count;
                    }
                    if (count > max) {
                        max = count;
                    }
                }
            }
        }

        function showProvince(agg) {
            console.log("province is rendering ...");
            if (!agg['province'] || isEmptyObject(agg['province']))return;
            //console.log("province is rendering -----------++++++++++", provinceFS);
            if (provinceFS && provinceFS.features && !isEmptyObject(provinceFS.features)) {
                render(agg['province'], provinceFS.features);
            } else {
                console.log("province layer is not loaded yet. wait...");
                var wait = setInterval(function () {
                    if (provinceFS && provinceFS.features && !isEmptyObject(provinceFS.features)) {
                        render(agg['province'], provinceFS.features);
                    }
                }, 1000);
            }
            function render(provinces, features) {
                var min = Number.MAX_VALUE, max = 0;
                require(["esri/graphic"], function (Graphic) {
                    /*map.removeLayer(featureLayer);
                     featureLayer.clear();*/
                    for (var key in features) {
                        if (provinces.hasOwnProperty(key)) {
                            console.log('in if');
                            var g = features[key];
                            var count = provinces[key];
                            g.attributes.count = count;
                            featureLayer.add(new Graphic(g));
                            setMinMax(count);
                        }
                    }
                    renderFeatureLayer(featureLayer, min, max);
                });
                function setMinMax(count) {
                    if (count < min) {
                        min = count;
                    }
                    if (count > max) {
                        max = count;
                    }
                }
            }
        }

        function showCityFromArcGis(agg) {
            console.log("city is rendering ...");
            if (!agg['country@%city'] || isEmptyObject(agg['country@%city']))return;
            //console.log("city is rendering -----------++++++++++", cityLayer.graphics);
            var countries = agg['country@%city'], cities = {};
            for (var co in countries) {
                var country = countries[co];
                if (co == '中国' || country.en == 'China') {
                    cities = country['cities'];
                    break;
                }
            }

            if (cityLayer && cityLayer.graphics && cityLayer.graphics.length > 0) {
                render(cities, cityLayer.graphics);
            } else {
                //console.log("city layer is not loaded yet. wait...");
                var wait = setInterval(function () {
                    console.log("ssseee");
                    if (cityLayer && cityLayer.graphics && cityLayer.graphics.length > 0) {
                        render(cities, cityLayer.graphics);
                        clearInterval(wait);
                    }
                }, 1000);
            }

            function render(cities, features) {
                console.log("cityLayer rendering ...", features);
                var min = Number.MAX_VALUE, max = 0;
                /*map.removeLayer(featureLayer);
                 featureLayer.clear();*/
                for (var key in cities) {
                    for (var i = 0; i < features.length; i++) {
                        if (features[i].attributes['Name_CHN'].indexOf(key) >= 0) {
                            var count = cities[key];
                            var g = features[i];
                            g.attributes.count = count;
                            featureLayer.add(g);
                            setMinMax(count);
                            featuresDisplayed[key] = count;
                        }
                    }
                }
                renderFeatureLayer(featureLayer, 0, max);
                function setMinMax(count) {
                    if (count < min) {
                        min = count;
                    }
                    if (count > max) {
                        max = count;
                    }
                }
            }
        }

        function renderFeatureLayer(layer, min, max) {
            require([
                "esri/graphic",
                "esri/renderers/SimpleRenderer", "esri/Color",
                "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol"
                //"esri/dijit/Legend"
            ], function (Graphic, SimpleRenderer, Color, SimpleFillSymbol, SimpleLineSymbol, Legend) {
                var sfs = new SimpleFillSymbol().setOutline(new SimpleLineSymbol().setWidth(0.1).setColor(new Color([128, 128, 128])));
                var renderer = new SimpleRenderer(sfs);
                renderer.setColorInfo({
                    field: "count",
                    minDataValue: min,
                    maxDataValue: max,
                    colors: [
                        //new Color([244, 238, 246, 0]),
                        new Color([221, 200, 225, 0.75]),
                        //new Color([244, 238, 246, 0.7]),
                        new Color([121, 37, 135, 0.7])
                    ]
                });
                layer.setRenderer(renderer);
                map.addLayer(layer, 3);
                layer.show();
                map.reorderLayer(clusterLayer, 100);
            });
        }
    },
    hide: function () {
        console.log("FUNCTION CALL: MyFeatureLayer.hide");
        featureLayer.clear();
        cityLayer.hide();
    },
    updateCityLayer: function (citiesDisplayed) {
        console.log("city is rendering ...");
        var cities = citiesDisplayed;

        if (cityLayer && cityLayer.graphics && cityLayer.graphics.length > 0) {
            render(cities, cityLayer.graphics);
        } else {
            console.log("city layer is not loaded yet. wait...");
            var wait = setInterval(function () {
                if (cityLayer && cityLayer.graphics && cityLayer.graphics.length > 0) {
                    render(cities, cityLayer.graphics);
                }
            }, 1000);
        }

        function render(cities, features) {
            console.log("cityLayer rendering ...", features);
            var min = Number.MAX_VALUE, max = 0;
            /*map.removeLayer(featureLayer);
             featureLayer.clear();*/
            for (var key in cities) {
                for (var i = 0; i < features.length; i++) {
                    if (features[i].attributes['Name_CHN'].indexOf(key) >= 0) {
                        var count = cities[key];
                        var g = features[i];
                        g.attributes.count = count;
                        featureLayer.add(g);
                        setMinMax(count);
                    }
                }
            }
            renderFeatureLayer(featureLayer, 0, max);
            function setMinMax(count) {
                if (count < min) {
                    min = count;
                }
                if (count > max) {
                    max = count;
                }
            }
        }

        function renderFeatureLayer(layer, min, max) {
            require([
                "esri/graphic",
                "esri/renderers/SimpleRenderer", "esri/Color",
                "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol"
                //"esri/dijit/Legend"
            ], function (Graphic, SimpleRenderer, Color, SimpleFillSymbol, SimpleLineSymbol, Legend) {
                var sfs = new SimpleFillSymbol().setOutline(new SimpleLineSymbol().setWidth(0.1).setColor(new Color([128, 128, 128])));
                var renderer = new SimpleRenderer(sfs);
                renderer.setColorInfo({
                    field: "count",
                    minDataValue: min,
                    maxDataValue: max,
                    colors: [
                        //new Color([244, 238, 246, 0]),
                        new Color([221, 200, 225, 0.75]),
                        //new Color([244, 238, 246, 0.7]),
                        new Color([121, 37, 135, 0.7])
                    ]
                });
                layer.setRenderer(renderer);
                map.addLayer(layer, 3);
                layer.show();
                map.reorderLayer(clusterLayer, 100);
            });
        }
    }
};

var MapSidebar = {
    wrapper: $('#mapSidebar'),
    show: function () {
        console.log("FUNCTION CALL: MapSidebar.show");
        this.wrapper.show().addClass('active');
    },
    hide: function () {
        console.log("FUNCTION CALL: MapSidebar.hide");
        this.wrapper.removeClass('active');
    },
    init: function (data) {
        console.log("FUNCTION CALL: MapSidebar.init");
        var devices = data['data'];
        //添加设备
        $('.map-device-list').html('');
        $.each(devices, function (index, d) {
            addDevices(d);
        });
        //分页
        var total = data['total'],
            pagesize = data['pagesize'],
            currpage = data['currpage'];
        paginator(total, pagesize, currpage);

        $('.map-device-list li a').on('click', function (e) {
            e.preventDefault();
            console.log($(this).closest('li').attr('id'));
            $(this).closest('h3').next().toggleClass('on');
        }).hover(function () {
            $(this).closest('h3').next().addClass('on');
        }, function () {
            $(this).closest('h3').next().removeClass('on');
        });
        /*  this.wrapper.on('hover', function (e) {
         $(this).addClass('active');
         });*/

        //添加设备，待补充
        function addDevices(device) {
            //console.log('map sidebar init', device);
            var $li = $('<li id="' + device.ip + '"></li>').appendTo($('.map-device-list'));
            var $title = $('<h3><a href="#">' + device.ip + '</a></h3>').appendTo($li);
            $('#mapa').on('click', function (e) {
                e.preventDefault();
            });

            var $info = $('<div class="well"></div>').appendTo($li);
            var loc = device.location, time = device.timestamp, tags = device.tags, ports = device.ports, portsStr = '', vuls = device.vuls;
            $info.append($('<span>位置：' + loc + '</span><br>'));

            if (ports && ports != '' & ports.length > 0) {
                for (var i = 0; i < ports.length; i++) {
                    for (var key in ports[i]) {
                        portsStr += key + ' '
                    }
                }
            }

            $info.append($('<span>服务：' + portsStr + '</span><br>'));
            var vulsStr = '';
            if (vuls && vuls != '') {
                for (var key in vuls) {
                    vulsStr += key + ' ';
                }
            }
            $info.append($('<span>漏洞：' + vulsStr + '</span>'));
            $info.append($('<span>标签：' + tags + '</span><br>'));
        }

        function paginator(totalCounts, pageSize, currentPageNum) {
            $("#map_pager").jqPaginator({
                totalPages: totalCounts,
                visiblePages: 1,
                currentPage: currentPageNum,
                prev: '<li class="prev"><a href="javascript:void(0);"><span class="glyphicon glyphicon-triangle-left"><\/span><\/a><\/li>',
                next: '<li class="next"><a href="javascript:void(0);"><span class="glyphicon glyphicon-triangle-right"><\/a><\/li>',
                page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
                //page: '<li class="page"><a href="javascript:void(0);"> {{page}} / {{totalPages}} <\/a><\/li>',
                onPageChange: function (n, type) {
                    if (type == 'change') {
                        MyMap.search(n);
                    }
                }
            });
        }
    },
    onSelectionChange: function () {    //用户选择了一个设备的时候，在地图上弹出对应设备的infowindow
        console.log("FUNCTION CALL: MapSidebar.onSelectionChange");
        var selected = map.infoWindow.getSelectedFeature();
        console.log("on selection  change, selected = ", selected);
    }
};