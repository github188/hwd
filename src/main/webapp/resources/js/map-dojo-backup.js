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
 *cityLayer = new FeatureLayer(cityLayerURL, featureLayerOption);
 cityLayer.setMaxAllowableOffset(map.extent.getWidth() / map.width);
 map.addLayer(cityLayer);
 *  */
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
    show: function () {
        require([
                'esri/map',
                'esri/layers/FeatureLayer',
                'esri/dijit/PopupTemplate',
                "esri/symbol/SimpleLineSymbol",
                "esri/symbol/SimpleFillSymbol",
                "esri/Color",
                "esri/renderer/SimpleRenderer",
                "dijit/layout/BorderContainer",
                "dijit/layout/ContentPane",
                "dijit/layout/StackContainer",
                "dijit/form/HorizontalSlider",
                "dijit/form/HorizontalRuleLabels",
                "dojox/lang/functional/fold"
            ], function (Map, FeatureLayer, PopupTemplate, SimpleLineSymbol, SimpleFillSymbol, Color, SimpleRenderer) {
                //variables
                var globals = {};
                globals.map = map;
                globals.layerUrls = [];
                globals.layerScales = {};
                globals.currentFl = null;
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

                //device slider============tbd.dojo
                globals.popSlider = dijit.byId('deviceSlider');
                dojo.connect(globals.popSlider, "onChange", function (evt) {
                    dojo.forEach(globals.currentFl.graphics, function (g) {
                        if (g.attributes.count > evt) {
                            g.hide();
                        } else {
                            g.show();
                        }
                    })
                });


                addFeatureLayers();
/*
                globals.map.on('load', function () {
                    //initUI();
                    addFeatureLayers();
                });*/

                function initUI() {
                    globals.map.on('zoom-end', function () {
                        esri.hide(dojo.byId('maxLabel'));
                        esri.show(dojo.byId('sliderSpinner'));

                        // Hide popup when zooming in or out because geographies could change
                        globals.map.infoWindow.hide();
                    });
                    // Connect click event listeners for "zoom to" links
                    dojo.connect(dojo.byId('zoomCountrys'), 'onclick', function () {
                        globals.map.setLevel(globals.layerScales[0].level);
                    });
                    dojo.connect(dojo.byId('zoomProvinces'), 'onclick', function () {
                        globals.map.setLevel(globals.layerScales[1].level);
                    });
                    dojo.connect(dojo.byId('zoomCitys'), 'onclick', function () {
                        globals.map.setLevel(globals.layerScales[2].level);
                    });
                }

                function addFeatureLayers() {
                    var outline = new SimpleLineSymbol()
                        .setColor(new Color([255, 255, 255]));
                    var sym = new SimpleFillSymbol()
                        .setColor(new Color([52, 67, 83, 0.4]))
                        .setOutline(outline);
                    var renderer = new SimpleRenderer(sym);

                    dojo.forEach(globals.layerUrls, function (info, idx) {
                        globals.featureLayers[idx] = new FeatureLayer(
                            globals.layerUrls[idx], {
                                infoTemplate: globals.flPopupTemplates[idx],
                                mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
                                outFields: globals.outFields[idx]
                            }
                        );
                        globals.featureLayers[idx].setRenderer(renderer);

                        // Apply custom min and max scales when the layer loads
                        dojo.connect(globals.featureLayers[idx], 'onLoad', function () {
                            globals.featureLayers[idx].minScale = globals.layerScales[idx].min;
                            globals.featureLayers[idx].maxScale = globals.layerScales[idx].max;
                        });

                        // Show popup when a feature is clicked
                        dojo.connect(globals.featureLayers[idx], "onClick", function (evt) {
                            globals.map.infoWindow.setFeatures([evt.graphic]);
                            globals.map.infoWindow.show(evt.mapPoint);
                        });

                        // Show re-draw time
                        dojo.connect(globals.featureLayers[idx], 'onUpdateStart', calcRedraw);
                        dojo.connect(globals.featureLayers[idx], 'onUpdateEnd', calcRedraw);

                        // Add this FL to the map
                        globals.map.addLayer(globals.featureLayers[idx]);

                        // Set slider value for first layer
                        if (idx === 0) {
                            dojo.connect(globals.featureLayers[idx], 'onLoad', setSliderMax);
                        }
                    });

                    // Keep track of visible feature layer
                    globals.currentFl = globals.featureLayers[0];
                }

                function setSliderMax(idx) {
                    if (typeof(idx) != 'number') {
                        idx = 0;
                    }
                    var graphics = globals.featureLayers[idx].graphics;
                    var pops = dojo.map(graphics, function (g) {
                        return g.attributes.count;
                    });
                    var max = dojox.lang.functional.reduce(pops, "Math.max(a,b)");
                    dijit.byId('deviceSlider').attr('maximum', max);
                    dijit.byId('deviceSlider').attr('value', max);
                    dojo.byId('maxLabel').innerHTML = formatMaxValue(max);
                    esri.hide(dojo.byId('sliderSpinner'));
                    esri.show(dojo.byId('maxLabel'));
                    // console.log('set slider max to: ', max);
                }

                function formatMaxValue(max) {
                    var maxLen = (max + '').length,
                        maxFormatted = null;
                    if (maxLen > 6) {
                        maxFormatted = (max / 1000000).toFixed(1) + 'M';
                    } else if (maxLen > 3) {
                        maxFormatted = (max / 1000).toFixed(0) + 'K';
                    } else {
                        maxFormatted = max;
                    }
                    return maxFormatted;
                }

                function calcRedraw() {
                    // console.log('calc redraw');
                    if (globals.redrawTimer) {
                        var drawEnd = new Date().getTime(),
                            elapsed = drawEnd - globals.redrawTimer;
                        dojo.byId('redraw-time').innerHTML = elapsed + 'ms';
                        globals.redrawTimer = null;

                        // Update slider max value
                        var currentScale = esri.geometry.getScale(globals.map);
                        if (currentScale > 4000000) {
                            globals.currentFl = globals.featureLayers[0];
                            setSliderMax(0);
                        } else if (currentScale < 4000000 && currentScale > 100000) {
                            globals.currentFl = globals.featureLayers[1];
                            setSliderMax(1);
                        } else if (currentScale < 100000) {
                            globals.currentFl = globals.featureLayers[2];
                            setSliderMax(2);
                        }
                    } else {
                        globals.redrawTimer = new Date().getTime();
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