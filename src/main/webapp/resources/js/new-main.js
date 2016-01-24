// global variables --> dom
var $header = $('header'), $footer = $('footer'), $sidebar = $('.sidebar'),
    $globalInput = $('.global-search-input');
var CheckboxId_SEPARATOR = '_s0s_',//分隔符：key_s0s_value（s零s）
    $carousel = $('.carousel').carousel({"interval": false});

// global variables --> static url
var advancedSearchURL = basePath + 'api/advancedSearch',
    suggestionSearchURL = 'api/getSuggestions?search=',
    getFeatureSetsURL = basePath + 'api/getFeatureSets',
    imgUrl = basePath + "resources/img/";

var featureSets = {};

/* localStorage = {
 'user': '',              //用户信息，包含用户名、密码、级别
 'countryFS': {},         //国家FeatureSet映射表
 'provinceFS': {},        //省份FeatureSet映射表
 'cityFS': {}             //城市FeatureSet映射表
 };*/
/* localStorage = {
 'checkedIds': [],         //用户选中的复选框的id
 'devices': [],         //当前获取到的设备信息
 'aggregation': {}      //当前的聚类信息（即左边栏列表数据）
 };*/
/* ↑---------->>>>>>>>>>>>>>>> Global Variables <<<<<<<<<<<<<<<<< ------------------------------↑ */
$(function () {
    "use strict";
    //~~~~~~~~~~~~~~~~~~~全文必须~~~~~~~~~~~~~~~~~~~~~~~~~
    //Init FeatureSets
    /* if (localStorage) {
     if (!localStorage.featureSets || isEmptyObject((eval(localStorage.featureSets)))) {
     initFeatureSets();
     }
     } else if (sessionStorage) {
     if (!sessionStorage.featureSets || isEmptyObject((JSON.parse(sessionStorage.featureSets)))) {
     initFeatureSets();
     }
     }*/
    initFeatureSets();
    pageSlide();//carousel页面导航
    //初始化之后，跳转到用户当前所在页（同一个session的情况下）
    /*if (sessionStorage) {
     $('section.item').removeClass('active');
     $('section[tag="' + sessionStorage.currentPage + '"]').addClass('active');
     $header.css('visibility', 'visible');
     switch (sessionStorage.currentPage) {
     case 'home':
     showHomePage();
     break;
     case 'list':
     showListPage();
     break;
     case 'map':
     showMapPage();
     break;
     case 'globe-point':
     showGlobePointPage();
     break;
     case 'globe-line':
     showGlobeLinePage();
     break;
     case 'charts':
     showChartsPage();
     break;
     }
     }*/

    //~~~~~~~~~~~~~~~~~~~首页必须~~~~~~~~~~~~~~~~~~~~~~~~~
    showHomePage();

    //~~~~~~~~~~~~~~~~~~~listeners~~~~~~~~~~~~~~~~~~~~~~~~
    //input suggestions
    suggestCursorToggle();
    inputSuggest($('#home_search_input'), suggestionSearchURL);
    inputSuggest($('.global-search-input'), suggestionSearchURL);

    //global search form
    $('.global-search-form').on('submit', function (e) {
        e.preventDefault();
        var currentPage = sessionStorage.currentPage ? sessionStorage.currentPage : $('section.active').attr('tag');
        console.log(currentPage);
        if (currentPage == 'list') {
            List.search(true);//true表示更新侧栏
        } else if (currentPage == 'map') {
            MyMap.search(true); //true表示更新侧栏
        }
    });

    //home search form
    $('.home-search-form').on('submit', function (e) {
        e.preventDefault();
        sessionStorage.wd = $('#home_search_input').val();
        console.log("form search", sessionStorage.wd);
        $('.carousel').carousel(1);  //滑动到list页面
        //List.search(true, 1);   //查询，更新sidebar，显示第一页
    });

    //advanced search link
    $('.advs-link').on('click', function (e) {
        e.preventDefault();
        var $advsWrapper = $('#advs_wrapper').toggleClass('active');
        var dirIndicator = $('.advs-link-main').find('span');
        if ($advsWrapper.hasClass('active')) {
            dirIndicator.removeClass('glyphicon-menu-right').addClass('glyphicon-menu-left');
        } else {
            dirIndicator.removeClass('glyphicon-menu-left').addClass('glyphicon-menu-right');
        }

    });

    //advanced search form controls.close
    $('.close-advs').on('click', function () {
        $('#advs_wrapper').removeClass('active');
    });

    //advanced search form controls.reset
    $('.reset-advs').on('click', function () {
        document.getElementById("advs").reset();
    });

    //date default value
    $('#time_to').val(new Date().toDateInputValue());

    //advanced search form
    $('#advs').on('submit', function (e) {
        e.preventDefault();
        advsSearch(this);
    });
    //~~~~~~~~~~~~~~~~~~~~~~~listener↑~~~~~~~~~~~~~~~~~~~~~~
});


