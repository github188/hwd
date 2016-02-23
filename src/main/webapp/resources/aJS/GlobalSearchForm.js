/**
 * Created by lyp on 2016/2/22.
 */
var GlobalSearchForm = {
    _HIDE_SHOW_SPEED: (function () {
        return 700;
    }()),
    _WRAPPER_SEL: (function () {
        return '.global-search-wrapper'
    }()),
    show: function () {
        //console.log('Inside GlobalSearchForm.show()========');
        $(this._WRAPPER_SEL).show(this._HIDE_SHOW_SPEED);
    },
    hide: function () {
        //console.log('Inside GlobalSearchForm.hide()========');
        $(this._WRAPPER_SEL).hide(this._HIDE_SHOW_SPEED);
    },
    isHidden: function () {
        return $(this._WRAPPER_SEL).is(':hidden');
    }
};