<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div style="z-index:1000;position: fixed;top: 8rem;left: 0;">dddd</div>
<div class="sidebar">
    <%--<a class=" advs-link advs-link-main" href="#" role="button" aria-controls="advs-wrapper">精确搜索
        <span class="glyphicon glyphicon-menu-right"></span>
    </a>
    <div class="search-types"></div>
    <div class="clearfix"></div>--%>
    <div class="panel-group" id="facet" role="tablist" aria-multiselectable="true">
        <div class="panel panel-default">
            <div class="panel-heading" role="tab" id="countryTitle">
                <h4 class="panel-title">
                    <a class="collapsed" role="button" data-toggle="collapse"
                       href="#countryList" aria-expanded="false" aria-controls="countryList">
                        国家<span class="glyphicon glyphicon-menu-down pull-right"></span>
                    </a>
                </h4>
            </div>
            <div id="countryList" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="countryTitle">
                <div class="panel-body">
                    <ol class="facet-values"></ol>
                </div>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading" role="tab" id="device_serviceTitle">
                <h4 class="panel-title">
                    <a class="collapsed" role="button" data-toggle="collapse"
                       href="#device_serviceList" aria-expanded="false" aria-controls="device_serviceList">
                        服务<span class="glyphicon glyphicon-menu-down pull-right"></span>
                    </a>
                </h4>
            </div>
            <div id="device_serviceList" class="panel-collapse collapse" role="tabpanel"
                 aria-labelledby="device_serviceTitle">
                <div class="panel-body">
                    <ol class="facet-values"></ol>
                </div>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading" role="tab" id="portTitle">
                <h4 class="panel-title">
                    <a class="collapsed" role="button" data-toggle="collapse"
                       href="#portList" aria-expanded="false" aria-controls="portList">
                        端口<span class="glyphicon glyphicon-menu-down pull-right"></span>
                    </a>
                </h4>
            </div>
            <div id="portList" class="panel-collapse collapse" role="tabpanel" aria-labelledby="portTitle">
                <div class="panel-body">
                    <ol class="facet-values"></ol>
                </div>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading" role="tab" id="device_typeTitle">
                <h4 class="panel-title">
                    <a class="collapsed" role="button" data-toggle="collapse"
                       href="#device_typeList" aria-expanded="false" aria-controls="device_typeList">
                        类型<span class="glyphicon glyphicon-menu-down pull-right"></span>
                    </a>
                </h4>
            </div>
            <div id="device_typeList" class="panel-collapse collapse" role="tabpanel"
                 aria-labelledby="device_typeTitle">
                <div class="panel-body">
                    <ol class="facet-values"></ol>
                </div>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading" role="tab" id="vulTitle">
                <h4 class="panel-title">
                    <a class="collapsed" role="button" data-toggle="collapse"
                       href="#vulList" aria-expanded="false" aria-controls="vulList">
                        漏洞<span class="glyphicon glyphicon-menu-down pull-right"></span>
                    </a>
                </h4>
            </div>
            <div id="vulList" class="panel-collapse collapse" role="tabpanel" aria-labelledby="vulTitle">
                <div class="panel-body">
                    <ol class="facet-values"></ol>
                </div>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading" role="tab" id="osTitle">
                <h4 class="panel-title">
                    <a class="collapsed" role="button" data-toggle="collapse"
                       href="#osList" aria-expanded="false" aria-controls="osList">
                        操作系统<span class="glyphicon glyphicon-menu-down pull-right"></span>
                    </a>
                </h4>
            </div>
            <div id="osList" class="panel-collapse collapse" role="tabpanel" aria-labelledby="osTitle">
                <div class="panel-body">
                    <ol class="facet-values"></ol>
                </div>
            </div>
        </div>
    </div>
</div>