//~~~~~~~~~~~~~~~~~~~~~~~~~~ functions↓~~~~~~~~~~~~~~~~~~~~~


//获取所有的featureSet，保存在所有的localStorage中
function initFeatureSets() {
    $.ajax({
        url: getFeatureSetsURL,
        type: 'post',
        dataType: 'json',
        contentType: "application/json"
    }).success(function (data) {
        /* if (localStorage) {
         localStorage.featureSets = JSON.stringify(data.data);
         } else if (sessionStorage) {
         sessionStorage.featureSets = JSON.stringify(data.data);
         }*/
        featureSets = data.data;
    }).error(function () {
        console.log("Getting feature set error!");
    }).fail(function () {
        console.log("Getting feature set failed!");
    });
}

//页面滑动,使用bootstrap的carousel和slide
function pageSlide() {
    var $carousel = $('.carousel').carousel({"interval": false});
    $carousel.on('slide.bs.carousel', function (event) {
        var tag = $(event.relatedTarget).attr("tag");
        $header.css('visibility', 'visible');
        sessionStorage.currentPage = tag;
        switch (tag) {
            case 'home':
                showHomePage();
                break;
            case 'list':
                showListPage();
                break;
            case 'map':
                showMapPage();
                break;
            case 'globe-point':
                showGlobePointPage();
                break;
            case 'globe-line':
                showGlobeLinePage();
                break;
            case 'charts':
                showChartsPage();
                break;
        }


        var navbtns = $('.navbtn').find('div');
        navbtns.removeClass("bgd-light-blue");
        $.each(navbtns, function (id, item) {
            if ($(item).attr('data-target') == tag) {
                $(item).addClass('bgd-light-blue');
            }
        });
        var progress = $(event.relatedTarget).attr("tabindex") * 120;
        $(".carousel-progress").animate({width: progress, left: (progress / 2) - 400}, 500);
        //playAnimation(tag);
    });
    $("body,html").animate({
        scrollTop: ($(".home").offset().top)
    }, 10);

    //点击切换，起到carousel control的作用
    $('footer .navbtn').on('click', function (e) {
        e.preventDefault();
        var index = $(this).index();
        sessionStorage.pageIdx = index;
        $('.carousel').carousel(index);
        $('#advs_wrapper').removeClass('active');
    });
}

//修复typeahead.js的一个bug，参考：https://github.com/twitter/typeahead.js/issues/1195
function suggestCursorToggle() {
    $('body').on("mouseover", ".tt-suggestion", function () {
        $('.tt-suggestion').removeClass('tt-cursor');
        $(this).addClass('tt-cursor');
    });
}

