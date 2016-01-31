function errorHandler() {
    console.log("FUNCTION CALL: errorHandler");
    console.log("ajax success with data error" + data['statuscode'], data['errmsg']);
}

function noData() {
    console.log("FUNCTION CALL: noData");
    console.log("No related data found!");
}