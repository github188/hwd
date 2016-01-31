package com.springapp.mvc.web.model;


import net.sf.json.JSONObject;

import java.util.List;
import java.util.Map;

/**
 * Created by lyp on 2016-01-15.
 * 设备信息（为前端设计）
 */
public class NewDevice {


    /*
     * ip: "1.1.1.1",                       //description.ip
     * lon: description.device_location.lon
     * lat: description.device_location.lat
     * location : "China, Hebei, Cangzhou"  //zh_CN/country, zh_Pro/province, zh_City/city
     * tags : ["camera","video"]            //tags;description.port_info.device_type,_brand,_model;description.os_info.os;
     * ports : [<"http:80",port.banner>,...]         //description.port_info.protocol:port
     * vuls : [<vul_ID:vul_type,vulsEntity>,...],        //description.vul_info.vul_ID.CVE/CNVD:description.vul_info.vul_type
     * timestamp : 123243323                //lastModified
     * (for private use)vpsIp: description.port_info.vps_ip_external
     * (for private use)taskId: description.vul_info.taskId
     */

    private String ip;
    private double lon;
    private double lat;
    private String location;
    private List<String> tags;
    private List<Map<String, String>> ports;
    private List<Map<String, VulValueEntity>> vuls;
    private String timestamp;
    private String vpsIp;
    private String taskId;

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public double getLon() {
        return lon;
    }

    public void setLon(double lon) {
        this.lon = lon;
    }

    public double getLat() {
        return lat;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public List<Map<String, String>> getPorts() {
        return ports;
    }

    public void setPorts(List<Map<String, String>> ports) {
        this.ports = ports;
    }

    public List<Map<String, VulValueEntity>> getVuls() {
        return vuls;
    }

    public void setVuls(List<Map<String, VulValueEntity>> vuls) {
        this.vuls = vuls;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public String getVpsIp() {
        return vpsIp;
    }

    public void setVpsIp(String vpsIp) {
        this.vpsIp = vpsIp;
    }

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    public static class VulValueEntity {
        /*
         * desc : description.vul_info.description
         * platform : description.vul_info.platform
         * data : JSONObject, description.vul_info.data
         */

        private String desc;
        private String platform;
        private String imgURL;
        private JSONObject data;

        public String getImgURL() {
            return imgURL;
        }

        public void setImgURL(String imgURL) {
            this.imgURL = imgURL;
        }

        public void setDesc(String desc) {
            this.desc = desc;
        }

        public void setPlatform(String platform) {
            this.platform = platform;
        }

        public void setData(JSONObject data) {
            this.data = data;
        }

        public String getDesc() {
            return desc;
        }

        public String getPlatform() {
            return platform;
        }

        public JSONObject getData() {
            return data;
        }

    }
}
