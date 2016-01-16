package com.springapp.mvc.web.model;

import java.util.List;

/**
 * Created by lyp on 2015/12/10.
 * 将所有设备、所有设备类型、用于产生过滤条件的filter都放到一个JavaBean中，可以一起返回给前端，少一次http请求
 * 当没有请求某项时，null即可
 */
public class SearchResult {
    List<DeviceType> deviceTypes;
    List<Device> devices;
    Filter filter;

    public List<DeviceType> getDeviceTypes() {
        return deviceTypes;
    }

    public void setDeviceTypes(List<DeviceType> deviceTypes) {
        this.deviceTypes = deviceTypes;
    }

    public List<Device> getDevices() {
        return devices;
    }

    public void setDevices(List<Device> devices) {
        this.devices = devices;
    }

    public Filter getFilter() {
        return filter;
    }

    public void setFilter(Filter filter) {
        this.filter = filter;
    }
}
