package com.springapp.mvc.web.model;

/**
 * Created by lyp on 2015/12/10.
 * The “json data” will be converted into this object, via @RequestBody.
 */
public class SearchCriteria {
    String wd;    //对应请求中的wd字段
    String geo;//"polygon(lat1 lon1,lat2 lon2,lat3 lon3)", //地理过滤范围，为空则不过滤（全球），可使用polygon、circle
    String typefilter;//camera", //3D地球中的设备类型1级菜单过滤维度
    String permitfilter;// "control", //3D地球中的权限类型2级菜单过滤维度
    int zoomlevel;//6, //当前的地图缩放级别，此参数决定聚类级别
    int lossycompress; // 0 //压缩级别，0为不压缩；1为去除部分无用字段；2为去除更多非必需字段，等等
    int page = 1;   //请求第几页，用于页面分页显示
    int pagesize;

    public int getPagesize() {
        return pagesize;
    }

    public void setPagesize(int pagesize) {
        this.pagesize = pagesize;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public String getGeo() {
        return geo;
    }

    public void setGeo(String geo) {
        this.geo = geo;
    }

    public String getTypefilter() {
        return typefilter;
    }

    public void setTypefilter(String typefilter) {
        this.typefilter = typefilter;
    }

    public String getPermitfilter() {
        return permitfilter;
    }

    public void setPermitfilter(String permitfilter) {
        this.permitfilter = permitfilter;
    }

    public int getZoomlevel() {
        return zoomlevel;
    }

    public void setZoomlevel(int zoomlevel) {
        this.zoomlevel = zoomlevel;
    }

    public int getLossycompress() {
        return lossycompress;
    }

    public void setLossycompress(int lossycompress) {
        this.lossycompress = lossycompress;
    }

    public String getWd() {
        return wd;
    }

    public void setWd(String wd) {
        this.wd = wd;
    }

    @Override
    public String toString() {  //为了校验所有字段是否均为空
        return wd + geo + typefilter + permitfilter + zoomlevel + lossycompress + page;
    }
}
