function errorHandler() {
    console.log("ajax success with data error" + data['statuscode'], data['errmsg']);
}

function noData() {
    console.log("No related data found!");
}