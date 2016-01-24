package com.springapp.mvc.web.listener;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.springapp.mvc.web.config.Constant;
import com.springapp.mvc.web.util.RestClient;
import com.springapp.mvc.web.util.Tool;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

/**
 * Created by lyp on 2016-01-22.
 * 系统启动时，运行此程序，从服务器获取国家、省（中国）和城市的地理数据，保存为静态数据，常住内存
 */
@Component
public class FeatureSetsFillerOnStartup implements ApplicationListener<ContextRefreshedEvent> {
    private static JSONObject countryFeatureSet;
    private static JSONObject provinceFeatureSet;
    private static JSONObject cityFeatureSet;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        countryFeatureSet = getCountryFeatureSet();
        provinceFeatureSet = getProvinceFeatureSet();
        cityFeatureSet = getCityFeatureSet();
    }

    public static JSONObject getCountryFeatureSet() {
        if (countryFeatureSet == null) {
            countryFeatureSet = getAndFormatFeatureSet(Constant.countryFeatureSetURL);
        }
        return countryFeatureSet;
    }

    public static JSONObject getProvinceFeatureSet() {
        if (provinceFeatureSet == null) {
            provinceFeatureSet = getAndFormatFeatureSet(Constant.provinceFeatureSetURL);
        }
        return provinceFeatureSet;
    }

    public static JSONObject getCityFeatureSet() {
        /*if (cityFeatureSet == null) {
            cityFeatureSet = getAndFormatFeatureSet(Constant.cityFeatureSetURL);
        }*/
        return new JSONObject();
    }

    // 将features对象数组以其中的一个属性为key转化为map数组，更方便前端使用
    public static JSONObject getAndFormatFeatureSet(String url) {
        JSONObject zh2enMapping = JSON.parseObject(Tool.getCountryMappingStr());//待后续优化，现在先不改
        RestClient rc = new RestClient();
        JSONObject jsonObj = JSONObject.parseObject(rc.get(url));
        JSONArray features = jsonObj.getJSONArray("features");
        Map<String, JSONObject> map = new HashMap<String, JSONObject>();
        if (features != null) {
            Iterator<Object> it = features.iterator();
            while (it.hasNext()) {
                JSONObject feature = (JSONObject) JSON.toJSON(it.next());
                if (feature.getJSONObject("attributes").containsKey("NAME")) {
                    map.put(feature.getJSONObject("attributes").getString("NAME"), feature);
                } else if (feature.getJSONObject("attributes").containsKey("Name_CHN")) {
                    map.put(feature.getJSONObject("attributes").getString("Name_CHN"), feature);
                }
//            System.out.println(feature.getJSONObject("attributes").getString("NAME"));
            }
        }
        jsonObj.put("features", map);
        return jsonObj;
    }

   /* public static void main(String[] args) {
        System.out.println(getCityFeatureSet());
    }*/
}
