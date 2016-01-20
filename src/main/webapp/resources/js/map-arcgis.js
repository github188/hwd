var URL = "api/getResponse4Map",
    Link2List = "api/getDevicesViaLinkFromMap?ip=",
    LOSSY_COMPRESS = 1,   //压缩级别
    baseURL = 'http://10.10.2.81:6080/arcgis/rest/services/yiyuanyx2/MapServer';
//http://10.10.2.81:6080/arcgis/rest/services/world/MapServer
//http://10.10.2.81:6080/arcgis/rest/services/area/MapServer
initMap();
function initMap() {
}

/*
 * ajax查询请求
 * @param：obj为一个对象，key为url、criteria、success、error、searchButton、searchInput
 *          url：ajax请求地址(required)
 *          criteria：查询条件
 *          success：ajax成功的回调函数(required)
 *          error：ajax失败的回调函数
 *          noDataFunc:ajax成功，但返回数据为空的回调函数
 *          searchButton：搜索框提交按钮
 *          searchInput：搜索框输入按钮
 */
function mapSearch() {

}