//输入框实时提示
function inputSuggest(input, sourceURL) {
    var $form = input.closest('form');
    var suggestions = function (dataSource) {
        var bloodHound = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            //Prefetched data is fetched and processed on initialization. If the browser supports local storage,
            // the processed data will be cached there to prevent additional network requests on subsequent page loads.
            prefetch: {
                url: 'resources/data/suggestions.json',
                //url: dataSource,
                limit: 10,
                //ttl: 10000,//The time (in milliseconds) the prefetched data should be cached in local storage. Defaults to 86400000 (1 day).
                filter: function (resp) {
                    if (resp[input.attr('id')]) {
                        return $.map(resp[input.attr('id')], function (item) {
                            return $.isArray(item) && item.length == 2 ? {
                                title: item[0],
                                desc: item[1],
                                value: item[0]
                            } : {
                                title: item,
                                value: item
                            }
                        })
                    } else {
                        var suggestions = [];
                        for (var key in resp) {
                            suggestions = suggestions.concat(resp[key]);
                        }
                        return $.map(suggestions, function (item) {
                            return $.isArray(item) && item.length == 2 ? {
                                title: item[0],
                                desc: item[1],
                                value: item[0]
                            } : {
                                title: item,
                                value: item
                            }
                        })
                    }
                }
            },
            remote: {
                url: dataSource + '%QUERY',
                filter: function (resp) {
                    return $.map(resp.data, function (item) {
                        return $.isArray(item) && item.length == 2 ? {
                            title: item[0],
                            desc: item[1],
                            value: item[0]
                        } : {
                            title: item,
                            value: item
                        }
                    })
                },
                wildcard: '%QUERY'
            }
        });
        // Initialize the Bloodhound suggestion engine
        bloodHound.initialize();
        return bloodHound.ttAdapter();
    };
    if (input.length) {
        // Initialize Typeahead with Parameters
        input.typeahead({hint: false, highlight: true, minLength: 1}, {
            display: "value",
            source: suggestions(sourceURL),
            limit: 10,
            templates: {
                suggestion: function (data) {
                    var result = data.title;
                    if (data.desc) {
                        result += '<span class="muted pull-right">' + data.desc + '</span>'
                    }
                    return '<div>' + result + '</div>'
                }
            }
        }).on("typeahead:selected", function (event, suggestion) {
            //console.log("suggestion", suggestion);
            $form.submit()
        }).on("keypress keydown keyup paste change", function () {
        }).filter(".home-search .flex-text").focus()
    }
}

//Advanced Search 精确搜索
function advsSearch(form) {
    var success = function (data) {
            console.log('success', data);
            //generate sidebar
            initSidebar(data.aggregation);
            //show result
            $('#advs_wrapper').removeClass('active');
            if (sessionStorage.currentPage = 'list') {
                console.log('rending list form advs search');
                List.render(data);
            } else if (sessionStorage.currentPage == 'map') {
                console.log('rending map form advs search');
                MyMap.render(data);
            }
        },
        error = function (data) {
            console.log('error', data);
            $('#advs_wrapper').removeClass('active');
        },
        noData = function (data) {
            console.log('nodata', data);
            $('#advs_wrapper').removeClass('active');
        },
        getCriteria = function () {
            var criteria = {}, ipSegment = '', timeSegment = '',
                inputs = $(form).find('fieldset').find('input');

            for (var i = 0; i < inputs.length; i++) {
                var key = inputs[i].id;
                if ($(inputs[i]).val() != '' && (key == 'country' || key == 'city' || key == 'port' || key == 'os' || key == 'vul' || key == 'device_service' || key == 'device_type')) {
                    setSessionChecked('add', key);
                }

                if (key.indexOf("ip_") >= 0) {
                    ipSegment += $(inputs[i]).val() + '-';
                    continue;
                }

                var timestamp = (Date.parse(new Date($(inputs[i]).val()))) / 1000;
                if (key.indexOf('time_') >= 0) {
                    timeSegment += timestamp + '-';
                    continue;
                }
                criteria[key] = $(inputs[i]).val().replace(/\s+/g, " ");//所有空白符都替换为一个空格
            }
            if (ipSegment != '') {
                criteria['ip'] += ' ' + ipSegment.replace(/^-|-$/g, '');//去掉首尾的“-”和空格
            }
            if (timeSegment != '') {
                timeSegment = timeSegment.replace(/\s+/g, "").replace(/^-|-$/g, '');
                if (timeSegment.indexOf('-NaN') >= 0) {
                    timeSegment = timeSegment.replace('-NaN', '-' + (Date.parse(new Date().toDateInputValue())) / 1000);
                } else if (timeSegment.indexOf('NaN-') >= 0) {
                    timeSegment = timeSegment.replace('NaN-', '');
                }
                criteria['lastModified'] = timeSegment;
            }
            return criteria;
        };

    //arguments
    var obj = {};
    obj["url"] = advancedSearchURL;
    obj['criteria'] = getCriteria();
    obj['success'] = success;
    obj['error'] = error;
    obj['noDataFunc'] = noData;
    obj['searchButton'] = $('.submit-advs');
    newSearch(obj);
}

