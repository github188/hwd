package com.springapp.mvc.web.controller;
/*
 * Created by lyp on 2016-02-19.
 * @author lyp
 * @date 2016-02-19
 * @Description: 用户登录控制器
 * @Version: V1.0
 */

import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.annotation.JsonView;
import com.springapp.mvc.web.jsonView.Views;
import com.springapp.mvc.web.model.User;
import com.springapp.mvc.web.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;

@RestController
@SessionAttributes("user")
public class LoginController {
    private final LoginService loginService;

    @Autowired
    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @JsonView(Views.Public.class)
    @RequestMapping(value = "/user/api/login")
    public JSONObject login(@RequestBody User user) {
        String params = "nam=" + user.getUsername() + "&" + "psw=" + user.getPassword();
//        System.out.println(params);
        JSONObject result = loginService.login(params);

        return loginService.login(params);
    }
}
