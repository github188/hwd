package com.springapp.mvc.web.model;

import com.fasterxml.jackson.annotation.JsonView;
import com.springapp.mvc.web.jsonView.Views;

import java.util.List;

/**
 * Created by lyp on 2015/12/10.
 * 单纯的返回设备信息的ResponseBody
 */
public class ResponseBody {
    @JsonView(Views.Public.class)
    String errmsg;
    @JsonView(Views.Public.class)
    String code;
    @JsonView(Views.Public.class)
    List<Device> result;

    public String getErrmsg() {
        return errmsg;
    }

    public void setErrmsg(String errmsg) {
        this.errmsg = errmsg;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public List<Device> getResult() {
        return result;
    }

    public void setResult(List<Device> result) {
        this.result = result;
    }
}
