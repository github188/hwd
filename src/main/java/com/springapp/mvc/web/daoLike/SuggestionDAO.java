package com.springapp.mvc.web.daoLike;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.springapp.mvc.web.util.RestClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by lyp on 2015/12/10.
 * 根据用户输入，从数据平台/搜索平台获提示信息
 */
@Repository
public class SuggestionDAO {
    private static final String url = "http://10.10.12.72:8083/se/search/advanced?q={q}";
    private static final Logger logger = LoggerFactory.getLogger(SuggestionDAO.class);
    private RestClient rc;


    public JSONObject getSuggestions(String uri, Map<String, Object> criteria) {
//        logger.debug("DAO ==>> getSuggestions starts =================");
        System.out.println("DAO ==>> getSuggestions starts =======================");
        JSONObject result = rc.get(uri, criteria);
        if ("200".equals(result.getString("statuscode"))) {
            JSONObject tmp = result.getJSONObject("aggregation").getJSONObject("device_type");
            Map<String, String> map = (Map<String, String>) JSON.parse(tmp.toJSONString());
            if (map != null) {
                result.put("data", map.keySet());
            }
        }
        return null;
    }


    public static void main(String[] args) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("q", "{abc:bac}");
        SuggestionDAO mkDAO = new SuggestionDAO();

    }
}
