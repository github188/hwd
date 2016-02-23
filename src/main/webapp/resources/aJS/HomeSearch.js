var HomeSearch = {
    init: function () {
        console.log('Inside HomeSearch.init() ======');
        var $form = $('#home-search-form');
        $form.on('submit', function (e) {
            e.preventDefault();
            var wd = $('#home_search_input').val().replace(/\//g, ' ');
            var successCallback = function (data) {
                var statuscode = data['statuscode'];
                //（1）设置sessionStorage
                Session.set('data', data);
                Session.reset('checked');
                if (statuscode == 200) {
                    //（2）调用List的init渲染页面
                    console.log('statuscode==200', data);
                    //（3）跳转到se_search/sl_search_list
                    $.fn.fullpage.silentMoveTo('se_search', 'sl_search_list');
                } else if (statuscode == 204) {
                    console.log('statuscode == 204');
                    noData(data);
                } else {
                    console.log('error');
                }
            };
            var errorCallback = function () {
                $.Showmsg("操作失败，请稍后再试！");
                setTimeout(function () {
                    $.Hidemsg();
                }, 3000);
            };
            var requestObj = {
                url: 'api/listSearch',
                success: successCallback,
                error: errorCallback,
                data: {
                    wd: wd,
                    page: 1
                }
            };
            if (wd == '')return;    //如果输入为空白，则不查询
            $('.global-search-input').val(wd);  //（1）为全局搜索框赋值
            LoadData.post(requestObj);           //（2）搜索
        });
    }
};