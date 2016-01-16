<%--
  Created by IntelliJ IDEA.
  User: lyp
  Date: 2015-12-03
  Time: 10:24
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    Exception e = (Exception) request.getAttribute("ex");
    System.out.println(e);
%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>出错啦</title>
    <style rel="stylesheet" type="text/css">
        .title {
            padding-top: 5rem;
            text-align: center;
            color: #ff0000;;
        }

        .content {
            padding-left: 4rem;
        }
    </style>
</head>
<body>
<h2 class="title">错误：<%
    e.getClass().getSimpleName();
%>
</h2>

<div class="content">
    <p>
        <strong>状态码：</strong> <%=request.getAttribute("javax.servlet.error.status_code")%>
    </p>

    <p><strong>错误描述：</strong><%=e.getMessage()%>
    </p>

    <p><strong>详细信息：</strong></p>
    <pre>
        <%
            e.printStackTrace(new java.io.PrintWriter(out));
        %>
    </pre>
</div>
</body>
</html>
