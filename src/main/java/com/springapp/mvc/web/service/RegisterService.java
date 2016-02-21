package com.springapp.mvc.web.service;

import com.alibaba.fastjson.JSONObject;
import com.springapp.mvc.web.config.Constant;
import com.springapp.mvc.web.model.ValidformResponseBody;
import com.springapp.mvc.web.util.RestClient;
import org.springframework.stereotype.Service;

/*
 * Created by lyp on 2016-02-18.
 * @author lyp
 * @date 2016-02-18
 * @Description: 注册功能相关的service
 * @Version: V1.0
 */
@Service
public class RegisterService {
    private final RestClient rc = new RestClient();

    /*
    * @param {name:"String类型，请求参数名；param: "String类型，请求参数值"}
    * @return ValidformResponseBody类型。code=1时status为y，其他情况均为n(用户管理平台返回值：{code:1"}，1代表未被注册，0代表已被注册)
    * @author lyp
    * @date 2016-02-18
    * @function uniqueUserNameCheck
    * @description 用户注册时，用户名唯一性检查。调用用户管理平台的接口，根据接口返回值来处理
    */
    public ValidformResponseBody uniqueUserNameCheck(String name, String param) {
        String url = Constant.WUM_UNIQUE_USERNAME_CHECK_URL + "?" + name + "=" + param;
        JSONObject response = rc.getJSONObject(url);
//        System.out.println(response);
        ValidformResponseBody vrb = new ValidformResponseBody();
        if (response != null) {
            if (response.getIntValue("code") == 1) {//code==1表示未被注册
                vrb.setStatus("y");
                vrb.setInfo("");
            } else if (response.getIntValue("code") == 0) {//code==0表示已被注册
                vrb.setInfo(response.getString("reason"));
            }
        }
        return vrb;
    }

    /*
    * @param {name:"String类型，请求参数名；param: "String类型，请求参数值"}
    * @return ValidformResponseBody类型。code=1时status为y，其他情况均为n
    * @author lyp
    * @date 2016-02-18
    * @function uniqueEmailCheck
    * @description 用户注册时，邮箱唯一性检查。调用用户管理平台的接口，根据接口返回值来处理
    */
    public ValidformResponseBody uniqueEmailCheck(String name, String param) {
        String url = Constant.WUM_UNIQUE_EMAIL_CHECK_URL + "?" + name + "=" + param;
        JSONObject response = rc.getJSONObject(url);
//        System.out.println(response);
        ValidformResponseBody vrb = new ValidformResponseBody();
        if (response != null) {
            if (response.getIntValue("code") == 1) {    //code==1表示邮箱未被注册
                vrb.setStatus("y");
                vrb.setInfo("");
            } else if (response.getIntValue("code") == 0) {//code==0表示邮箱已被注册
                vrb.setInfo(response.getString("reason"));
            }
        }
        return vrb;
    }

    /*
    * @param {name:"String类型，请求参数名；param: "String类型，请求参数值"}
    * @return 用户管理平台服务器端返回的数据格式：{"data":{"id":12162,"prilevel":5,"username":"11","usertype":"individual"},"code":1}
    * @author lyp
    * @date 2016-02-18
    * @function register
    * @description 用户注册。调用用户管理平台的接口，根据接口返回值来处理
    */
    public JSONObject register(String params) {
        String url = Constant.WUM_REGISTER_URL + "?" + params;
        JSONObject response = rc.getJSONObject(url);
        System.out.println(response);
        if (response == null) {
            response = new JSONObject();
            response.put("code", "555");    //用户管理平台服务器错误
        }
        return response;
    }
}
