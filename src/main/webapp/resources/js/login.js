$(function () {
    var switchToRegNode = $('#switchToReg'),
        switchToLoginNode = $('#switchToLogin'),
        switchBottomNode = $('.switch-bottom'),
        regWrapper = $('.reg-wrapper'),
        loginWrapper = $('.login-wrapper');

    function switchToReg() {
        switchToLoginNode.removeClass("switch_btn_focus").addClass('switch_btn');
        switchToRegNode.removeClass("switch_btn").addClass('switch_btn_focus');
        switchBottomNode.animate({left: '0px', width: '70px'});
        regWrapper.css('display', 'none');
        loginWrapper.css('display', 'block');
    }

    function switchToLogin() {
        switchToLoginNode.removeClass("switch_btn").addClass('switch_btn_focus');
        switchToRegNode.removeClass("switch_btn_focus").addClass('switch_btn');
        switchBottomNode.animate({left: '154px', width: '70px'});
        regWrapper.css('display', 'block');
        loginWrapper.css('display', 'none');
    }

    //根据参数名获得该参数 pname等于想要的参数名
    function getParam(pname) {
        var params = location.search.substr(1); // 获取参数 平且去掉？
        var ArrParam = params.split('&');
        if (ArrParam.length == 1) {
            //只有一个参数的情况
            return params.split('=')[1];
        }
        else {
            //多个参数参数的情况
            for (var i = 0; i < ArrParam.length; i++) {
                if (ArrParam[i].split('=')[0] == pname) {
                    return ArrParam[i].split('=')[1];
                }
            }
        }
    }

    switchToReg();
    switchToRegNode.click(switchToReg);
    switchToLoginNode.click(switchToLogin);

    if (getParam("a") == '0') {
        switchToLoginNode.trigger('click');
    }
    login();
    register();
});

function login() {
    console.log("login validate");
    $("#login_form").Validform();
    var userPwdStr, userNameStr;
    userPwdStr = $.sha1($('#password').val());

}
function register() {
    $("#reg_form").Validform();
}
