initFeatureSet();

/*---------------------------------------------init feature sets -----------------------------------------------*/
//static global variables
var countryURL = 'http://10.10.2.81:6080/arcgis/rest/services/world/MapServer/0',
    provinceURL = 'http://10.10.2.81:6080/arcgis/rest/services/area/MapServer/2',
    cityURL = 'http://10.10.2.81:6080/arcgis/rest/services/area/MapServer/1';
var countryFS = {}, provinceFS = {}, cityFS = {};
function initFeatureSet() {
    require(
        [
            //feature layer related↓
            "esri/SpatialReference",
            "esri/tasks/query",
            "esri/tasks/QueryTask",
            "esri/tasks/FeatureSet",
            "esri/layers/FeatureLayer"
        ],
        function (SpatialReference, Query, QueryTask, FeatureSet, FeatureLayer) {

            setFeatureSet('country');
            setFeatureSet('province');
            setFeatureSet('city');

            function setFeatureSet(which) {
                //------------↓functions---------------//
                function executeQueryTask(url) {
                    var qt = new QueryTask(url);
                    qt.execute(query, queryTaskComplete, queryTaskError);
                }

                //callback
                function queryTaskComplete(resp) {
                    //console.log(which + " complete：" + new Date(), resp.features);
                    //init data
                    switch (which) {
                        case 'country':
                            //将features转换为map，方便以后使用， key：名称，value：feature
                            resp.features.forEach(function (item) {
                                countryFS[item.attributes.NAME] = item;
                            });
                            localStorage['countryFS'] = countryFS;
                            break;
                        case 'province':
                            resp.features.forEach(function (item) {
                                provinceFS[item.attributes.Name_CHN] = item;
                            });
                            localStorage['provinceFS'] = provinceFS;
                            break;
                        case 'city':
                            resp.features.forEach(function (item) {
                                cityFS[item.attributes.Name_CHN] = item;
                            });
                            localStorage['cityFS'] = cityFS;
                            break;
                    }
                }
                //errorback
                function queryTaskError(err) {
                    console.log('Oops, something goes wrong with feature layer. ', err);
                }

                //-------------functions↑---------------//

                // process starts here......
                //（setFeatureSet --> 1）initialize query
                var query = new Query();
                query.returnGeometry = true;
                //query.outSpatialReference = map.spatialReference;
                var wgs = new SpatialReference({
                    "wkid": 102100
                });
                query.outSpatialReference = wgs;
                query.outFields = ["Name_CHN", "Name_ENG"];
                query.where = "'OBJECTID'>'0'";
                var url;
                switch (which) {
                    case 'country':
                        url = countryURL;   //（setFeatureSet --> 2）initialize query task (not yet start, just using this parameter)
                        query.where = "'Shape'='面'";
                        query.outFields = ["NAME", "REGION"];
                        //（setFeatureSet --> 3）initialize InfoTemplate
                        break;
                    case 'province':
                        url = provinceURL;
                        break;
                    case 'city':
                        url = cityURL;
                        break;
                    default:
                        break;
                }
                executeQueryTask(url);
            }
        }
    );
}
