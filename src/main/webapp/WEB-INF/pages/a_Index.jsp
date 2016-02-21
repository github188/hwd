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

    <%--↓basic css--%>
    <link rel="stylesheet" type="text/css" href="resources/aCss/bootstrap.min.css"/>
    <link rel="stylesheet" type="text/css" href="resources/aCss/jquery.fullpage.css"/>
    <link rel="stylesheet" type="text/css" href="resources/aCss/validform.css"/>
    <link rel="stylesheet" type="text/css" href="resources/aCss/base.css"/>

    <%--↓user-related css--%>
    <%--<link rel="stylesheet" type="text/css" href="resources/aCss/user-pages-style.css"/>--%>

    <!--[if IE]>
    <script type="text/javascript">
        var console = {
            log: function () {
                console.log("Not support IE, please use Chrome");
            }
        };
    </script>
    <![endif]-->
    <%--↓basic js--%>
    <script src="resources/aJS/libs/jquery-1.11.3.min.js"></script>
    <script src="resources/aJS/libs/bootstrap.min.js"></script>
    <script src="resources/aJS/libs/jquery.slimscroll.min.js"></script>
    <script src="resources/aJS/libs/jquery.fullpage.min.js"></script>
    <script src="resources/aJS/main.js"></script>

    <%--↓user-related js--%>
    <script src="resources/aJS/libs/Validform_v5.3.2_min.js"></script>
    <script src="resources/aJS/libs/jquery.sha1.js"></script>
    <script src="resources/aJS/user.js"></script>

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
        <div class="slide" data-anchor="fp_slide_list">
            <h1>搜索列表</h1>
        </div>
        <div class="slide" data-anchor="fp_slide_map">
            <h1>地图</h1>
        </div>
        <div class="slide" data-anchor="fp_slide_point">
            <h1>设备3D</h1>
        </div>
        <div class="slide" data-anchor="fp_slide_line">
            <h1>数据流3D</h1>
        </div>

    </div>
    <div class="section">
        <div class="slide" data-anchor="fp_slide_login">
            <h1>登陆</h1>
        </div>
        <div class="slide" data-anchor="fp_slide_pswRetrive">
            <h1>忘记密码</h1>
        </div>
        <div class="slide" data-anchor="fp_slide_register">
            <%--<iframe src="a_register"></iframe>--%>
            <%@include file="user/test.jsp" %>
        </div>
        <div class="slide" data-anchor="fp_slide_agreement">
            <h1>注册协议</h1>
        </div>
    </div>
</div>
<%@include file="a_footer.jsp" %>
</body>
</html>