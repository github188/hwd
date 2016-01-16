package com.springapp.mvc.web.model;

import com.fasterxml.jackson.annotation.JsonView;
import com.springapp.mvc.web.jsonView.Views;

import java.util.List;
import java.util.Map;

/**
 * Created by lyp on 2015-12-21.
 * 用于3d地球显示数据流
 */
public class MarkLines {

    /**
     * points : {"1.1.1.3":[145.391881,-6.081689],"1.1.1.2":[9.279014,54.870306]}
     * types : {"port_info":"端口扫描"}
     * lines : [{"type_name":"","startGeo":[145.391881,-6.081689],"endGeo":[9.279014,54.870306]}]
     */
    @JsonView(Views.Public.class)
    private Map<String, double[]> points;
    @JsonView(Views.Public.class)
    private Map<String, String> lineTypes;
    @JsonView(Views.Public.class)
    private List<LinesEntity> lines;

    public Map<String, double[]> getPoints() {
        return points;
    }

    public void setPoints(Map<String, double[]> points) {
        this.points = points;
    }

    public Map<String, String> getLineTypes() {
        return lineTypes;
    }

    public void setLineTypes(Map<String, String> lineTypes) {
        this.lineTypes = lineTypes;
    }

    public void setLines(List<LinesEntity> lines) {
        this.lines = lines;
    }

    public List<LinesEntity> getLines() {
        return lines;
    }

    public static class LinesEntity {
        /**
         * type_name :
         * startGeo : [145.391881,-6.081689]
         * endGeo : [9.279014,54.870306]
         */
        @JsonView(Views.Public.class)
        private String type_name;   //对应lineTypes的key
        @JsonView(Views.Public.class)
        private double[] startGeo;  //对应points中的点，为了方便使用直接把点坐标放过来，而没有用key做索引
        @JsonView(Views.Public.class)
        private double[] endGeo;    //对应points中的点，同上

        public void setType_name(String type_name) {
            this.type_name = type_name;
        }

        public void setStartGeo(double[] startGeo) {
            this.startGeo = startGeo;
        }

        public void setEndGeo(double[] endGeo) {
            this.endGeo = endGeo;
        }

        public String getType_name() {
            return type_name;
        }

        public double[] getStartGeo() {
            return startGeo;
        }

        public double[] getEndGeo() {
            return endGeo;
        }
    }
}
