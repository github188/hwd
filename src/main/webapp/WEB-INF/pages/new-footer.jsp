<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="footer">
    <div class="wraper">
        <p class="fl">Copyright &copy; <a href="http://www.eloocor.com" target="_blank">lyp</a></p>

        <p class="fr"><a href="http://www.rjboy.cn" target="_blank">中科院信工所</a><b> | </b>
            <a href="#">XX</a><b> | </b>
            <a href="#" target="_blank">YY</a>
    </div>
</div>
<spring:url value="/resources/js/lib/jquery-1.11.3.min.js" var="jQuery"/>
<script src="${jQuery}"></script>
<spring:url value="/resources/js/lib/loading/jquery.showLoading.min.js" var="loading"/>
<script src="${loading}"></script>
<spring:url value="/resources/js/ajax.js" var="ajax"/>
<script src="${ajax}"></script>