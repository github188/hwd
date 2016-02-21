<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    pageContext.setAttribute("basePath", basePath);// 将 "项目路径basePath" 放入pageContext中，待以后用EL表达式读出。
    String basePathNoPort = request.getScheme() + "://" + request.getServerName();
%>
<base href="<%=basePath%>">
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Hooray World Device</title>
    <meta name="author" content="LiuYanping"/>
    <meta name="description" content="index"/>
    <meta name="keywords"
          content="fullpage, jquery, bootstrap, cyberspace,device,fingerprint,security,search engine,scan,web"/>

    <link rel="stylesheet" type="text/css" href="resources/aCss/libs/bootstrap.min.css"/>
    <link rel="stylesheet" type="text/css" href="resources/aCss/libs/jquery.fullpage.css"/>
    <link rel="stylesheet" type="text/css" href="resources/aCss/base.css"/>

    <!--[if IE]>
    <script type="text/javascript">
        var console = {
            log: function () {
                console.log("Not support IE, please use Chrome");
            }
        };
    </script>
    <![endif]-->

    <script src="resources/aJS/libs/jquery-1.11.3.min.js"></script>
    <script src="resources/aJS/libs/bootstrap.min.js"></script>
    <script src="resources/aJS/libs/jquery.slimscroll.min.js"></script>
    <script src="resources/aJS/libs/jquery.fullpage.js"></script>
    <%--<script src="resources/aJS/libs/jquery.fullpage.min.js"></script>--%>
    <script src="resources/aJS/a_main.js"></script>
</head>
<body>
<%@include file="a_header.jsp" %>
<div id="fullpage" class="fullpage">
    <div class="section">
        <div class="intro">
            <h1>首页</h1>
        </div>
    </div>
    <div class="section">
        <div class="slide" data-anchor="list">
            <h1>搜索列表</h1>
        </div>
        <div class="slide" data-anchor="map">
            <h1>地图</h1>
        </div>
        <div class="slide" data-anchor="point">
            <h1>设备3D</h1>
        </div>
        <div class="slide" data-anchor="line">
            <h1>数据流3D</h1>
        </div>

    </div>
    <div class="section">
        <div class="slide" data-anchor="register">
            <h1>注册</h1>
        </div>
        <div class="slide" data-anchor="agreement">
            <h1>注册协议</h1>
        </div>
        <div class="slide" data-anchor="login">
            <h1>登陆</h1>
        </div>
        <div class="slide" data-anchor="pswRetrive">
            <h1>忘记密码</h1>
        </div>
    </div>
</div>
<div class="footer">Footer</div>
</body>
</html>