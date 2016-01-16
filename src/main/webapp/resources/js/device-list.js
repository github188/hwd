var URL = basePath + 'api/getResponse4List',
    PAGE_SIZE = 10, //每一页的条目数
    VISIBLE_PAGE = 7; //页码个数
$(function () {
    //获取查询到的设备数据
    if (wd != undefined && wd != '') {
        $('a.to-map').attr('href', basePath + 'device-map/' + wd);//设置to map超链接地址
        searchViaAjax(URL, wd);
    } else {
        console.log("no search response");
        alert("请输入查询条件！");
        window.location.href = '/';
    }

    $("#search_form").submit(function (event) {
        event.preventDefault();
        disableButton($(this).find('button'), true);             // Disable the search button
        var criteria = $('#wd').val().replace(/(^s*)|(s*$)/gm, " ").replace(/\s{2,}/gm, " ");
        searchViaAjax(URL, criteria);
    });

    //文字溢出的处理
    $("pre").click(function (e) {
        $(this).attr("displayLength", "");
        $(this).un_displayPart();
    })
});


/****** aggregation，使用bootstrap的折叠插件******/
$('.collapse').collapse({
    toggle: false
});

//渲染页面
function renderPage(data) {
    //console.log(data);
    var statuscode = data.statuscode;
    if (statuscode == 200) {
        DisplayNoDevice(false);
        var total, pagesize, currpage;
        //wd
        if (data.hasOwnProperty("wd")) {
            var wdText = data["wd"].replace(/(^s*)|(s*$)/gm, " ").replace(/\s{2,}/gm, " ").trim();
            //$('#wd').val(data["wd"].replace(/device_service/g, "protocol").replace(/device_type/g, "type"));//设置搜索框内容
            $('#wd').val(wdText);
            $('a.to-map').attr('href', basePath + 'device-map/' + wdText);//设置to map超链接地址
        }
        //total
        if (data.hasOwnProperty("total")) {
            total = data["total"];
        } else {
            total = data["data"].size();
        }
        $('#total').text(total);       //设置总共的数据条数

        //pagesize
        if (data.hasOwnProperty("pagesize")) {
            pagesize = data["pagesize"];
        } else {
            pagesize = PAGE_SIZE;
        }

        //current page number
        if (data.hasOwnProperty("currpage")) {
            currpage = data["currpage"];
        }

        //took
        if (data.hasOwnProperty("took")) {
            $('#took').text(data["took"]);       //设置总共的数据条数
        }

        //aggregation
        if (data.hasOwnProperty('aggregation')) {
            initAggregation(data["aggregation"]);
        }

        if (data.hasOwnProperty("data")) {
            displayDevices(data["data"]);
        }
        $('#pageTip').html(currpage + '/' + (Math.floor(total / pagesize) + 1));
        paginator(total, pagesize, currpage, VISIBLE_PAGE);
    }
    else if (statuscode == 204) {
        DisplayNoDevice(true);
    } else if (statuscode == 555) {
        displayErrorPage();
    }
    $('html,body').animate({scrollTop: 0}, 500);    //回到顶部
}

