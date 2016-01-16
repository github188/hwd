package com.springapp.mvc.web.model;

import java.util.List;

/**
 * Created by lyp on 2015/12/21.
 * 数据流
 */
public class Device4Line {

    /**
     * Type : port_scan
     * start : {"ip":"1.2.3.4","geoCoord":[111.1,11.2]}
     * end : {"ip":"1.2.3.4","geoCoord":[111.1,11.2]}
     */
    private String Type;
    private StartEntity start;
    private EndEntity end;

    public void setType(String Type) {
        this.Type = Type;
    }

    public void setStart(StartEntity start) {
        this.start = start;
    }

    public void setEnd(EndEntity end) {
        this.end = end;
    }

    public String getType() {
        return Type;
    }

    public StartEntity getStart() {
        return start;
    }

    public EndEntity getEnd() {
        return end;
    }

    public static class StartEntity {
        /**
         * ip : 1.2.3.4
         * geoCoord : [111.1,11.2]
         */

        private String ip;
        private List<Double> geoCoord;

        public void setIp(String ip) {
            this.ip = ip;
        }

        public void setGeoCoord(List<Double> geoCoord) {
            this.geoCoord = geoCoord;
        }

        public String getIp() {
            return ip;
        }

        public List<Double> getGeoCoord() {
            return geoCoord;
        }
    }

    public static class EndEntity {
        /**
         * ip : 1.2.3.4
         * geoCoord : [111.1,11.2]
         */

        private String ip;
        private List<Double> geoCoord;

        public void setIp(String ip) {
            this.ip = ip;
        }

        public void setGeoCoord(List<Double> geoCoord) {
            this.geoCoord = geoCoord;
        }

        public String getIp() {
            return ip;
        }

        public List<Double> getGeoCoord() {
            return geoCoord;
        }
    }
}
