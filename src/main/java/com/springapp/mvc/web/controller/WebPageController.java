package com.springapp.mvc.web.controller;

import com.springapp.mvc.web.service.DeviceService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by lyp on 2015/12/10.
 * Web页面控制器
 */
@Controller
public class WebPageController {
    private final Logger logger = LoggerFactory.getLogger(WebPageController.class);
    private final DeviceService deviceService;

    @Autowired
    public WebPageController(DeviceService deviceService) {
        this.deviceService = deviceService;
    }

/*    @RequestMapping(value = "/header", method = RequestMethod.GET)
    public String header() {
        logger.debug("header() starts----------------------");
        return "header";
    }

    @RequestMapping(value = "/footer", method = RequestMethod.GET)
    public String footer() {
        logger.debug("footer() starts----------------------");
        return "footer";
    }*/

    @RequestMapping(value = "/index", method = RequestMethod.GET)
    public String index() {
        logger.debug("index() starts----------------------");
        return "index";
    }

    @RequestMapping(value = "/device-globe", method = RequestMethod.GET)
    public String device3d() {
        logger.debug("device3d() starts----------------------");
        return "device-globe";
    }


    @RequestMapping(value = "/device-list", method = RequestMethod.GET)
    public String deviceList() {
        logger.debug("deviceList() starts----------------------");
        return "device-list";
    }

    @RequestMapping(value = "/device-probe-globe", method = RequestMethod.GET)
    public String deviceProbe() {
        logger.debug("deviceProbe() starts----------------------");
        return "device-probe-globe";
    }


/*    @RequestMapping(value = "/device-map/{wd}", method = RequestMethod.GET)
    public String deviceMap(@PathVariable("wd") String wd) {
        logger.debug("deviceMap(param) starts----------------------");
        return "device-map";
    }*/

    @RequestMapping(value = "/device-map/{wd}", method = RequestMethod.GET)
    public ModelAndView deviceMap(@PathVariable("wd") String wd) {
        logger.debug("deviceMap(param) starts----------------------");
//        System.out.println("deviceMap(param) starts----------------------" + wd);
        ModelAndView mav = new ModelAndView("device-map");
        mav.addObject("wd", wd);
        return mav;
    }

    @RequestMapping(value = "/device-map", method = RequestMethod.GET)
    public String deviceMap() {
        logger.debug("deviceMap() starts----------------------");
        return "device-map";
    }

    @RequestMapping(value = "/device-map-leaflet/{wd}", method = RequestMethod.GET)
    public ModelAndView deviceMapLeaflet(@PathVariable("wd") String wd) {
        logger.debug("deviceMap(param) starts----------------------");
//        System.out.println("deviceMap(param) starts----------------------" + wd);
        ModelAndView mav = new ModelAndView("device-map-leaflet");
        mav.addObject("wd", wd);
        return mav;
    }

    @RequestMapping(value = "/device-map-leaflet", method = RequestMethod.GET)
    public String deviceMapLeaflet() {
        logger.debug("deviceMap() starts----------------------");
        return "device-map-leaflet";
    }

    //错误处理页面
    String errorPage = "error/error";

    @RequestMapping(value = "/error", method = RequestMethod.GET)
    public String error() {
        logger.debug("error() starts----------------------");
        return errorPage;
    }

    @RequestMapping(value = "/index2", method = RequestMethod.GET)
    public String index2() {
        logger.debug("index2() starts----------------------");
        return "index2";
    }

    @RequestMapping(value = "/new-index", method = RequestMethod.GET)
    public String newIndex() {
        logger.debug("newIndex() starts----------------------");
        return "new-index";
    }

    @RequestMapping(value = "/user/login", method = RequestMethod.GET)
    public String login() {
        logger.debug("login() starts----------------------");
        return "user/login";
    }

    @RequestMapping(value = "/user/register", method = RequestMethod.GET)
    public String register() {
        logger.debug("register() starts----------------------");
        return "user/register";
    }

    @RequestMapping(value = "/user/forgetPwd", method = RequestMethod.GET)   //忘记密码
    public String forgetPwd() {
        logger.debug("forgetPwd() starts----------------------");
        return "user/forgetPwd";
    }

    @RequestMapping(value = "/user/agreement", method = RequestMethod.GET)   //注册协议
    public String agreement() {
        logger.debug("agreement() starts----------------------");
        return "user/agreement";
    }

    // ----------------fresh new----------------
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String a_index() {
        logger.debug("Inside a_index()----------------------");
        System.out.println("Inside a_index()----------------");
        return "a_index";
    }

    @RequestMapping(value = "/user/a_register", method = RequestMethod.GET)
    public String a_register() {
        logger.debug("Inside a_register()----------------------");
        System.out.println("Inside a_register()----------------");
        return "user/a_register";
    }

    @RequestMapping(value = "/user/a_login", method = RequestMethod.GET)
    public String a_login() {
        logger.debug("Inside a_login()----------------------");
        System.out.println("Inside a_login()----------------");
        return "user/a_login";
    }

    @RequestMapping(value = "/user/a_pwdRetrieve", method = RequestMethod.GET)
    public String a_pwdRetrieve() {
        logger.debug("Inside a_pwdRetrieve()----------------------");
        System.out.println("Inside a_pwdRetrieve()----------------");
        return "user/a_pwdRetrieve";
    }

    @RequestMapping(value = "/user/a_agreement", method = RequestMethod.GET)
    public String a_agreement() {
        logger.debug("Inside a_agreement()----------------------");
        System.out.println("Inside a_agreement()--------X--------");
        return "user/a_agreement";
    }

    @RequestMapping(value = "/a_map", method = RequestMethod.GET)
    public String a_map() {
        logger.debug("Inside a_map()----------------------");
        System.out.println("Inside a_map()----------------");
        return "a_map";
    }

    @RequestMapping(value = "/a_list", method = RequestMethod.GET)
    public String a_listt() {
        logger.debug("Inside a_list()----------------------");
        System.out.println("Inside a_list()----------------");
        return "a_list";
    }

    @RequestMapping(value = "/a_markpoint", method = RequestMethod.GET)
    public String a_markpoint() {
        logger.debug("Inside a_markpoint()----------------------");
        System.out.println("Inside a_markpoint()----------------");
        return "a_markpoint";
    }

    @RequestMapping(value = "/a_markline", method = RequestMethod.GET)
    public String a_markline() {
        logger.debug("Inside a_markline()----------------------");
        System.out.println("Inside a_markline()----------------");
        return "a_agreea_marklinement";
    }
}
