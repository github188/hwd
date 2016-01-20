package com.springapp.mvc.web.model;


/**
 * Created by lyp on 2015/12/10.
 * The “json data” will be converted into this object, via @RequestBody.
 */
public class AdvanceSearchCriteria {
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

    public String getMust() {
        return must;
    }

    public void setMust(String must) {
        this.must = must;
    }

    public String getShould() {
        return should;
    }

    public void setShould(String should) {
        this.should = should;
    }

    public String getMustnot() {
        return mustnot;
    }

    public void setMustnot(String mustnot) {
        this.mustnot = mustnot;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getOs() {
        return os;
    }

    public void setOs(String os) {
        this.os = os;
    }

    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service;
    }

    public String getPort() {
        return port;
    }

    public void setPort(String port) {
        this.port = port;
    }

    public String getBanner() {
        return banner;
    }

    public void setBanner(String banner) {
        this.banner = banner;
    }

    public String getVulId() {
        return vulId;
    }

    public void setVulId(String vulId) {
        this.vulId = vulId;
    }

    public String getVulName() {
        return vulName;
    }

    public void setVulName(String vulName) {
        this.vulName = vulName;
    }

    public String getVulType() {
        return vulType;
    }

    public void setVulType(String vulType) {
        this.vulType = vulType;
    }

    public String getLastModified() {
        return lastModified;
    }

    public void setLastModified(String lastModified) {
        this.lastModified = lastModified;
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

    /*
            @JsonProperty("wd.must")
            String must;
            @JsonProperty("wd.should")
            String should;
            @JsonProperty("wd.mustnot")
            String mustnot;
            @JsonProperty("description.ip")
            String ip;  //多个ip用，ip段用-分隔
            @JsonProperty("description.device_location.country")
            String country;
            @JsonProperty("description.device_location.province")
            String province;
            @JsonProperty("description.device_location.city")
            String city;
            @JsonProperty("description.port_info.device_type")
            String type;
            @JsonProperty("description.port_info.device_brand")
            String brand;
            @JsonProperty("description.port_info.device_model")
            String model;
            @JsonProperty("description.os_info.os")
            String os;
            @JsonProperty("description.port_info.device_service")
            String service;
            @JsonProperty("description.port_info.port")
            String port;//多个port用逗号分隔（或），port段用-分隔
            @JsonProperty("description.port_info.banner")
            String banner;
            @JsonProperty("description.vul_info.vul_ID")
            String vulId;
            @JsonProperty("description.vul_info.vul_name")
            String vulName;
            @JsonProperty("description.vul_info.vul_type")
            String vulType;
            @JsonProperty("lastModified")
            String lastModified;    //时间段用-分隔
            @JsonProperty("description.port_info.vps_ip_external")
            String vpsIp;
            @JsonProperty("description.vul_info.taskId ")
            String taskId;


            @JsonProperty("wd.must")
            public String getMust() {
                return must;
            }

            @JsonProperty("wd.must")
            public void setMust(String must) {
                this.must = must;
            }

            @JsonProperty("wd.should")
            public String getShould() {
                return should;
            }

            @JsonProperty("wd.should")
            public void setShould(String should) {
                this.should = should;
            }

            @JsonProperty("wd.mustnot")
            public String getMustnot() {
                return mustnot;
            }

            @JsonProperty("wd.mustnot")
            public void setMustnot(String mustnot) {
                this.mustnot = mustnot;
            }

            @JsonProperty("description.ip")
            public String getIp() {
                return ip;
            }

            @JsonProperty("description.ip")
            public void setIp(String ip) {
                this.ip = ip;
            }

            @JsonProperty("description.device_location.country")
            public String getCountry() {
                return country;
            }

            @JsonProperty("description.device_location.country")
            public void setCountry(String country) {
                this.country = country;
            }

            @JsonProperty("description.device_location.province")
            public String getProvince() {
                return province;
            }

            @JsonProperty("description.device_location.province")
            public void setProvince(String province) {
                this.province = province;
            }

            @JsonProperty("description.device_location.city")
            public String getCity() {
                return city;
            }

            @JsonProperty("description.device_location.city")
            public void setCity(String city) {
                this.city = city;
            }

            @JsonProperty("description.port_info.device_type")
            public String getType() {
                return type;
            }

            @JsonProperty("description.port_info.device_type")
            public void setType(String type) {
                this.type = type;
            }

            @JsonProperty("description.port_info.device_barnd")
            public String getBrand() {
                return brand;
            }

            @JsonProperty("description.port_info.device_brand")
            public void setBrand(String brand) {
                this.brand = brand;
            }

            @JsonProperty("description.port_info.device_model")
            public String getModel() {
                return model;
            }

            @JsonProperty("description.port_info.device_model")
            public void setModel(String model) {
                this.model = model;
            }

            @JsonProperty("description.os_info.os")
            public String getOs() {
                return os;
            }

            @JsonProperty("description.os_info.os")
            public void setOs(String os) {
                this.os = os;
            }

            @JsonProperty("description.port_info.device_service")
            public String getService() {
                return service;
            }

            @JsonProperty("description.port_info.device_service")
            public void setService(String service) {
                this.service = service;
            }

            @JsonProperty("description.port_info.port")
            public String getPort() {
                return port;
            }

            @JsonProperty("description.port_info.port")
            public void setPort(String port) {
                this.port = port;
            }

            @JsonProperty("description.port_info.banner")
            public String getBanner() {
                return banner;
            }

            @JsonProperty("description.port_info.banner")
            public void setBanner(String banner) {
                this.banner = banner;
            }

            @JsonProperty("description.vul_info.vul_ID")

            public String getVulId() {
                return vulId;
            }

            @JsonProperty("description.vul_info.vul_ID")
            public void setVulId(String vulId) {
                this.vulId = vulId;
            }

            @JsonProperty("description.vul_info.vul_name")
            public String getVulName() {
                return vulName;
            }

            @JsonProperty("description.vul_info.vul_name")
            public void setVulName(String vulName) {
                this.vulName = vulName;
            }

            @JsonProperty("description.vul_info.vul_type")
            public String getVulType() {
                return vulType;
            }

            @JsonProperty("description.vul_info.vul_type")
            public void setVulType(String vulType) {
                this.vulType = vulType;
            }

            @JsonProperty("lastModified")
            public String getLastModified() {
                return lastModified;
            }

            @JsonProperty("lastModified")
            public void setLastModified(String lastModified) {
                this.lastModified = lastModified;
            }

            @JsonProperty("description.port_info.vps_ip_external")
            public String getVpsIp() {
                return vpsIp;
            }

            @JsonProperty("description.port_info.vps_ip_external")
            public void setVpsIp(String vpsIp) {
                this.vpsIp = vpsIp;
            }

            @JsonProperty("description.vul_info.taskId ")
            public String getTaskId() {
                return taskId;
            }

            @JsonProperty("description.vul_info.taskId ")
            public void setTaskId(String taskId) {
                this.taskId = taskId;
            }
        */
    @Override
    public String toString() {//为了校验所有字段是否均为空
        return must + should + mustnot + ip + country + province + city + type + brand + model + os +
                service + port + banner + vulId + vulName + vulType + lastModified + vpsIp + taskId;
    }
}
