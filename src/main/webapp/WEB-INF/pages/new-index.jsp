<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    pageContext.setAttribute("basePath", basePath);// 将 "项目路径basePath" 放入pageContext中，待以后用EL表达式读出。
%>
<base href="<%=basePath%>">
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="keyword" content="cyberspace,device,fingerprint,security,search engine,scan,web">
    <meta name="description" content="本页面的描述">
    <meta name="revised" content="lyp, 2015/11/24/"/>
    <title>Hooray World Device</title>
    <link rel="stylesheet" href="resources/css/bootstrap.min.css">
    <link rel="stylesheet" href="resources/css/new-base.css">
    <script src="resources/js/lib/jquery-1.11.3.min.js"></script>
    <script src="resources/js/lib/typeahead.bundle.min.js"></script>
    <script src="resources/js/new-index.js"></script>
</head>
<body>
<div id="header" class="navbar-fixed-top">
    <h2 class="logo-container">
        <a href="#" target="_self" class="logo">HWD</a>
    </h2>

    <form class="global-search-form navbar-form" method="get" action="<%=basePath%>api/search">
        <fieldset>
            <div class="search-scope">备用</div>
            <div class="global-search-container">
                <input class="global-search-input typeahead" type="text" placeholder="Search Here">
            </div>
            <button type="submit" class="search-button" role="button"><span class="glyphicon glyphicon-search"></span>
            </button>
        </fieldset>
    </form>
</div>
<div id="main"></div>
<div id="footer"></div>
</body>
</html>