<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<footer class="footer navbar-fixed-bottom" role="contentinfo">
    <p class="copyright">
        <span class="glyphicon glyphicon-copyright-mark"></span>
        2015 <a target="blank" href="#">中科院</a>所有
    </p>
</footer>
<a href="#" id="scroll_up" class="scroll-up"><i class="glyphicon glyphicon-chevron-up"></i></a>
<spring:url value="/resources/js/lib/jquery-1.11.3.min.js" var="jquery"/>
<script src="${jquery}"></script>
<spring:url value="/resources/js/lib/bootstrap.min.js" var="bsJs"/>
<script src="${bsJs}"></script>
<%--
<spring:url value="/resources/js/main.js" var="mainJs"/>
<script src="${mainJs}"></script>
<spring:url value="/resources/js/search.js" var="searchJs"/>
<script src="${searchJs}"></script>--%>
