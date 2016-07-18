var app = angular.module('myApp', ['angularModalService']);
app.controller('MainController', ['$scope', '$http', '$timeout', 'ModalService', 'EmpService', function ($scope, $http, $timeout, ModalService, EmpService) {
    debugger;

    // GET LIST emp with size default
    $scope.initFirst = function (size) {
        EmpService.initDatas(size).success(function (response) {
            $scope.accounts = response.hits.hits;;
        });
    };

    // Delete Employer
    $scope.deleteEmp = function (account) {
        // Delete on gui
        var index = $scope.accounts.indexOf(account);
        $scope.accounts.splice(index, 1);

        //Delete on Database
        EmpService.deleteData(account);
    };





    $scope.checkBeforePushToArray = function (account) {
        var accountList = $scope.accounts;
        $scope.isContainElement = function (account, accountList) {
            for (var i = 0; i < accountList.length; i++) {
                if (accountList[i]._source.account_number == account._source.account_number) {
                    return true;
                }
            }
            return false;
        };

        $scope.retrieveOldAccount = function (account, accountList) {
            for (var i = 0; i < accountList.length; i++) {
                if (accountList[i]._source.account_number == account._source.account_number) {
                    return accountList[i];
                }
            }
            return "";
        };

        $scope.isUpdate = function (accountOld, accountNew) {
            if (accountNew._source.firstname != accountOld._source.firstname || accountNew._source.lastname != accountOld._source.lastname || accountNew._source.age != accountOld._source.age || accountNew._source.gender != accountOld._source.gender || accountNew._source.address != accountOld._source.address || accountNew._source.employer != accountOld._source.employer || accountNew._source.email != accountOld._source.email) {
                return true;
            }
            return false;
        };

        if (!$scope.isContainElement(account, $scope.accounts)) {
            $scope.accounts.push(account);
        } else {
            var oldAccount = $scope.retrieveOldAccount(account, $scope.accounts);
            if ($scope.isUpdate(oldAccount, account)) {
                var index = $scope.accounts.indexOf(oldAccount);
                $scope.accounts.splice(index, 1);
                $scope.accounts.push(account);
            }
        }

    };


    // get Detail Employer
    $scope.getDetailFromId = function (account) {

        $scope.show = true;
        $scope.des = "";
        $scope.des = account._source.description;
        // Sleep 3s and hide description
        $timeout(function () {
            $scope.show = false;
            $scope.des = "";
        }, 3000);
    };

    $scope.ageSearch = function (age) {
        var searchAgeUrl = "http://192.168.95.222:9200/bank/account/_search?size=20&q=age:" + age;
        $http.get(searchAgeUrl)
            .then(function (response) {
                $scope.accounts = response.data.hits.hits;
            }, function (failure) {
                alert("Can't found emp with " + age + " years old");
            });
    };



    $scope.genderSearch = function (gender) {
        var searchAgeUrl = "http://192.168.95.222:9200/bank/account/_search?size=20&q=gender:" + gender;
        $http.get(searchAgeUrl)
            .then(function (response) {
                $scope.accounts = response.data.hits.hits;
            }, function (failure) {
                alert("Can't found emp with gender is " + gender);
            });
    };

    // Open Age Search Dialog
    $scope.openAgeSearchDialog = function () {
        ModalService.showModal({
            templateUrl: 'modal.html',
            controller: "SearchModalController"
        }).then(function (modal) {
            modal.element.modal(); // open modal dialog
            modal.close.then(function (result) {
                if (result > 0 && result < 120) {
                    $scope.ageSearch(result);
                }
            });
        });
    };

    // Open add EMP
    $scope.openAddEmpDialog = function () {
        ModalService.showModal({
            templateUrl: 'addEmp.html',
            controller: "AddModalController",
            inputs: {
                item: ""
            }
        }).then(function (modal) {
            modal.element.modal(); // open modal dialog
            modal.close.then(function (result) {
                $scope.checkBeforePushToArray(result);
            });
        });
    };

    // Update EMP
    $scope.openUpdateEmpDialog = function (account) {
        ModalService.showModal({
            templateUrl: 'addEmp.html',
            controller: "AddModalController",
            inputs: {
                item: account
            }
        }).then(function (modal) {
            modal.element.modal(); // open modal dialog
            modal.close.then(function (result) {
                $scope.checkBeforePushToArray(result);
            });
        });
    };
}]);
