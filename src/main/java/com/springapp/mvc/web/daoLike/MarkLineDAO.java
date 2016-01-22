package com.springapp.mvc.web.daoLike;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.springapp.mvc.web.model.MarkLines;
import com.springapp.mvc.web.util.RestClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by lyp on 2015/12/10.
 * 从数据平台/搜索平台获取原始数据
 */
@Repository
public class MarkLineDAO {
    private static final String URL4Line = "http://10.10.2.84:8082/devicescan/getLinesSegment?numPerPage=100&pageId=";
    private static final Logger logger = LoggerFactory.getLogger(MarkLineDAO.class);
    private RestClient rc;

    //Init line types, the mapping from attributes to interface words
    @PostConstruct
    private void initLineTypes() { //以后使用配置文件来对应
//        lineTypes.put("port_info", "搜索探测");
//        lineTypes.put("weak_password", "弱口令漏洞验证");
//        lineTypes.put("others", "漏洞扫描");
        //markLines.setLineTypes(lineTypes);
    }


    //返回用于3d数据流展示的数据
    public MarkLines getAllMarkLines(String pageId) {
        logger.debug("DAO ==>> getAllMarkLines starts =================");
//        System.out.println("DAO ==>> getAllMarkLines starts =================");
        MarkLines markLines = null;
        rc = new RestClient();
        JSONArray resArr = rc.getJSONArray(URL4Line + pageId);
        if (resArr.size() > 0) {
            markLines = new MarkLines();
            List<MarkLines.LinesEntity> lines = new ArrayList<MarkLines.LinesEntity>();             //lines
            Map<String, double[]> points = new HashMap<String, double[]>();    //points
            Map<String, String> lineTypes = new HashMap<String, String>();                   //line types

            for (Object o : resArr) {
                JSONObject json = (JSONObject) JSONObject.toJSON(o);
                JSONObject sLoc = json.getJSONObject("start_geo");
                JSONObject eLoc = json.getJSONObject("end_geo");
                String lineType = json.getString("scan_type");

                //line types
                lineTypes.put(lineType, lineType);

                //lines
                MarkLines.LinesEntity line = new MarkLines.LinesEntity();
                double[] sGeo = {sLoc.getDouble("lon"), sLoc.getDouble("lat")},
                        eGeo = {eLoc.getDouble("lon"), eLoc.getDouble("lat")};
                line.setType_name(lineType);
                line.setStartGeo(sGeo);
                line.setEndGeo(eGeo);
                lines.add(line);

                //devices
                points.put(json.getString("start_ip"), sGeo);
                points.put(json.getString("end_ip"), eGeo);
            }
            markLines.setLineTypes(lineTypes);
            markLines.setLines(lines);
            markLines.setPoints(points);
        }
        return markLines;
    }

/*    public static void main(String[] args) {
        MarkLinesDAO mkDAO = new MarkLinesDAO();
        MarkLines ms = mkDAO.getAllMarkLines("12345");
        System.out.println(ms);
    }*/
}