//显示左侧导航
function initAggregation(aggregation) {
    for (var key in aggregation) {
        //country
        if (key == "country@%city") {
            $('#' + key.split('@%')[0] + '_panel').show();
            //set country and city
            var countries = aggregation["country@%city"];
            var $cUl = $('#filter_country > ul').html('');
            var countryCount = 0;
            for (var country in countries) {
                countryCount++;
                if (countryCount > 10) {
                    break;
                }
                (function () {
                    if (countries.hasOwnProperty(country)) {
                        var cities = countries[country], total = 0;//total为当前国家所有设备总数
                        var $coLi = $('<li class="list-group-item"></li>').appendTo($cUl);
                        var $coA = $('<a href="#' + 'country' + countryCount + 'cities" data-toggle="collapse" aria-expanded="false" '
                        + 'aria-controls="' + 'country' + countryCount + 'cities">' + country + '</a>').appendTo($coLi);
                        var $coSpan = $('<span class="pull-right"></span>').appendTo($coLi);
                        var $coDiv = $('<div class="collapse" id="' + 'country' + countryCount + 'cities"></div>').appendTo($coLi);
                        var $coDivUl = $('<ul></ul>').appendTo($coDiv);

                        var cityCount = 0;
                        for (var city in cities) {
                            cityCount++;
                            if (cityCount >= 10) {
                                break;
                            }
                            if (cities.hasOwnProperty(city)) {
                                var count = cities[city];
                                var $ciLi = $('<li></li>').appendTo($coDivUl);
                                if (city != "Unknown") {
                                    var $ciA = $('<a href="' + basePath + 'api/getDevicesViaLink?city=' + city + '">' + city + '</a>').appendTo($ciLi);
                                } else {
                                    var $ciA = $('<a>' + city + '</a>').appendTo($ciLi);
                                }
                                $ciLi.append('<span class="pull-right">' + count + '</span>');
                                $ciA.on('click', function (e) {
                                    e.preventDefault();
                                    if (this.href.indexOf("unknown") >= 0) {
                                        //console.log(this);
                                    }
                                    if (this.href != "") {
                                        var $wd = $('#wd'),
                                            wdText = $wd.val(),
                                            addon = "city:" + $(this).text();
                                        if (wdText.search(new RegExp("\\s" + addon + "\\s", "gim")) < 0) {
                                            wdText += ' ' + addon;
                                        }
                                        $wd.val(wdText.trim());
                                        searchViaAjax(URL, wdText);
                                    }
                                });
                                total += count;
                            }
                        }
                        //$coSpan.attr("data-count", total);
                        $coSpan.html(total +
                        '<a href="#' + 'country' + countryCount + 'cities" data-toggle="collapse" aria-expanded="false" ' + 'aria-controls="' + country +
                        '"><i class="glyphicon glyphicon-chevron-down"></i></a>');
                    }
                })();
            }
        } else {
            if (!isEmptyObject(aggregation[key])) {
                $('#' + key + '_panel').show();
                setFilter(key, aggregation[key]);
            }
        }
    }
    function setFilter(id, obj) {
        var $oUl = $('#filter_' + id + ' > ul').html('');
        var count = 0;
        if (id == "port") {//对port排序，count大的在前
            var portArr = [];
            //port对象转换为数组
            for (var p in obj) {
                portArr[p] = obj[p];
            }
            portArr.sort();
        }

        for (var o in obj) {
            count++;
            if (count > 10) break; //只保留前十个记录
            (function () {
                var $oLi = $('<li class="list-group-item"></li>').appendTo($oUl);
                var $oA = $('<a href="#">' + o + '</a>').appendTo($oLi);
                $oA.on('click', function (e) {
                    e.preventDefault();
                    var $wd = $('#wd'),
                        wdText = $wd.val(),
                        addon = id + ":" + $(this).text();
                    if (wdText.search(new RegExp("\\s" + addon, "gim")) < 0) {
                        wdText += ' ' + addon;
                    }
                    $wd.val(wdText.trim());
                    searchViaAjax(URL, wdText);
                });
                $oLi.append('<span class="pull-right">' + obj[o] + '</span>');
            })();
        }
    }
}

//显示设备列表
function displayDevices(devices) {
    var $ul_result = $('ul.result').html('');
    devices.forEach(function (device) {
        var hiddenCount = 0;
        var $li = $('<li></li>').appendTo($ul_result);

        //IP处理
        $('<h4></h4>').append($('<a href="#ip" class="ip">' + device.ip + '</a>')).appendTo($li);
        hiddenCount = 0;

        //一条水平线
        $('<hr>').appendTo($li);

        //标签处理
        var $tags = $('<article class="tags"></article>').appendTo($li);
        device.tags.forEach(function (tag) {
            $('<span class="label label-default"><a href="#tag">' + tag + '</a></span>').appendTo($tags);
        });
        //device_type
        if (device.type != 'unknown' && device.type != undefined) {
            $('<span class="label label-info"><a href="#type">' + device.type + '</a></span>').appendTo($tags);
        }
        //os
        if (device.os != 'unknown' && device.os != undefined) {
            $('<span class="label label-warning"><a href="#os">' + device.os + '</a></span>').appendTo($tags);
        }
        //location
        var location = device.location;
        if (location.hasOwnProperty("country") && location["country"] != "") {
            var $addrWrapper = $('<div></div>').appendTo($tags);
            var $addr = $('<span class="label label-primary"></span>').appendTo($addrWrapper);
            $('<i class="glyphicon glyphicon-map-marker"></i>').appendTo($addr);
            $(' <a href="#country">' + location.country + '</a> ').appendTo($addr);
            if (location["city"] != "") {
                $('<a href="#">' + location.city + '</a>').appendTo($addr);
            }
        }

        //timestamp
        $('<div><span class="label label-danger"><i class="glyphicon glyphicon-time"></i><a>'
        + dateLocalize(device.timestamp) + '</a></span></div>').appendTo($tags);
        var $section = $('<section class="banner" id="' + device.ip + '"></section>').appendTo($li);

        //端口信息
        device.ports.forEach(function (port) {
            for (var key in port) {
                (function () {
                    if (port.hasOwnProperty(key)) {
                        var $pre = $('<pre></pre>').appendTo($section);
                        $pre.html(port[key].banner.replace(/</g, "&lt;"));  //替换掉<免得被误认为是代码中的标签开始标识
                        if (!$pre.text().match(/(^s*)|(s*$)/g)) {   //如果字符串为全为空白符，即不包含任何非空字符，则替换
                            $pre.text('系统注：no data');
                        }
                        var $header = $('<header></header>').appendTo($pre);
                        $('<s><a href="#" id=port"' + key + '">' + port[key].service + ': ' + key + ' </a></s> ').appendTo($header);
                        if (port[key].display == -1) {
                            $pre.addClass('tmp-hide');
                            hiddenCount++;
                        }
                    }
                })();
            }
        });

        //漏洞信息
        device.vuls.forEach(function (vul) {
            for (var key in vul) {
                var $pre_vul = $('<pre></pre>').appendTo($section);
                $pre_vul.html(vul[key].data);
                var $header_vul = $('<header></header>').appendTo($pre_vul);
                $('<s><a href="#" id=port"' + key + '">' + vul[key].vul_type + ': ' + key + ' </a></s> ').appendTo($header_vul);
                if (vul[key].display == -1) {
                    $pre_vul.addClass('tmp-hide');
                    hiddenCount++;
                }
            }
        });

        //未显示信息的处理
        if (hiddenCount > 0) {
            var html = '<button class="btn btn-default pull-right" > 更多<span class="badge">' + hiddenCount + '</span>条相关信息 <i class="glyphicon glyphicon-hand-right"></i></button>';
            var $more = $(html).appendTo($section);
            $more.on('click', function (e) {
                e.preventDefault();
                $(this.closest('section')).find('pre.tmp-hide').toggle('normal');
                if ($more.hasClass("back")) {
                    $more.removeClass("back");
                    $more.html(html);
                } else {
                    $more.addClass('back');
                    $more.html('返回');
                }
            });
        }
    });
    $('ul.result a').on('click', function (e) {
        e.preventDefault();
        /*        var wd = $('#wd').val();
         if (wd.indexOf(this.text()) < 0) wd += $(this).text();
         searchViaAjax(URL, wd);*/
    });
}

