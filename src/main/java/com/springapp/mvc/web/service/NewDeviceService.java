package com.springapp.mvc.web.service;


import com.springapp.mvc.web.daoLike.NewDeviceDAO;
import com.springapp.mvc.web.model.AdvancedSearchCriteria;
import com.springapp.mvc.web.model.SearchCriteria;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by lyp on 2015/12/10.
 * 业务逻辑层
 */
@Service
public class NewDeviceService {
    private static final Logger logger = LoggerFactory.getLogger(NewDeviceService.class);
    private static final String uri4AdvsSearch = "http://10.10.2.143:8083/se/search/advanced?q={q}";
    private static final String uri4MapSearch = "http://10.10.2.143:8083/se/search/map?q={q}";
    private static final String uri4List = "http://10.10.2.143:8083/se/search?wd={wd}&page={page}";

    private final NewDeviceDAO dao;

    @Autowired
    public NewDeviceService(NewDeviceDAO dao) {
        this.dao = dao;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////
    //返回用户查询的数据，用于前端以列表的形式显示设备信息（高级搜索）
    public String getResponse4AdvanceSearch(AdvancedSearchCriteria search) {
        logger.debug("Service ==>> getResponse4AdvanceSearch starts ================");
        JSONObject result;
        if (isValidSearchCriteria(search)) {
            Map<String, Object> criteria = new HashMap<String, Object>();
            criteria.put("q", mapping(search));
            result = dao.getResult4DeviceSearch(uri4AdvsSearch, criteria);
            if ("200".equals(result.getString("statuscode")) && result.getJSONArray("data").size() <= 0) {
                result.put("statuscode", "204");
                result.put("errmsg", "No related data!");
            }
        } else {
            result = new JSONObject();
            result.put("statuscode", "400");
            result.put("errmsg", "Search criteria is empty!");
        }
//        System.out.println("Service Advanced Search--> Result: " + result.toString());
        return result.toString();
    }

    public String getResponse4MapSearch(SearchCriteria search) {
        logger.debug("Service ==>> getResponse4MapSearch starts ================");
//        System.out.println("Service ==>> getResponse4MapSearch starts ================");
        JSONObject result;
        if (isValidSearchCriteria(search)) {
            Map<String, Object> criteria = new HashMap<String, Object>();
            criteria.put("q", JSONObject.fromObject(search));
//            System.out.println("Service ==>> getResponse4MapSearch starts ================" + JSONObject.fromObject(search));
            result = dao.getResult4DeviceSearch(uri4MapSearch, criteria);
            if ("200".equals(result.getString("statuscode")) && result.getJSONArray("data").size() <= 0) {
                result.put("statuscode", "204");
                result.put("errmsg", "No related data!");
            }
        } else {
            result = new JSONObject();
            result.put("statuscode", "400");
            result.put("errmsg", "Search criteria is empty!");
        }
//        System.out.println("Service Advanced Search--> Result: " + result.toString());
        return result.toString();
    }

    public String getResponse4ListSearch(SearchCriteria search) {
        logger.debug("Service ==>> getResponse4ListSearch starts ================");
//        System.out.println("Service ==>> getResponse4ListSearch starts ================");
        JSONObject result;
        if (isValidSearchCriteria(search)) {
            Map<String, Object> criteria = new HashMap<String, Object>();
            criteria.put("wd", search.getWd());
            criteria.put("page", search.getPage());
//            System.out.println("Service ==>> getResponse4ListSearch starts ================" + criteria);
            result = dao.getResult4DeviceSearch(uri4List, criteria);
            if ("200".equals(result.getString("statuscode")) && result.getJSONArray("data").size() <= 0) {
                result.put("statuscode", "204");
                result.put("errmsg", "No related data!");
            }
        } else {
            result = new JSONObject();
            result.put("statuscode", "400");
            result.put("errmsg", "Search criteria is empty!");
        }
//        System.out.println("Service Advanced Search--> Result: " + result.toString());
        return result.toString();
    }

    private boolean isValidSearchCriteria(Object criteria) {
        boolean valid = true;
        if (criteria == null) {
            valid = false;
        } else {
            if ("".equals(criteria.toString())) {
                valid = false;
            }
        }
        return valid;
    }

    private JSONObject mapping(AdvancedSearchCriteria asc) {
        JSONObject result = new JSONObject();
        result.put("wd.must", asc.getMust());
        result.put("wd.should", asc.getShould());
        result.put("wd.mustnot", asc.getMustnot());
        result.put("description.ip", asc.getIp());
        result.put("description.device_location.country", asc.getCountry());
        result.put("description.device_location.province", asc.getProvince());
        result.put("description.device_location.city", asc.getCity());
        result.put("description.port_info.device_type", asc.getType());
        result.put("description.port_info.device_brand", asc.getBrand());
        result.put("description.port_info.device_model", asc.getModel());
        result.put("description.os_info.os", asc.getOs());
        result.put("description.port_info.device_service", asc.getService());
        result.put("description.port_info.port", asc.getPort());
        result.put("description.port_info.banner", asc.getBanner());
        result.put("description.vul_info.vul_ID", asc.getVulId());
        result.put("description.vul_info.vul_name", asc.getVulName());
        result.put("description.vul_info.vul_type", asc.getVulType());
        result.put("lastModified", asc.getLastModified());
        result.put("description.port_info.vps_ip_external", asc.getVpsIp());
        result.put("description.vul_info.taskId ", asc.getTaskId());
        return result;
    }
}