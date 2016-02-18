/*---------------------------------------------↓Map-----------------------------------------------*/
var basemapURL = 'http://10.10.2.81:6080/arcgis/rest/services/China_Community_BaseMap/MapServer',
    countryLayerURL = 'http://10.10.2.81:6080/arcgis/rest/services/testprovince1/FeatureServer/2',
//    countryLayerURL = 'http://10.10.2.81:6080/arcgis/rest/services/world/MapServer/0',
    provinceLayerURL = 'http://10.10.2.81:6080/arcgis/rest/services/testprovince1/FeatureServer/1',
//cityLayerURL = 'http://10.10.2.81:6080/arcgis/rest/services/testprovince1/FeatureServer/0';
    cityLayerURL = 'http://10.10.2.81:6080/arcgis/rest/services/area/MapServer/1';
var countryLayer, provinceLayer, cityLayer, map;
function initMap() { //网站加载时调用此方法
    //listener
    $('.sidelist').on('click', function (e) {
        e.preventDefault();
        $('#mapSidebar').toggleClass('active');
    });
    $('.map-sidebar-link').on('click', function (e) {
        e.preventDefault();
        $('#mapSidebar').toggleClass('active');
    });
//map initial
    require(
        [
            "esri/map",
            "esri/layers/ArcGISTiledMapServiceLayer",
            "esri/layers/GraphicsLayer",
            "esri/InfoTemplate",
            "esri/layers/FeatureLayer",
            "esri/dijit/HomeButton",
            "esri/symbols/SimpleFillSymbol",
            "dojo/domReady!"
        ],
        function (Map, ArcGISTiledMapServiceLayer, GraphicsLayer, InfoTemplate, FeatureLayer, HomeButton, SimpleFillSymbol) {
            //（1）Create map and add layer
            map = new Map("mapHolder", {
                //basemap: 'gray',
                //center: [114.25, 24.1167],
                minZoom: 3,
                maxZoom: 8,
                zoom: 4,
                sliderPosition: "bottom-right",
                logo: false
            });
            //（1）添加底图
            var basemap = new ArcGISTiledMapServiceLayer(basemapURL);
            map.addLayer(basemap);

            map.on('load', function () {
                console.log("map loaded");
                //监听tool bar
                $('.feature').on('click', function () {
                    var dd = MySessionStorage.get('data');
                    console.log('feature tool is clicked! ');
                    if (dd && !isEmptyObject(dd)) {
                        FeatureLayers.show();
                    } else {
                        console.log("no data, try search!")
                    }
                });
            });

            map.on('zoom-end', function (e) {
                console.log("zoom level: " + map.getZoom());
            });
        });
}
initMap();

