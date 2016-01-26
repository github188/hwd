MySessionStorage = {
    get: function (key) {
        switch (key) {
            case 'wd':
                getWd();
                break;
            case 'checked':
                getChecked();
                break;
            case 'data':
                getData();
                break;
            case 'currentPage':
                getCurrentPage();
                break;
            case 'mapExtent':
                getMapExtent();
                break;
        }
        function getWd() {//字符串。返回完整的查询信息，
            return sessionStorage.wd + " " + getChecked();
        }


        function getChecked() {//用空格分隔的键值对字符串，示例："city:北京 country:中国 ..."
            return sessionStorage.checked;
        }

        function getCurrentPage() {//字符串。当前页的id，示例"list"
            return sessionStorage.currentPage;
        }

        function getData() {//JSON对象。返回用户最近一次查询时服务器的响应信息
            return JSON.parse(sessionStorage.data);
        }

        function getMapExtent() {//字符串。返回最近一次地图查询时，查询条件中的geo字段值
            return sessionStorage.mapExtent;
        }
    },
    set: function (key, value, operation) {
        switch (key) {
            case 'wd':
                setWd(value);
                break;
            case 'checked':
                setChecked(value);
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
        }
        function setWd(value) {     //字符串。后端返回的数据中的wd
            sessionStorage.wd = value.replace(/(^s*)|(s*$)/gm, " ").replace(/\s{2,}/gm, " ");//去掉多余空白符
            //replace(/\s+/g, " ");//所有空白符都替换为一个空格
        }

        function setChecked(value, operation) {//字符串。value="(k)CheckboxId_SEPARATOR(v)",为checkbox的id
            var item = value.replace(CheckboxId_SEPARATOR, ":");
            console.log("MySessionStorage get() checked argument, key: " + cK, "value" + cV);
            var checked = this.get('checked');
            if (checked && checked.search(new RegExp("\\s" + item + "\\s", "gim")) < 0) {
                if (operation == 'add') {
                    checked += " " + item;
                }
            } else {
                if (operation == 'remove') {
                    checked.replace(item, " ");
                }

            }
            sessionStorage.checked = checked.replace(/\s{2,}/gm, " ");//去掉多余的空白符
            //replace(/\s+/g, " ");//所有空白符都替换为一个空格
        }

        function setCurrentPage(value) {//字符串，当前carousel的id
            sessionStorage.currentPage = value;
        }

        function setMapExtent(value) {//字符串。在地图上做查询时，ajax请求中带有的geo字段值
            sessionStorage.mapExtent = value;
        }

        function setData(value) {   //json数据。ajax查询成功后台的响应数据，包含wd
            sessionStorage.data = JSON.stringify(value);
        }
    }

};