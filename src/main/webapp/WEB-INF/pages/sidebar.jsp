<div class="sidebar hidden-xs">
    <a class="advs-link advs-link-main" href="#" role="button" aria-controls="advs-wrapper">精确搜索
        <span class="glyphicon glyphicon-menu-right"></span>
    </a>

    <div class="search-types"></div>
    <div class="aggregation hidden-print hidden-xs" id="aggregation" role="tablist"
         aria-multiselectable="true">
        <br>

        <div>搜索类型</div>
        <hr>
        <%--国家--%>
        <div class="panel panel-default" id="country_panel">
            <div class="panel-heading" role="tab" id="filter_title_country">
                <h4 class="panel-title">
                    <a role="button" data-toggle="collapse" href="#filter_country"
                       aria-controls="filter_country">国家 </a>
                </h4>
            </div>
            <div id="filter_country" class="panel-collapse collapse in" role="tabpanel"
                 aria-labelledby="filter_title_country" aria-expanded="true">
                <ul class="list-group"></ul>
            </div>
        </div>
        <%--服务--%>
        <div class="panel panel-default" id="device_service_panel">
            <div class="panel-heading" role="tab" id="filter_title_service">
                <h4 class="panel-title">
                    <a class="collapsed" role="button" data-toggle="collapse" href="#filter_device_service"
                       aria-controls="filter_service">服务 </a>
                </h4>
            </div>
            <div id="filter_device_service" class="panel-collapse collapse in" role="tabpanel"
                 aria-labelledby="filter_title_service" aria-expanded="true">
                <ul class="list-group"></ul>
            </div>
        </div>
        <%--端口号--%>
        <div class="panel panel-default" id="port_panel">
            <div class="panel-heading" role="tab" id="filter_title_port">
                <h4 class="panel-title">
                    <a class="collapsed" role="button" data-toggle="collapse" href="#filter_port"
                       aria-controls="filter_port">端口 </a>
                </h4>
            </div>
            <div id="filter_port" class="panel-collapse collapse in" role="tabpanel"
                 aria-labelledby="filter_title_port" aria-expanded="true">
                <ul class="list-group"></ul>
            </div>
        </div>
        <%--设备类型--%>
        <div class="panel panel-default" id="device_type_panel">
            <div class="panel-heading" role="tab" id="filter_title_type">
                <h4 class="panel-title">
                    <a class="collapsed" role="button" data-toggle="collapse" href="#filter_device_type"
                       aria-controls="filter_type">设备类型 </a>
                </h4>
            </div>
            <div id="filter_device_type" class="panel-collapse collapse in" role="tabpanel"
                 aria-labelledby="filter_title_type" aria-expanded="true">
                <ul class="list-group"></ul>
            </div>
        </div>
        <%--漏洞--%>
        <div class="panel panel-default" id="vul_panel">
            <div class="panel-heading" role="tab" id="filter_title_vul">
                <h4 class="panel-title">
                    <a class="collapsed" role="button" data-toggle="collapse" href="#filter_vul"
                       aria-controls="filter_vul">漏洞 </a>
                </h4>
            </div>
            <div id="filter_vul" class="panel-collapse collapse in" role="tabpanel"
                 aria-labelledby="filter_title_vul" aria-expanded="true">
                <ul class="list-group"></ul>
            </div>
        </div>
        <%--漏洞--%>
        <div class="panel panel-default" id="os_panel">
            <div class="panel-heading" role="tab" id="filter_title_os">
                <h4 class="panel-title">
                    <a class="collapsed" role="button" data-toggle="collapse" href="#filter_os"
                       aria-controls="filter_os">操作系统 </a>
                </h4>
            </div>
            <div id="filter_os" class="panel-collapse collapse in" role="tabpanel"
                 aria-labelledby="filter_title_os" aria-expanded="true">
                <ul class="list-group"></ul>
            </div>
        </div>
    </div>
</div>
<div class="clearfix"></div>