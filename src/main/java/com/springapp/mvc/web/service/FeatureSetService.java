package com.springapp.mvc.web.service;

import com.alibaba.fastjson.JSONObject;
import com.springapp.mvc.web.listener.FeatureSetsFillerOnStartup;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by lyp on 2016-01-22.
 * 请求地理服务器的FeatureSet
 */
@Service
public class FeatureSetService {
    public String getFeatureSets() {
        JSONObject featureSets = new JSONObject();
        featureSets.put("countryFS", FeatureSetsFillerOnStartup.getCountryFeatureSet());
        featureSets.put("provinceFS", FeatureSetsFillerOnStartup.getProvinceFeatureSet());
//        featureSets.put("cityFS", FeatureSetsFillerOnStartup.getCityFeatureSet());
        JSONObject result = new JSONObject();
        result.put("errmsg", "");
        result.put("statuscode", "200");
        result.put("data", featureSets);
        return result.toString();
    }

    public String getCountryFeatureSet() {
        JSONObject featureSet = FeatureSetsFillerOnStartup.getCountryFeatureSet();
        JSONObject result = new JSONObject();
        result.put("errmsg", "");
        result.put("statuscode", "200");
        result.put("data", featureSet);
        return result.toString();
    }

    public String getProvinceFeatureSet() {
        JSONObject featureSet = FeatureSetsFillerOnStartup.getProvinceFeatureSet();
        JSONObject result = new JSONObject();
        result.put("errmsg", "");
        result.put("statuscode", "200");
        result.put("data", featureSet);
        return result.toString();
    }
/*

    public String getCityFeatureSet() {
        JSONObject featureSet = FeatureSetsFillerOnStartup.getCityFeatureSet();
        JSONObject result = new JSONObject();
        result.put("errmsg", "");
        result.put("statuscode", "200");
        result.put("data", featureSet);
        return result.toString();
    }
*/

/*
    public String getFeatureSetsByNames(String names) {
        JSONObject featureSets = new JSONObject();
        List<String> list = new ArrayList<String>();
        //Collections.addAll(userList, userid);
        Collections.addAll(list, names.split("_"));
        featureSets.put("cityFS", FeatureSetsFillerOnStartup.getCityFeatureSetByNames(list));
        JSONObject result = new JSONObject();
        result.put("errmsg", "");
        result.put("statuscode", "200");
        result.put("data", featureSets);
//        System.out.println(featureSets.getJSONObject("cityFS"));
        return result.toString();
    }*/

/*    public static void main(String[] args) {
        FeatureSetService f = new FeatureSetService();
        f.getFeatureSets();
    }*/
}
