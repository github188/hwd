var HomeSearch = {
    search: function () {
        console.log('Inside HomeSearch.search() ======');
        var wd = $('#home_search_input').val().replace(/\//g, ' ');
        if (wd == '')return;
        $('.global-search-input').val(wd);
        MySessionStorage.set('wd', wd);
        MySessionStorage.set('currentPage', List.tag);
        MySessionStorage.set('checked', '', 'add');
        homepage_search_flag = true;
        //$('.carousel').carousel(1);
        Sidebar.onlyUpdate = false;
        Pivot.init();
        List.search(1);
        homepage_search_flag = false;
    }
};