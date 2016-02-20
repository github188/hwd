package com.springapp.mvc.web.daoLike;

import com.springapp.mvc.web.model.NewDevice;
import com.springapp.mvc.web.util.RestClient;
import com.springapp.mvc.web.util.Tool;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.util.*;

/**
 * Created by lyp on 2016-01-20.
 * 新的搜索设备DAO
 */
@Repository
public class NewDeviceDAO {
    private static final Logger logger = LoggerFactory.getLogger(DeviceDAO.class);
    RestClient rc = new RestClient();

    //返回用户查询的数据，用于前端以列表的形式显示设备信息（数据访问层）高级搜素
    public JSONObject getResult4DeviceSearch(String uri, Map<String, Object> criteria) {
        logger.debug("NewDAO ==>> getResult4DeviceSearch starts =================");
//        System.out.println("NewDAO ==>> getResult4DeviceSearch starts =======================");
        JSONObject result = JSONObject.fromObject(rc.get(uri, criteria));
//        System.out.println("before: " + result);

        if ("200".equals(result.getString("statuscode"))) {
            result = rawData2ResponseBody(result);
        }
        return result;
    }

    @SuppressWarnings({"rawtypes", "unchecked"})
    private JSONObject rawData2ResponseBody(JSONObject resp) {
        JSONObject zh2en = Tool.getCountryMapping();
        //aggregation中的country@%city的处理
        JSONObject agg = resp.getJSONObject("aggregation");
        if (agg.containsKey("country@%city")) {
            JSONObject countries = new JSONObject();    //用于存储处理后的countries
            JSONObject cc = agg.getJSONObject("country@%city");
            Iterator<String> it = cc.keySet().iterator();
            while (it.hasNext()) {
                String key = it.next();
//                System.out.println("key sort:" + key + ": " + cc.getInteger(key));
                String country, city;
                try {
                    String[] keyArr = key.split("@%");
                    if (keyArr.length == 2) {   //国家和城市都有值，例如"中国@%北京"
                        country = "".equals(keyArr[0]) ? "Others" : keyArr[0];
                        city = keyArr[1];
                    } else if (keyArr.length == 1) {    //只有国家的，例如"中国@%"
                        country = keyArr[0];
                        city = "Unknown";
                    } else {//既没有国家也没有城市的，例如"@%"
                        continue;
                    }
                    if (!countries.containsKey(country)) {
                        JSONObject countryObj = new JSONObject();
                        JSONObject cities = new JSONObject();
                        int initCount = cc.getInt(key);
                        cities.put(city, initCount);
                        countryObj.put("count", initCount);
                        countryObj.put("cities", cities);
                        if (zh2en.has(country)) {
                            countryObj.put("en", zh2en.getString(country));
                        }
                        countries.put(country, countryObj);
                    } else {
                        JSONObject tmpCountry = countries.getJSONObject(country);
                        JSONObject tmpCities = tmpCountry.getJSONObject("cities");
                        tmpCities.put(city, cc.getInt(key));
                        tmpCountry.put("count", tmpCountry.getInt("count") + cc.getInt(key));
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            agg.put("country@%city", countries);
            resp.put("aggregation", agg);
        }

        //data
        JSONArray data = resp.getJSONArray("data");
//        System.out.println("data=========" + data);

        if (data.size() > 0) {
            List<NewDevice> devices = new ArrayList<NewDevice>();
            for (Object obj : data) {
                NewDevice device = new NewDevice();
                JSONObject d = JSONObject.fromObject(obj);
                JSONObject desc = d.getJSONObject("description");
                JSONObject device_location = desc.getJSONObject("device_location");
                JSONArray vul_info = desc.getJSONArray("vul_info");
                JSONArray port_info = desc.getJSONArray("port_info");
                JSONObject os_info = desc.getJSONObject("os_info");

                //(1.a)tags
                List<String> tags = new ArrayList<String>();
                //(2)ip
                device.setIp(desc.getString("ip"));
                //(3)lon
                device.setLon(device_location.getDouble("lon"));
                //(4)lat
                device.setLat(device_location.getDouble("lat"));
                //(5)location
                String location = "", country, city, province;

                country = !"".equals(device_location.getString("zh_CN")) ? device_location.getString("zh_CN") : device_location.getString("country");
                province = !"".equals(device_location.getString("zh_Pro")) ? device_location.getString("zh_Pro") : device_location.getString("province");
                city = !"".equals(device_location.getString("zh_City")) ? device_location.getString("zh_City") : device_location.getString("city");
                if (!"".equals(country)) {
                    location += country;
                }
                if (!"".equals(province)) {
                    location += ", " + province;
                }
                if (!"".equals(city)) {
                    location += ", " + city;
                }
                device.setLocation(location);
                //(6)ports
                if (port_info.size() > 0) {
                    List<Map<String, String>> ports = new ArrayList<Map<String, String>>();
                    for (int i = 0; i < port_info.size(); i++) {
                        Map<String, String> port = new HashMap<String, String>();
                        JSONObject item = port_info.getJSONObject(i);
                        String portKey, portValue;
                        portKey = item.getString("protocol") + ": " + item.getString("port");
                        portValue = item.getString("banner");
                        port.put(portKey, portValue);
                        ports.add(port);

                        String type = item.getString("device_type"),
                                brand = item.getString("device_brand"),
                                model = item.getString("device_model");
                        //(1.b)tags.type
                        if (!"".equals(type) && !contains(tags, type)) {
                            tags.add(type);
//                            System.out.println("Type---------" + type);
                        }
                        //(1.c)tags.brand
                        if (!"".equals(brand) && !contains(tags, brand)) {
                            tags.add(brand);
//                            System.out.println("Brand---------" + brand);
                        }
                        //(1.d)tags.model
                        if (!"".equals(model) && !contains(tags, model)) {
                            tags.add(model);
//                            System.out.println("Model---------" + model);
                        }
                    }
                    device.setPorts(ports);
                }
                //(1.e)tags.os
                if (os_info.containsKey("os")) {
                    String os = os_info.getString("os");
                    if (!"".equals(os) && !contains(tags, os)) {
                        tags.add(os_info.getString("os"));
                    }
                }
                //(7)vuls
                if (vul_info.size() > 0) {
                    List<Map<String, NewDevice.VulValueEntity>> vuls = new ArrayList<Map<String, NewDevice.VulValueEntity>>();
                    for (int i = 0; i < vul_info.size(); i++) {
                        Map<String, NewDevice.VulValueEntity> vul = new HashMap<String, NewDevice.VulValueEntity>();
                        JSONObject item = vul_info.getJSONObject(i), vul_ID = item.getJSONObject("vul_ID");
//                        System.out.println("Vul---------" + item);
//                        System.out.println("vul_ID---------" + vul_ID);

                        NewDevice.VulValueEntity vulValue = new NewDevice.VulValueEntity();
                        String vulKey;
                        vulKey = !"".equals(vul_ID.getString("CVE")) ? vul_ID.getString("CVE") : vul_ID.getString("CNVD");
//                        System.out.println("Vul Key--------------" + vulKey);
                        vulValue.setData(item.getJSONObject("data"));
                        //getString("data").replace("\"", "\\\"")
                        vulValue.setDesc(item.getString("description"));
                        vulValue.setPlatform(item.getString("platform"));
                        vulValue.setImgURL(item.getString("get_picture"));
                        vul.put(vulKey, vulValue);
                        vuls.add(vul);
                    }
                    device.setVuls(vuls);
                }

                //(8)lastModified (timestamp)
                device.setTimestamp(d.getString("lastModified"));
                //(1.f)
                device.setTags(tags);
                devices.add(device);
            }
            resp.put("data", devices);
        }
        return resp;
    }

    private boolean contains(List<String> sArr, String s) {
        boolean has = false;
        if (sArr != null) {
            for (int i = 0; i < sArr.size(); i++) {
                if (s.equals(sArr.get(i))) {
                    has = true;
                }
            }
        }
        return has;
    }
/*
    public static void main(String[] args) {
        NewDeviceDAO dd = new NewDeviceDAO();
        Map<String, Object> criteria = new HashMap<String, Object>();
        String json = "{\"must\":\"北\",\"should\":\"\",\"mustnot\":\"\",\"ip\":\"\",\"country\":\"\",\"province\":\"\",\"city\":\"\",\"type\":\"\",\"brand\":\"\",\"model\":\"\",\"protocol\":\"\",\"port\":\"\",\"banner\":\"\",\"vulId\":\"\",\"vulType\":\"\",\"vulName\":\"\",\"os\":\"\",\"taskId\":\"\",\"vpsIp\":\"\",\"lastModified\":\"1453248000\"}";
//        criteria.put("q", JSONObject.fromObject(json));
        String mapSearch = "{\"geo\":\"polygon(4745210.7159425225 6799838.036247503,4745210.7159425225 567468.4979890296,17268653.430182472 567468.4979890296,17268653.430182472 6799838.036247503,4745210.7159425225 6799838.036247503)\",\"lossycompress\":0,\"page\":1,\"pagesize\":5,\"permitfilter\":\"\",\"typefilter\":\"\",\"wd\":\"\\\"d\\\" country:日本\",\"zoomlevel\":4}";
        criteria.put("q", JSONObject.fromObject(mapSearch));
//        String search = "{\"geo\":\"polygon(69.9199218750096 56.629998264227424,114.04101562499787 56.629998264227424,158.1621093749862 56.629998264227424,158.1621093749862 -8.88878176349202,114.04101562499787 -8.88878176349202,69.9199218750096 -8.88878176349202)\",\"lossycompress\":1,\"page\":1,\"permitfilter\":\"\",\"typefilter\":\"\",\"wd\":\"* \",\"zoomlevel\":6}";
        //dd.getDevices4List(criteria);
        //dd.getResponse4Globe(JSONObject.fromObject(search).toString());
//        System.out.println(dd.getResult4DeviceSearch("http://10.10.12.72:8083/se/search/advanced?q={q}", criteria));
//        System.out.println(dd.getResult4DeviceSearch("http://10.10.12.72:8083/se/search/map?q={q}", criteria));
    }*/
}
