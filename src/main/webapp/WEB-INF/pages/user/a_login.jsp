<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%--<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://"
            + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    pageContext.setAttribute("basePath", basePath);// 将 "项目路径basePath" 放入pageContext中，待以后用EL表达式读出。
%>
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="utf-8"/>
    <title>用户登录</title>
    <spring:url value="/resources/newCss/style.css" var="styleCss"/>
    <link rel="stylesheet" href="${styleCss}">
    <spring:url value="/resources/newCss/demo.css" var="demoCss"/>
    <link rel="stylesheet" href="${demoCss}">
    <style>
/*        .wraper {
            height: 100%;
        }*/

        .wraper > div:last-child {
            padding-left: .5rem;
            font-size: 120%;
            font-weight: bold;
        }

        .form li {
            padding-bottom: 20px;
        }

        .Validform_checktip {
            margin-left: 10px;
        }

        .form .label {
            display: inline-block;
            width: 70px;
        }

        .action {
            padding-left: 92px;
        }
    </style>
</head>

<body>
<div class="main">--%>
    <div class="wraper">
        <%--<p class="tr"><a href="javascript:history.go(-1); " class="blue ml10 fz12">返回上一页&raquo;</a></p>--%>

        <h2 class="green">用户登录</h2>

        <form class="form" action="<%=basePath%>user/api/login" id="login_form">
            <ul>
                <li>
                    <label class="label"><span class="need">*</span> 用户名：</label>
                    <input type="text" value="" name="username" class="inputxt"
                           datatype="s6-16"
                           nullmsg="请输入用户名"/>
                </li>
                <li>
                    <label class="label"><span class="need">*</span> 密码：</label>
                    <input type="password" value="" name="password" class="inputxt" id="psw"
                           datatype="*6-20"
                           nullmsg="请输入密码"/>
                </li>
            </ul>
            <div class="action">
                <input type="submit" value="登录"/>
                <a href="#se_user/sl_user_pswRetrieve" class="forward-link">忘记密码</a>
            </div>
        </form>

        <div>
            还没有账号?<a href="#se_user/sl_user_register" class="forward-link to-register">去注册</a>
        </div>
    </div>
<%--</div>--%>
<%--
<spring:url value="/resources/js/lib/jquery-1.11.3.min.js" var="jQuery"/>
<script src="${jQuery}"></script>
<spring:url value="/resources/js/lib/loading/jquery.showLoading.min.js" var="loading"/>
<script src="${loading}"></script>
<spring:url value="/resources/js/ajax.js" var="ajax"/>
<script src="${ajax}"></script>
<spring:url value="/resources/js/lib/Validform_v5.3.2_min.js" var="validform"/>
<script src="${validform}"></script>
<spring:url value="/resources/js/lib/jquery.sha1.js" var="sha1"/>
<script src="${sha1}"></script>--%>
<%--
<script type="text/javascript">
    $(function () {
        var pswStr = $("#psw").val(),
                pswSha1Str = $.sha1(pswStr),
                formInfoList = [],
                user = {},
                requestObj = {};
        var successCallback = function (data) {
            console.log(data);
            if (data.code == 1) {
                $.Showmsg("登录成功！");
                setTimeout(function () {
                    $.Hidemsg();
                    //window.location.href = sessionStorage.getItem('beforeLogin');
                    //将导航条中登录/注册设置为用户名
                    //跳转回登录前的页面
                }, 2000);
            } else {
                $.Showmsg("操作失败，请稍后再试！");
                setTimeout(function () {
                    $.Hidemsg();
                }, 2000);
            }
        };
        var errorCallback = function () {
            console.log("ajax error!");
        };

        //导航设置
        $('.nav').find('a').removeClass('current');
        $('.user-nav').find('a').addClass('current');

        //表单验证和提交
        $(".form").Validform({
            tiptype: 3,
            label: '.label',
            showAllError: true,
            beforeSubmit: function (curform) {
                //在验证成功后，表单提交前执行的函数，curform参数是当前表单对象。
//                $('input[type="password"]').val(pswSha1Str);
                formInfoList = curform.serializeArray();
                for (var i = 0; i < formInfoList.length; i++) {
                    var item = formInfoList[i];
                    if (item.name == 'password') {
                        user[item.name] = pswSha1Str;
                    } else {
                        user[item.name] = item.value;
                    }
                }
                requestObj = {
                    url: '${basePath}user/api/login',
                    success: successCallback,
                    data: user,
                    error: errorCallback
                };
                ajaxLoadData(requestObj);
                return false;//return false的话，表单不再提交
            }
        });
    })
</script>
</body>
</html>--%>
