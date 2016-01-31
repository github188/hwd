/**
 * Created by lyp on 2016-01-31.
 * 使用jquery.address插件，控制网页的前进和后退
 * event包含如下属性：value, path, pathNames, parameterNames, parameters and queryString.
 */
function jQAddress() {
    $.address
        .state(basePath)  //这里需要基本URL（字符串）,地址不改变部分,一般为初始化进入页面地址
        .init(function (event) {    //插件初始化, $('a').address(); 实现链接单击监听，$('form').address()：实现表单提交监听
            $('form').address();
            $('a').address();
        })
        .change(function (event) {  //当页面地址更改的时候调用,例如#号之后的地址更改，只要url变化就会触发此事件
            console.log("event = ", event);
            if (event.value != '/') {
                if (!$('pre').size()) {
                    $('form').before('<pre />');
                }
                $.get('./' + event.value, function (data) {
                    $('pre').html(data);
                });
            } else {
                $('pre').remove();
            }
            for (var p in event.parameters) {
                event.parameters[p] = decodeURIComponent(event.parameters[p].replace(/\+/g, ' '));
            }
            $('form').deserialize(event.parameters);
        })
        .internalChange(function (event) {//内部地址更改,即非通过手动更改URL#号后的内容。点击链接自动改变URL时会触发此事件
            console.log("event in internalChange: ",event);

        })
        .externalChange(function (event) {//点击浏览器前进后退时，会触发此事件
            console.log("event in externalChange: ",event);
        });
}