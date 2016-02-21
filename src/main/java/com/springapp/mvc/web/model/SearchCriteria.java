package com.springapp.mvc.web.model;

import com.alibaba.fastjson.annotation.JSONField;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by lyp on 2015/12/10.
 * The “json data” will be converted into this object, via @RequestBody.
 */
public class SearchCriteria {

    String wd;    //对应请求中的wd字段
    String geo;//"polygon(lat1 lon1,lat2 lon2,lat3 lon3)", //地理过滤范围，为空则不过滤（全球），可使用polygon、circle
    String typefilter;//camera", //3D地球中的设备类型1级菜单过滤维度
    String permitfilter;// "control", //3D地球中的权限类型2级菜单过滤维度
    int zoomlevel = 6;//6, //当前的地图缩放级别，此参数决定聚类级别
    int lossycompress; // 0 //压缩级别，0为不压缩；1为去除部分无用字段；2为去除更多非必需字段，等等
    int page = 1;   //请求第几页，用于页面分页显示
    int pagesize;
    int prilevel = -1;   //用户等级，默认值-1，表示游客

    @JSONField(name = "pagesize")
    public int getPagesize() {
        return pagesize;
    }

    @JSONField(name = "pagesize")
    public void setPagesize(int pagesize) {
        this.pagesize = pagesize;
    }

    @JSONField(name = "page")
    public int getPage() {
        return page;
    }

    @JSONField(name = "pagesize")
    public void setPage(int page) {
        this.page = page;
    }

    @JSONField(name = "geo")
    public String getGeo() {
        return geo;
    }

    @JSONField(name = "geo")
    public void setGeo(String geo) {
        this.geo = geo;
    }

    @JSONField(name = "typefilter")
    public String getTypefilter() {
        return typefilter;
    }

    @JSONField(name = "typefilter")
    public void setTypefilter(String typefilter) {
        this.typefilter = typefilter;
    }

    @JSONField(name = "permitfilter")
    public String getPermitfilter() {
        return permitfilter;
    }

    @JSONField(name = "permitfilter")
    public void setPermitfilter(String permitfilter) {
        this.permitfilter = permitfilter;
    }

    @JSONField(name = "zoomlevel")
    public int getZoomlevel() {
        return zoomlevel;
    }

    @JSONField(name = "zoomlevel")
    public void setZoomlevel(int zoomlevel) {
        this.zoomlevel = zoomlevel;
    }

    @JSONField(name = "lossycompress")
    public int getLossycompress() {
        return lossycompress;
    }

    @JSONField(name = "lossycompress")
    public void setLossycompress(int lossycompress) {
        this.lossycompress = lossycompress;
    }

    @JSONField(name = "wd")
    public String getWd() {
        return wd;
    }

    @JSONField(name = "wd")
    public void setWd(String wd) {
        this.wd = wd;
    }

    @JSONField(name = "prilevel")
    public int getPrilevel() {
        return prilevel;
    }

    @JSONField(name = "prilevel")
    public void setPrilevel(int prilevel) {
        this.prilevel = prilevel;
    }

    @Override
    public String toString() {  //为了校验所有字段是否均为空
        return wd + geo + typefilter + permitfilter + zoomlevel + lossycompress + page;
    }

    public Map<String, Object> toMap() {
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("wd", wd);
        result.put("geo", geo);
        result.put("typefilter", typefilter);
        result.put("permitfilter", permitfilter);
        result.put("zoomlevel", zoomlevel);
        result.put("lossycompress", lossycompress);
        result.put("page", page);
        result.put("pagesize", pagesize);
        result.put("prilevel", prilevel);
        return result;
    }
}
