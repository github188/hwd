package com.springapp.mvc.web.model;

import java.util.List;
import java.util.Map;

/**
 * Created by lyp on 2015/12/10.
 * 设备类型，一级类型下包含二级类型列表
 */
public class DeviceType {
    /**
     * type : DVR
     * desc : 硬盘录像机
     * subType : [{"id":1,"type":"attacked","desc":"被攻击的设备"},{"id":2,"type":"withPicture","desc":"有画面的设备"}]
     */
    private String type;    //一级设备类型
    private String desc;    //一级设备类型的中文描述，用于前端展示
    private List<Map<String, String>> subType;    //一级类型下包含的二级类型（不同的一级可能包含相同的二级，同一设备可能同时属于多个二级）,Map<subType,desc>

    public void setType(String type) {
        this.type = type;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public void setSubType(List<Map<String, String>> subType) {
        this.subType = subType;
    }

    public String getType() {
        return type;
    }

    public String getDesc() {
        return desc;
    }

    public List<Map<String, String>> getSubType() {
        return subType;
    }
}
