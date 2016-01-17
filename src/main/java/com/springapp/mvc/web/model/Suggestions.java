package com.springapp.mvc.web.model;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.springapp.mvc.web.config.AppConfig;
import com.springapp.mvc.web.util.RestClient;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * Created by lyp on 2016/1/17.
 * 从搜索服务器获取提示信息
 */
public class Suggestions {
    public static List<String> suggestions = new ArrayList<String>();
    private static String suggestionURL = AppConfig.suggestionURL;

    public Suggestions() {
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
            System.out.println("suggestion url is " + suggestionURL);
            suggestionURL = "http://10.10.12.72:8083/se/getSuggestions";
        }
        JSONObject resp = rc.getJSONObject(suggestionURL);
        if ("200".equals(resp.getString("statuscode")) && resp.getJSONObject("data") != null) {
            JSONObject data = resp.getJSONObject("data");
            Set<String> keys = data.keySet();
            for (String key : keys) {
                JSONArray arrItem = data.getJSONArray(key);
                for (int i = 0; i < arrItem.size(); i++) {
                    suggestions.add(key + ":" + arrItem.get(i));
                }
            }
        }
    }

   /* public static void main(String[] args) {
        Suggestions.initSuggestions();
        System.out.println(suggestions);
    }*/
}