MyMap = {
    //显示地图页
    show: function () {
    },
    //渲染地图：添加clusterLayer俩显示设备
    render: function () {
    },
    //管理web页面的搜索功能
    search: function () {
    },
    //切换到其他页面的一些善后工作
    hide: function () {
    }
};
FeatureLayers = {
    //显示当前视图范围的feature层
    show: function (agg) {
        require([
                'esri/map',
                'esri/layers/FeatureLayer',
                'esri/dijit/PopupTemplate',
                "esri/symbol/SimpleLineSymbol",
                "esri/symbol/SimpleFillSymbol",
                "esri/Color",
                "esri/renderer/SimpleRenderer"
                /* "dijit/layout/BorderContainer",
                 "dijit/layout/ContentPane",
                 "dijit/layout/StackContainer",
                 "dijit/form/HorizontalSlider",
                 "dijit/form/HorizontalRuleLabels",
                 "dojox/lang/functional/fold"*/
            ],
            function (Map, FeatureLayer, PopupTemplate, SimpleLineSymbol, SimpleFillSymbol, Color, SimpleRenderer) {
                //variables
                var globals = {};
                globals.map = map;
                globals.layerUrls = [];
                globals.layerScales = {};
                globals.currentFl = null;
                globals.layerCounts = [];
                globals.layerRendererColorInfos = [];
                globals.redrawTimer = null;
                globals.popSlider = null;

                //FeatureLayers
                globals.layerUrls.push(countryLayerURL);//country
                globals.layerUrls.push(provinceLayerURL);//province
                globals.layerUrls.push(cityLayerURL);//city

                // Define custom min/max scales for the feature layers
                // Used after all layer information is available
                globals.layerScals = [
                    {min: 0, max: 4000000, level: 3},    //country
                    {min: 4000000, max: 100000, level: 6},    //province
                    {min: 100000, max: 0, level: 8}   //city
                ];

                //Popup templates
                global.flPopupTemplates = [];
                global.flPopupTemplates.push(new PopupTemplate({//country
                        title: "{NAME}",
                        fieldInfos: [{fieldName: "count", visible: true, label: "共发现设备数："}]
                    })
                );
                global.flPopupTemplates.push(new PopupTemplate({//province
                        title: "{NAME_CHN}",
                        fieldInfos: [{fieldName: "count", visible: true, label: "共发现设备数："}]
                    })
                );
                global.flPopupTemplates.push(new PopupTemplate({//city
                        title: "{NAME_CHN}",
                        fieldInfos: [{fieldName: "count", visible: true, label: "共发现设备数："}]
                    })
                );

                globals.outFields = [];
                // Countries
                globals.outFields.push(["NAME_CHN", "count"]);
                // Provinces
                globals.outFields.push(["NAME_CHN", "count"]);
                // Cities
                globals.outFields.push(["NAME_CHN", "count"]);

                setCountAndRenderColorInfo();
                addFeatureLayers();

                function addFeatureLayers() {
                    var outline = new SimpleLineSymbol()
                        .setColor(new Color([255, 255, 255]));
                    var sym = new SimpleFillSymbol()
                        .setColor(new Color([52, 67, 83, 0.4]))
                        .setOutline(outline);
                    var renderer = new SimpleRenderer(sym);

                    $.each(globals.layerUrls, function (info, idx) {
                        globals.featureLayers[idx] = new FeatureLayer(
                            globals.layerUrls[idx], {
                                infoTemplate: globals.flPopupTemplates[idx],
                                mode: FeatureLayer.MODE_ONDEMAND,
                                outFields: globals.outFields[idx]
                            }
                        );
                        for (var i = 0; i < globals.featureLayers[idx].length; i++) {

                        }
                        globals.featureLayers[idx].setRenderer(renderer);

                        // Apply custom min and max scales when the layer loads
                        globals.featureLayers[idx].on('load', function () {
                            globals.featureLayers[idx].minScale = globals.layerScales[idx].min;
                            globals.featureLayers[idx].maxScale = globals.layerScales[idx].max;
                        });

                        // Show popup when a feature is clicked
                        globals.featureLayers[idx]("click", function (evt) {
                            globals.map.infoWindow.setFeatures([evt.graphic]);
                            globals.map.infoWindow.show(evt.mapPoint);
                        });

                        // Add this FL to the map
                        globals.map.addLayer(globals.featureLayers[idx]);

                    });

                    // Keep track of visible feature layer
                    globals.currentFl = globals.featureLayers[0];
                }

                function setCountAndRenderColorInfo() {
                    //counts=[{name1:count1,name2:count2...},...]country,province,city
                    var countries = agg['country@%city'], provinces = agg['provinces'], cities;
                    var pMin = Number.MAX_VALUE, pMax = 0, coMin = Number.MAX_VALUE, coMax = 0, cMin = Number.MAX_VALUE, cMax = 0;

                    //Countries
                    var countryCount = {};
                    for (var co in countries) {
                        var country = countries[co], count = country.count;
                        countryCount[country.en] = count;
                        if (co == '中国' || country.en == 'China') {
                            cities = country['cities'];
                        }
                        if (count < coMin) {
                            coMin = count;
                        }
                        if (count > coMax) {
                            coMax = count;
                        }
                    }
                    globals.layerCounts[0] = countryCount;
                    globals.layerRendererColorInfos[0] = {
                        field: "count",
                        minDataValue: 0,
                        maxDataValue: coMax,
                        colors: [
                            new Color([255, 255, 255, 0]),
                            new Color([244, 238, 246, 0.7]),
                            new Color([121, 37, 135, 0.7])
                        ]
                    };

                    //Cities
                    globals.layerCounts[2] = cities ? cities : {};
                    for (var c in cities) {
                        if (cities[c] < cMin) {
                            cMin = cities[c];
                        }
                        if (cities[c] > cMax) {
                            cMax = cities[c];
                        }
                    }
                    globals.layerRendererColorInfos[2] = {
                        field: "count",
                        minDataValue: 0,
                        maxDataValue: cMax,
                        colors: [
                            new Color([255, 255, 255, 0]),
                            new Color([244, 238, 246, 0.7]),
                            new Color([121, 37, 135, 0.7])
                        ]
                    };

                    //Provinces
                    globals.layerCounts[1] = provinces;
                    for (var p in provinces) {
                        if (provinces[p] < pMin) {
                            pMin = provinces[p];
                        }
                        if (provinces[p] > pMax) {
                            pMax = provinces[p];
                        }
                    }
                    globals.layerRendererColorInfos[1] = {
                        field: "count",
                        minDataValue: 0,
                        maxDataValue: pMax,
                        colors: [
                            new Color([255, 255, 255, 0]),
                            new Color([244, 238, 246, 0.7]),
                            new Color([121, 37, 135, 0.7])
                        ]
                    };

                    //for test
                    for (var i = 0; i < globals.layerCounts.length; i++) {
                        console.log(globals.layerCounts[i]);
                    }
                }
            }
        );
    },
//添加并渲染国家、城市、省份
    render: function () {
    }
    ,
    hide: function () {
    }
}
;