package com.springapp.mvc.web.daoLike;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.springapp.mvc.web.model.Device;
import com.springapp.mvc.web.model.NewDevice;
import com.springapp.mvc.web.model.Device4MapOrGlobe;
import com.springapp.mvc.web.util.MyHttpClient;
import com.springapp.mvc.web.util.RestClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import javax.annotation.PostConstruct;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by lyp on 2015/12/10.
 * 从数据平台/搜索平台获取原始数据
 */
@Repository
public class DeviceDAO {
    //URL将来从配置文件获取
    private static final String uri4List = "http://10.10.2.143:8083/se/search?wd={wd}&page={page}";
    private static final String uri4MapOrGlobe = "http://10.10.2.143:8083/se/search/map?q={q}";  //传入json字符串，{"key1":"value1", "key2":"value2", ...}
    private static final Logger logger = LoggerFactory.getLogger(DeviceDAO.class);

    List<Device> devices;
    RestClient rc = new RestClient();

    //Search Function
    public List<Device> getSearchedDevices(String criteria) {
        List<Device> result = new ArrayList<Device>();
        for (Device device : devices) {
            if (!StringUtils.isEmpty(criteria)) {
                result.add(device); //http请求获取实际数据
            }
        }
        return result;
    }

    //Init some devices for testing
    @PostConstruct
    private void initDataForTesting() {
        devices = new ArrayList<Device>();
        List<Double> geoCoord = new ArrayList<Double>();
        geoCoord.add(1.2);
        geoCoord.add(2.2);
        geoCoord.add(3.2);

        List<String> types1 = new ArrayList<String>(), types2 = new ArrayList<String>();
        types1.add("t1Sub1");
        types1.add("t1Sub2");
        types2.add("t2Sub1");
        types2.add("t2Sub2");
        types2.add("t2Sub3");
        MyHttpClient httpClient = new MyHttpClient();
        if ("success".equals(httpClient.get(""))) {
//Device(List<String> types, List<Double> geoCoord, String code, String country, String city)
            Device d1 = new Device(types1, geoCoord, "cn", "China", "Beijing");
            Device d2 = new Device(types1, geoCoord, "cn", "China", "Shanghai");
            Device d3 = new Device(types2, geoCoord, "cn", "China", "Guangzhou");
            Device d4 = new Device(types2, geoCoord, "cn", "China", "Nanjing");
            Device d5 = new Device(types2, geoCoord, "cn", "China", "Nanjing");
            devices.add(d1);
            devices.add(d2);
            devices.add(d3);
            devices.add(d4);
            devices.add(d5);
        }
    }

