package com.springapp.mvc.web.model;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.springapp.mvc.web.util.RestClient;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * Created by lyp on 2016/1/17.
 * 从搜索服务器获取提示信息
 */
public class NewSuggestions {
    public static List<String> suggestions = new ArrayList<String>();
    //    private static String suggestionURL = AppConfig.suggestionURL;
    private static String suggestionURL = "http://10.10.2.143:8083/se/search/advanced/completionsuggest";

    public NewSuggestions() {
        //可以用来初始化映射表
    }

    public static List<String> getSuggestions() {
        if (suggestions == null || suggestions.size() <= 0) {
            initSuggestions();
        }
        return suggestions;
    }

    public static void initSuggestions() {
        RestClient rc = new RestClient();
        if (suggestionURL == null) {
            suggestionURL = "http://10.10.2.143:8083/se/search/advanced/completionsuggest";
        }
        String respStr = rc.get(suggestionURL);
        JSONObject resp = JSONObject.parseObject(respStr);
        if ("200".equals(resp.getString("statuscode")) && resp.getJSONObject("data") != null) {
            JSONObject data = resp.getJSONObject("data");
            Set<String> keys = data.keySet();
            for (String key : keys) {
                JSONArray arrItem = data.getJSONArray(key);
                for (int i = 0; i < arrItem.size(); i++) {
                    if ("description.port_info.device_model".equals(key)) {
//                        System.out.println(key);
                        continue;
                    }
                    suggestions.add(arrItem.get(i).toString());
//                    suggestions.add(key + ":" + arrItem.get(i));
                }
            }
        }
    }
}
