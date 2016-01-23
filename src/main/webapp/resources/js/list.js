/*---------------------------------------------↓List-----------------------------------------------*/
var List = {
    render: function (data) {
        console.log("result list render", data);
    },
    search: function () {
        console.log("List search");
        var wd = sessionStorage.wd.replace(sessionStorage.currentExtent, '');
    }
};