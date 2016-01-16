var URL = basePath + "api/getResponse4Map",
    Link2List = basePath + "api/getDevicesViaLinkFromMap?ip=",
    LOSSY_COMPRESS = 1;    //压缩级别
var hrefArrReverse = window.location.pathname.split("/").reverse();
var wd = hrefArrReverse[0] != 'device-map' ? decodeURI(hrefArrReverse[0]) : undefined;  //当前用户的搜索条件，初始值由URL传入
var searchArgument = {
    "url": URL
};
var map, aArray4IPs = []; //侧边栏获取到的ip列表;
require(
    [
        "dojo/parser",
        "dojo/ready",
        "dojo/_base/array",
        "esri/Color",
        "dojo/dom-style",
        "dojo/dom-construct",
        "dojo/query",
        "dojo/on",

        "esri/map",
        "esri/request",
        "esri/graphic",
        "esri/geometry/Extent",

        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/symbols/PictureMarkerSymbol",
        "esri/renderers/ClassBreaksRenderer",

        "esri/dijit/HomeButton",
        "esri/layers/GraphicsLayer",
        "esri/SpatialReference",
        "esri/dijit/PopupTemplate",
        "esri/geometry/Point",
        "esri/geometry/ScreenPoint",
        "esri/geometry/webMercatorUtils",

        "extras/ClusterLayer",

        "dijit/layout/BorderContainer",
        "dijit/layout/ContentPane",
        "dojo/domReady!"
    ], function (parser, ready, arrayUtils, Color, domStyle, domConstruct, query, on,
                 Map, esriRequest, Graphic, Extent,
                 SimpleLineSymbol, SimpleMarkerSymbol, SimpleFillSymbol, PictureMarkerSymbol, ClassBreaksRenderer,
                 HomeButton, GraphicsLayer, SpatialReference, PopupTemplate, Point, ScreenPoint, webMercatorUtils,
                 ClusterLayer) {
        ready(function () {
            parser.parse();
            disableButton($('#mapSearchButton'), true);    //地图加载完之前禁用搜索按钮
            var clusterLayer, home, link;

            map = new Map("mapDiv", {
                basemap: "gray",
                center: [113.25, 23.1167],
                //center: [-96.63281250004201, 33.09759959058161],
                zoom: 3,
                minZoom: 3,
                maxZoom: 8,
                sliderPosition: "bottom-right",
                logo: false
            });

            // Home button
            home = new HomeButton({
                map: map
            }, "homeButton").startup();

            map.on("load", function () {
                //console.log("on load");
                disableButton($('#mapSearchButton'), false);
                //若初始wd不为空，则执行查询；
                if (wd) {
                    //（1)设置查询条件
                    setSearchArgument();
                    //(2)查询，并根据返回数据添加所有的graphics到clusterLayer
                    search(searchArgument);
                }

                function addClusters(resp) {
                    var devices = {};
                    var wgs = new SpatialReference({
                        "wkid": 4326
                    });
                    devices.data = arrayUtils.map(resp.data, function (d) {
                        var ip = d.clustersize > 1 ? '' : 'default ip';
                        var latlng = new Point(parseFloat(d.lon), parseFloat(d.lat), wgs);
                        var webMercator = webMercatorUtils.geographicToWebMercator(latlng);
                        var id = d.lon + ', ' + d.lat;
                        var attributes = {
                            "latlng": id,
                            "location": d.location,
                            "clustersize": d.clustersize,
                            "ip": ip,
                            "port": d.ports,
                            "vuls": d.vuls,
                            "os": d.os,
                            "type": d.type
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
                            "fieldName": "latlng",
                            "label": "经纬度：",
                            visible: true
                        }, {
                            "fieldName": "location",
                            "label": "位置：",
                            visible: true
                        }]
                    });

                    if (clusterLayer) { //再次添加前，删除原来的layer，这样处理并不是很好，但仅仅清除clusterLayer的graphics会出错
                        map.removeLayer(clusterLayer);
                    }
                    // cluster layer that uses OpenLayers style clustering
                    clusterLayer = new ClusterLayer({
                        "data": devices.data,
                        "distance": 100,
                        "id": "clusters",
                        "labelColor": "#fff",
                        "labelOffset": 10,
                        "resolution": map.extent.getWidth() / map.width,
                        "singleColor": "#888",
                        "singleTemplate": popupTemplate,
                        "maxSingles": 1000  //默认为1000
                    });
                    //var sls = new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASH, new Color([255, 0, 0]), 3);
                    var defaultSym = new SimpleMarkerSymbol().setSize(4);
                    var renderer = new ClassBreaksRenderer(defaultSym, "clusterCount");

                    var picBaseUrl = basePath + "resources/img/";
                    var blue = new PictureMarkerSymbol(picBaseUrl + "blue.png", 32, 32).setOffset(0, 15);
                    var green = new PictureMarkerSymbol(picBaseUrl + "green.png", 64, 64).setOffset(0, 15);
                    var red = new PictureMarkerSymbol(picBaseUrl + "red.png", 72, 72).setOffset(0, 15);
                    renderer.addBreak(0, 1, blue);
                    renderer.addBreak(1, 200, green);
                    renderer.addBreak(200, 10001, red);
                    clusterLayer.setRenderer(renderer);
                    map.addLayer(clusterLayer);

                    // close the info window when the map is clicked
                    map.on("click", function (e) {
                        cleanUp();
                        console.log("on map click: ", webMercatorUtils.webMercatorToGeographic(e.mapPoint));
                    });
                    map.on("zoom-end", function () {
                        if (map.getZoom() > 5 && !link) {
                            addLink();  // link to query detail info
                        }
                        if (map.getZoom() == map.getMaxZoom) {
                            domStyle.set(query("a.action.zoomTo")[0], "display", "none"); //去掉”缩放至“按钮
                        }
                        cleanUp();
                        /*setSearchArgument();
                         search(searchArgument);*/
                    });

                    // close the info window when esc is pressed
                    map.on("key-down", function (e) {
                        if (e.keyCode === 27) {
                            cleanUp();
                        }
                    });
                }       //添加设备到cluster layer，并将layer添加到地图

                //设置查询条件
                function setSearchArgument() {
                    searchArgument['success'] = addClusters;
                    searchArgument['error'] = error;
                    searchArgument['noDataFunc'] = noDataFunc;
                    searchArgument['criteria'] = getSearchCriteria();
                    searchArgument['searchButton'] = $('#mapSearchButton');
                    searchArgument['searchInput'] = $('#mapSearchInput');
                }

                function addLink() {
                    link = domConstruct.create("a", {
                        "class": "action",
                        "id": "statsLink",
                        "innerHTML": "更多信息", //text that appears in the popup for the link
                        "href": "javascript: void(0);"
                    }, query(".actionList", window.map.infoWindow.domNode)[0]);
                    //when the link is clicked register a function that will run
                    on(link, "click", function (e) {
                        $('#statsLink').innerHTML = "正在查询";
                        var feature = window.map.infoWindow.getSelectedFeature();
                        map.centerAndZoom(feature.geometry, map.getMaxZoom());  //缩放到最大级别，获取部分点的详细信息
                        if (feature.attributes.clustersize > 1) {
                            setSearchArgument();
                            searchArgument['success'] = showSidebar;
                            search(searchArgument);
                        } else {
                            console.log("on click = 1");
                        }
                    });
                }

                //监听搜索表单事件
                $("#mapSearchForm").submit(function (e) {
                    e.preventDefault();
                    disableButton($('#mapSearchButton'), false);
                    setSearchArgument();
                    search(searchArgument);
                });
            });

            function cleanUp() {//隐藏infoWindow
                map.infoWindow.hide();
                if (clusterLayer) {
                    clusterLayer.clearSingles();
                }
            }
        });

        /*
         * @param resp,当isSingle为false时，resp为ajax返回的数据；为true时，为一个设备的信息（参数数据格式不一样，此方法不通用）
         * @param isSingle, boolean类型，是否为当个点，如果为单个点，不显示ipList*/
        function showSidebar(resp, isSingle) {
            var $sidebar = $('#sidebar').show(),
                $ipList = $sidebar.find('.ipList');
            //处理ipList
            if (!isSingle) {
                $ipList.show();
                resp.data.forEach(function (d) {
                    //add each device to the list
                    var $a = $('<a></a>').attr('href', Link2List + d.ip).text(d.ip);
                    $a.on('click', function (e) {
                        e.preventDefault();
                        showDetail(d);
                    });
                    //init List of link
                    aArray4IPs.push($a);
                    $ipList.find('ul').append($('<li></li>').append($a));
                });
            } else {
                $ipList.hide();
            }

            $('.to-list').on('click', function (e) {
                e.preventDefault();
                var feature = window.map.infoWindow.getSelectedFeature();
                console.log(feature);
            });

            //sidebar.removeClass('close');
            function showDetail(d) {
                for (var key in d) {
                    var $detail = $sidebar.find('.detail').show();
                    var $key = $detail.find('#' + key), value = d[key];
                    if (!$key || !value || value == '' || value == 'unknown')continue;
                    if (key == 'ip') {
                        $key.find('div:nth-child(2)').html('<a href="' + Link2List + value + '">' + value + '</a>');
                    } else {
                        $key.find('div:nth-child(2)').text(value);
                    }
                    $key.show();
                }
            }
        }

        //设置查询条件searchCriteria
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

        //获取地图的可视范围的经纬度
        function getVisibleExtent() {
            //ScreenPoint represents a point in terms of pixels relative to the top-left corner of the map control.
            var windowHeight = $(window).height(), windowWidth = $(window).width();
            var sLeftTop = new ScreenPoint(0, 0),
            //sMiddleMiddle = new ScreenPoint(windowWidth / 2, windowHeight / 2),
                sRightBottom = new ScreenPoint(windowWidth, windowHeight);
            var mLeftTop = webMercatorUtils.webMercatorToGeographic(map.toMap(sLeftTop)),
            //mMiddleMiddle = webMercatorUtils.webMercatorToGeographic(map.toMap(sMiddleMiddle)),
                mRightBottom = webMercatorUtils.webMercatorToGeographic(map.toMap(sRightBottom));

            var xL = mLeftTop.x, xR = mRightBottom.x, yT = mLeftTop.y, yB = mRightBottom.y;

            /*if (xL>xR) {
             xR += 360;
             }*/
            //逆时针，4个点，首尾闭合
            var polygonCCW = 'polygon(' +
                xL + ' ' + yT + ',' +             //左上
                xL + ' ' + yB + ',' +             //左下
                xR + ' ' + yB + ',' +             //右下
                xR + ' ' + yT + ',' +             //右上
                xL + ' ' + yT + ')';              //首尾闭合
            return polygonCCW;
        }
    });


