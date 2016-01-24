/*---------------------------------------------↓List-----------------------------------------------*/
var List = {
    render: function (data) {
        if (isEmptyObject(data)) {
            $carousel.carousel({
                interval: false
            });
            $carousel.carousel(0);
        }
        console.log("result list render", data);
    },
    search: function () {
        console.log("List search");
        var wd = sessionStorage.wd.replace(sessionStorage.currentExtent, '');
    }
};