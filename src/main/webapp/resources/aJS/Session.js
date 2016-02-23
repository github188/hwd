var Session = {
//需要保存到session中的数据：
// username（string）用户名
// checked checkboxId（array）用户选中的复选框的id
// data（JSONObject）最近一次ajax获取到的数据
    get: function (key) {
        var value;
        switch (key) {
            case 'username':  //List
                value = getUsername();
                break;
            case 'checked': //Array
                value = getChecked();
                break;
            case 'data':    //JSONObject
                value = getData();
                break;
        }
        if (!value || value == 'undefined' || value == '') {
            value = undefined;
        }
        return value;

        function getUsername() {
            var uname = sessionStorage.getItem('username');
            if (uname) {
                uname = uname.trim();
            }
            return uname;
        }

        function getChecked() {
            var checked = sessionStorage.getItem('checked');
            if (checked && checked != 'undefined') {
                checked = JSON.parse(checked)
            }
            return checked;
        }

        function getData() {//JSONObject
            var data = sessionStorage.getItem('data');
            if (data && data != 'undefined') {
                data = JSON.parse(data);
            }
            return data;
        }
    },
    set: function (key, value, operation) {
        switch (key) {
            case 'username':
                setUsername(value);
                break;
            case 'checked':
                setChecked(value, operation);
                break;
            case 'data':    //JSONObject。搜索到的数据（ajax返回的原始数据数据），只能由全局search方法设置，其他方法只能读取。
                setData(value);
                break;
        }
        function setUsername(value) {   //string
            if (value && value != '') {
                sessionStorage.setItem('username', value);
            }
        }

        function setChecked(value, operation) {//array
            if (value == undefined || value == 'undefined' || value == '') {
                return
            }

            var checked = [];
            if (Session.get('checked')) {
                checked = Session.get('checked');
            }
            switch (operation) {
                case 'add':
                    checked.push(value);
                    break;
                case 'remove':
                    checked.splice(jQuery.inArray(value, checked), 1);
                    break;
            }
            if (checked.length === 0) {
                Session.reset('checked');
            } else {
                sessionStorage.setItem('checked', JSON.stringify(checked));
            }
        }

        function setData(value) {   //JSONObject
            if (value && value != 'undefined') {
                sessionStorage.setItem('data', JSON.stringify(value));
            }
        }
    },
    reset: function (key) {
        sessionStorage.removeItem(key);
    }
};

