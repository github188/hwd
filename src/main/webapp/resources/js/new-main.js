var $advs = $('.advs-wrapper'),
    $advsControl = $('.advs-link-main').find('span'),
    $header = $('header').hide(),
    pivotsContainer = $('.pivot-bar-container').hide();
var wd; //全局搜索条件，为搜索框中的值+用户在侧边栏选择的条件，每次搜索结束后都要设置这个值
$(function () {
    "use strict";
    //input suggestions
    suggestCursorToggle();
    inputSuggest($('.global-search-input'), "api/getSuggestions?search=");
    //carousel
    pageSlide();

    /*-------------listeners-----------*/
    //global search form
    $('.global-search-form').on('submit', function (e) {
        console.log(e);
    });
    advancedSearch();
});

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
                url: 'resources/data/countries.json',
                limit: 10,
                filter: function (list) {
                    return $.map(list, function (item) {
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
function advancedSearch() {
    //date default value
    $('#time_to').val(new Date().toDateInputValue());

    //advanced search link
    $('.advs-link').on('click', function (e) {
        e.preventDefault();
        if (!($advs.hasClass('active'))) {
            $advs.addClass('active');
            $advsControl.removeClass('glyphicon-menu-right').addClass('glyphicon-menu-left');
        } else {
            $advs.removeClass('active');
            $advsControl.removeClass('glyphicon-menu-left').addClass('glyphicon-menu-right');
        }
    });
    //advanced search form
    $('#advs').on('submit', function (e) {
        e.preventDefault();
        advsSearch(this);
    });
    //advanced search from controls.close
    $('.close-advs').on('click', function () {
        $advs.removeClass('active');
    });
    //advanced search from controls.reset
    $('.reset-advs').on('click', function () {
        document.getElementById("advs").reset();
    });
    //advanced search form input for ip
    $('#ip').on('blur', function () {
        //d+.d+.d+.d+，验证ip地址的合法性，预留
    });
    function advsSearch(form) {
        var success = function (data) {
                console.log('success', data);
                //generate sidebar
                initSidebar(data.aggregation);
                $advs.removeClass('active');
            },
            error = function (data) {
                console.log('error', data);
                $advs.removeClass('active');
            },
            noData = function (data) {
                console.log('nodata', data);
                $advs.removeClass('active');
            };
        var criteria = {}, ipSegment = '', timeSegment = '',
            inputs = $(form).find('fieldset').find('input');

        for (var i = 0; i < inputs.length; i++) {
            var key = inputs[i].id;
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

        //arguments
        var obj = {};
        obj["url"] = 'api/advancedSearch';
        obj['criteria'] = criteria;
        obj['success'] = success;
        obj['error'] = error;
        obj['noDataFunc'] = noData;
        obj['searchButton'] = $('.submit-advs');
        console.log(obj);
        newSearch(obj);
    }
}

//Format the date value
Date.prototype.toDateInputValue = (function () {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
});

//页面滑动,使用bootstrap的carousel和slide
function pageSlide() {
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
        console.log(progress);
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
        switch (index) {
            case 0: //home
                onHomePageShow();
                break;
            default:
                $header.show();
        }
        $('.carousel').carousel(index);
    });
}

function onHomePageShow() {
    $header.hide();
}

/* --------------------------- Helper ------------------------ */
//判断对象是否为空
function isEmptyObject(obj) {
    for (var n in obj) {
        return false
    }
    return true;
}













