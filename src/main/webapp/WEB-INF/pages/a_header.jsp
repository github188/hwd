<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="header navbar navbar-default" role="navigation" id="header">
    <div class="container-fluid">
        <div class="row-fluid">
            <div class="col-lg-12 col-md-12 col-sm-12">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed"
                            data-toggle="collapse"
                            data-target=".navbar-collapse"
                            aria-expanded="false">
                        <span class="sr-only">切换导航</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#"><img src="">HWD</a>
                </div>
                <div class="collapse navbar-collapse">
                    <ul class="nav navbar-nav navbar-right" id="menu">
                        <li data-menuanchor="se_home"><a href="#se_home">首页</a></li>
                        <li data-menuanchor="se_search"><a href="#se_search/sl_search_list">搜索</a></li>
                        <li data-menuanchor="se_search"><a href="#se_search/sl_search_map">定位</a></li>
                        <li data-menuanchor="se_search"><a href="#se_search/sl_search_point">全球视觉</a></li>
                        <li data-menuanchor="se_search"><a href="#se_search/sl_search_line">数据探测</a></li>
                        <%--<li><a href="resources/search_result_display/autoplay.html">数据分析</a></li>--%>
                        <li data-menuanchor="seuser">
                            <a href="#se_user/sl_user_login">登录</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
<%--占一行的一个大的搜索框--%>
<div class="global-search-wrapper" id="global-search">
    <form class="global-search-form" method="get" action="api/search">
        <fieldset>
            <div class="search-scope"></div>
            <div class="search-box-container">
                <input class="global-search-input typeahead" type="text" placeholder="Search Here">
            </div>
            <button type="submit" class="global-search-button" role="button">
                搜 索
            </button>
        </fieldset>
        <div class="advs-link-wrapper"><a href="#" class="advs-link">精确搜索</a></div>
    </form>
</div>
