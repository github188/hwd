package com.springapp.mvc.web.model;/*
 * Created by lyp on 2016-02-18.
 * @author lyp
 * @date 2016-02-18
 * @Description: 前端validform.js插件中实时校验数据时，需要返回的数据。结构完全和validform.js需要返回的数据格式一致
 * @Version: V1.0
 */

import com.fasterxml.jackson.annotation.JsonView;
import com.springapp.mvc.web.jsonView.Views;

public class ValidformResponseBody {
    @JsonView(Views.Public.class)
    private String status = "n";  //取值为y表示成功，n表示失败
    @JsonView(Views.Public.class)
    private String info = "error";    //对status的说明,不能为null，否则validform.js验证不通过，会一直卡在loading处

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }
}
