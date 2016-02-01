MySessionStorage = {
    get: function (key) {
        var value;
        switch (key) {
            case 'wd':  //字符串。搜索框中用户的输入，当currentPage为home时，wd值为home_search_input的val，否则为global_search_input的val。
                value = getWd();
                break;
            case 'checked': //JSONObject。用户选中的复选框数据。每一个key:value对为（checkbox的id）:（将分隔符替换为“:”后的值）。
                value = getChecked();
                break;
            case 'data':    //JSONObject。搜索到的数据（ajax返回的原始数据数据），只能由全局search方法设置，其他方法只能读取。
                value = getData();
                break;
            case 'currentPage': //字符串。用户当前所在页面。取值包含：home、list、map、globe-point、globe-line和charts。
                value = getCurrentPage();
                break;
            case 'advsCriteria':
                value = getAdvsCriteria();
                break;
        }
        if (!value || value == 'undefined' || value == '') {
            value = undefined;
        }
        console.log("get sessionStorage " + key + " = ", value);
        return value;

        function getAdvsCriteria() {
            return JSON.parse(sessionStorage.advsCriteria);
        }

        function getWd() {
            //console.log("FUNCTION CALL: MySessionStorage.getWd");
            var wd = sessionStorage.wd;
            if (wd) {
                wd = wd.trim();
            }
            return wd;
        }

        function getChecked() {
            //console.log("FUNCTION CALL: MySessionStorage.getChecked");
            var checked = sessionStorage.checked;
            if (checked && checked != 'undefined') {
                checked = JSON.parse(sessionStorage.checked)
            }
            return checked;
        }

        function getCurrentPage() {
            //console.log("FUNCTION CALL: MySessionStorage.getCurrentPage");
            return sessionStorage.currentPage;
        }

        function getData() {//JSON对象。返回用户最近一次查询时服务器的响应信息
            //console.log("FUNCTION CALL: MySessionStorage.getData");
            var data = sessionStorage.data;
            if (data && data != 'undefined') {
                data = JSON.parse(data);
            }
            return data;
        }
    },
    set: function (key, value, operation) {
        switch (key) {
            case 'wd':
                setWd(value);
                break;
            case 'checked':
                setChecked(value, operation);
                break;
            case 'data':    //JSONObject。搜索到的数据（ajax返回的原始数据数据），只能由全局search方法设置，其他方法只能读取。
                setData(value);
                break;
            case 'currentPage': //字符串。用户当前所在页面。取值包含：home、list、map、globe-point、globe-line和charts。
                setCurrentPage(value);
                break;
            case 'advsCriteria':
                setAdvsCriteria(value);
                break;
        }

        function setAdvsCriteria(value) {
            //console.log("FUNCTION CALL: MySessionStorage.setAdvsCriteria, param = ", value);
            sessionStorage.advsCriteria = JSON.stringify(value);
        }

        //字符串。搜索框中用户的输入，当currentPage为home时，wd值为home_search_input的val，否则为global_search_input的val。
        function setWd(value) {
            //console.log("FUNCTION CALL: MySessionStorage.setWd, param = ", value);
            if (value && value != '') {
                sessionStorage.wd = value.replace(/(^s*)|(s*$)/gm, " ").replace(/\s{2,}/gm, " ");//去掉多余空白符
            }
        }

        function setChecked(value, operation) {//JSONObject。用户选中的复选框数据。每一个key:value对为（checkbox的id）:（将分隔符替换为“:”后的值）。
            console.log("FUNCTION CALL: MySessionStorage.setChecked, param = ", value);
            if (value == undefined || value == 'undefined' || value == '') {
                sessionStorage.checked = value;
                return
            }
            if (value.indexOf(CountryId_SEPARATOR) !== -1) {
                value = value.replace(CountryId_SEPARATOR, '');
            }
            var checked = MySessionStorage.get('checked');
            if (value.indexOf(CheckboxId_SEPARATOR) !== -1) {
                switch (operation) {
                    case 'add':
                        if (checked && typeof checked == 'object') {
                            if (!checked.hasOwnProperty(value)) {
                                checked[value] = value.replace(CheckboxId_SEPARATOR, ":");
                            }
                        } else {
                            checked = {};
                            checked[value] = value.replace(CheckboxId_SEPARATOR, ":");
                        }
                        break;
                    case 'remove':
                        if (checked && typeof checked == 'object' && checked.hasOwnProperty(value)) {
                            delete checked[value];
                        }
                        break;
                }
            }
            sessionStorage.checked = JSON.stringify(checked);
        }

        function setCurrentPage(value) {
            //console.log("FUNCTION CALL: MySessionStorage.setCurrentPage, param = ", value);
            sessionStorage.currentPage = value;
        }

        function setData(value) {   //json数据。ajax查询成功后台的响应数据
            //console.log("FUNCTION CALL: MySessionStorage.setData", value);
            if (value && value != 'undefined') {
                sessionStorage.data = JSON.stringify(value);
            }
        }
    },
    reset: function () {
        //console.log("FUNCTION CALL: MySessionStorage.reset");
        sessionStorage.wd = undefined;
        sessionStorage.data = undefined;
        sessionStorage.currentPage = undefined;
        sessionStorage.checked = undefined;
    },
    getCheckedAsStr: function () {
        //console.log("FUNCTION CALL: MySessionStorage.getCheckedAsStr");
        var checkedObj = this.get('checked');
        var checkedStr = ' ';
        for (var key in checkedObj) {
            checkedStr += ' ' + checkedObj[key];
        }
        console.log("all the checked str: ", checkedStr);
        return checkedStr.replace('undefined', '');
    }
};

