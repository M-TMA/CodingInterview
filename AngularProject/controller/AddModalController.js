app.controller('AddModalController', ['$scope', '$http', '$timeout', 'item', 'close', function ($scope, $http, $timeout, item, close) {
    "use strict";

    //In case of edit employee, populate form with employee data
    $scope.editEmployee = function (item) {
        //debugger;
        $scope.accountno = item._source.account_number;
        $scope.firstname = item._source.firstname;
        $scope.lastname = item._source.lastname;
        $scope.age = item._source.age;
        $scope.gender = item._source.gender;
        $scope.address = item._source.address;
        $scope.employer = item._source.employer;
        $scope.email = item._source.email;
        $scope.description = item._source.description;
    };
    if (item != "") {
        $scope.editEmployee(item);
    }
    //debugger;
    // GET LIST emp
    $scope.initFirst = function () {
        $http.get('http://192.168.95.222:9200/bank/account/_search?size=20')
            .then(function (response) {
                $scope.accounts = response.data.hits.hits;
            });
    };
    // How to cache accounts to remove this method out of current behaviour
    $scope.initFirst();

    // ADD/EDIT new emp
    $scope.addEmp = function () {
        // debugger;
        var account = {
            _source: {
                account_number: $scope.accountno,
                firstname: $scope.firstname,
                lastname: $scope.lastname,
                age: $scope.age,
                gender: $scope.gender,
                address: $scope.address,
                employer: $scope.employer,
                email: $scope.email,
                description: $scope.description
            }

        };

        var jsonData = JSON.stringify({
            account_number: $scope.accountno,
            firstname: $scope.firstname,
            lastname: $scope.lastname,
            age: $scope.age,
            gender: $scope.gender,
            address: $scope.address,
            employer: $scope.employer,
            email: $scope.email,
            description: $scope.description

        }, null);





        var newUrl = "http://192.168.95.222:9200/bank/account/" + $scope.accountno + "?pretty";
        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
        $http.put(newUrl, jsonData, config)
            .then(
                function (response) {
                    // success callback
                    $scope.account = response.data;
                    close(account, 500); // close, but give 500ms for bootstrap to animate
                },
                function (response) {
                    // failure callback
                }
            );

    };
}]);
