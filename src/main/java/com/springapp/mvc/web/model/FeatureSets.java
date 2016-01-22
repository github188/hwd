package com.springapp.mvc.web.model;

import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.annotation.JsonView;
import com.springapp.mvc.web.jsonView.Views;

/**
 * Created by lyp on 2016-01-22.
 */
public class FeatureSets {
    @JsonView(Views.Public.class)
    String errmsg;
    @JsonView(Views.Public.class)
    String statuscode;
    @JsonView(Views.Public.class)
    JSONObject data;

    public String getErrmsg() {
        return errmsg;
    }

    public void setErrmsg(String errmsg) {
        this.errmsg = errmsg;
    }

    public String getStatuscode() {
        return statuscode;
    }

    public void setStatuscode(String statuscode) {
        this.statuscode = statuscode;
    }

    public JSONObject getData() {
        return data;
    }

    public void setData(JSONObject data) {
        this.data = data;
    }
}