/*
 * ajax查询请求，请求查询数据
 * @param：s为一个对象，key为url、criteria、success、error、searchButton、searchInput
 * url：ajax请求地址
 * criteria：查询条件
 * success：ajax成功的回调函数
 * error：ajax失败的回调函数
 * noDataFunc:ajax成功，但返回数据为空的回调函数
 * searchButton：搜索框提交按钮
 * searchInput：搜索框输入按钮
 */
function search(obj) {
    //（1）禁用查询按钮
    disableButton(obj.searchButton, true);
    //（2）查询数据
    $.ajax({
        url: obj.url,
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        timeout: 50000,
        data: JSON.stringify(obj.criteria)
    }).success(function (data) {
        //console.log("data", data);
        //console.log("data size", data.data.length);
        var statuscode = data['statuscode'];
        if (statuscode == 200) {
            obj.success(data, false);
        } else if (statuscode == 555) {
            displayErrorPage();
        } else {
            console.log('Error', data['errmsg']);
            obj.noDataFunc();
        }
        //（3）设置搜索框数据为当前查询条件
        if (data['wd']) {
            setInputValue(obj.searchInput, data['wd'].trim());
        }
    }).error(function (e) {
        disableButton(obj.searchButton, false);
        obj.error(e);
    }).done(function () {
        //（4）启用查询按钮
        disableButton(obj.searchButton, false);
    });
}

