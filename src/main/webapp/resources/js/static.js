/**
 * Created by lyp on 2016-02-17.
 * @module Static
 * @description 用于存放静态常量
 */
//用户管理平台提供的接口
var WUM_BASEPATH = 'http://10.10.2.174:8080/wum/';
var WUM_LOGIN = WUM_BASEPATH + 'login/validate.json';                                //登录
var WUM_REG_UNIQUE_NAME_CHECK = WUM_BASEPATH + 'regist/uniqueNameCheck.json';     //注册：用户名唯一性检查
var WUM_REG_UNIQUE_EMAIL_CHECK = WUM_BASEPATH + 'regist/uniqueEmailCheck.json';   //注册：用户邮箱唯一性检查
var WUM_REG = WUM_BASEPATH + 'regist/sendPersonRegInfo.json';                       //注册
var WUM_RESET_PASSWORD = WUM_BASEPATH + 'login/forgetPwd/sendMail.json';                //找回密码