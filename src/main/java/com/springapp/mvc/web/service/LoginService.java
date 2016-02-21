package com.springapp.mvc.web.service;

import com.alibaba.fastjson.JSONObject;
import com.springapp.mvc.web.config.Constant;
import com.springapp.mvc.web.util.RestClient;
import org.springframework.stereotype.Service;

/*
 * Created by lyp on 2016-02-19.
 * @author lyp
 * @date 2016-02-19
 * @Description: 登录功能相关的service
 * @Version: V1.0
 */
@Service
public class LoginService {
    private final RestClient rc = new RestClient();

    /*
    * @param {name:"String类型，请求参数名；param: "String类型，请求参数值"}
    * @return ValidformResponseBody类型。code=1时status为y，其他情况均为n
    * @author lyp
    * @date 2016-02-19
    * @function login
    * @description 用户登录。调用用户管理平台的接口，根据接口返回值来处理
    */
    public JSONObject login(String params) {
        String url = Constant.WUM_LOGIN_URL + "?" + params;
        JSONObject response = rc.getJSONObject(url);
        System.out.println(response);
        if (response == null) {
            response = new JSONObject();
            response.put("code", "555");    //用户管理平台服务器错误
        }
        return response;
    }
}
