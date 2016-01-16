package com.springapp.mvc.web.service;

import com.alibaba.fastjson.JSONObject;
import com.springapp.mvc.web.daoLike.SuggestionDAO;
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
public class SuggestionService {
    private static final Logger logger = LoggerFactory.getLogger(SuggestionService.class);
    private static final String URL = "http://10.10.12.72:8083/se/search/advanced?q={}";
    private final SuggestionDAO suggestionDAO;

    @Autowired
    public SuggestionService(SuggestionDAO suggestionDAO) {
        this.suggestionDAO = suggestionDAO;
    }


    //返回用户查询的数据，用于前端以列表的形式显示设备信息（高级搜索）
    public String getResponse4Suggestion(String query) {
        logger.debug("Service ==>> getResponse4AdvanceSearch starts ================");
        JSONObject result;

        Map<String, Object> criteria = new HashMap<String, Object>();
        criteria.put("q", new String(query));
        result = suggestionDAO.getSuggestions(URL, criteria);
        if ("200".equals(result.getString("statuscode")) && result.getJSONArray("data").size() <= 0) {
            result.put("statuscode", "204");
            result.put("errmsg", "No related data!");
        }
        return result.toString();
    }
}
