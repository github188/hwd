package com.springapp.mvc.web.model;

import java.util.List;

/**
 * Created by lyp on 2015/12/18.
 */
public class Device4MapOrGlobe {

    /**
     * ip : 10.10.10.1
     * country : China
     * city : Beijing
     * geoCoord : [经度,纬度],[longitude,latitude]
     */

    private String ip;
    private String country;
    private String city;
    private List<Double> geoCoord;
//    private Double[] geoCoord;

    public void setIp(String ip) {
        this.ip = ip;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setGeoCoord(List<Double> geoCoord) {
        this.geoCoord = geoCoord;
    }

    public String getIp() {
        return ip;
    }

    public String getCountry() {
        return country;
    }

    public String getCity() {
        return city;
    }

    public List<Double> getGeoCoord() {
        return geoCoord;
    }
}
