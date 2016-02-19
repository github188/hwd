package com.springapp.mvc.web.controller;
/*
 * Created by lyp on 2016-02-18.
 * @author lyp
 * @date 2016-02-18
 * @Description: 用户注册控制器
 * @Version: V1.0
 */

import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.annotation.JsonView;
import com.springapp.mvc.web.jsonView.Views;
import com.springapp.mvc.web.model.User;
import com.springapp.mvc.web.model.ValidformResponseBody;
import com.springapp.mvc.web.service.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RegisterController {
    private final RegisterService registerService;

    @Autowired
    public RegisterController(RegisterService registerService) {
        this.registerService = registerService;
    }

    @JsonView(Views.Public.class)
    @RequestMapping(value = "/user/api/uniqueUserNameCheck")
    public ValidformResponseBody uniqueUserNameCheck(@RequestParam String param, @RequestParam String name) {
        return registerService.uniqueUserNameCheck(name, param);
    }

    @JsonView(Views.Public.class)
    @RequestMapping(value = "/user/api/uniqueEmailCheck")
    public ValidformResponseBody uniqueEmailCheck(@RequestParam String param, @RequestParam String name) {
        return registerService.uniqueEmailCheck(name, param);
    }

    @JsonView(Views.Public.class)
    @RequestMapping(value = "/user/api/register")
    public JSONObject register(@RequestBody User user) {
        return registerService.register(user.getUrlString());
    }
}
