app.service('EmpService', ['$http', '$log', function ($http, $log) {
    "use strict";
    // load Data
    this.initDatas = function (size) {
        return $http.get('http://192.168.95.222:9200/bank/account/_search?size=' + size)
            .success(function (response) {
                $log.info("Inited Data Successfully");
                return response; // 
            }).error(function (failure) {
                $log.error('Please check CORS (should be enable) or content request (should be correct) !!!');
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
            .success(function (response) {
                $log.info("Deleted Successfully");
            }).error(function (failure) {
                $log.error("Can't delete data -> " + failure);
            });
    };

    // add or update emp
    this.updateData = function (account, jsonData, close) {

        var newUrl = "http://192.168.95.222:9200/bank/account/" + account._source.account_number + "?pretty";
        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
        return $http.put(newUrl, jsonData, config)
            .success(function (response) {
                $log.info("Updated Data Successfully");
                close(account, 500); // close, but give 500ms for bootstrap to animate
            }).error(function (failure) {
                // failure callback
                $log.error("Can't Delete Failure -> " + failure);
            });
    };

    // Search Query Gender
    this.searchGender = function (gender) {
        var searchAgeUrl = "http://192.168.95.222:9200/bank/account/_search?size=20&q=gender:" + gender;
        return $http.get(searchAgeUrl)
            .success(function (response) {
                $log.info("Gender Search Successfully");
                return response;
            }).error(function (failure) {
                alert("Can't found emp with gender is ->" + failure);
            });
    };

    // Search Query Age
    this.searchAge = function (age) {
        var searchAgeUrl = "http://192.168.95.222:9200/bank/account/_search?size=20&q=age:" + age;
        return $http.get(searchAgeUrl)
            .success(function (response) {
                return response;
            }).error(function (failure) {
                alert("Can't found emp with " + age + " years old" + "\n -> " + failure);
            });
    };

    // Load Age using GROUP BY Query
    this.loadAges = function (loadAgeUrl, ageGroupByData) {
        return $http.post(loadAgeUrl, ageGroupByData)
            .success(function (response) {
                return response;
            }).error(function (failure) {
                alert("Can't found emp with gender is " + gender + "\n -> " + failure);
            });
    }

}]);
