package com.springapp.mvc.web.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.google.gson.Gson;
import com.springapp.mvc.web.jsonView.Views;
import com.springapp.mvc.web.model.AdvancedSearchCriteria;
import com.springapp.mvc.web.model.MarkLineResponseBody;
import com.springapp.mvc.web.model.ResponseBody;
import com.springapp.mvc.web.model.SearchCriteria;
import com.springapp.mvc.web.service.*;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by lyp on 2015/12/10.
 * 控制器
 */
@RestController
public class DataApiController {
    private static final Logger logger = LoggerFactory.getLogger(DataApiController.class);
    private static Gson gson = new Gson();
    private final DeviceService deviceService;
    private final MarkLinesService markLinesService;
    private final SuggestionService suggestionService;
    private final NewDeviceService newDeviceService;
    private final FeatureSetService featureSetService;

    @Autowired
    public DataApiController(DeviceService deviceService, MarkLinesService markLinesService,
                             SuggestionService suggestionService, NewDeviceService newDeviceService,
                             FeatureSetService featureSetService) {
        this.deviceService = deviceService;
        this.markLinesService = markLinesService;
        this.suggestionService = suggestionService;
        this.newDeviceService = newDeviceService;
        this.featureSetService = featureSetService;
    }

    @JsonView(Views.Public.class)
    @RequestMapping(value = "/api/getDevicesViaAjax")
    public ResponseBody getDevicesViaAjax(@RequestBody SearchCriteria search) {
        logger.debug("DataApiController getDevicesViaAjax starts-----------");
        return deviceService.getSearchedDevices(search);
    }

    @JsonView(Views.Public.class)
    @RequestMapping(value = "/api/getDevicesViaLinkFromMap")
    public ModelAndView getDevicesViaLink2(
            @RequestParam(value = "ip", required = true) String ip) {
        logger.debug("DataApiController getDevicesViaAjax starts-----------");
        Map<String, String> map = new HashMap<String, String>();
        SearchCriteria search = new SearchCriteria();
        search.setWd(ip);
        map.put("response", deviceService.getResponse4List(search));
        map.put("wd", ip);
        return new ModelAndView("device-list", map);
    }

    @JsonView(Views.Public.class)
    @RequestMapping(value = "/api/getDevicesViaLink")
    public ModelAndView getDevicesViaLink(
            @RequestParam(value = "country", required = false) String country,
            @RequestParam(value = "city", required = false) String city,
            @RequestParam(value = "type", required = false) String type,
            @RequestParam(value = "service", required = false) String service,
            @RequestParam(value = "os", required = false) String os,
            @RequestParam(value = "port", required = false) String port,
            @RequestParam(value = "app", required = false) String app) {
        logger.debug("DataApiController getDevicesViaAjax starts-----------");
        Map<String, String> map = new HashMap<String, String>();
        SearchCriteria sc = new SearchCriteria();
        sc.setWd("XXX");
        map.put("response", gson.toJson(deviceService.getSearchResponse(sc)));
        return new ModelAndView("device-list", map);
    }

    //////////
    /*
    * @function 从其他页面搜索跳转到device-list.jsp页面，并将搜索条件转发过去
    * @param home_wd String，用户输入的搜索条件
    * @result String，将要跳转到的界面
    */
//    @RequestMapping(value = "/api/getDevicesAndForwardViaForm")
    @RequestMapping(value = "/api/getDevicesAndForwardViaForm/")
    public ModelAndView getDevicesAndForwardViaForm(@RequestParam(value = "home_wd") String home_wd) {
        logger.debug("DataApiController getDevicesAndForwardViaForm starts-----------");
//        System.out.println("Controller getDevicesAndForwardViaForm starts-----------" + home_wd);
        Map<String, String> map = new HashMap<String, String>();
        map.put("wd", home_wd);
        return new ModelAndView("device-list", map);
    }

    /*
    * @function 返回用户查询的数据
    * @param search，搜索条件，为一个对象，一般前端通过form来设置search
    * @result String类型
    * @used for 用于前端从列表界面的搜索框发起的请求
    */
    @JsonView(Views.Public.class)
    @RequestMapping(value = "/api/getResponse4List")
    public String getResponse4List(@RequestBody SearchCriteria search) {
        logger.debug("DataApiController --> getResponse4List starts-----------");
        String result = deviceService.getResponse4List(search);
//        System.out.println("Controller-->Result for list: " + result);
        return result;
    }

    /*
    * @function 返回用户查询的数据，用于前端以3d地球显示设备信息（请求转发层）
    * @param typefilter，搜索条件之一，设备的一级分类
    * @param permitfilter，搜索条件之一，设备的二级分类
    * @param lossycompress，搜索条件之一，返回数据的压缩级别，值越大压缩的越多，数据传输越少
    * @result String类型
    * @used for 用于前端从3d地球界面的http链接发起的请求
    */
    @JsonView(Views.Public.class)
    @RequestMapping(value = "/api/getDevices4Globe/{typefilter}/{permitfilter}/{lossycompress}")
    public String getDevices4Globe(
            @PathVariable("typefilter") String typefilter,
            @PathVariable("permitfilter") String permitfilter,
            @PathVariable("lossycompress") Integer lossycompress) {
        logger.debug("DataApiController ==>> getResponse4Globe starts-----------");
        System.out.println("getDevices4Globe " + typefilter);
        permitfilter = !"all".equals(permitfilter) ? permitfilter : "";
        SearchCriteria search = new SearchCriteria();
        search.setPermitfilter(permitfilter);
        search.setTypefilter(typefilter);
        search.setLossycompress(lossycompress);
        String result = deviceService.getResponse4Globe(search);
        System.out.println("globe point");
        System.out.println(result);
        return result;
    }

