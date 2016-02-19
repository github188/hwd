/*
 http://www.ruanyifeng.com/blog/2012/10/javascript_module.html
 Javascript模块化编程（一）：模块的写法
使用"立即执行函数"（Immediately-Invoked Function Expression，IIFE），可以达到不暴露私有成员的目的。
*/
var model1 = (function () {
 var _count = 0;
 var m1 = function () {
 };
 var m2 = function () {
 };
 return {m1: m1, m2: m2};
})();
//http://blog.csdn.net/qq838419230/article/details/8030078