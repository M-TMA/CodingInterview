app.service('EmpService', ['$http', function ($http) {
    "use strict";


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
            .success(function (response) {
                return "SUCCESS";
            }).error(function (response) {
                return "FAILURE";
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
                close(account, 500); // close, but give 500ms for bootstrap to animate
            }).error(function (failure) {
                // failure callback
            });
    };

    // Search Query Gender
    this.searchGender = function (gender) {
        var searchAgeUrl = "http://192.168.95.222:9200/bank/account/_search?size=20&q=gender:" + gender;
        return $http.get(searchAgeUrl)
            .success(function (response) {
                return response;
            }).error(function (failure) {
                alert("Can't found emp with gender is " + gender);
            });
    };

    // Search Query Age
    this.searchAge = function (age) {
        var searchAgeUrl = "http://192.168.95.222:9200/bank/account/_search?size=20&q=age:" + age;
        return $http.get(searchAgeUrl)
            .success(function (response) {
                return response;
            }).error(function (failure) {
                alert("Can't found emp with " + age + " years old");
            });
    };

    // Load Age using GROUP BY Query
    this.loadAges = function (loadAgeUrl, ageGroupByData) {
        return $http.post(loadAgeUrl, ageGroupByData)
            .success(function (response) {
                return response;
            }).error(function (failure) {
                alert("Can't found emp with gender is " + gender);
            });
    }

}]);
