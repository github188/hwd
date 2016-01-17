var $advs = $('.advs-wrapper');
$(function () {
    "use strict";
    suggestCursorToggle();
    inputSuggest($('.global-search-input'), "api/getSuggestions?search=");

    /*-------------listener-----------*/
    //global search form
    $('.global-search-form').on('submit', function (e) {
        e.preventDefault();
        console.log(e);
    });
    //advanced search link
    $('.advs-link').on('click', function (e) {
        e.preventDefault();
        if (!($advs.hasClass('active'))) {
            $advs.addClass('active');
        } else {
            $advs.removeClass('active');
        }
    });
    //advanced search form
    $('#advs').on('submit', function (e) {
        e.preventDefault();
        advsSearch(this);
    });
    //advanced close button
    $('.close-advs').on('click', function () {
        $advs.removeClass('active');
    });
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

function advsSearch(form) {
    var success = function (data) {
            console.log('success', data);
        },
        error = function (data) {
            console.log('error', data);
        },
        noData = function (data) {
            console.log('nodata', data);
        };
    var criteria = {}, ipSegment = '', timeSegment = '',
        inputs = $(form).find('fieldset').find('input');

    for (var i = 0; i < inputs.length; i++) {
        var key = inputs[i].id;
        if (key.indexOf("ip_") >= 0) {
            ipSegment += $(inputs[i]).val() + '-';
            continue;
        }
        if (key.indexOf('time_') >= 0) {
            var timestamp = (Date.parse(new Date($(inputs[i]).val()))) / 1000;
            timeSegment += timestamp + '-';
            continue;
        }
        criteria[key] = $(inputs[i]).val();
    }
    criteria['ip'] += ' ' + ipSegment.replace(/^-|-$/g, '');
    criteria['timestamp'] = timeSegment.substr(0, timeSegment.length - 1);

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



















