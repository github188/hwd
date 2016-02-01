/**
 * Created by lyp on 2016-01-31.
 * 使用jquery.address插件，控制网页的前进和后退
 * event包含如下属性：value, path, pathNames, parameterNames, parameters and queryString.
 */
function jQAddress() {
    $.address
        .state(basePath)  //这里需要基本URL（字符串）,地址不改变部分,一般为初始化进入页面地址
        .init(function (event) {    //插件初始化, $('a').address(); 实现链接单击监听，$('form').address()：实现表单提交监听
            /* $('form').address();
             $('a').address();*/
        })
        .change(function (e) {  //当页面地址更改的时候调用,例如#号之后的地址更改，只要url变化就会触发此事件
            console.log("event.value = ", e.value);
            console.log("event.path = ", e.path);
            if (is_loaded) { // 防止初始化时多余 AJAX 加载当前页面
                if (e.value != '/') {
                    console.log('=================!=/ parameters = ', e.parameters);
                    //searchByGet($.address.state() + e.value);
                    //searchByPost($.address.state() + e.value, e.parameters.search);
                } else {
                    console.log('==/');
                }
                for (var p in e.parameters) {
                    e.parameters[p] = decodeURIComponent(e.parameters[p].replace(/\+/g, ' '));
                }
                $('form').deserialize(e.parameters);
            }
            is_loaded = true;
        });
}


/*---------------------------------------Function Search--------------------------*/
function searchByGet(url) {
    console.log("FUNCTION CALL: SearchByGet", url);
    var homeSearchBtn = $('#home-search-btn'),
        globalSearchBtn = $('.global-search-button'),
        globalSearchInput = $('.global-search-input'),
        advsBtn = $('.submit-advs');

    //（1）禁用查询按钮，如果是form查询
    disableButton(homeSearchBtn, true);
    disableButton(globalSearchBtn, true);
    disableButton(advsBtn, true);
    //（2）查询数据
    $.ajax({
        url: url,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        timeout: 50000
    })
        .success(function (data) {
            var statuscode = data['statuscode'];
            //设置sessionStorage
            MySessionStorage.set('data', data);
            //设置global_search_input.val的值为sessionStorage.wd
            if (statuscode == 200) {
                var currentPage = MySessionStorage.get('currentPage');
                if (currentPage) {
                    if (currentPage == 'list') {
                        List.show(data);
                    } else if (currentPage == 'map') {
                        MyMap.show(data);
                    }
                }
            } else if (statuscode == 204) {
                alert("no data found");
                noData();
            } else {
                console.log("ajax success with data error" + data['statuscode'], data['errmsg']);
                alert("ajax search error");
                errorHandler();
            }
        })
        .error(function (e) {
            console.log("Error", e);
            disableButton(homeSearchBtn, false);
            disableButton(globalSearchBtn, false);
            disableButton(advsBtn, false);
            errorHandler();
        }).done(function () {
            //启用查询按钮
            disableButton(homeSearchBtn, false);
            disableButton(globalSearchBtn, false);
            disableButton(advsBtn, false);
        });

    //启用/禁用指定的按钮
    function disableButton(button, flag) {
        if (button) {
            button.prop("disabled", flag);
        }
    }
}

function searchByPost(url, requestParam) {
    console.log("FUNCTION CALL: newSearch", "url : " + url, "param = ", requestParam);
    var homeSearchBtn = $('#home-search-btn'),
        globalSearchBtn = $('.global-search-button'),
        globalSearchInput = $('.global-search-input'),
        advsBtn = $('.submit-advs');

    //（1）禁用查询按钮，如果是form查询
    disableButton(homeSearchBtn, true);
    disableButton(globalSearchBtn, true);
    disableButton(advsBtn, true);
    //（2）查询数据
    $.ajax({
        url: url,
        type: "post",
        contentType: "application/json",
        dataType: "json",
        timeout: 50000,
        data: requestParam
    })
        .success(function (data) {
            var statuscode = data['statuscode'];
            //设置sessionStorage
            MySessionStorage.set('data', data);
            //设置global_search_input.val的值为sessionStorage.wd
            if (statuscode == 200) {
                var currentPage = MySessionStorage.get('currentPage');
                if (currentPage) {
                    if (currentPage == 'list') {
                        List.show(data);
                    } else if (currentPage == 'map') {
                        MyMap.show(data);
                    }
                }
            } else if (statuscode == 204) {
                alert("no data found");
                noData();
            } else {
                console.log("ajax success with data error" + data['statuscode'], data['errmsg']);
                alert("ajax search error");
                errorHandler();
            }
        })
        .error(function (e) {
            console.log("Error", e);
            disableButton(homeSearchBtn, false);
            disableButton(globalSearchBtn, false);
            disableButton(advsBtn, false);
            errorHandler();
        }).done(function () {
            //启用查询按钮
            disableButton(homeSearchBtn, false);
            disableButton(globalSearchBtn, false);
            disableButton(advsBtn, false);
        });

    //启用/禁用指定的按钮
    function disableButton(button, flag) {
        if (button) {
            button.prop("disabled", flag);
        }
    }
}