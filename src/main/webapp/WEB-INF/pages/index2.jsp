<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="keyword" content="cyberspace,device,fingerprint,security,search engine,scan,web">
    <meta name="description" content="本页面的描述">
    <meta name="revised" content="lyp, 2015/11/24/"/>
    <title>Hooray World Device</title>
    <spring:url value="/resources/css/bootstrap.min.css" var="bsCss"/>
    <link href="${bsCss}" rel="stylesheet">
    <spring:url value="/resources/css/base.css" var="baseCss"/>
    <link rel="stylesheet" href="${baseCss}">
    <spring:url value="/resources/css/index.css" var="indexCss"/>
    <link rel="stylesheet" href="${indexCss}">
    <link rel="stylesheet" href="resources/css/list.css">
    <link rel="stylesheet" href="resources/css/advs.css">
</head>
<body>
<%@include file="header.jsp" %>
<div id="main">
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12">
                <img src="" class="logo-large">

                <div class="home-search">
                    <form action="<%=basePath%>api/getDevicesAndForwardViaForm/" method="post" role="search"
                          id="home_search_form">
                        <div class="input-group input-group-lg">
                            <input type="search" class="form-control" placeholder="Search" autofocus="autofocus"
                                   id="home_wd" name="home_wd">
                            <span class="input-group-btn" id="home_search_btn">
                                <button type="submit" class="btn btn-default">搜索一下
                                    <%--<i class="glyphicon glyphicon-search"></i>--%>
                                </button>
                            </span>
                        </div>
                        <div class="advanced-search-outer">
                            <div class="advanced-search-inner">
                                <a href="" class="advanced-search" id="advs_link">精确搜索 </a>
                            </div>
                        </div>
                        <%--<button type="submit" class="btn"><i class="glyphicon glyphicon-search"></i></button>--%>
                    </form>
                </div>

            </div>
        </div>
    </div>
</div>
<div id="listWrapper">
    <div id="listContainer">
        <div class="mod title"><h2>设备搜索</h2></div>
        <%--高级搜索表单和聚类--%>
        <div id="facets-col">
            <a id="advs-link" href="" class="advs-link mod open" aria-role="button"
               aria-controls="advanced-search-container">精确搜索
            </a>

            <div id="advs">
                <h3>精确搜索</h3>

                <div class="advs-controls">
                    <input type="reset" class="text-button reset-advs" value="重置">
                    <button class="text-button close-advs">关闭</button>
                </div>
                <div id="advs-form-container">
                    <form name="advsSearchForm" id="advsSearchForm" action="<%=basePath%>api/advs" method="post">
                        <fieldset class="text-input-fields">
                            <legend>使用以下关键词来搜索</legend>
                            <ol>
                                <li class="keywords"><label for="advs_keywords_must">以下所有字词</label>
                                    <input type="text" name="keywords" id="advs_keywords_must" value=""></li>
                                <li class="keywords"><label for="advs_keywords_could">以下任意字词</label>
                                    <input type="text" name="keywords" id="advs_keywords_could" value=""></li>
                                <li class="keywords"><label for="advs_keywords_not">不含以下任意字词</label>
                                    <input type="text" name="keywords" id="advs_keywords_not" value=""></li>
                            </ol>
                        </fieldset>
                        <fieldset>
                            <legend>按以下标准缩小搜索范围</legend>
                            <ol>
                                <li class="keywords"><label for="advs_ip">IP地址</label>
                                    <input type="text" name="keywords" id="advs_ip" value=""></li>
                                <li class="keywords"><label for="advs_ip">IP地址段</label>
                                    <input type="text" name="keywords" id="advs_ip_segment" value=""></li>
                                <li class="keywords"><label for="advs_port">端口</label>
                                    <input type="text" name="keywords" id="advs_port" value=""></li>
                            </ol>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
        <%--搜索结果列表--%>
        <div id="results-col"></div>
    </div>
</div>
<%@include file="footer.jsp" %>
<script type="text/javascript" src="resources/js/main2.js"></script>
<script>
    $(function () {
        var search = {};
        search["ip"] = "1.2.3.4";
        $.ajax({
            type: "post",
            contentType: "application/json",
            url: basePath + "api/advancedSearch",
            data: JSON.stringify(search),
            dataType: 'json',
            timeout: 10000
        }).success(function (data) {
            console.log("SUCCESS: ", data);
        }).fail(function (f) {
            console.log("FAIL: ", f);
        })
    });
</script>
</body>
</html>