    /*
    * @function 返回用户查询的数据，用于前端以3d地球显示设备信息（请求转发层）
    * @param pageId，搜索条件，要获取的数据所在的页码（依赖于服务器端MangoDB分页机制）
    * @result String类型
    * @used for 用于前端从3d数据流界面的ajax发起的请求
    */
    @JsonView(Views.Public.class)
    @RequestMapping(value = "/api/getAllMarkLinesViaAjax")
    public MarkLineResponseBody getAllMarkLines(@RequestParam(value = "pageId") String pageId) {
        logger.debug("DataApiController MarkLineResponseBody starts-----------");
//        System.out.println("Controller MarkLineResponseBody starts-----------pageId = " + pageId);
        return markLinesService.getAllMarkLines(pageId);
    }

    /*
    * @function 返回用户查询的数据，用于前端地图上显示设备信息（请求转发层）
    * @param search，搜索条件
    * @result String类型
    * @used for 用于前端从Map界面的搜索请求
    */
    @JsonView(Views.Public.class)
    @RequestMapping(value = "/api/getResponse4Map")
    public String getResponse4Map(@RequestBody SearchCriteria criteria) {
        logger.debug("DataApiController ==>> getResponse4Map starts-----------");
//        System.out.println("Controller ==>> getResponse4Map starts-----------" + JSONObject.fromObject(criteria));
        String result = deviceService.getResponse4Map(criteria);
//        System.out.println("map controller result length: " + result);
        return result;
    }


    /*
     * @function 高级搜索，接收高级搜索传入的查询对象
     * @param advancedSearch，用户输入的搜索条件
     * @result String，查询结果
     */
    @RequestMapping(value = "/api/advancedSearch")
    public String advancedSearch(@RequestBody AdvancedSearchCriteria criteria) {
        logger.debug("DataApiController advancedSearch starts-----------");
        System.out.println("DataApiController advancedSearch starts-----------" + JSONObject.fromObject(criteria));
        String result = newDeviceService.getResponse4AdvanceSearch(criteria);
//        System.out.println("advancedSearch====" + result);
        return result;
    }

    /*
     * @function 高级搜索，接收高级搜索传入的查询对象
     * @param advancedSearch，用户输入的搜索条件
     * @result String，查询结果
     */
    @RequestMapping(value = "/api/mapSearch")
    public String mapSearch(@RequestBody SearchCriteria search) {
        logger.debug("DataApiController advancedSearch starts-----------");
        System.out.println("DataApiController advancedSearch starts-----------" + JSONObject.fromObject(search));
        String result = newDeviceService.getResponse4MapSearch(search);
        System.out.println("mapSearch====" + result);
        return result;
    }


    /*
    * @function 高级搜索，接收高级搜索传入的查询对象
    * @param advancedSearch，用户输入的搜索条件
    * @result String，查询结果
    */
    @JsonView(Views.Public.class)
    @RequestMapping(value = "/api/getSuggestions")
    public String getSuggestions(@RequestParam(value = "search") String search) {
        logger.debug("DataApiController advancedSearch starts-----------");
        return suggestionService.getResponse4Suggestion(search).toString();
    }

    @RequestMapping(value = "/api/getFeatureSets")
    public String getFeatureSets() {
        String fs = featureSetService.getFeatureSets();
//        System.out.println(fs);
        return fs;
    }


    @JsonView(Views.Public.class)
    @RequestMapping(value = "/api/listSearch")
    public String listSearch(@RequestBody SearchCriteria search) {
        logger.debug("DataApiController --> listSearch starts-----------" + JSONObject.fromObject(search));
        System.out.println("DataApiController --> listSearch starts-----------" + JSONObject.fromObject(search));
        String result = newDeviceService.getResponse4ListSearch(search);
        System.out.println("Controller-->Result for list: " + result);
        return result;
    }

    @RequestMapping(value = "/api/getCountryFeatureSet")
    public String getCountryFeatureSet() {
        String fs = featureSetService.getCountryFeatureSet();
//        System.out.println(fs);
        return fs;
    }

    @RequestMapping(value = "/api/getProvinceFeatureSet")
    public String getProvinceFeatureSet() {
        String fs = featureSetService.getProvinceFeatureSet();
//        System.out.println(fs);
        return fs;
    }

    /*    @RequestMapping(value = "/api/getCityFeatureSet")
        public String getCityFeatureSet() {
            String fs = featureSetService.getCityFeatureSet();
    //        System.out.println(fs);
            return fs;
        }*/
    @RequestMapping(value = "/api/uniqueUserNameCheck")
    public String uniqueUserNameCheck() {
        String fs = featureSetService.getProvinceFeatureSet();
        return fs;
    }
}