/*
 * @param totalCounts：分页的总条目数
 * @param pageSize：每一页的条目数
 * @param currentPage：当前页码
 * @param visiblePages: 最多显示的页码数，默认值7
 */
var HOW_MANY_PAGE_NUMBER_TO_SHOW = 7; //分页组件显示几个页码号
function paginator(totalCounts, pageSize, currentPage, visiblePages) {
    if (visiblePages == undefined) {
        visiblePages = 7;
    }
    var $pagerWrapper = $('#pager').show();
    $pagerWrapper.jqPaginator({
        totalCounts: totalCounts,
        pageSize: pageSize,
        visiblePages: visiblePages,
        currentPage: currentPage,
        first: '<li class="first"><a href="javascript:void(0);">首页</a></li>',
        prev: '<li class="prev"><a href="javascript:void(0);"><i class="glyphicon glyphicon-triangle-left"></i>上一页</a></li>',
        next: '<li class="next"><a href="javascript:void(0);">下一页<i class="glyphicon glyphicon-triangle-right"></i></a></li>',
        last: '<li class="last"><a href="javascript:void(0);">末页<\/a></li>',
        page: '<li class="page"><a href="javascript:void(0);">{{page}}</a></li>',
        //设置页码的Html结构,其中可以使用{{page}}代表当前页，{{totalPages}}代表总页数，{{totalCounts}}代表总条目数
        onPageChange: function (num, type) { //num: 目标页；type:“init”（初始化），“change”（点击分页）
            if (type == 'change') {
                //console.log('{{page}}');
                //console.log(num + ", " + type);
                searchViaAjax(URL, $('#wd').val(), num);
            }
        }
    })

}

//========================HELPER=================================
//时间格式化
function formatDate(timestamp) {
    var length = timestamp.length;
    if (timestamp == undefined || timestamp == '' || length > 13 || length < 11) {
        return '';
    }
    //如果timestamp为11位（没有毫秒数），则进行此转换
    if (timestamp.length == 11) {
        timestamp = timestamp * 1000;
    }
    var now = new Date(parseInt(timestamp));
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    if (hour < 10) {
        hour = '0' + hour;
    }
    var minute = now.getMinutes();
    if (minute < 10) {
        minute = '0' + minute;
    }
    var second = now.getSeconds();
    if (second < 10) {
        second = '0' + second;
    }
    return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}


//设备列表高度控制
function expand(maxHeight) {
    var toggleBanner = function () {
        var $pre = $(this);
        var selection = document.getSelection();
        if ($pre.hasClass("on") && selection && selection.type === "Range")return false;
        $pre.toggleClass("on").css({height: $pre.hasClass("on") ? $pre.data("height") : maxHeight});
    };
    $(".result > li > section").each(function () {
        var $li = $(this);
        var $pre = $li.find("pre"), preHeight = $pre.outerHeight();
        //console.log($pre.outerHeight());
        if (preHeight > maxHeight) {
            //$pre.toggleClass("on").css({height: $pre.hasClass("on") ? $pre.data("height") : maxHeight});
            $pre.data("height", preHeight).addClass("expand").click(toggleBanner)
        }
        var port = +$li.find(".banner i").text(), ip = $.trim($li.find(".ip").text());
        var attached = false;
        var scheme = {http: [80, 81, 8081, 8080, 5060, 591, 593, 981, 2480], https: [443, 1311], ftp: [21]};
        for (var prefix in scheme) {
            if (!scheme.hasOwnProperty(prefix))continue;
            if (scheme[prefix].indexOf(port) > -1) {
                $li.find(".original").attr("href", prefix + "://" + ip + ":" + port).show();
                attached = true;
                break
            }
        }
        if (!attached && $pre.text().match(/^HTTP\//)) {
            $li.find(".original").attr("href", "http://" + ip + ":" + port).show()
        }
    });
}