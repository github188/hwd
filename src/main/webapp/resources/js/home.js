var HomePage = {
    tag: 'home',
    wrapper: $('.homeWrapper'),
    show: function () {
        MySessionStorage.set('currentPage', this.tag);
        this.wrapper.show();
        $('header').css('visibility', 'hidden').hide();
        $('.sidebar').hide();
    },
    hide: function () {
        this.wrapper.hide();
    },
    search: function () {
        MySessionStorage.set('wd', $('#home_search_input').val());
        MySessionStorage.set('currentPage', List.tag);
        List.search(1);
    }
};