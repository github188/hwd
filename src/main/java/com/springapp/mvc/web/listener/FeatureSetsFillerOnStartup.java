package com.springapp.mvc.web.listener;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.springapp.mvc.web.config.Constant;
import com.springapp.mvc.web.util.RestClient;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import java.io.*;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
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
            provinceFeatureSet = getAndFormatProvinceFeatureSet(Constant.provinceFeatureSetURL, Constant.provinceNameMappingArc_ES);
        }
        return provinceFeatureSet;
    }

    public static JSONObject getCityFeatureSet() {
        return new JSONObject();
        /*URL r = ClassLoader.getSystemResource("");
        String root = "F:\\IdeaProjects\\hwd\\src\\main\\resources\\city-feature-set\\";
        cityFeatureSet = new JSONObject();
        JSONObject features = new JSONObject();
        if (cityFeatureSet == null) {
            for (int i = 0; i < 400; i += 40) {
                String filePath = root + i + "-" + (i + 40) + "_no_bom.json";
//                System.out.println(filePath + "----------------------------------------------------------------");
                JSONObject tmp = getCitySet(filePath);
                if (i == 0) {
                    cityFeatureSet.putAll(tmp);
                    features = tmp.getJSONObject("features");
                } else {
                    features.putAll(tmp.getJSONObject("features"));
                }
            }
        }
        cityFeatureSet.put("features", features);
//        System.out.println(cityFeatureSet.getJSONObject("features").keySet());
        return cityFeatureSet;*/
    }

    // 将features对象数组以其中的一个属性为key转化为map数组，更方便前端使用
    public static JSONObject getAndFormatFeatureSet(String url) {
//        JSONObject zh2enMapping = JSON.parseObject(Tool.getCountryMappingStr());//待后续优化，现在先不改
        RestClient rc = new RestClient();
        JSONObject jsonObj = JSONObject.parseObject(rc.get(url));
//        System.out.println("get features");
//        System.out.println(jsonObj);
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
//        System.out.println("and format" + jsonObj.keySet());
        return jsonObj;
    }

    public static JSONObject getAndFormatProvinceFeatureSet(String url, String mapping) {
        RestClient rc = new RestClient();
        JSONObject jsonObj = JSONObject.parseObject(rc.get(url));
        JSONArray features = jsonObj.getJSONArray("features");
        JSONObject nameMapping = JSONObject.parseObject(mapping);
        Map<String, JSONObject> map = new HashMap<String, JSONObject>();
        if (features != null) {
            Iterator<Object> it = features.iterator();
            while (it.hasNext()) {
                JSONObject feature = (JSONObject) JSON.toJSON(it.next());
                if (feature.getJSONObject("attributes").containsKey("Name_CHN")) {
                    String name = feature.getJSONObject("attributes").getString("Name_CHN");
                    map.put(nameMapping.getString(name), feature);
                }
            }
        }
        jsonObj.put("features", map);
//        System.out.println("and format" + jsonObj.keySet());
        return jsonObj;
    }

    private static JSONObject getCitySet(String filePath) {
        String s = ReadFile(filePath);
        JSONObject jsonObj = JSONObject.parseObject(s);
        JSONArray features = jsonObj.getJSONArray("features");
        Map<String, JSONObject> map = new HashMap<String, JSONObject>();
        if (features != null) {
            Iterator<Object> it = features.iterator();
            while (it.hasNext()) {
                JSONObject feature = (JSONObject) JSON.toJSON(it.next());
                if (feature.getJSONObject("attributes").containsKey("Name_CHN")) {
                    map.put(feature.getJSONObject("attributes").getString("Name_CHN").replace("市", ""), feature);
//                    System.out.println(feature.getJSONObject("attributes").getString("Name_CHN"));
                }
            }
        }
        jsonObj.put("features", map);
        return jsonObj;
    }

    //读取json文件
    public static String ReadFile(String path) {
        File file = new File(path);
        BufferedReader reader = null;
        StringBuilder sbread = new StringBuilder();
        try {
            InputStreamReader isr = new InputStreamReader(new FileInputStream(file), "UTF-8");

            while (isr.ready()) {
                sbread.append((char) isr.read());
            }
            isr.close();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e1) {
                }
            }
        }
        return sbread.toString();
    }

    public static JSONObject getCityFeatureSetByNames(List<String> names) {
        cityFeatureSet = getCityFeatureSet();
        JSONObject result = cityFeatureSet;
        JSONObject resultF = new JSONObject();
        JSONObject features = cityFeatureSet.getJSONObject("features");
//        System.out.println(features.keySet());
        for (int i = 0; i < names.size(); i++) {
            if (features.containsKey(names.get(i))) {
                resultF.put(names.get(i), features.getJSONObject(names.get(i)));
                continue;
            }
        }
        result.put("features", resultF);
        return result;
    }

/*    public static void main(String[] args) {
       *//* List<String> names = new ArrayList<String>();
        names.add("北京郊县");
        names.add("上海郊县");
        System.out.println(getProvinceFeatureSet().getJSONObject("features").keySet());*//*
        System.out.println(ClassLoader.getSystemResource(""));
    }*/
}
