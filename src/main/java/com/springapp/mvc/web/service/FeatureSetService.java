package com.springapp.mvc.web.service;

import com.alibaba.fastjson.JSONObject;
import com.springapp.mvc.web.listener.FeatureSetsFillerOnStartup;
import org.springframework.stereotype.Service;

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
        featureSets.put("cityFS", FeatureSetsFillerOnStartup.getCityFeatureSet());
        JSONObject result = new JSONObject();
        result.put("errmsg", "");
        result.put("statuscode", "200");
        result.put("data", featureSets);
        return result.toString();
    }
}
