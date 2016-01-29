package com.springapp.mvc.web.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.springapp.mvc.web.daoLike.SuggestionDAO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by lyp on 2015/12/10.
 * 业务逻辑层
 */
@Service
public class SuggestionService {
    private static final Logger logger = LoggerFactory.getLogger(SuggestionService.class);
    private static final String URL = "http://10.10.2.143:8083/se/search/advanced/completionsuggest";
    private final SuggestionDAO dao;

    @Autowired
    public SuggestionService(SuggestionDAO dao) {
        this.dao = dao;
    }


    //返回用户查询的数据，用于前端以列表的形式显示设备信息（高级搜索）
    public JSONObject getResponse4Suggestion(String query) {
        logger.debug("Service ==>> getResponse4AdvanceSearch starts ================");
        JSONObject result = new JSONObject();
        List<String> suggests = dao.getSuggestions(query);
        if (suggests.size() > 0) {
            result.put("statuscode", "200");
            result.put("errmsg", "");
            result.put("data", suggests);
        } else {
            result.put("statuscode", "204");
            result.put("errmsg", "");
            result.put("data", new JSONArray());
        }
        return result;
    }

   /* public static void main(String[] args) {
        SuggestionService ss = new SuggestionService(new SuggestionDAO());
        System.out.println(ss.getResponse4Suggestion("l 2"));
    }*/
}
