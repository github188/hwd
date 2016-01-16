var INPUT_SUGGESTION_FILE = 'resources/data/devices.json';
var $input = $("#search_input"), $form = $("#search").find('form');
$(function () {
    console.log("on load");
    search.suggest();
});

var search = {
    // -----------------------input suggestion---------------------------
    suggest: function () {
        var suggestions = new Bloodhound({
            datumTokenizer: function (datum) {
                return Bloodhound.tokenizers.whitespace(datum.value);
            },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            prefetch: INPUT_SUGGESTION_FILE,
            remote: {
                url: INPUT_SUGGESTION_FILE,
                limit: 10,
                filter: function (sugst) {
                    console.log(sugst);
                    // Map the remote source JSON array to a JavaScript object array
                    return $.map(sugst.results, function (s) {
                        return {
                            value: s.original_title,
                            release_date: s.release_date
                        };
                    });
                }
            }
        });

        // Initialize the Bloodhound suggestion engine
        suggestions.initialize();

        if ($input.length) {
            $input.typeahead({hint: true, highlight: true, minLength: 1}, {
                name: "app",
                displayKey: "value",
                source: suggestions.ttAdapter(),
                templates: {
                    suggestion: Handlebars.compile("<p><b>{{value}}</b> - Release date {{release_date}} </p>"),
                    footer: Handlebars.compile("<b>Searched for '{{query}}'</b>")
                }
            }).on("typeahead:selected", function (event, suggestion, dataset) {
                $form.submit()
            })
        }
    },

// -----------------------input recommendation ----------------------
    recommend: function () {
        function recommendInput() {
            var url = "/search/dork_ajax";
            var dorks = [];
            var length = 0;

            function randomInput() {
                var recommend = "";
                var random = parseInt(Math.random() * length, 10);
                if ($input.val() == "") {
                    recommend = dorks[random];
                    $input.attr("placeholder", recommend)
                }
                setTimeout(function () {
                    randomInput()
                }, 3e3)
            }

            $.get(url, {}, function (data) {
                dorks = data;
                length = data.length;
                randomInput()
            })
        }

        if ($input.length) {
            setTimeout(function () {
                recommendInput()
            }, 100)
        }
    }
};

$form.on("submit", function () {
    var val = $input.val();
    if (val == "") {
        $input.val($input.attr("placeholder"))
    }
});


var inputSuggestion = function (form,input, url) {
    var urlToSource = function (name) {
        var source = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace("v"),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            limit: 6,
            prefetch: {
                url: url,
                filter: function (list) {
                    return $.map(list, function (key) {
                        return $.isArray(key) && key.length == 2 ? {title: key[0], desc: key[1], v: key[0]} : {
                            title: key,
                            v: key
                        }
                    })
                }
            }
        });
        source.initialize();
        return source.ttAdapter();
    };
    var $input = $("[role=combobox][name=q]"), $form = $("form");
    if ($input.length) {
        $input.typeahead({hint: false, highlight: true, minLength: 1}, {
            name: "app",
            displayKey: "v",
            source: urlToSource("joint"),
            templates: {
                suggestion: Handlebars.compile('<p>{{title}} <span class="muted pull-right">{{desc}}</span></p>'),
                header: ""
            }
        }).on("typeahead:selected", function (event, suggestion, dataset) {
            $form.submit()
        }).on("keypress keydown keyup paste change", function () {
        }).filter(".home-search .flex-text").focus()
    }

};