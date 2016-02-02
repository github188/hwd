var CheckboxId_SEPARATOR = '_s0s_',//分隔符：key_s0s_value（s零s）
    PivotId_SEPARATOR = '_pivot_',
    CountryId_SEPARATOR = '_all_';
var homepage_search_flag = false;
var suggestionSearchURL = 'api/getSuggestions?search=',
    imgUrl = "resources/img/",
    getCountryFeatureSetURL = 'api/getCountryFeatureSet',
    getProvinceFeatureSetURL = 'api/getProvinceFeatureSet';
var featureSets = {}, countryFS = {};       //全局变量

var is_loaded = false;  // 全局变量：初始化完成标记
$(function () {
    "use strict";
    //setIframe();
    jQAddress();
    getCountryFeatureSet();
    getProvinceFeatureSet();
    //~~~~~~~~~~~~~~~~~~~全文必须~~~~~~~~~~~~~~~~~~~~~~~~~
    pageSlide();//carousel页面导航
    Sidebar.onlyUpdate = false;

    //初始化之后，跳转到用户当前所在页（同一个session的情况下）
    if (sessionStorage) {
        var currentPage = MySessionStorage.get('currentPage');
        if (!currentPage) {
            $('.carousel').carousel(0);
        }
        var wd = MySessionStorage.get('wd');
        if (wd) {
            $('.global-search-input').val(wd);
        }
        var data = MySessionStorage.get('data');
        if (data && data['statuscode'] == 200) {
            $('.carousel').carousel(parseInt($('section[tag="' + currentPage + '"]').attr('tabindex')) - 1);
        } else {
            $('.carousel').carousel(0);
        }
    }

    //~~~~~~~~~~~~~~~~~~~listeners~~~~~~~~~~~~~~~~~~~~~~~~
    //input suggestions
    suggestCursorToggle();
    inputSuggest($('#home_search_input'), suggestionSearchURL);
    inputSuggest($('.global-search-input'), suggestionSearchURL);

    //global search form
    $('.global-search-form').on('submit', function (e) {
        e.preventDefault();
        console.log("search in global form");
        var criteria = $('.global-search-input').val();
        if (criteria == '')return;
        MySessionStorage.set('wd', criteria);
        var currentPage = MySessionStorage.get('currentPage') ? MySessionStorage.get('currentPage') : $('section.active').attr('tag');
        if (currentPage == 'list') {
            List.search(1);
        } else if (currentPage == 'map') {
            MyMap.search(1);
        }
    });

    //home search form
    $('.home-search-form').on('submit', function (e) {
        e.preventDefault();
        console.log("home form search");
        Homepage.search();
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
        AdvSearch.hide();
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
        AdvSearch.search(this);
    });
    //~~~~~~~~~~~~~~~~~~~~~~~listener↑~~~~~~~~~~~~~~~~~~~~~~
});


//~~~~~~~~~~~~~~~~~~~~~~~~~~ functions↓~~~~~~~~~~~~~~~~~~~~~
//页面滑动,使用bootstrap的carousel和slide
function pageSlide() {
    console.log("FUNCTION CALL: pageSlide");
    var $carousel = $('.carousel').carousel({"interval": false});
    $carousel.on('slide.bs.carousel', function (event) {
        var tag = $(event.relatedTarget).attr("tag");
        var navbtns = $('.navbtn').find('div');
        navbtns.removeClass("bgd-light-blue");
        $.each(navbtns, function (id, item) {
            if ($(item).attr('data-target') == tag) {
                $(item).addClass('bgd-light-blue');
            }
        });
        var progress = $(event.relatedTarget).attr("tabindex") * 120;
        $(".carousel-progress").animate({width: progress, left: (progress / 2) - 400}, 500);
        var wd = MySessionStorage.get('wd');
        if (wd && wd != '') {
            $('.global-search-input').val(wd);
        }
        var data = MySessionStorage.get('data');    //当data.statuscode!=200的时候需要做特殊处理，待开发-------------
        switch (tag) {
            case 'home':
                Homepage.show();
                break;
            case 'list':
                if (!homepage_search_flag) {
                    List.show(data);
                }
                break;
            case 'map':
                MyMap.show(data);
                break;
            case 'globe-point':
                MySessionStorage.set('currentPage', 'globe-point');
                GlobePoint.show();
                //window.location.href = 'device-globe';
                break;
            case 'globe-line':
                GlobeLine.show();
                //window.location.href = 'device-probe-globe';

                break;
            case 'charts':
                Charts.show();
                alert("更多内容，静待后续奉上！");
                break;
        }
    });
    $("body,html").animate({
        scrollTop: ($(".home").offset().top)
    }, 10);

    //点击切换，起到carousel control的作用
    $('footer .navbtn').on('click', function (e) {
        console.log("FUNCTION CALL: footer navbtn is clicked");
        e.preventDefault();
        var index = $(this).index();
        $('.carousel').carousel(index);
        $('#advs_wrapper').removeClass('active')
    });
}

//修复typeahead.js的一个bug，参考：https://github.com/twitter/typeahead.js/issues/1195
function suggestCursorToggle() {
    $('body').on("mouseover", ".tt-suggestion", function () {
        $('.tt-suggestion').removeClass('tt-cursor');
        $(this).addClass('tt-cursor');
    });
}

function getFeatureSet(url, featureSet) {
    $.ajax({
        url: url,
        type: "post",
        contentType: "application/json",
        dataType: "json",
        timeout: 50000
    }).success(function (data) {
        //console.log(url + "  succeed.", data);
        if (featureSet == 'country') {
            countryFS = data.data;
        } else if (featureSet == 'province') {
            provinceFS = data.data;
        } else if (featureSet == 'city') {
            cityFS = data.data;
        }
    }).error(function () {
        console.log("Getting country feature set error!");
    }).fail(function () {
        console.log("Getting country feature set failed!");
    });
}

//获取国家Layer数据
function getCountryFeatureSet() {
    console.log("FUNCTION CALL: getCountryFeatureSet");
    getFeatureSet(getCountryFeatureSetURL, 'country');
}
//获取省份Layer数据
function getProvinceFeatureSet() {
    console.log("FUNCTION CALL: getProvinceFeatureSet");
    getFeatureSet(getProvinceFeatureSetURL, 'province');
}

//输入框实时提示
function inputSuggest(input, sourceURL) {
    $.address.value('/');
    var $form = input.closest('form');
    var suggestions = function (sourceURL) {
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
                url: sourceURL + '%QUERY',
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

// --------------------------- Helper ------------------------ //
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

var GlobePoint = {
    show: function () {
        Sidebar.hide();
        point.window.starts();
    }
};
var GlobeLine = {
    show: function () {
        Sidebar.hide();
        line.window.starts();
    }
};
var Charts = {
    show: function () {
        Sidebar.hide();
    }
};