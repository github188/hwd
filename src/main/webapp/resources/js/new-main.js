// global variables --> dom
var $header = $('header'),
    $globalInput = $('.global-search-input');
var CheckboxId_SEPARATOR = '_s0s_',//分隔符：key_s0s_value（s零s）
    featureSets = {};

// global variables --> static url
var advancedSearchURL = basePath + 'api/advancedSearch',
    listSearchURL = basePath + '/api/getResponse4List',
    suggestionSearchURL = 'api/getSuggestions?search=',
    getFeatureSetsURL = basePath + 'api/getFeatureSets',
    imgUrl = basePath + "resources/img/";

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
    //input suggestions
    suggestCursorToggle();
    inputSuggest($('.global-search-input'), suggestionSearchURL);

    //carousel
    pageSlide();

    //hide some doms
    $('.sidebar').hide();

    /*-------------listeners-----------*/
    //global search form
    $('.global-search-form').on('submit', function (e) {
        var success = function (data) {
            initSidebar(data['aggregation']);

        };
        var searchObj = {};
        searchObj['wd'] = $('.global-search-input').val();
        console.log(e);
    });


    //home search form -----------------------------------------------------------------?

    //advanced search---------------------------↓------------------------
    //advanced search link
    $('.advs-link').on('click', function (e) {
        e.preventDefault();
        $('#advs_wrapper').toggleClass('active');
        var dirIndicator = $('.advs-link-main').find('span');
        dirIndicator.toggleClass('glyphicon-menu-right');
        dirIndicator.toggleClass('glyphicon-menu-left');
    });
    //advanced search form
    $('#advs').on('submit', function (e) {
        e.preventDefault();
        advsSearch(this);
    });
    //advanced search form controls.close
    $('.close-advs').on('click', function () {
        $('#advs_wrapper').removeClass('active');
    });
    //advanced search form controls.reset
    $('.reset-advs').on('click', function () {
        document.getElementById("advs").reset();
    });
    //advanced search form input for ip
    $('#ip').on('blur', function () {
        //d+.d+.d+.d+，验证ip地址的合法性，预留
    });
    //date default value
    $('#time_to').val(new Date().toDateInputValue());

    //初始化之后，使用session中保存的数据做用户定制
    //session
    if (sessionStorage && sessionStorage.pageIdx) {
        console.log(sessionStorage.pageIdx);
        $('.carousel').carousel({
            interval: false
        });
        $('.carousel').carousel(parseInt(sessionStorage.pageIdx));
    }
});

//------------------------------输入框实时提示-------------------------------------//
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

//修复typeahead.js的一个bug，参考：https://github.com/twitter/typeahead.js/issues/1195
function suggestCursorToggle() {
    $('body').on("mouseover", ".tt-suggestion", function () {
        $('.tt-suggestion').removeClass('tt-cursor');
        $(this).addClass('tt-cursor');
    });
}

//------------------------Advanced Search 精确搜索----------------------------------//


function advsSearch(form) {
    var success = function (data) {
            //console.log('success', data);
            //generate sidebar
            initSidebar(data.aggregation);
            $('#advs_wrapper').removeClass('active');
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


//---------------------------其他------------------------
//页面滑动,使用bootstrap的carousel和slide
function pageSlide() {
    var $carousel = $('.carousel').carousel({"interval": false});
    $carousel.on('slide.bs.carousel', function (event) {
        var tag = $(event.relatedTarget).attr("tag");
        sessionStorage.currentPage = tag;
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
        switch (index) {
            case 0: //home
                onHomePageShow();
                break;
            default:
                $header.show();
        }
        $('.carousel').carousel(index);
        $('#advs_wrapper').removeClass('active');
    });
}

//首页显示时，隐藏header
function onHomePageShow() {
    $header.hide();
}

//获取查询的关键词
function getWd() {
    var wd = $globalInput.val(), checked = sessionStorage.checked ? JSON.parse(sessionStorage.checked) : {};
    for (var key in checked) {
        wd += key + ':' + checked[key].replace(CheckboxId_SEPARATOR, '');
    }
    return wd;
}

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

/* --------------------------- Helper ------------------------ */
//判断对象是否为空
function isEmptyObject(obj) {
    var flag = true;
    for (var n in obj) {
        return flag;
    }
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