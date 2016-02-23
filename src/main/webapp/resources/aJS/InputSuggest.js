/**
 * Created by lyp on 2016/2/23.
 */
var InputSuggest = {
    init: function () {
        var suggestURL = 'api/getSuggestions?search=';
        this.suggestCursorToggle();
        this.getSuggestions('#home_search_input', suggestURL);
        this.getSuggestions('#global-search-input', suggestURL);
    },
    getSuggestions: function (inputSelector, sourceURL) {
        var $input = $(inputSelector);
        var $form = $input.closest('form');
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
                        if (resp[$input.attr('id')]) {
                            return $.map(resp[$input.attr('id')], function (item) {
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
        if ($input.length) {
            // Initialize Typeahead with Parameters
            $input.typeahead({hint: false, highlight: true, minLength: 1}, {
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
    },
    suggestCursorToggle: function () {
        //修复typeahead.js的一个bug，参考：https://github.com/twitter/typeahead.js/issues/1195
        $('body').on("mouseover", ".tt-suggestion", function () {
            $('.tt-suggestion').removeClass('tt-cursor');
            $(this).addClass('tt-cursor');
        });
    }
};