package com.springapp.mvc.web.model;

import com.alibaba.fastjson.annotation.JSONField;

/**
 * Created by lyp on 2015/12/10.
 * The “json data” will be converted into this object, via @RequestBody.
 */
public class NewAdvanceSearchCriteria {
    String must;
    String should;
    String mustnot;
    String ip;  //多个ip用，ip段用-分隔
    String country;
    String province;
    String city;
    String type;
    String brand;
    String model;
    String os;
    String service;
    String port;//多个port用逗号分隔（或），port段用-分隔
    String banner;
    String vulId;
    String vulName;
    String vulType;
    String lastModified;    //时间段用-分隔
    String vpsIp;
    String taskId;

    @JSONField(name = "wd.must")
    public String getMust() {
        return must;
    }

    @JSONField(name = "wd.must")
    public void setMust(String must) {
        this.must = must;
    }

    @JSONField(name = "wd.should")
    public String getShould() {
        return should;
    }

    @JSONField(name = "wd.should")
    public void setShould(String should) {
        this.should = should;
    }

    @JSONField(name = "wd.mustnot")
    public String getMustnot() {
        return mustnot;
    }

    @JSONField(name = "wd.mustnot")
    public void setMustnot(String mustnot) {
        this.mustnot = mustnot;
    }

    @JSONField(name = "description.ip")
    public String getIp() {
        return ip;
    }

    @JSONField(name = "description.ip")
    public void setIp(String ip) {
        this.ip = ip;
    }

    @JSONField(name = "description.device_location.country")
    public String getCountry() {
        return country;
    }

    @JSONField(name = "description.device_location.country")
    public void setCountry(String country) {
        this.country = country;
    }

    @JSONField(name = "description.device_location.province")
    public String getProvince() {
        return province;
    }

    @JSONField(name = "description.device_location.province")
    public void setProvince(String province) {
        this.province = province;
    }

    @JSONField(name = "description.device_location.city")
    public String getCity() {
        return city;
    }

    @JSONField(name = "description.device_location.city")
    public void setCity(String city) {
        this.city = city;
    }

    @JSONField(name = "description.port_info.device_type")
    public String getType() {
        return type;
    }

    @JSONField(name = "description.port_info.device_type")
    public void setType(String type) {
        this.type = type;
    }

    @JSONField(name = "description.port_info.device_barnd")
    public String getBrand() {
        return brand;
    }

    @JSONField(name = "description.port_info.device_brand")
    public void setBrand(String brand) {
        this.brand = brand;
    }

    @JSONField(name = "description.port_info.device_model")
    public String getModel() {
        return model;
    }

    @JSONField(name = "description.port_info.device_model")
    public void setModel(String model) {
        this.model = model;
    }

    @JSONField(name = "description.os_info.os")
    public String getOs() {
        return os;
    }

    @JSONField(name = "description.os_info.os")
    public void setOs(String os) {
        this.os = os;
    }

    @JSONField(name = "description.port_info.device_service")
    public String getService() {
        return service;
    }

    @JSONField(name = "description.port_info.device_service")
    public void setService(String service) {
        this.service = service;
    }

    @JSONField(name = "description.port_info.port")
    public String getPort() {
        return port;
    }

    @JSONField(name = "description.port_info.port")
    public void setPort(String port) {
        this.port = port;
    }

    @JSONField(name = "description.port_info.banner")
    public String getBanner() {
        return banner;
    }

    @JSONField(name = "description.port_info.banner")
    public void setBanner(String banner) {
        this.banner = banner;
    }

    @JSONField(name = "description.vul_info.vul_ID")

    public String getVulId() {
        return vulId;
    }

    @JSONField(name = "description.vul_info.vul_ID")
    public void setVulId(String vulId) {
        this.vulId = vulId;
    }

    @JSONField(name = "description.vul_info.vul_name")
    public String getVulName() {
        return vulName;
    }

    @JSONField(name = "description.vul_info.vul_name")
    public void setVulName(String vulName) {
        this.vulName = vulName;
    }

    @JSONField(name = "description.vul_info.vul_type")
    public String getVulType() {
        return vulType;
    }

    @JSONField(name = "description.vul_info.vul_type")
    public void setVulType(String vulType) {
        this.vulType = vulType;
    }

    @JSONField(name = "lastModified")
    public String getLastModified() {
        return lastModified;
    }

    @JSONField(name = "lastModified")
    public void setLastModified(String lastModified) {
        this.lastModified = lastModified;
    }

    @JSONField(name = "description.port_info.vps_ip_external")
    public String getVpsIp() {
        return vpsIp;
    }

    @JSONField(name = "description.port_info.vps_ip_external")
    public void setVpsIp(String vpsIp) {
        this.vpsIp = vpsIp;
    }

    @JSONField(name = "description.vul_info.taskId ")
    public String getTaskId() {
        return taskId;
    }

    @JSONField(name = "description.vul_info.taskId ")
    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }


    @Override
    public String toString() {//为了校验所有字段是否均为空
        return must + should + mustnot + ip + country + province + city + type + brand + model + os +
                service + port + banner + vulId + vulName + vulType + lastModified + vpsIp + taskId;
    }
}
