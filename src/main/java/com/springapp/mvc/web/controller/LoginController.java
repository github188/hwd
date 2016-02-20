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
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;

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
    public JSONObject login(ModelMap model, @RequestBody User user) {
        System.out.println("Inside of login handler method");
        String params = "nam=" + user.getUsername() + "&" + "psw=" + user.getPassword();
        JSONObject result = loginService.login(params);
        model.addAttribute("user", result.getObject("data", User.class));
        return result;
    }

    @RequestMapping("/logout")
    public String logout(SessionStatus status) {
        status.setComplete();
        return "logoutDone";
    }
}
