package com.springapp.mvc.web.model;

import com.fasterxml.jackson.annotation.JsonView;
import com.springapp.mvc.web.jsonView.Views;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by lyp on 2015/12/10.
 * 设备信息
 */
public class Device {
    @JsonView(Views.Public.class)
    private List<String> types;   //该设备所属的设备类型，元素格式"type1_subType1"
    @JsonView(Views.Public.class)
    private List<Double> geoCoord;       //设备的经纬度信息，是一个包含2个元素的一维数组，geoCoord[longitude, latitude]，数组形式private double[] geoCoord = new double[2];
    private String code;    //设备所在位置的国家码
    @JsonView(Views.Public.class)
    private String country; //设备所在国家名称
    @JsonView(Views.Public.class)
    private String city; //设备所在城市名称
    //后续所有字段都是为了查询添加的
    @JsonView(Views.Public.class)
    private String IP;
    @JsonView(Views.Public.class)
    private String protocol;
    @JsonView(Views.Public.class)
    private String port;
    @JsonView(Views.Public.class)
    private String app;
    @JsonView(Views.Public.class)
    private String os;
    @JsonView(Views.Public.class)
    private String banner;
    @JsonView(Views.Public.class)
    private String update_time;
    @JsonView(Views.Public.class)
    private List<String> url;
    @JsonView(Views.Public.class)
    private List<String> vul_info;

    public Device(List<String> types, List<Double> geoCoord, String code, String country, String city) {
        this.types = types;
        this.geoCoord = geoCoord;
        this.code = code;
        this.country = country;
        this.city = city;
        this.IP = "127.0.0.1";
        this.protocol = "http";
        this.port = "80";
        this.app = "apache";
        this.os = "Linux";
        this.banner = "xxxxxxxxxxxxxxbannerxxxxxxxxxxxxxx";
        this.update_time = "10000000";
        this.url = new ArrayList<String>();
        url.add("url");
        this.vul_info = new ArrayList<String>();
        vul_info.add("vul_info");
    }
//    public Device(List<String> types, List<Double> geoCoord, String code, String country, String city) {
//        this.types = types;
//        this.geoCoord = geoCoord;
//        this.code
//    }

    public void setTypes(List<String> types) {
        this.types = types;
    }

    public void setGeoCoord(List<Double> geoCoord) {
        this.geoCoord = geoCoord;
    }

    public List<String> getTypes() {
        return types;
    }

    public List<Double> getGeoCoord() {
        return geoCoord;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getIP() {
        return IP;
    }

    public void setIP(String IP) {
        this.IP = IP;
    }

    public String getProtocol() {
        return protocol;
    }

    public void setProtocol(String protocol) {
        this.protocol = protocol;
    }

    public String getPort() {
        return port;
    }

    public void setPort(String port) {
        this.port = port;
    }

    public String getApp() {
        return app;
    }

    public void setApp(String app) {
        this.app = app;
    }

    public String getOs() {
        return os;
    }

    public void setOs(String os) {
        this.os = os;
    }

    public String getBanner() {
        return banner;
    }

    public void setBanner(String banner) {
        this.banner = banner;
    }

    public String getUpdate_time() {
        return update_time;
    }

    public void setUpdate_time(String update_time) {
        this.update_time = update_time;
    }

    public List<String> getUrl() {
        return url;
    }

    public void setUrl(List<String> url) {
        this.url = url;
    }

    public List<String> getVul_info() {
        return vul_info;
    }

    public void setVul_info(List<String> vul_info) {
        this.vul_info = vul_info;
    }
}
