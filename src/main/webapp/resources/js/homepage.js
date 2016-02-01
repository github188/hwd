var Homepage = {
    tag: 'home',
    wrapper: $('.homeWrapper'),
    show: function () {
        console.log("FUNCTION CALL: HomePage.show");
        MySessionStorage.set('currentPage', this.tag);
        this.wrapper.show();
        $('header').css('visibility', 'hidden').hide();
        $('.sidebar').hide();
        homepage_search_flag = true;
    },
    hide: function () {
        console.log("FUNCTION CALL: HomePage.hide");
        this.wrapper.hide();
    },
    search: function () {
        var wd = $('#home_search_input').val().replace(/\//g, ' ');
        console.log("FUNCTION CALL: HomePage.search, wd = ", wd);
        if (wd == '')return;
        $('.global-search-input').val(wd);
        MySessionStorage.set('wd', wd);
        MySessionStorage.set('currentPage', List.tag);
        MySessionStorage.set('checked', '', 'add');
        homepage_search_flag = true;
        //$('.carousel').carousel(1);
        List.search(1);
        homepage_search_flag = false;
    }
};