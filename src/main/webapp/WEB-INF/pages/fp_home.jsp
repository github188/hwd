<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%--<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    pageContext.setAttribute("basePath", basePath);// 将 "项目路径basePath" 放入pageContext中，待以后用EL表达式读出。
%>
<base href="<%=basePath%>">
<!DOCTYPE html>
<html lang="zh-CN">
<head></head>
<body>
<div class="home-wrapper">
--%>
<div class="home-search">
    <form class="home-search-form" id="home-search-form">
        <div class="input-group">
            <input type="text" class="form-control" placeholder="Search..."
                   id="home_search_input" name="home_search_input">
            <%--<button class="btn btn-default remove"><span class="glyphicon glyphicon-remove"></span></button>--%>
            <button type="submit" class="btn btn-primary" id="home_search_btn">搜索一下
            </button>
        </div>

        <div class="advs-link-wrapper">
            <a href="#" class="advs-link" id="advanced-search">精确搜索</a>
        </div>
    </form>
</div>

<%--
</div>
<script src="resources/js/homepage.js"></script>
</body>
</html>--%>