//设置session的checked
function setSessionChecked(operation, checkedId) {
    var checked = sessionStorage.checked ? JSON.parse(sessionStorage.checked) : {},
        index = checkedId.indexOf(CheckboxId_SEPARATOR),
        cK = checkedId.substring(0, index), cV = checkedId.substring(index);
    if (checked[cK]) {
        switch (operation) {
            case 'add':
                if (checked[cK] && checked[cK].indexOf(cV) < 0) {
                    checked[cK] += ' ' + cV;
                } else {
                    checked[cK] = cV;
                }
                break;
            case 'remove':
                checked[cK].replace(cV, '');
                if (checked[cK] == '' || checked[cK].trim() == '') {
                    delete checked[cK];
                }
                break;
            default :
                break;
        }
        sessionStorage.checked = JSON.stringify(checked);
    }
}

//获取用户已选择的checkbox，返回值为[(key:value),...]
function getChecked() {
    var checkedArr = [];
    if (sessionStorage.checked) {
        var checked = JSON.toJSON(sessionStorage.checked);
        for (var key in checked) {
            var arr = checked[key].split(' ' + CheckboxId_SEPARATOR);
            for (var i = 0; i < arr.length; i++) {
                checkedArr.push(key + ":" + arr[i]);
            }
        }
    }
    return checkedArr;
}

//获取当前查询条件
function getWd() {
    var wd = '';
    if (sessionStorage.wd) {
        wd = sessionStorage.wd;
    } else if ($('.global-search-input').val() != '') {
        wd = $('.global-search-input').val();
    } else if ($('.home-search-input').val() != '') {
        $('.home-search-input').val()
    }
    var checked = getChecked();
    for (var i = 0; i < checked.length; i++) {
        if (wd.indexOf(checked[i]) < 0) {
            wd += checked[i];
        }
    }
    return wd.replace(/\"/g, "");//去掉双引号
}

//show page functions
function showHomePage() {
    $header.css('visibility', 'hidden');
    $sidebar.hide();
}

function showListPage() {
    $('.sidebar').show();
    var agg = sessionStorage.agg ? JSON.parse(sessionStorage.agg) : undefined,
        devices = sessionStorage.devices ? JSON.parse(sessionStorage.devices) : undefined,
        wd = sessionStorage.wd;
    if (agg == undefined && devices == undefined) {
        List.search(true, 1);
    } else {
        List.render({
                "aggregation": agg,
                "data": devices,
                "wd": wd
            }
        );
    }
}

function showMapPage() {
    $('header').show();
    //console.log(sessionStorage);
    if (sessionStorage.agg) {
        initSidebar(JSON.parse(sessionStorage.agg));
    }
    MyMap.render({
        'aggregation': sessionStorage.agg ? JSON.parse(sessionStorage.agg) : undefined,
        'data': sessionStorage.devices ? JSON.parse(sessionStorage.devices) : undefined,
        'wd': getWd()
    });
}

function showGlobePointPage() {
}

function showGlobeLinePage() {
}

function showChartsPage() {
}

/* --------------------------- Helper ------------------------ */
//判断对象是否为空（无属性、有属性但值都为undefined，则为空）
function isEmptyObject(obj) {
    var flag = true;
    for (var n in obj) {
        if (obj[n]) {
            flag = false;
            break;
        }
    }

    return flag;
}

//Format the date value for input
Date.prototype.toDateInputValue = (function () {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
});

//时间格式化
function dateLocalize(timestamp) {
    if (timestamp)  return (new Date(parseInt(timestamp))).toLocaleDateString();
    return timestamp;
}