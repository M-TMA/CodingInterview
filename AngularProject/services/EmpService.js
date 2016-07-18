app.service('EmpService', ['$http', function ($http) {
    "use strict";
    debugger;

    // load Data
    this.initDatas = function (size) {
        return $http.get('http://192.168.95.222:9200/bank/account/_search?size=' + size)
            .success(function (response) {
                return response; // 
            }).error(function (failure) {
                alert('Please check CORS (should be enable) or content request (should be correct) !!!');
                return "EMPSERVICE.FAILURE";
            });
    };

    // delete emp
    this.deleteData = function (account) {
        //debugger;
        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
        var urlDel = "http://192.168.95.222:9200/bank/account/" + account._source.account_number + "?pretty";
        $http.delete(urlDel, config)
            .then(
                function (response) {
                    return "SUCCESS";
                },
                function (response) {
                    return "FAILURE";
                }
            );
    }

}]);
