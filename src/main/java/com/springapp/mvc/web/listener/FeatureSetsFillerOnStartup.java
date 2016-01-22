package com.springapp.mvc.web.listener;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.springapp.mvc.web.config.Constant;
import com.springapp.mvc.web.util.RestClient;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import java.util.Iterator;

/**
 * Created by lyp on 2016-01-22.
 * 系统启动时，运行此程序，从服务器获取国家、省（中国）和城市的地理数据，保存为静态数据，常住内存
 */
@Component
public class FeatureSetsFillerOnStartup implements ApplicationListener<ContextRefreshedEvent> {
    public static String countryFeatureSets;
    public static String provinceFeatureSets;
    public static String cityFeatureSets;


    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        RestClient rc = new RestClient();
        countryFeatureSets = rc.get(Constant.countryFeatureSetURL);
        provinceFeatureSets = rc.get(Constant.provinceFeatureSetURL);
        cityFeatureSets = rc.get(Constant.cityFeatureSetURL);
        JSONObject countryJson = JSONObject.parseObject(countryFeatureSets);
        JSONArray features = countryJson.getJSONArray("features");
        JSONArray destFeatures = new JSONArray();
        Iterator<Object> it = features.iterator();
    }

    public static void main(String[] args) {
        RestClient rc = new RestClient();
        countryFeatureSets = rc.get(Constant.countryFeatureSetURL);
        provinceFeatureSets = rc.get(Constant.provinceFeatureSetURL);
        cityFeatureSets = rc.get(Constant.cityFeatureSetURL);
        JSONObject countryJson = JSONObject.parseObject(countryFeatureSets);
        JSONArray features = countryJson.getJSONArray("features");
        JSONArray destFeatures = new JSONArray();
        Iterator<Object> it = features.iterator();
        while (it.hasNext()) {
            JSONObject j = (JSONObject) JSON.toJSON(it.next());
            JSONObject attr = j.getJSONObject("attributes");
            System.out.println(attr.getString("NAME"));
        }
    }
}
