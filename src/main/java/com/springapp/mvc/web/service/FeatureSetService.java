package com.springapp.mvc.web.service;

import com.springapp.mvc.web.config.Constant;
import com.springapp.mvc.web.listener.FeatureSetsFillerOnStartup;
import com.springapp.mvc.web.util.RestClient;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Service;

/**
 * Created by lyp on 2016-01-22.
 * 请求地理服务器的FeatureSet
 */
@Service
public class FeatureSetService {
    public String getFeatureSets() {
        RestClient rc = new RestClient();
        JSONObject featureSets = new JSONObject();
        if (FeatureSetsFillerOnStartup.countryFeatureSets == null) {
            featureSets.put("countryFS", rc.get(Constant.countryFeatureSetURL));
        } else {
            featureSets.put("countryFS", FeatureSetsFillerOnStartup.countryFeatureSets);
        }
        if (FeatureSetsFillerOnStartup.provinceFeatureSets == null) {
            featureSets.put("provinceFS", rc.get(Constant.provinceFeatureSetURL));
        } else {
            featureSets.put("provinceFS", FeatureSetsFillerOnStartup.provinceFeatureSets);
        }
        if (FeatureSetsFillerOnStartup.countryFeatureSets == null) {
            featureSets.put("cityFS", rc.get(Constant.cityFeatureSetURL));
        } else {
            featureSets.put("cityFS", FeatureSetsFillerOnStartup.cityFeatureSets);
        }
        JSONObject result = new JSONObject();
        result.put("errmsg", "");
        result.put("statuscode", "200");
        result.put("data", featureSets);
        return result.toString();
    }

}