    ///////--------------------------------------------------------------------------------------------
    //返回用户查询的数据，用于前端以列表的形式显示设备信息（数据访问层）-----------------------------√
    public JSONObject getDevices4List(Map<String, Object> criteria) {
        logger.debug("DAO ==>> getDevices4List starts =================");
//        System.out.println("DAO ==>> getDevices4List starts =======================");
        JSONObject result = rc.get(uri4List, criteria);
//        System.out.println("dao rc: "+result.toString());
        if ("200".equals(result.getString("statuscode"))) {
            //aggregation中的country@%city的处理
            JSONObject agg = result.getJSONObject("aggregation");
            if (agg.containsKey("country@%city")) {
                JSONObject cc = agg.getJSONObject("country@%city");
                JSONObject countries = new JSONObject();    //处理后的countries
                for (String key : new ArrayList<String>(cc.keySet())) {
                    String country, city;
                    try {
                        String[] keyArr = key.split("@%");
                        if (keyArr.length == 2) {   //国家和城市都有值，例如"中国@%北京"
                            country = "".equals(keyArr[0]) ? "Unknown" : keyArr[0];
                            city = keyArr[1];
                        } else if (keyArr.length == 1) {    //只有国家的，例如"中国@%"
                            country = keyArr[0];
                            city = "Unknown";
                        } else {//既没有国家也没有城市的，例如"@%"
                            country = "Unknown";
                            city = "Unknown";
                        }
                        if (!countries.containsKey(country)) {
                            Map<String, Integer> map = new HashMap<String, Integer>();
                            map.put(city, cc.getIntValue(key));
                            countries.put(country, map);
                        } else {
                            ((Map<String, Integer>) countries.get(country)).put(city, cc.getIntValue(key));
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
                agg.put("country@%city", countries);
                result.put("aggregation", agg);
            }

            //data
            JSONArray sourceData = result.getJSONArray("data");
            if (sourceData.size() > 0) {
                JSONArray data = new JSONArray();
                String latestTime = "0";                //存储最近的时间，用于设备时间的显示
                for (Object obj : sourceData) {
                    JSONObject objItem = (JSONObject) JSON.toJSON(obj);
                    /*dataItem contains the following fields,
                    * tags: Array. Includes original tags. <--Later the os and type of the device will be included-->
                    * location: JSONObject. Includes country, city, longitude and latitude
                    * timestamp: String. The latest time
                    * ports: JSONArray. Each item includes port number and detail information
                    * vuls: JSONArray. Each item includes vul name and detail information
                    */
                    JSONObject dataItem = new JSONObject();
                    //desc(a tmp variable)
                    JSONObject objDesc = (JSONObject) JSONObject.toJSON(objItem.get("description"));

                    //dataItem.ip
                    dataItem.put("ip", objDesc.get("ip"));

                    /*dataItem.location, which contains the following fields,
                     * country : China
                     * city : Beijing
                     * lat : 23.1167
                     * lon : 113.25
                     */
                    JSONObject objLoc = (JSONObject) JSONObject.toJSON(objDesc.get("device_location"));
                    JSONObject dataLoc = new JSONObject();
                    String country = "".equals(objLoc.getString("zh_CN")) ? objLoc.getString("country") : objLoc.getString("zh_CN");
                    dataLoc.put("country", country);
                    String city = "".equals(objLoc.getString("zh_City")) ? objLoc.getString("city") : objLoc.getString("zh_City");
                    dataLoc.put("city", city);
                    dataLoc.put("lat", objLoc.getString("lat"));
                    dataLoc.put("lon", objLoc.getString("lon"));
                    dataItem.put("location", dataLoc);

                    //dataItem.os
                    if (!objDesc.getJSONObject("os_info").isEmpty()) {
                        dataItem.put("os", objDesc.getJSONObject("os_info").getString("os"));
                    }

                    //dataItem.tags
                    dataItem.put("tags", objItem.get("tags"));

                    //从端口扫描信息列表中获取所需数据，拼装端口和其他字段(type和timestamp)
                    JSONArray objPorts = objDesc.getJSONArray("port_info");
                    //data.type
                    if (objPorts.size() > 0) {
                        dataItem.put("type", ((JSONObject) JSONObject.toJSON(objPorts.get(0))).getString("device_type"));
                    } else {
                        dataItem.put("type", "Unknown");
                    }

                    /*
                    * dataItem.ports, JSONArray.
                    * Each item is an JSONObject, the key is port number, value is also a JSONArray, containing service, banner and display fields.
                    * i.e.{"21":{"service":"http","banner":"banner21"}
                    */
                    JSONArray dataPorts = new JSONArray();
                    for (Object o : objPorts) {
                        JSONObject objPort = (JSONObject) JSONObject.toJSON(o);
                        JSONObject dataPort = new JSONObject();
                        JSONObject dataPortValue = new JSONObject();
                        //指定本条端口信息是否显示，-1不显示，其他显示
                        if (objPort.get("display") != null && objPort.getIntValue("display") == -1) {
                            dataPortValue.put("display", -1);
                        }
                        dataPortValue.put("banner", objPort.getString("banner"));
                        dataPortValue.put("service", objPort.getString("device_service"));
                        dataPort.put(objPort.getString("port"), dataPortValue);
                        dataPorts.add(dataPort);

                        //获取离当前最近的时间
                        String tmpTime = objPort.getString("timestamp_received");
                        if (latestTime.compareTo(tmpTime) < 0) {
                            latestTime = tmpTime;
                        }
                    }
                    dataItem.put("ports", dataPorts);

                     /*dataItem.vuls. JSONArray. Each item contains the following fields,
                     * risk_level : 1
                     * desc : description
                     * vul_type : weak_password
                     * type : exploit
                     * platform : Unix
                     * data : JSONObject
                     * display: -1
                     * i.e. "vulName1":{"risk_level":"1","desc":"description","vul_type":"weak_password","type":"exploit","platform":"Unix","data":"sss"}
                     */
                    JSONArray objVuls = objDesc.getJSONArray("vul_info");
                    JSONArray dataVuls = new JSONArray();
                    for (Object o : objVuls) {
                        JSONObject objVul = (JSONObject) JSONObject.toJSON(o);
                        JSONObject dataVul = new JSONObject();
                        JSONObject dataVulValue = new JSONObject();
                        //指定本条消息是否显示-1不显示，其他显示
                        if (objVul.get("display") != null && objVul.getIntValue("display") == -1) {
                            dataVulValue.put("display", -1);
                        }

                        dataVulValue.put("risk_level", objVul.getString("risk_level"));
                        dataVulValue.put("desc", objVul.getString("description"));
                        dataVulValue.put("vul_type", objVul.getString("vul_type"));
                        dataVulValue.put("type", objVul.getString("type"));
                        dataVulValue.put("platform", objVul.getString("platform"));
                        //漏洞的data中数据类似json格式，但需要传回字符串，需要将双引号进行转义
                        dataVulValue.put("data", objVul.getString("data").replace("\"", "\\\""));
                        dataVul.put(objVul.getString("vul_name"), dataVulValue);
                        dataVuls.add(dataVul);

                        //获取离当前最近的时间
                        String tmpTime = objVul.getString("timestamp_update");
                        if (latestTime.compareTo(tmpTime) < 0) {
                            latestTime = tmpTime;
                        }
                    }
                    dataItem.put("vuls", dataVuls);

                    //dataItem.timestamp
                    dataItem.put("timestamp", latestTime);

                    //add dataItem to data array
                    data.add(dataItem);
                }
                result.put("data", data);
            }
        }
//        System.out.println("get List ");
//        System.out.println(result.toString());
        return result;
    }

    //返回用于3d设备展示的数据（数据访问层）-----------------------------------------------------√
    public JSONObject getDevices4Globe(String criteria) {
        logger.debug("DAO ==>> getResponse4Globe starts =================");
//        System.out.println("DAO ==>> getResponse4Globe starts =======================");
        JSONObject result = rc.get(uri4MapOrGlobe, criteria);
        if ("200".equals(result.getString("statuscode"))) {
            JSONArray data = result.getJSONArray("data");
            Map<String, List<Device4MapOrGlobe>> map;
            map = new HashMap<String, List<Device4MapOrGlobe>>();
            if (data.size() > 0) {
                for (Object o : data) {
                    JSONObject d = (JSONObject) JSONObject.toJSON(o);
                    Device4MapOrGlobe device = new Device4MapOrGlobe();

                    JSONObject desc = d.getJSONObject("description");
                    JSONObject loc = desc.getJSONObject("device_location");
                    List<Double> geoCoord = new ArrayList<Double>();
                    //组装Device
                    device.setIp(desc.getString("ip"));
                    device.setCountry(loc.getString("country"));
                    device.setCity(loc.getString("city"));
                    geoCoord.add(loc.getDouble("lon"));
                    geoCoord.add(loc.getDouble("lat"));
                    device.setGeoCoord(geoCoord);

                    //分类存放，以device_category为准进行一级分类，再根据device_permit进行二级分类
                    String category = desc.getString("device_category");
                    JSONArray permit = desc.getJSONArray("device_permit");
                    for (int j = 0; j < permit.size(); j++) {
                        String key = category + "_" + permit.get(j);
                        if (map.containsKey(key)) {
                            map.get(key).add(device);
                        } else {
                            List<Device4MapOrGlobe> device4MapOrGlobeList = new ArrayList<Device4MapOrGlobe>();
                            device4MapOrGlobeList.add(device);
                            map.put(key, device4MapOrGlobeList);
                        }
                    }
                }
            }
            result.put("data", map);
        } else {
            result.put("data", new JSONObject());
        }
//        System.out.println("DAO getResponse4Globe Result:" + result.toString());
        return result;
    }

    //返回用于map设置展示的数据---------------------------------------------------------------------ing
    public JSONObject getDevices4Map(String criteria) {
        logger.debug("DAO ==>> getDevices4Map starts =================");
//      System.out.println("DAO ==>> getDevices4Map starts =======================");
        JSONObject result = rc.get(uri4MapOrGlobe, criteria);
        if ("200".equals(result.getString("statuscode"))) {
            JSONArray deviceList = new JSONArray();
            JSONArray data = result.getJSONArray("data");
            if (data.size() > 0) {
                int iscompress = result.getIntValue("iscompress");
                Long before = Long.parseLong(new SimpleDateFormat("yyyyMMddHHmmssSSS").format(new Date()));
                switch (iscompress) {
                    case 3: //压缩级别为3
                        for (Object o : data) {
                            JSONObject d = (JSONObject) JSONObject.toJSON(o);
                            JSONObject location = d.getJSONObject("description").getJSONObject("device_location");

                            JSONObject device = new JSONObject();
                            device.put("clustersize", d.getIntValue("clustersize"));
                            device.put("lat", location.getDouble("lat")); //latitude
                            device.put("lon", location.getDouble("lon")); //longitude
                            device.put("country", location.getString("country"));
                            device.put("city", location.getString("city"));
                            if (location.containsKey("province")) {
                                device.put("province", location.getString("province"));
                            }
                            deviceList.add(device);
                        }
                        break;
                    //case 2: //压缩级别为2，暂时不支持
                    case 1: //压缩级别为1
                        for (Object o : data) {
                            JSONObject d = (JSONObject) JSONObject.toJSON(o);
                            JSONObject desc = d.getJSONObject("description");
                            JSONObject loc = desc.getJSONObject("device_location");

                            JSONObject device = new JSONObject();
                            device.put("clustersize", d.getIntValue("clustersize"));
                            device.put("ip", desc.getString("ip"));  //ip
                            device.put("lat", loc.getDouble("lat")); //latitude
                            device.put("lon", loc.getDouble("lon")); //longitude
                            String country = !"".equals(loc.getString("zh_CN")) ? loc.getString("zh_CN") : loc.getString("country");
                            device.put("country", country); //country
                            String city = !"".equals(loc.getString("zh_City")) ? loc.getString("zh_City") : loc.getString("city");
                            device.put("city", city); //city
                            String province = loc.getString("province");
                            device.put("province", province);  //province
                            String location = country;
                            if (!"".equals(city)) {
                                location += ", " + city;
                            } else if (!"".equals(province)) {
                                location += province;
                            }
                            device.put("location", location);//country+city
                            //picture
                            if (desc.containsKey("device_permit") && !desc.getString("device_permit").isEmpty()) {
                                if (desc.getString("device_permit").contains("image")) {
                                    JSONArray vuls = desc.getJSONArray("vul_info");
                                    for (Object vul : vuls) {
                                        JSONObject jsonVul = (JSONObject) JSONObject.toJSON(vul);
                                        if (!"".equals(jsonVul.getString("get_picture"))) {
                                            device.put("image", jsonVul.getString("get_picture"));
                                        }
                                    }
                                }
                            }
                            JSONArray port_info, vul_info, ports, vuls;
                            device.put("os", desc.getJSONObject("os_info").getString("os"));  //os
                            if ((port_info = desc.getJSONArray("port_info")) != null && port_info.size() > 0) {
                                device.put("type", port_info.getJSONObject(0).getString("device_type"));    //device type
                                ports = new JSONArray();
                                for (int i = 0; i < port_info.size(); i++) {
                                    JSONObject port = port_info.getJSONObject(i);
                                    ports.add(port.getString("device_service") + ":" + port.getString("port"));
                                }
                                device.put("ports", ports);
                            }//ports
                            if ((vul_info = desc.getJSONArray("vul_info")) != null && vul_info.size() > 0) {
                                vuls = new JSONArray();
                                for (int i = 0; i < vul_info.size(); i++) {
                                    JSONObject port = vul_info.getJSONObject(i);
                                    vuls.add(port.getString("vul_type"));
                                }
                                device.put("vuls", vuls);
                            }//vulnerability
                            deviceList.add(device);
                        }
                        break;
                    default:
                        deviceList = data;
                        break;
                }
                result.put("data", deviceList);
                System.out.println("处理时间：" + (Long.parseLong(new SimpleDateFormat("yyyyMMddHHmmssSSS").format(new Date())) - before));
            }
        }
//        System.out.println("Map DAO-->" + result.toString());
        return result;
    }

    //返回用户查询的数据，用于前端以列表的形式显示设备信息（数据访问层）高级搜素-----------------------------√
    public JSONObject getResult4AdvancedSearch(String uri, Map<String, Object> criteria) {
        logger.debug("DAO ==>> getResult4AdvancedSearch starts =================");
        System.out.println("DAO ==>> getResult4AdvancedSearch starts =======================");
        JSONObject result = rc.get(uri, criteria);
        if ("200".equals(result.getString("statuscode"))) {
            result = rawData2ResponseBody(result);
        }
        return result;
    }

    private JSONObject responseToListOld(JSONObject resp) {
        JSONObject result = resp;
        //aggregation中的country@%city的处理
        JSONObject agg = resp.getJSONObject("aggregation");
        if (agg.containsKey("country@%city")) {
            JSONObject cc = agg.getJSONObject("country@%city");
            JSONObject countries = new JSONObject();    //处理后的countries
            for (String key : new ArrayList<String>(cc.keySet())) {
                String country, city;
                try {
                    String[] keyArr = key.split("@%");
                    if (keyArr.length == 2) {   //国家和城市都有值，例如"中国@%北京"
                        country = "".equals(keyArr[0]) ? "Unknown" : keyArr[0];
                        city = keyArr[1];
                    } else if (keyArr.length == 1) {    //只有国家的，例如"中国@%"
                        country = keyArr[0];
                        city = "Unknown";
                    } else {//既没有国家也没有城市的，例如"@%"
                        country = "Unknown";
                        city = "Unknown";
                    }
                    if (!countries.containsKey(country)) {
                        Map<String, Integer> map = new HashMap<String, Integer>();
                        map.put(city, cc.getIntValue(key));
                        countries.put(country, map);
                    } else {
                        ((Map<String, Integer>) countries.get(country)).put(city, cc.getIntValue(key));
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            agg.put("country@%city", countries);
            result.put("aggregation", agg);
        }

        //data
        JSONArray sourceData = resp.getJSONArray("data");
        if (sourceData.size() > 0) {
            JSONArray data = new JSONArray();
            String latestTime = "0";                //存储最近的时间，用于设备时间的显示
            for (Object obj : sourceData) {
                JSONObject objItem = (JSONObject) JSON.toJSON(obj);
                    /*dataItem contains the following fields,
                    * tags: Array. Includes original tags. <--Later the os and type of the device will be included-->
                    * location: JSONObject. Includes country, city, longitude and latitude
                    * timestamp: String. The latest time
                    * ports: JSONArray. Each item includes port number and detail information
                    * vuls: JSONArray. Each item includes vul name and detail information
                    */
                JSONObject dataItem = new JSONObject();
                //desc(a tmp variable)
                JSONObject objDesc = (JSONObject) JSONObject.toJSON(objItem.get("description"));

                //dataItem.ip
                dataItem.put("ip", objDesc.get("ip"));

                    /*dataItem.location, which contains the following fields,
                     * country : China
                     * city : Beijing
                     * lat : 23.1167
                     * lon : 113.25
                     */
                JSONObject objLoc = (JSONObject) JSONObject.toJSON(objDesc.get("device_location"));
                JSONObject dataLoc = new JSONObject();
                String country = "".equals(objLoc.getString("zh_CN")) ? objLoc.getString("country") : objLoc.getString("zh_CN");
                dataLoc.put("country", country);
                String city = "".equals(objLoc.getString("zh_City")) ? objLoc.getString("city") : objLoc.getString("zh_City");
                dataLoc.put("city", city);
                dataLoc.put("lat", objLoc.getString("lat"));
                dataLoc.put("lon", objLoc.getString("lon"));
                dataItem.put("location", dataLoc);

                //dataItem.os
                if (!objDesc.getJSONObject("os_info").isEmpty()) {
                    dataItem.put("os", objDesc.getJSONObject("os_info").getString("os"));
                }

                //dataItem.tags
                dataItem.put("tags", objItem.get("tags"));

                //从端口扫描信息列表中获取所需数据，拼装端口和其他字段(type和timestamp)
                JSONArray objPorts = objDesc.getJSONArray("port_info");
                //data.type
                if (objPorts.size() > 0) {
                    dataItem.put("type", ((JSONObject) JSONObject.toJSON(objPorts.get(0))).getString("device_type"));
                } else {
                    dataItem.put("type", "Unknown");
                }

                    /*
                    * dataItem.ports, JSONArray.
                    * Each item is an JSONObject, the key is port number, value is also a JSONArray, containing service, banner and display fields.
                    * i.e.{"21":{"service":"http","banner":"banner21"}
                    */
                JSONArray dataPorts = new JSONArray();
                for (Object o : objPorts) {
                    JSONObject objPort = (JSONObject) JSONObject.toJSON(o);
                    JSONObject dataPort = new JSONObject();
                    JSONObject dataPortValue = new JSONObject();
                    //指定本条端口信息是否显示，-1不显示，其他显示
                    if (objPort.get("display") != null && objPort.getIntValue("display") == -1) {
                        dataPortValue.put("display", -1);
                    }
                    dataPortValue.put("banner", objPort.getString("banner"));
                    dataPortValue.put("service", objPort.getString("device_service"));
                    dataPort.put(objPort.getString("port"), dataPortValue);
                    dataPorts.add(dataPort);

                    //获取离当前最近的时间
                    String tmpTime = objPort.getString("timestamp_received");
                    if (latestTime.compareTo(tmpTime) < 0) {
                        latestTime = tmpTime;
                    }
                }
                dataItem.put("ports", dataPorts);

                     /*dataItem.vuls. JSONArray. Each item contains the following fields,
                     * risk_level : 1
                     * desc : description
                     * vul_type : weak_password
                     * type : exploit
                     * platform : Unix
                     * data : JSONObject
                     * display: -1
                     * i.e. "vulName1":{"risk_level":"1","desc":"description","vul_type":"weak_password","type":"exploit","platform":"Unix","data":"sss"}
                     */
                JSONArray objVuls = objDesc.getJSONArray("vul_info");
                JSONArray dataVuls = new JSONArray();
                for (Object o : objVuls) {
                    JSONObject objVul = (JSONObject) JSONObject.toJSON(o);
                    JSONObject dataVul = new JSONObject();
                    JSONObject dataVulValue = new JSONObject();
                    //指定本条消息是否显示-1不显示，其他显示
                    if (objVul.get("display") != null && objVul.getIntValue("display") == -1) {
                        dataVulValue.put("display", -1);
                    }

                    dataVulValue.put("risk_level", objVul.getString("risk_level"));
                    dataVulValue.put("desc", objVul.getString("description"));
                    dataVulValue.put("vul_type", objVul.getString("vul_type"));
                    dataVulValue.put("type", objVul.getString("type"));
                    dataVulValue.put("platform", objVul.getString("platform"));
                    //漏洞的data中数据类似json格式，但需要传回字符串，需要将双引号进行转义
                    dataVulValue.put("data", objVul.getString("data").replace("\"", "\\\""));
                    dataVul.put(objVul.getString("vul_name"), dataVulValue);
                    dataVuls.add(dataVul);

                    //获取离当前最近的时间
                    String tmpTime = objVul.getString("timestamp_update");
                    if (latestTime.compareTo(tmpTime) < 0) {
                        latestTime = tmpTime;
                    }
                }
                dataItem.put("vuls", dataVuls);

                //dataItem.timestamp
                dataItem.put("timestamp", latestTime);

                //add dataItem to data array
                data.add(dataItem);
            }
            result.put("data", data);
        }
        return null;
    }

    private JSONObject rawData2ResponseBody(JSONObject resp) {
        JSONObject result = resp;
        //aggregation中的country@%city的处理
        JSONObject agg = resp.getJSONObject("aggregation");
        if (agg.containsKey("country@%city")) {
            JSONObject cc = agg.getJSONObject("country@%city");
            JSONObject countries = new JSONObject();    //处理后的countries
            for (String key : new ArrayList<String>(cc.keySet())) {
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
                        Map<String, Integer> map = new HashMap<String, Integer>();
                        map.put(city, cc.getIntValue(key));
                        countries.put(country, map);
                    } else {
                        ((Map<String, Integer>) countries.get(country)).put(city, cc.getIntValue(key));
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            agg.put("country@%city", countries);
            result.put("aggregation", agg);
        }

        //data
        JSONArray data = resp.getJSONArray("data");
        if (data.size() > 0) {
            List<NewDevice> devices = new ArrayList<NewDevice>();
            for (Object obj : data) {
                NewDevice device = new NewDevice();
                JSONObject d = (JSONObject) JSON.toJSON(obj);
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
                device.setLon(device_location.getDouble("lon"));
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
                        if (!contains(tags, type)) {
                            tags.add(type);
                        }
                        //(1.c)tags.brand
                        if (!contains(tags, brand)) {
                            tags.add(brand);
                        }
                        //(1.d)tags.model
                        if (!contains(tags, model)) {
                            tags.add(model);
                        }
                    }
                    device.setPorts(ports);
                }
                //(1.e)tags.os
                if (!"".equals(os_info.getString("os"))) {
                    tags.add(os_info.getString("os"));
                }
                //(7)vuls
                if (vul_info.size() > 0) {
                    List<Map<String, NewDevice.VulValueEntity>> vuls = new ArrayList<Map<String, NewDevice.VulValueEntity>>();
                    for (int i = 0; i < vul_info.size(); i++) {
                        Map<String, NewDevice.VulValueEntity> vul = new HashMap<String, NewDevice.VulValueEntity>();
                        JSONObject item = vul_info.getJSONObject(i), vul_ID = item.getJSONObject("vul_ID");
                        NewDevice.VulValueEntity vulValue = new NewDevice.VulValueEntity();
                        String vulKey;
                        vulKey = !"".equals(vul_ID.getString("CVE")) ? vul_ID.getString("CVE") : vul_ID.getString("CNVD");
                        vulValue.setData(item.getJSONObject("data"));
                        vulValue.setDesc(item.getString("description"));
                        vulValue.setPlatform(item.getString("platform"));
                        vul.put(vulKey, vulValue);
                        vuls.add(vul);
                    }
                    device.setVuls(vuls);
                }

                //(8)lastModified (timestamp)
                device.setTimestamp(d.getString("lastModified"));
                devices.add(device);
            }
            result.put("data", devices);
        }
        return result;
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

/*    public static void main(String[] args) {
        DeviceDAO dd = new DeviceDAO();
        Map<String, Object> criteria = new HashMap<String, Object>();
        AdvanceSearchCriteria advs = new AdvanceSearchCriteria();
        advs.setIp("1.1.1.1");
        criteria.put("q", JSON.toJSON(advs));
//        String search = "{\"geo\":\"polygon(69.9199218750096 56.629998264227424,114.04101562499787 56.629998264227424,158.1621093749862 56.629998264227424,158.1621093749862 -8.88878176349202,114.04101562499787 -8.88878176349202,69.9199218750096 -8.88878176349202)\",\"lossycompress\":1,\"page\":1,\"permitfilter\":\"\",\"typefilter\":\"\",\"wd\":\"* \",\"zoomlevel\":6}";
//
        //dd.getDevices4List(criteria);
        //dd.getResponse4Globe(JSONObject.fromObject(search).toString());
        System.out.println(dd.getResult4AdvancedSearch("http://10.10.12.72:8083/se/search/advanced?q={q}", criteria));
    }*/

}
