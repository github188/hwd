//获取数据，渲染界面
/* @param url：请求数据的地址
 * @param criteria：用户输入的查询条件
 * @param page：请求的页码数（仅用于分页）
 * @used for 导航窗格中的表单发起的查询请求
 * */
function searchViaAjax(url, criteria, page) {
    var search = {};
    search["page"] = 1;
    search["wd"] = criteria.replace(/(^\s*)|(\s*$)/g, ""); //去掉搜索条件中的首尾空格符
    if (page != undefined) {
        search["page"] = page;
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: url,
        data: JSON.stringify(search),
        dataType: 'json',
        timeout: 10000
    }).success(function (data) {
        console.log("SUCCESS: ", data);
        renderPage(data);
    }).fail(function (f) {
        console.log("FAIL: ", f);
        //display(data);
    }).error(function (e) {
        console.log("ERROR: ", e);
        //display(e);
    }).done(function (d) {
        //console.log("DONE", d);
        enableSearchButton(false);
    });
}

//禁用/启用特定按钮#search_btn
function enableSearchButton(flag) {
    $("#search_btn").prop("disabled", flag);
}

//启用/禁用指定的按钮
function disableButton(button, flag) {
    if (button) {
        button.prop("disabled", flag);
    }
}

function setSearchInputValue(input, value) {
    if (input) {
        input.val(value);
    }
}

//没有搜索到相关设备时，界面显示内容
var DisplayNoDevice = function (flag) {
    var $mainP = $('#to_map'), $mainDiv = $('#main>div');
    if (flag) {
        console.log("aaaaaa", flag);
        $mainDiv.hide();
        $mainP.hide();
        var $no = $('.no-device').html("没有搜索到相关设备，试试其他搜索条件吧！");
        $('<a href="/">搜索</a>').appendTo($no);
        $no.show();
    } else {
        $mainP.show();
        $mainDiv.show();
        $('#main div.no-device').hide();
    }
};

//自测试使用
function display(data) {
    var json = "<pre style='background: transparent; color:#eee'>"
        + JSON.stringify(data, null, 4) + "</pre>";
    $('#feedback').html(json);
    $('#tab_nav a[href="#feedback"]').tab('show');
}