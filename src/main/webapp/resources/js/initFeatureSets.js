//Init FeatureSets
if (localStorage) {
    //console.log(eval(localStorage.getItem("featureSets")));
    if (!localStorage.featureSets) {
        initFeatureSets();
    }
} else if (sessionStorage) {
    if (!sessionStorage.featureSets || isEmptyObject((JSON.parse(sessionStorage.featureSets)))) {
        initFeatureSets();
    }
}

//获取所有的featureSet，保存在所有的localStorage中
function initFeatureSets() {
    $.ajax({
        url: basePath + 'api/getFeatureSets',
        type: 'post'
    }).success(function (data) {
        featureSets.countryFS = data.countryFS;
        featureSets.provinceFS = data.provinceFS;
        featureSets.cityFS = data.cityFS;
        if (localStorage) {
            console.log(JSON.stringify(featureSets));
            localStorage.featureSets = JSON.stringify(featureSets);
        } else if (sessionStorage) {
            sessionStorage.featureSets = JSON.stringify(featureSets);
        }
    }).error(function () {
        console.log("Getting feature set error!");
    }).fail(function () {
        console.log("Getting feature set failed!");
    });
}