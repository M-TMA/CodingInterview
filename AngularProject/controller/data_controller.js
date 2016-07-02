var app = angular.module('myApp', []);
app.controller('ProcessDataController', ['$scope', '$http', function ($scope, $http) {
    //debugger;
    // GET LIST emp
    $scope.initFirst = function () {
        $http.get('http://localhost:9200/bank/account/_search?size=40')
            .then(function (response) {
                $scope.accounts = response.data.hits.hits;
            });
    };

    // ADD/EDIT new emp
    $scope.add = function () {
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
                email: $scope.email
            }

        }

        var jsonData = JSON.stringify({
            account_number: $scope.accountno,
            firstname: $scope.firstname,
            lastname: $scope.lastname,
            age: $scope.age,
            gender: $scope.gender,
            address: $scope.address,
            employer: $scope.employer,
            email: $scope.email
        }, null);

        var accountList = $scope.accounts;
        $scope.isContainElement = function (account, accountList) {
            for (var i = 0; i < accountList.length; i++) {
                if (accountList[i]._source.account_number == account._source.account_number) {
                    return true;
                }
            }
            return false;
        }

        $scope.retrieveOldAccount = function (account, accountList) {
            for (var i = 0; i < accountList.length; i++) {
                if (accountList[i]._source.account_number == account._source.account_number) {
                    return accountList[i];
                }
            }
            return "";
        }

        $scope.isUpdate = function (accountOld, accountNew) {
            if (accountNew._source.firstname != accountOld._source.firstname || accountNew._source.lastname != accountOld._source.lastname || accountNew._source.age != accountOld._source.age || accountNew._source.gender != accountOld._source.gender || accountNew._source.address != accountOld._source.address || accountNew._source.employer != accountOld._source.employer || accountNew._source.email != accountOld._source.email) {
                return true;
            }
            return false;
        }

        if (!$scope.isContainElement(account, $scope.accounts)) {
            $scope.accounts.push(account);
        } else {
            var oldAccount = $scope.retrieveOldAccount(account, accountList);
            if ($scope.isUpdate(oldAccount, account)) {
                var index = $scope.accounts.indexOf(oldAccount);
                $scope.accounts.splice(index, 1);
                $scope.accounts.push(account);
            }
        }

        var newUrl = "http://localhost:9200/bank/account/" + $scope.accountno + "?pretty"
        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
        if (($scope.firstname && $scope.lastname && $scope.age && $scope.gender && $scope.address && $scope.employer && $scope.email) != null) {

            $http.put(newUrl, jsonData, config)
                .then(
                    function (response) {
                        // success callback
                        $scope.account = response.data;

                    },
                    function (response) {
                        // failure callback
                    }
                );
        }
    }

    // Delete Employer
    $scope.deleteEmp = function (account) {
        //debugger;
        var config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }
            // success callback
        var index = $scope.accounts.indexOf(account);
        $scope.accounts.splice(index, 1);
        var urlDel = "http://localhost:9200/bank/account/" + account._source.account_number + "?pretty";
        $http.delete(urlDel, config)
            .then(
                function (response) {

                },
                function (response) {
                    // failure call back
                }
            );
    }

    //In case of edit employee, populate form with employee data
    $scope.editEmployee = function (account) {
        //debugger;
        $scope.accountno = account._source.account_number;
        $scope.firstname = account._source.firstname;
        $scope.lastname = account._source.lastname;
        $scope.age = account._source.age;
        $scope.gender = account._source.gender;
        $scope.address = account._source.address;
        $scope.employer = account._source.employer;
        $scope.email = account._source.email;
    };

}])