//搜索结果为空时的处理
function noDataFunc(data) {
    console.log("no related data found! ", data);
}

//搜索出错的处理
function error(err) {
    console.log("something failed: ", err);
}

//设置搜索框内容
function setInputValue(input, value) {
    input.val(value);
}


function addItemToUl(ul, item) {
    var $a = $('<a></a>').attr('href', Link2List + item.ip).text(item.ip);
    $a.on('click', function (e) {
        e.preventDefault();
        console.log("item", item);
        var $wd = $('#wd'),
            wdText = $wd.val(),
            addon = "ip:" + $(this).text();
        if (wdText.search(new RegExp("\\s" + addon, "gim")) < 0) {
            wdText += ' ' + addon;
        }
        $wd.val(wdText.trim());

    });
    ul.append($('<li></li>').append($a));
}

//监听input的输入事件
document.getElementById('ipInput').oninput = function (e) {
    e.preventDefault();
    var inputText = $('#ipInput').val();
    console.log("inputText", inputText);
    if (inputText != '') {
        for (var i = 0; i < aArray4IPs.length; i++) {
            var a = aArray4IPs[i];
            if (a.text().search(new RegExp(inputText, "gim")) >= 0) {
                console.log(a.text().search(new RegExp(inputText, "gim")));
                a.parent().show();
            } else {
                a.parent().hide();
            }
        }
    }

};