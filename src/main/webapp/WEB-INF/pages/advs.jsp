<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="advs-wrapper" id="advs_wrapper">
    <h3>精确搜索</h3>

    <div class="advs-controls">
        <input type="reset" class="text-button reset-advs" value="重置">
        <button class="text-button close-advs">关闭</button>
    </div>
    <div class="advs-form-container">
        <form action="" class=".form-horizontal" method="post" id="advs">
            <fieldset class="keywords">
                <legend>使用以下条件来搜索</legend>
                <div class="row form-group">
                    <label class="col-md-3 col-sm-3 col-xs-4" for="must">包含以下全部字词：</label>
                    <input type="text" class="col-md-7 col-sm-7 col-xs-8" id="must" name="must" autofocus="autofocus" placeholder="输入重要字词：webcam">
                    <span class="col-md-2 col-sm-2 hidden-xs">多个字词用空格分隔</span>
                </div>
                <div class="row form-group">
                    <label class="col-md-3 col-sm-3 col-xs-4" for="should">包含以下任意字词：</label>
                    <input type="text" class="col-md-7 col-sm-7 col-xs-8" id="should" name="should" placeholder="输入可以包含的字词：camera">
                    <span class="col-md-2 col-sm-2 hidden-xs">多个字词用空格分隔</span>
                </div>
                <div class="row form-group">
                    <label class="col-md-3 col-sm-3 col-xs-4" for="mustnot">不包含以下任意字词：</label>
                    <input type="text" class="col-md-7 col-sm-7 col-xs-8" id="mustnot" name="mustnot" placeholder="输入需要过滤掉的字词：">
                    <span class="col-md-2 col-sm-2 hidden-xs">多个字词用空格分隔</span>
                </div>
            </fieldset>
            <fieldset class="extra">
                <legend>并用以下条件缩小搜索范围</legend>
                <div class="row form-group">
                    <label for="ip">IP（段）</label>

                    <div class="col-md-offset-1 col-md-11 col-sm-offset-1 col-sm-11 col-xs-offset-1 col-xs-11">
                        <div class="row">
                            <input type="text" id="ip" class="col-md-offset-1 col-md-11 col-sm-offset-1 col-sm-11 col-xs-offset-2 col-xs-10" name="ip"
                                   placeholder="IP段使用“-”连接。如，1.1.1.1  1.1.1.2-1.1.1.254">
                            <%--<label class="col-md-1 col-sm-1" for="ip">单IP</label>
                            <input type="text" id="ip" class="col-md-3 col-sm-3" name="ip" value="1.2.3.4">
                            <label class="col-md-1 col-sm-1" for="ip_from"><span class="pull-left">|</span> 从</label>
                            <input type="text" id="ip_from" class="col-md-3 col-sm-3" name="ip_from" value="1.1.1.1">
                            <label class="col-md-1 col-sm-1" for="ip_to">到</label>
                            <input type="text" id="ip_to" class="col-md-3 col-sm-3" name="ip_to" value="1.1.1.254">--%>
                        </div>
                    </div>
                    <span class="right-tip hidden-xs">多个字词用空格分隔</span>
                </div>
                <div class="row form-group">
                    <label>地理位置</label>

                    <div class="col-md-offset-1 col-md-11 col-sm-offset-1 col-sm-11 col-xs-offset-1 col-xs-11">
                        <div class="row">
                            <label class="col-md-1 col-sm-2 col-xs-2" for="country">国家</label>
                            <input type="text" id="country" name="country" class="col-md-3 col-sm-10 col-xs-10"
                                   placeholder="任何国家/地区：中国">
                            <label class="col-md-1 col-sm-2 col-xs-2" for="province">省份</label>
                            <input type="text" id="province" name="province" class="col-md-3 col-sm-10 col-xs-10" placeholder="任何省份：江苏">
                            <label class="col-md-1 col-sm-2 col-xs-2" for="city">城市</label>
                            <input type="text" id="city" name="city" class="col-md-3 col-sm-10 col-xs-10" placeholder="任何城市：北京 Istanbul">
                        </div>
                    </div>
                    <span class="right-tip hidden-xs">多个字词用空格分隔</span>
                </div>
                <div class="row form-group">
                    <label>设备属性</label>

                    <div class="col-md-offset-1 col-md-11 col-sm-offset-1 col-sm-11">
                        <div class="row">
                            <label class="col-md-1  col-sm-2 col-xs-2" for="type">类型</label>
                            <input type="text" id="type" class="col-md-3 col-sm-10 col-xs-10" name="type" placeholder="设备类型：camera NVR">
                            <label class="col-md-1  col-sm-2 col-xs-2" for="brand">品牌</label>
                            <input type="text" id="brand" class="col-md-3 col-sm-10 col-xs-10" name="brand" placeholder="设备品牌：Hikvision">
                            <label class="col-md-1  col-sm-2 col-xs-2" for="model">型号</label>
                            <input type="text" id="model" class="col-md-3 col-sm-10 col-xs-10" name="model" placeholder="设备型号：DE34">
                        </div>
                    </div>
                    <span class="right-tip">多个字词用空格分隔</span>
                </div>
                <div class="row form-group">
                    <label>服务</label>

                    <div class="col-md-offset-1 col-md-11 col-sm-offset-1 col-sm-11">
                        <div class="row">
                            <label class="col-md-1  col-sm-2 col-xs-2" for="device_service">协议</label>
                            <input type="text" id="device_service" name="device_service" class="col-md-3 col-sm-10 col-xs-10"
                                   placeholder="协议名称：http ftp">
                            <label class="col-md-1  col-sm-2 col-xs-2" for="port">端口</label>
                            <input type="text" id="port" class="col-md-3 col-sm-10 col-xs-10" name="port" placeholder="端口号：80  21">
                            <label class="col-md-1  col-sm-2 col-xs-2" for="banner">banner</label>
                            <input type="text" id="banner" class="col-md-3 col-sm-10 col-xs-10" name="banner">
                        </div>
                    </div>
                    <span class="right-tip">多个字词用空格分隔</span>
                </div>
                <div class="row form-group">
                    <label>已知漏洞</label>

                    <div class="col-md-offset-1 col-md-11 col-sm-offset-1 col-sm-11">
                        <div class="row">
                            <label class="col-md-1  col-sm-2 col-xs-2" for="vul">ID</label>
                            <input type="text" id="vul" class="col-md-3 col-sm-10 col-xs-10" name="vul" placeholder="漏洞ID：CVE-2009_5149">
                            <label class="col-md-1  col-sm-2 col-xs-2" for="vulType">类型</label>
                            <input type="text" id="vulType" class="col-md-3 col-sm-10 col-xs-10" name="vulType"
                                   placeholder="漏洞类型：XSS weak_password">
                            <label class="col-md-1  col-sm-2 col-xs-2" for="vulName">名称</label>
                            <input type="text" id="vulName" class="col-md-3 col-sm-10 col-xs-10" name="vulName" placeholder="漏洞名称：dots_POC">
                        </div>
                    </div>
                    <span class="right-tip">多个字词用空格分隔</span>
                </div>
                <div class="row form-group">
                    <label for="os">操作系统</label>

                    <div class="col-md-offset-1 col-md-11 col-sm-offset-1 col-sm-11 col-xs-offset-1 col-xs-11">
                        <div class="row">
                            <input type="text" id="os" class="col-md-offset-1 col-md-11 col-sm-offset-1 col-sm-11 col-xs-offset-2 col-xs-10" name="os"
                                   placeholder="多个操作系统之间用空格分隔。如，Linux  Unix">

                        </div>
                    </div>
                    <span class="right-tip hidden-xs">多个字词用空格分隔</span>
                </div>
                <div class="row form-group">
                    <label for="taskId">任务ID</label>

                    <div class="col-md-offset-1 col-md-11 col-sm-offset-1 col-sm-11 col-xs-offset-1 col-xs-11">
                        <div class="row">
                            <input type="text" id="taskId" class="col-md-offset-1 col-md-11 col-sm-offset-1 col-sm-11 col-xs-offset-2 col-xs-10" name="taskId"
                                   placeholder="DS001">

                        </div>
                    </div>
                    <span class="right-tip hiddex-xs">(仅内部开放)</span>
                </div>
              <%--  <div class="row form-group">
                    <label for="vpsIp">IP（段）</label>

                    <div class="col-md-offset-1 col-md-11 col-sm-offset-1 col-sm-11 col-xs-offset-1 col-xs-11">
                        <div class="row">
                            <input type="text" id="vpsIp" class="col-md-offset-1 col-md-11 col-sm-offset-1 col-sm-11 col-xs-offset-2 col-xs-10" name="vpsIp"
                                   placeholder="多个IP之间用空格分隔，IP段使用-连接。如，1.1.1.1  1.1.1.2-1.1.1.254">
                        </div>
                    </div>
                    <span class="right-tip hidden-xs">(仅内部开放)</span>
                </div>--%>
                <div class="row form-group">
                    <label>更新日期</label>

                    <div class="col-md-offset-1 col-md-11 col-sm-offset-1 col-sm-11 col-xs-offset-1 col-xs-11">
                        <div class="row">
                            <label class="col-md-1 col-sm-1 col-xs-1" for="time_from">从</label>
                            <input type="date" id="time_from" name="time_from" class="col-md-5 col-sm-5 col-xs-5">
                            <label class="col-md-1 col-sm-1 col-xs-1" for="time_to">到</label>
                            <input type="date" id="time_to" name="time_to" class="col-md-5 col-sm-5 col-xs-5">
                        </div>
                    </div>
                    <span class="right-tip hidden-xs">默认为当前日期之前</span>
                </div>
            </fieldset>
            <div class="form-controls">
                <input type="submit" value="搜索" name="submit" class="submit-advs">
                <input type="reset" class="reset-advs text-button" value="重置">
            </div>
        </form>
    </div>
</div>
<script src="resources/js/advSearch.js"></script>
