<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    pageContext.setAttribute("basePath", basePath);// 将 "项目路径basePath" 放入pageContext中，待以后用EL表达式读出。
%>
<base href="<%=basePath%>">
<script>
    var basePath = '${basePath}';
</script>
<nav style="display: none;">
    <div class="navbar navbar-default navbar-fixed-top" role="navigation">
        <div class="container-fluid">
            <div class="row-fluid">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                                data-target=".navbar-collapse" aria-expanded="false">
                            <span class="sr-only">切换导航</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <!--<a class="navbar-brand" href="#"><img src="">LOGO</a>-->
                    </div>
                    <div class="collapse navbar-collapse">
                        <ul class="nav navbar-nav">
                            <li class="hidden-xs">
                                <a><i class="glyphicon glyphicon-home"></i>
                                    <span class="sr-only"></span>
                                </a>
                            </li>
                            <li data-nav="/"><a href="<%=basePath%>" id="list"><i
                                    class="glyphicon glyphicon-search"></i>
                                搜索设备</a>
                            </li>
                            <li data-nav="device-map" style="display: none;"><a id="device_map"
                                                                                href="<%=basePath%>device-map">
                                <i class="glyphicon glyphicon-eye-open"></i>2D视觉</a>
                            </li>
                            <li data-nav="device-globe"><a id="device_globe" href="<%=basePath%>device-globe">
                                <i class="glyphicon glyphicon-globe"></i>全球视觉</a>
                            </li>
                            <li data-nav="device-probe-globe"><a id="device_probe_globe"
                                                                 href="<%=basePath%>device-probe-globe">
                                <i class="glyphicon glyphicon-random"></i>设备探测</a>
                            </li>
                            <li><a href="<%=basePath%>resources/search_result_display/autoplay.html">静态数据分析</a></li>
                        </ul>
                        <form class="navbar-form" role="search" id="search_form">
                            <div class="form-group">
                                <%--<select class="form-select-button">--%>
                                <%--<option value="port">Port</option>--%>
                                <%--<option value="vul">Vulnerability</option>--%>
                                <%--</select>--%>
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="search here" id="wd" name="wd">
                                    <span class="input-group-btn">
                                        <button class="btn btn-default" type="submit" id="search_btn">
                                            <i class="glyphicon glyphicon-search"></i>
                                        </button>
                                     </span>
                                </div>
                            </div>
                        </form>
                        <ul class="nav navbar-nav navbar-right" id="user">
                            <li><a href="<%=basePath%>login" id="login">登录</a></li>
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"
                                   aria-haspopup="true" aria-expanded="false">
                                    <i class="glyphicon glyphicon-user"></i>
                                    用户<span class="caret"></span>
                                </a>
                                <ul class="dropdown-menu" role="menu">
                                    <li><a href="<%=basePath%>profile" id="profile">
                                        <i class="glyphicon glyphicon-file"></i> 个人资料</a></li>
                                    <li><a href="#" id="logout"><i class="glyphicon glyphicon-log-out"></i> 退出</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <%--占一行的一个大的搜索框--%>
<%--            <div class="row-fluid">
                <div class="col-lg-12 col-md-12 col-sm-11">
                    <form role="search" id="search_form_lg">
                        <div class="form-group">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="search here" id="wd_lg" name="wd">
                                    <span class="input-group-btn">
                                        <button class="btn btn-default" type="submit" id="search_btn_lg">
                                            <i class="glyphicon glyphicon-search"></i>
                                        </button>
                                     </span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>--%>
        </div>
    </div>
</nav>
<div class="clearfix"></div>