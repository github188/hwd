/**
 * Created by lyp on 2016-01-30.
 * js代码说明文档
 * 对所有全局对象MyObject和全局方法MyFunction的说明
 */
var MyObject = {};
{
    MyObject.MySessionStorage.description =
        "1. 对sessionStorage的封装，并对其进行统一管理。主要是get和set方法，整个系统对sessionStorage的存取都通过此对象完成。" +
        "2. 保存在sessionStorage中的key包括：" +
        "   wd：字符串。搜索框中用户的输入，当currentPage为home时，wd值为home_search_input的val，否则为global_search_input的val。" +
        "   ..wd只能由两个搜索框事件来设置，其他方法只能读取。" +
        "   currentPage：字符串。用户当前所在页面。取值包含：home、list、map、globe-point、globe-line和charts。" +
        "   checked：JSONObject。用户选中的复选框数据。每一个key:value对为（checkbox的id）:（将分隔符替换为“:”后的值）" +
        "   data：搜索到的数据（ajax返回的原始数据数据），只能由全局search方法设置，其他方法只能读取。" +
        "3. functions：getters and setters";

}//MySessionStorage
{
    MyObject.HomePage.description =
        "首页，currentPage = 'home'。页面首次加载时，显示此页" +
        "variables: {" +
        "   tag:'home'" +
        "   wrapper:home页的Dom" +
        "}" +
        "functions：" +
        "   show:{" +
        "       1) 设置sessionStorage.currentPage为home" +
        "       2）显示this.wrapper" +
        "       3）隐藏header" +
        "       4）隐藏sidebar" +
        "   }" +
        "   hide:{" +
        "       隐藏this.wrapper" +
        "   }" +
        "   search:{ home_search_form触发搜索" +
        "       1）设置sessionStorage的wd和搜索条件criteria为home_search_input.val()" +
        "       2）设置sessionStorage的currentPage为List.tag" +
        "       3）调用List的search方法" +
        "   }";
}//HomePage
{
    MyObject.List.description =
        "列表页，currentPage = 'list'" +
        "variables: {" +
        "   tag:'list'" +
        "   listPageNum：默认值为1，由分页中的onChange方法更新，由search方法调用" +
        "   wrapper: list页的dom节点" +
        "}" +
        "functions: " +
        "   show(data):{" +
        "       1) 设置sessionStorage.currentPage为list" +
        "       2）显示header" +
        "       3）调用this.render，渲染页面" +
        "       4）调用Sidebar.show显示侧栏" +
        "       5）显示List的dom节点" +
        "   }" +
        "   hide:{" +
        "       隐藏List的Dom节点" +
        "   }" +
        "   render(data):{" +
        "       1）设置搜索用时、查到的总条数、当前第几页" +
        "       2）遍历data.data，生成每个设备对应的li" +
        "       3）设置分页" +
        "       4）监听li的点击事件，展开和隐藏全部内容" +
        "   }" +
        "   search:{" +
        "       1）设置criteria{" +
        "               wd: global_search_globe.val(如果为空，则使用sessionStorage.wd) + sessionStorage.checked" +
        "               page: listPageNum" +
        "           }" +
        "       3）设置url为list对应的listURL" +
        "       4）调用全局search({criteria:criteria,url:listURL})查询" +
        "   }";
}//List
{
    MyObject.Sidebar.description =
        "侧边栏" +
        "variables: {" +
        "   wrapper: Sidebar的dom节点" +
        "}" +
        "functions：" +
        "   show(agg):{" +
        "       1）调用Pivot的hide方法，隐藏pivot" +
        "       2）调用this.render方法，来渲染侧边栏" +
        "       3）调用jQuery的show()，显示侧边栏sidebar" +
        "   }" +
        "   hide:{" +
        "       1）调用jQuery的hide()，隐藏侧栏。" +
        "   }" +
        "   render(agg):{" +
        "       1）遍历agg，生成所有的input[type='checkbox']" +
        "       2）遍历sessionStorage.checked，设置所有input的选中状态和Pivot的显示与否" +
        "       3）监听checkbox" +
        "           选中：添加其id到sessionStorage.checked" +
        "                 添加pivot" +
        "           取消：从sessionStorage.checked中移除该checkbox对应的id" +
        "                 删除pivot" +
        "           调用currentPage页对应的search方法，重新搜索。" +
        "       4）监听pivot的closeBtn" +
        "           从sessionStorage中移除该pivot（即checkbox）对应的id" +
        "           取消对应checkbox的选中状态" +
        "           删除该pivot" +
        "           调用currentPage页对应的search方法，重新搜索" +
        "   }";
}//Sidebar
{
    MyObject.Pivot.description =
        "variables: {" +
        "   $pivots: 所有pivot所在的ul" +
        "   wrapper: Pivot的dom节点" +
        "}" +
        "functions：" +
        "   show:{" +
        "   }" +
        "   hide:{" +
        "   }" +
        "   add(pivot.k,pivot.v):{" +
        "   }" +
        "   remove(pivot):{" +
        "   }";
}//Pivot，目前仅供Sidebar使用
{
    MyObject.MyMap.description =
        "地图页，currentPage = 'map'" +
        "variables: {" +
        "   mapPageNum：默认值为1，由分页中的onChange方法更新，由search方法调用" +
        "   wrapper：map所在Dom节点" +
        "}" +
        "functions: " +
        "   show:{" +
        "       1) 设置sessionStorage.currentPage为map" +
        "       2）显示header" +
        "       3）调用this.render，渲染页面" +
        "       4）调用Sidebar.show显示侧栏" +
        "       5）显示Map的dom节点" +
        "   }" +
        "   hide:{" +
        "       隐藏Map的dom节点" +
        "   }" +
        "   render(data):{" +
        "       1）调用addCluster方法，在地图上添加设备" +
        "          监听设备点击事件：缩放，并在地图侧边栏高亮这些设备的。缩放到最大级别时显示windowTemplate" +
        "       2）设置地图侧边栏（ipList显示、分页）" +
        "          监听设备点击事件：显示其详细内容，在地图上选中该设备并zoomAndCenter到那个设备" +
        "          监听分页的换页事件：设置mapPageNum为用户点击的页面号，调用this.search查询" +
        "   }" +
        "   search:{" +
        "       1）设置criteria{" +
        "               wd: global_search_globe.val + sessionStorage.checked" +
        "               page: currentPageNum" +
        "               geo: 当前视野范围" +
        "           }" +
        "       3）设置url为map对应的mapURL" +
        "       4）调用全局search({criteria:criteria,url:mapURL})查询" +
        "   }";
}//MyMap
{

    MyObject.MyFeatureLayer.description =
        "地图分布图" +
        "variables: {" +
        "   featureLayer: 用于显示分布图的layer。//此参数暂时不用，使用全局featureLayer" +
        "}" +
        "functions: " +
        "   show(which):{" +
        "       1) 调用which对应级别的渲染方法showXXX，显示对应级别的分布图（国家、省份、城市）" +
        "   }" +
        "   hide:{" +
        "       1）调用layer.clear方法，清空所有的graphics" +
        "       2）调用layer.hide方法，隐藏已显示的分布图" +
        "   }";

}//MyFeatureLayer
{
}//MyMapSidebar-=-------------------待开发
{
    MyObject.AdvSearch.description =
        "高级搜索" +
        "variables: {" +
        "   form: 高级搜索表单" +
        "   wrapper：高级搜索页面所在dom" +
        "}" +
        "functions: " +
        "   show:{" +
        "       1) 显示高级搜索页面" +
        "   }" +
        "   hide:{" +
        "       1）隐藏高级搜索页面" +
        "   }" +
        "   search:{" +
        "       高级搜索的form提交时，调用这个方法。" +
        "       1）显示loading页面" +
        "       2）设置criteria{" +
        "               高级搜索特有的搜索条件" +
        "           }" +
        "       3）设置url为高级搜索对应的advsURL" +
        "       4）调用全局search({criteria:criteria,url:advsURL})查询" +
        "       5）隐藏loading页面" +
        "       6）调用this.hide隐藏高级搜索页面，修改高级搜索链接的箭头方向" +
        "   }";
}//AdvSearch
{
    MyObject.GlobePoint.description = "";
}//GlobePoint待开发
{
    MyObject.GlobeLine.description = "";
}//GlobeLine待开发

