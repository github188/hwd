<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%--<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>--%>
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
    <link rel="stylesheet" type="text/css" href="resources/aCss/jquery.fullpage.css"/>
    <link rel="stylesheet" type="text/css" href="resources/aCss/validform.css"/>
    <link rel="stylesheet" type="text/css" href="resources/aCss/bootstrap.min.css"/>
    <link rel="stylesheet" type="text/css" href="resources/aCss/typeaheadjs.css"/>
    <link rel="stylesheet" type="text/css" href="resources/aCss/base.css"/>

    <%--↓user-related css--%>
    <link rel="stylesheet" type="text/css" href="resources/aCss/user-pages-style.css"/>

    <%--↓search-related css--%>
    <link rel="stylesheet" type="text/css" href="resources/aCss/home-sec.css"/>

    <!--[if IE]>
    <script type="text/javascript">
        var console = {
            log: function () {
                console.log("Not support IE, please use Chrome");
            }
        };
    </script>
    <![endif]-->
    <%--↓libs--%>
    <script src="resources/aJS/libs/jquery-1.11.3.min.js"></script>
    <script src="resources/aJS/libs/jquery.slimscroll.min.js"></script>
    <script src="resources/aJS/libs/jquery.fullpage.js"></script>
    <script src="resources/aJS/libs/bootstrap.min.js"></script>
    <script src="resources/aJS/libs/typeahead.bundle.min.js"></script>

    <%--↓basic js--%>
    <script src="resources/aJS/InputSuggest.js"></script>
    <script src="resources/aJS/HomeSearch.js"></script>
    <script src="resources/aJS/GlobalSearchForm.js"></script>
    <script src="resources/aJS/main.js"></script>

    <%--↓user-related js--%>
    <script src="resources/aJS/libs/Validform_v5.3.2_min.js"></script>
    <script src="resources/aJS/libs/jquery.sha1.js"></script>
    <script src="resources/aJS/ajax.js"></script>
    <script src="resources/aJS/User.js"></script>

</head>
<body>
<%@include file="a_header.jsp" %>
<div id="fullpage" class="fullpage">
    <div class="section" data-anchor="se_home">
        <%@include file="fp_home.jsp" %>
    </div>
    <div class="section" data-anchor="se_search">
        <div class="slide" data-anchor="sl_search_list">
            <h1>搜索列表</h1>
        </div>
        <div class="slide" data-anchor="sl_search_map">
            <h1>地图</h1>
        </div>
        <div class="slide" data-anchor="sl_search_point">
            <h1>设备3D</h1>

            <h1>事实上事实上事实上事实上事实上事实上事实上事实上</h1>
        </div>
        <div class="slide" data-anchor="sl_search_line">
            <h1>数据流3D</h1>
        </div>

    </div>
    <div class="section" data-anchor="se_user">
        <div class="slide" data-anchor="sl_user_login">
            <%@include file="user/a_login.jsp" %>
        </div>
        <div class="slide" data-anchor="sl_user_pswRetrieve">
            <%@include file="user/a_pwdRetrieve.jsp" %>
        </div>
        <div class="slide" data-anchor="sl_user_register">
            <%@include file="user/a_register.jsp" %>
        </div>
        <div class="slide" data-anchor="sl_user_agreement">
            <%@include file="user/a_agreement.jsp" %>
        </div>
    </div>
</div>
<%@include file="a_footer.jsp" %>
</body>
</html>