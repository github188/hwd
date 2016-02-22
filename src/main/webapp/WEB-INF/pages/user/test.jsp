<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<div class="user-page-wrapper">
    <h2 class="green">新用户注册</h2>

    <form class="form" action="<%=basePath%>user/api/register" onsubmit="return false;">
        <ul>
            <li>
                <label class="label"><span class="need">*</span> 用户名：</label>
                <input type="text" value="刘" name="username" class="inputxt"
                       ajaxurl="<%=basePath%>user/api/uniqueUserNameCheck"
                       datatype="s6-16"
                       nullmsg="请设置用户名！"
                       errormsg="用户名长度在6~16位之间！"/>
                <span class="Validform_checktip">用户名长度在6~16位之间</span>
            </li>
            <%--<li>
                <label class="label"><span class="need">*</span> 密码：</label>
                <input type="password" value="" name="password" class="inputxt" id="psw"
                       datatype="*6-16"
                       nullmsg="请设置密码！"
                       errormsg="密码长度在6~20位之间！"/>
                <span class="Validform_checktip">密码长度在6~20位之间</span>
            </li>
            <li>
                <label class="label"> 地区：</label>
                <input class="inputxt" type="text" name="region" datatype="s2-30" ignore="ignore"/>
            </li>--%>
        </ul>
        <div>
            <%--<button class="form-submit">同意协议并注册</button>--%>
            <%--<input type="reset" value="重 置"/>--%>
            <%--<a href="agreement" class="forward-link" target="_blank">注册协议</a>--%>
        </div>
    </form>
    <div>
        已有账号?<a href="#fp_sec_user/fp_slide_login" class="forward-link">登录</a>
    </div>
</div>