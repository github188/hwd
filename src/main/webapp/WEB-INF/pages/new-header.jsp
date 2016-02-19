<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    pageContext.setAttribute("basePath", basePath);// 将 "项目路径basePath" 放入pageContext中，待以后用EL表达式读出。
    String basePathNoPort = request.getScheme() + "://" + request.getServerName();
%>
<div class="header">
    <div class="wraper">
        <h1><a href="#">HWD</a></h1>
        <ul class="nav">
            <li><a href="<%=basePath%>" class="current">首页</a></li>
            <li><a href="<%=basePath%>list">搜索</a></li>
            <li><a href="<%=basePath%>map">定位</a></li>
            <li><a href="#">导航4</a></li>
            <li><a href="#">导航5</a></li>
        </ul>
    </div>
    <div class="user-nav">
        <span class="username"></span>
        <a href="login">登录</a>
    </div>

</div>