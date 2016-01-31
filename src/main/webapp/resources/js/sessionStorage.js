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
        if (!value || value == 'undefined') {
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
            if (checked) {
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
            if (data) {
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
            //console.log("FUNCTION CALL: MySessionStorage.setChecked, param = ", value);
            if (value.indexOf(CountryId_SEPARATOR) >= 0) {
                value = value.replace(CountryId_SEPARATOR, '');
            }
            console.log(value);
            var checked = MySessionStorage.get('checked');
            if (value && value.indexOf(CheckboxId_SEPARATOR) > 0) {
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
            if (value) {
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
        console.log(checkedObj);
        var checkedStr = ' ';
        for (var key in checkedObj) {
            console.log(key);
            checkedStr += ' ' + checkedObj[key];
        }
        console.log("all the checked: ", checkedStr);
        return checkedStr;
    }
};


/*
 MySessionStorage = {
 get: function (key) {
 var value = 'undefined';
 switch (key) {
 case 'wd':
 value = getWd();
 break;
 case 'checked':
 value = getChecked();
 break;
 case 'data':
 value = getData();
 break;
 case 'currentPage':
 value = getCurrentPage();
 break;
 case 'mapExtent':
 value = getMapExtent();
 break;
 case 'mapWd':
 value = getMapWd(value);
 break;
 case 'advancedWd':
 value = getAdvancedWd(value);
 break;
 case 'lastSavedWd':
 value = getLastSavedWd(value);
 break;
 }
 return value;
 //字符串。这里有问题。目前返回查询框中数据+checked数据
 //return sessionStorage.wd + " " + getChecked();
 function getWd() {
 var wd = sessionStorage.wd ? sessionStorage.wd : '';
 var globalSearchVal = $('.global-search-input').val();
 var homeSearchVal = $('#home_search_input').val();
 if (homeSearchVal && MySessionStorage.get('currentPage') == 'home' && wd.search(homeSearchVal) < 0) {
 wd += homeSearchVal + " ";
 } else if (globalSearchVal && wd.search(globalSearchVal) < 0) {
 wd += globalSearchVal + " ";
 }
 //wd = (wd + " " + getChecked()).replace(/\bcountry:/, 'description.device_location.country:');
 wd += getChecked();
 return wd;
 }

 function getMapWd() {
 var wd = sessionStorage.mapWd ? sessionStorage.mapWd : '';
 if (wd != '') {
 wd = JSON.parse(sessionStorage.mapWd);
 }
 return wd;
 }

 function getAdvancedWd() {
 var wd = sessionStorage.advancedWd ? sessionStorage.advancedWd : '';
 if (wd != '') {
 wd = JSON.parse(sessionStorage.advancedWd);
 }
 return wd;
 }

 function getLastSavedWd() {
 var which = sessionStorage.lastSavedWd, wd;
 switch (which) {
 case 'map':
 wd = getMapWd();
 break;
 case 'advanced':
 wd = getAdvancedWd();
 break;
 case 'list':
 wd = getWd();
 break;
 }
 return wd;
 }

 function getChecked() {//用空格分隔的键值对字符串，示例："city:北京 country:中国 ..."
 var checked = '';
 if (sessionStorage.checked) {
 checked = sessionStorage.checked;
 }
 //console.log("get checked is ", checked);
 return checked.replace('undefined','');
 }

 function getCurrentPage() {//字符串。当前页的id，示例"list"
 return sessionStorage.currentPage;
 }

 function getData() {//JSON对象。返回用户最近一次查询时服务器的响应信息
 var data = sessionStorage.data;
 if (data) {
 data = JSON.parse(data);
 }
 return data;
 }

 function getMapExtent() {//字符串。返回最近一次地图查询时，查询条件中的geo字段值
 return sessionStorage.mapExtent;
 }
 },
 set: function (key, value, operation) {
 if (!value) {
 console.log("the value passed to MySessionStorage is undefined");
 return;
 }
 switch (key) {
 case 'wd':
 setWd(value);
 break;
 case 'checked':
 setChecked(value, operation);
 break;
 case 'data':
 setData(value);
 break;
 case 'currentPage':
 setCurrentPage(value);
 break;
 case 'mapExtent':
 setMapExtent(value);
 break;
 case 'mapWd':
 setMapWd(value);
 break;
 case 'advancedWd':
 setAdvancedWd(value);
 break;
 case 'lastSavedWd':
 setLastSavedWd(value);
 break;
 }
 function setMapWd(value) {
 if (value) {
 sessionStorage.mapWd = JSON.stringify(value);
 }
 }

 function setAdvancedWd(value) {
 if (value) {
 sessionStorage.advancedWd = JSON.stringify(value);
 }
 }

 function setLastSavedWd(value) {//目前可选值map/list/advanced
 if (value) {
 sessionStorage.lastSavedWd = value;
 }
 }

 function setWd(value) {     //字符串。后端返回的数据中的wd
 console.log('getWd typeof vlaue = ', typeof value);
 if (value && typeof value == 'object') {
 value = JSON.stringify(value);
 } else if (value && value != '') {
 sessionStorage.wd = value.replace(/(^s*)|(s*$)/gm, " ").replace(/\s{2,}/gm, " ");//去掉多余空白符
 }
 //replace(/\s+/g, " ");//所有空白符都替换为一个空格
 }

 function setChecked(value, operation) {//字符串。value="(k)CheckboxId_SEPARATOR(v)",为checkbox的id

 if (value == '空' && operation == 'add') {
 checked = item;
 sessionStorage.checked = checked.replace('undefined', '').replace(/\s{2,}/gm, " ");
 return;
 }
 var item = value.replace(CheckboxId_SEPARATOR, ":");
 if (value.indexOf('_all_') >= 0) {
 item = item.replace('_all_', '')
 }
 var checked = MySessionStorage.get('checked');
 if (checked) {
 if (checked.search(new RegExp("(\\s|^)" + item + "(\\s|$)", "gim")) < 0) {
 if (operation == 'add') {
 checked += " " + item;
 }
 } else {
 if (operation == 'remove') {
 checked = checked.replace(new RegExp("(\\s|^)" + item + "(\\s|$)", "gim"), "");
 }
 }
 } else {    //checked == undefined
 if (operation == 'add') {
 checked = item;
 }
 }
 sessionStorage.checked = checked.replace('undefined', '').replace(/\s{2,}/gm, " ");//去掉多余的空白符
 //replace(/\s+/g, " ");//所有空白符都替换为一个空格
 }

 function setCurrentPage(value) {//字符串，当前carousel的tag值
 sessionStorage.currentPage = value;
 }

 function setMapExtent(value) {//字符串。在地图上做查询时，ajax请求中带有的geo字段值
 sessionStorage.mapExtent = value;
 }

 function setData(value) {   //json数据。ajax查询成功后台的响应数据，包含wd
 //console.log("set session in MysessionStorage, data = ", value);
 if (value || value == '') {
 sessionStorage.data = undefined;
 }
 sessionStorage.data = JSON.stringify(value);
 }
 },
 reset: function () {
 sessionStorage.wd = undefined;
 sessionStorage.data = undefined;
 sessionStorage.mapExtent = undefined;
 }
 };*/
