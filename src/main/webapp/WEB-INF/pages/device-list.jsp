<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>搜索列表</title>
    <c:url var="home" value="/" scope="request"/>
    <spring:url value="/resources/css/bootstrap.min.css" var="bsCss"/>
    <link href="${bsCss}" rel="stylesheet">
    <spring:url value="/resources/css/base.css" var="baseCss"/>
    <link rel="stylesheet" href="${baseCss}">
    <spring:url value="/resources/css/device-list.css" var="listCss"/>
    <link rel="stylesheet" href="${listCss}">
</head>
<body>
<%@include file="header.jsp" %>
<div id="main">
    <%--    <ul class="nav nav-tabs" id="tab_nav">
            <li role="presentation"><a href="#list" data-toggle="tab" aria-controls="list">搜索结果</a></li>
            <li role="presentation"><a href="#map" data-toggle="tab" aria-controls="map">空间分布</a></li>
            <li role="presentation"><a href="#feedback" data-toggle="tab" aria-controls="feedback">Feedback</a></li>
        </ul>
            <div class="tab-content">
            <div class="tab-pane fade search_result" id="map"></div>
            <div class="tab-pane fade" id="feedback"></div>
        </div>
    --%>
    <p id="to_map"><a href="<%=basePath%>device-map" class="to-list"><i class="glyphicon glyphicon-hand-right"></i>
        地图</a></p>

    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12">
                <div class="aggregation hidden-print hidden-xs" id="aggregation" role="tablist"
                     aria-multiselectable="true">
                    <br>

                    <div>搜索类型</div>
                    <hr>
                    <%--国家--%>
                    <div class="panel panel-default" id="country_panel">
                        <div class="panel-heading" role="tab" id="filter_title_country">
                            <h4 class="panel-title">
                                <a role="button" data-toggle="collapse" href="#filter_country"
                                   aria-controls="filter_country">国家 </a>
                            </h4>
                        </div>
                        <div id="filter_country" class="panel-collapse collapse in" role="tabpanel"
                             aria-labelledby="filter_title_country" aria-expanded="true">
                            <ul class="list-group"></ul>
                        </div>
                    </div>
                    <%--服务--%>
                    <div class="panel panel-default" id="device_service_panel">
                        <div class="panel-heading" role="tab" id="filter_title_service">
                            <h4 class="panel-title">
                                <a class="collapsed" role="button" data-toggle="collapse" href="#filter_device_service"
                                   aria-controls="filter_service">服务 </a>
                            </h4>
                        </div>
                        <div id="filter_device_service" class="panel-collapse collapse in" role="tabpanel"
                             aria-labelledby="filter_title_service" aria-expanded="true">
                            <ul class="list-group"></ul>
                        </div>
                    </div>
                    <%--端口号--%>
                    <div class="panel panel-default" id="port_panel">
                        <div class="panel-heading" role="tab" id="filter_title_port">
                            <h4 class="panel-title">
                                <a class="collapsed" role="button" data-toggle="collapse" href="#filter_port"
                                   aria-controls="filter_port">端口 </a>
                            </h4>
                        </div>
                        <div id="filter_port" class="panel-collapse collapse in" role="tabpanel"
                             aria-labelledby="filter_title_port" aria-expanded="true">
                            <ul class="list-group"></ul>
                        </div>
                    </div>
                    <%--设备类型--%>
                    <div class="panel panel-default" id="device_type_panel">
                        <div class="panel-heading" role="tab" id="filter_title_type">
                            <h4 class="panel-title">
                                <a class="collapsed" role="button" data-toggle="collapse" href="#filter_device_type"
                                   aria-controls="filter_type">设备类型 </a>
                            </h4>
                        </div>
                        <div id="filter_device_type" class="panel-collapse collapse in" role="tabpanel"
                             aria-labelledby="filter_title_type" aria-expanded="true">
                            <ul class="list-group"></ul>
                        </div>
                    </div>
                    <%--漏洞--%>
                    <div class="panel panel-default" id="vul_panel">
                        <div class="panel-heading" role="tab" id="filter_title_vul">
                            <h4 class="panel-title">
                                <a class="collapsed" role="button" data-toggle="collapse" href="#filter_vul"
                                   aria-controls="filter_vul">漏洞 </a>
                            </h4>
                        </div>
                        <div id="filter_vul" class="panel-collapse collapse in" role="tabpanel"
                             aria-labelledby="filter_title_vul" aria-expanded="true">
                            <ul class="list-group"></ul>
                        </div>
                    </div>
                    <%--漏洞--%>
                    <div class="panel panel-default" id="os_panel">
                        <div class="panel-heading" role="tab" id="filter_title_os">
                            <h4 class="panel-title">
                                <a class="collapsed" role="button" data-toggle="collapse" href="#filter_os"
                                   aria-controls="filter_os">操作系统 </a>
                            </h4>
                        </div>
                        <div id="filter_os" class="panel-collapse collapse in" role="tabpanel"
                             aria-labelledby="filter_title_os" aria-expanded="true">
                            <ul class="list-group"></ul>
                        </div>
                    </div>
                </div>
                <div class="result-list">
                    <div class="result result-summary">搜索到约
                        <span id="total" class="badge"></span>条结果，共用时
                        <span id="took" class="badge"></span>毫秒 &nbsp;&nbsp;当前
                        <span id="pageTip" class="badge"></span>页
                    </div>
                    <ul class="result device"></ul>
                    <div class="pager-wrapper demo customBootstrap">
                        <ul id="pager" class="pagination"></ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="no-device"></div>
</div>
<%@include file="footer.jsp" %>
<script type="text/javascript">
    var wd = '${wd}';
</script>
<spring:url value="/resources/js/jqPaginator.min.js" var="pagerJs"/>
<script src="${pagerJs}"></script>
<spring:url value="/resources/js/text_overflow.js" var="overFlowJs"/>
<script src="${overFlowJs}"></script>
<spring:url value="/resources/js/device-list.js" var="listJs"/>
<script src="${listJs}"></script>
</body>
</html>