/**
 * Created by lyp on 2016/2/24.
 */
var Sidebar = {
    _HIDE_SHOW_SPEED: (function () {
        return 700;
    }()),
    _WRAPPER_SEL: (function () {
        return '.sidebar'
    }()),
    show: function () {
        //console.log('Inside Sidebar.show()========');
        $(this._WRAPPER_SEL).show(this._HIDE_SHOW_SPEED);
    },
    hide: function () {
        console.log('Inside Sidebar.hide()========');
        $(this._WRAPPER_SEL).hide(this._HIDE_SHOW_SPEED);
    },
    isHidden: function () {
        console.log('Inside Sidebar.isHidden() ======');
        return $(this._WRAPPER_SEL).is(':hidden');
    },
    init: function () {
        console.log('Inside Sidebar.init() ======');
    }
};