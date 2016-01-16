package com.springapp.mvc.web.model;

import java.util.List;

/**
 * Created by lyp on 2015-12-14.
 * 用于分类导航
 */
public class Filter {

    /**
     * country : [{"name":"China","count":100,"cities":[["beijing",29],["shanghai",30]]},{"name":"Turkey","count":10,"cities":[["shanghai",30]]}]
     * type : [{"name":"switch","count":2},{"name":"router","count":2}]
     * os : [{"name":"Linux","count":49},{"name":"Mac","count":49}]
     * app : [{"name":"apache","count":90}]
     * port : [{"name":"80","count":10}]
     * service : [{"name":"http","count":9}]
     */

    private List<CountryEntity> country;
    private List<FilterEntity> type;
    private List<FilterEntity> os;
    private List<FilterEntity> app;
    private List<FilterEntity> port;
    private List<FilterEntity> service;

    public void setCountry(List<CountryEntity> country) {
        this.country = country;
    }

    public void setApp(List<FilterEntity> app) {
        this.app = app;
    }

    public List<CountryEntity> getCountry() {
        return country;
    }

    public List<FilterEntity> getType() {
        return type;
    }

    public void setType(List<FilterEntity> type) {
        this.type = type;
    }

    public List<FilterEntity> getOs() {
        return os;
    }

    public void setOs(List<FilterEntity> os) {
        this.os = os;
    }

    public List<FilterEntity> getApp() {
        return app;
    }

    public List<FilterEntity> getPort() {
        return port;
    }

    public void setPort(List<FilterEntity> port) {
        this.port = port;
    }

    public List<FilterEntity> getService() {
        return service;
    }

    public void setService(List<FilterEntity> service) {
        this.service = service;
    }

    public static class CountryEntity {
        /**
         * name : China
         * count : 100
         * cities : [["beijing",29],["shanghai",30]]
         */

        private String name;
        private int count;
        private List<List<String>> cities;

        public CountryEntity(String name, int count, List<List<String>> cities) {
            this.name = name;
            this.count = count;
            this.cities = cities;
        }

        public void setName(String name) {
            this.name = name;
        }

        public void setCount(int count) {
            this.count = count;
        }

        public void setCities(List<List<String>> cities) {
            this.cities = cities;
        }

        public String getName() {
            return name;
        }

        public int getCount() {
            return count;
        }

        public List<List<String>> getCities() {
            return cities;
        }
    }

    public static class FilterEntity {
        /**
         * name : apache
         * count : 90
         */

        private String name;
        private int count;

        public FilterEntity(String name, int count) {
            this.name = name;
            this.count = count;
        }

        public void setName(String name) {
            this.name = name;
        }

        public void setCount(int count) {
            this.count = count;
        }

        public String getName() {
            return name;
        }

        public int getCount() {
            return count;
        }
    }
}

