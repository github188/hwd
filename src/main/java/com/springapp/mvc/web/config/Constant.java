package com.springapp.mvc.web.config;

/*
 * Created by lyp on 2016-01-22.
 * @author lyp
 * @date 2016-01-22
 * @Description: 保存所有的常亮，使用配置文件配置之前先用此方法存放常量
 * @Version: V1.0
 */
public class Constant {
    //--------------------------------↓接口-------------------------------//
    //↓搜索平台相关URL（提供设备搜索的相关接口）
    private static final String SE_BASEPATH = "http://10.10.2.143:8083/se/";//搜索平台根目录
    public static final String SE_GET_SUGGESTION_URL = SE_BASEPATH + "search/advanced/completionsuggest";//-输入框提示
    public static final String SE_ADVANCED_SEARCH_URL = SE_BASEPATH + "search/advanced?q={q}";//-高级搜索
    public static final String SE_MAP_SEARCH_URL = SE_BASEPATH + "search/map?q={q}";//-地图场景下的搜索
    public static final String SE_LIST_SEARCH_URL = SE_BASEPATH + "search?wd={wd}&page={page}";//-普通（文字）场景下的搜索
    public static final String SE_MARKPOINT_SEARCH_URL = SE_BASEPATH + "search/mapcluster?q={q}";//-3D设备展示场景下的搜索

    //↓逻辑平台相关URL（提供3D地图数据流展示数据的接口）
    private static final String LG_BASEPATH = "http://10.10.2.84:8082/";//裸机平台根目录
    public static final String LG_MARKLINE_SEARCH_URL = LG_BASEPATH + "devicescan/getLinesSegment?numPerPage=100&pageId=";

    //↓用户管理平台相关URL（提供用户登录注册服务的相关接口），以下各接口地址的参数和返回值信息参见 http://10.10.2.24:4567/LoginRegistAPI
    private static final String WUM_BASEPATH = "http://10.10.2.174:8080/wum/";
    public static final String WUM_REGISTER_URL = WUM_BASEPATH + "regist/senduserinfo.json";
    public static final String WUM_UNIQUE_USERNAME_CHECK_URL = WUM_BASEPATH + "regist/uniquenamecheck.json";//String username
    public static final String WUM_UNIQUE_EMAIL_CHECK_URL = WUM_BASEPATH + "regist/uniqueemailcheck.json"; //String email
    public static final String WUM_LOGIN_URL = WUM_BASEPATH + "login/validate.json"; //String nam，String psw（密码，前端应该先通过sha1加密一次）
    public static final String WUM_FORGET_PASSWORD = WUM_BASEPATH + "login/forgetpwd.json";  //发送找回密码邮件

    //ArcGis地图相关URL（提供全球歌各国的区域、中国各省份区域、中国各城市区域的数据）
    private static final String ARCGIS_BASEPATH = "http://10.10.2.81:6080/arcgis/rest/services/";
    public static final String countryFeatureSetURL = ARCGIS_BASEPATH + "world/MapServer/0/query?f=json&where='Shape'='面'&returnGeometry=true&spatialRel=esriSpatialRelIntersects&outFields=NAME,REGION&callback=";
    public static final String provinceFeatureSetURL = ARCGIS_BASEPATH + "sheng/MapServer/0/query?f=json&where='OBJECTID'>'0'&returnGeometry=true&spatialRel=esriSpatialRelIntersects&outFields=*&callback=";
    public static final String cityFeatureSetURL = ARCGIS_BASEPATH + "area/MapServer/1/query?where=OBJECTID+>+1+AND+OBJECTID+<+40&returnGeometry=true&returnIdsOnly=false&returnCountOnly=false&returnZ=false&returnM=false&f=pjson";
    //--------------------------------接口↑-------------------------------//

    //--------------------------------↓数据常量---------------------------//
    //-ArcGis与搜索平台SE提供的数据中，省份名称的映射表
    public static final String provinceNameMappingArc_ES = "{\"安徽省\":\"安徽\",\"澳门特别行政区\":\"澳门\",\"北京市\":\"北京\",\"福建省\":\"福建\",\"甘肃省\":\"甘肃\",\"广东省\":\"广东\",\"广西壮族自治区\":\"广西\",\"贵州省\":\"贵州\",\"海南省\":\"海南\",\"河北省\":\"河北\",\"河南省\":\"河南\",\"黑龙江省\":\"黑龙江\",\"湖北省\":\"湖北\",\"湖南省\":\"湖南\",\"吉林省\":\"吉林\",\"江苏省\":\"江苏\",\"江西省\":\"江西\",\"辽宁省\":\"辽宁\",\"内蒙古自治区\":\"内蒙古\",\"宁夏回族自治区\":\"宁夏\",\"青海省\":\"青海\",\"山东省\":\"山东\",\"山西省\":\"山西\",\"陕西省\":\"陕西\",\"上海市\":\"上海\",\"四川省\":\"四川\",\"台湾省\":\"台湾\",\"天津市\":\"天津\",\"西藏自治区\":\"西藏\",\"香港特别行政区\":\"香港\",\"新疆维吾尔自治区\":\"新疆\",\"云南省\":\"云南\",\"浙江省\":\"浙江\",\"重庆市\":\"重庆\"}";
    //-注册用户的默认等级
    public static final int WUM_USER_LEVEL = 5;
    //--------------------------------数据常量↑---------------------------//
}
