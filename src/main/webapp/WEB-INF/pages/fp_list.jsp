<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="result-col for-sidebar-margin">
    <div class="result-count-duration">
        <p>搜索到约 <strong class="badge resultCount">0</strong> 条结果，
            共用时 <strong class="badge duration">0</strong> ms。
            当前为第<strong class="badge" id="pageTip">0</strong>页</p>
    </div>
    <div class="pivot-bar-container">
        <div id="pivot-bar" class="pivot-bar">
            <ul class="pivots"></ul>
        </div>
    </div>
    <div class="result-container">
        <ul class="result devices">
        </ul>
    </div>
    <div class="pager-wrapper demo customBootstrap" style="margin-bottom: 2rem">
        <ul id="pager" class="pagination"></ul>
    </div>
</div>
<div class="empty-result-desc-container">没有找到相关数据，您可以尝试搜索其他关键词</div>
<script src="resources/js/lib/jqPaginator.min.js"></script>
<script src="resources/js/list.js"></script>
<div class="clearfix"></div>