var MyFunction = {};
{
    MyFunction.search.description =
        "1. ajax搜索功能，所有对数据的搜索都使用此方法，也仅能使用此方法。" +
        "2. parameters：obj{" +
        "       url：String。请求的地址。" +
        "       criteria：JSONObject。查询条件。不同页面对应的查询条件不一样，要自行设置好。" +
        "   }" +
        "3. variables：" +
        "       global_search_input：jQuery对象，header中的输入框" +
        "       home_search_input：jQuery对象，首页中的输入框" +
        "       global_search_btn：jQuery对象，header中的输入按钮" +
        "       home_search_btn：jQuery对象，首页中的输入按钮" +
        "4. success：搜索成功后，" +
        "       设置sessionStorage.data为返回结果data。" +
        "       设置global_search_input.val的值为sessionStorage.wd" +
        "       如果返回数据不为空（data.statuscode==200），则根据sessionStorage中的currentPage来调用对应页面的show方法，显示该页面。" +
        "       如果为空，则调用noData方法，显示无数据。" +
        "5. error：执行全局错误方法errorHandler。";
}//search

{
    MyFunction.errorHandler.description =
        "显示错误页面，暂时用console提示";
}//errorHandler

{
    MyFunction.noData.description =
        "显示无数据提示，暂时用console提示";
}//noData

{
    MyFunction.initMap.description =
        "1. 地图初始化。" +
        "2. map.onLoad：{ 地图加载成功后" +
        "       1）加载featureLayer" +
        "       2）监听工具栏的侧栏控制按钮的点击事件" +
        "       3）监听工具栏的分布图按钮的点击事件" +
        "   }" +
        "3. map.onZoomEnd：{ 地图缩放后" +
        "       1）调用MyMap.search方法，重新搜索和渲染地图" +
        "       //将来要做到：-需要添加这样一个按钮（如果用户点击了则执行MyMap.search，否则缩放不重新搜索）" +
        "       2）判断工具栏对应分布图的按钮是否hasClass('open')，如果有则调用MyFeatureLayer.show(this.id)来显示对应的分布图" +
        "   }"+
        "4. map.onPanEnd：{ 地图移动后" +
        "       同onZoomEnd" +
        "   }";
}//initMap------------待完善
MyFunction.$.description =
    "入口方法" +
    "需要做的操作：" +
    "   0）调用initFeatureSets方法，初始化国家和省份的featureLayer（此方法后期被获取城市featureLayer的类似方法取代）" +
    "   1）检查sessionStorage的currentPage，如果存在，则继续2）↓；否则，调用HomePage.show，并跳转到4）" +
    "   2）检查sessionStorage的data是否存在且data.statuscode为200，如果是，则继续3）↓；否则，调用HomePage.show，并跳转到4）" +
    "   3）carousel跳转，显示对应页面。" +
    "   4）监听所有搜索框表单提交事件" +
    "   5）监听所有input的输入事件（调用input的suggestion方法）。" +
    "";


