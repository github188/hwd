package com.springapp.mvc.web.config;

/**
 * Created by lyp on 2016-01-22.
 * 保存所有的常亮，使用配置文件配置之前先用此方法存放常亮
 */
public class Constant {
    public static final String suggestionSearchURL = "http://10.10.12.72:8083/se/search/advanced/completionsuggest";
    public static final String advancedSearchURL = "http://10.10.12.72:8083/se/search/advanced?q={q}";
    public static final String mapSearchURL = "http://10.10.12.72:8083/se/search/map?q={q}";
    public static final String listSearchURL = "http://10.10.2.143:8083/se/search?wd={wd}&page={page}";
    public static final String markpointSearchURL = "http://10.10.2.143:8083/se/search/mapcluster?q={q}";
    public static final String marklineSearchURL = "http://10.10.2.84:8082/devicescan/getLinesSegment?numPerPage=100&pageId=";

    public static final String countryFeatureSetURL = "http://10.10.2.81:6080/arcgis/rest/services/world/MapServer/0/query?f=json&where='Shape'='面'&returnGeometry=true&spatialRel=esriSpatialRelIntersects&outFields=NAME,REGION&callback=";
    public static final String provinceFeatureSetURL = "http://10.10.2.81:6080/arcgis/rest/services/area/MapServer/0/query?f=json&where='OBJECTID'>'0'&returnGeometry=true&spatialRel=esriSpatialRelIntersects&outFields=*&callback=";
    public static final String cityFeatureSetURL = "http://10.10.2.81:6080/arcgis/rest/services/area/MapServer/1/query?f=json&where='OBJECTID'>'0'&returnGeometry=true&spatialRel=esriSpatialRelIntersects&outFields=*&callback=";
}
