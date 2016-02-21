package com.springapp.mvc.web.model;/*
 * Created by lyp on 2016-02-18.
 * @author lyp
 * @date 2016-02-18
 * @Description: 用户注册传入的参数，用户管理平台的限制，这里只能用get的方式传，参数太多，所以用这种方式
 * @Version: V1.0
 */

import com.springapp.mvc.web.config.Constant;

@com.fasterxml.jackson.annotation.JsonIgnoreProperties(ignoreUnknown = true)

public class User {
    private String username;    //用户名
    private String password;    //密码，sha1加密后的密码（由前端加密）
    private String email;        //邮箱
    private String name;         //（可选）用户别名
    private String region;         //（可选）用户所在地区
    private int level;         //（可选）用户等级，不传或者超过5都为5

    public String getUrlString() {
        level = Constant.WUM_USER_LEVEL; //默认设置用户级别
        return "username=" + username +
                "&password=" + password +
                "&email=" + email +
                "&name=" + name +
                "&region=" + region +
                "&level=" + level;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
//        this.level = level;
        this.level = Constant.WUM_USER_LEVEL;
    }
}
