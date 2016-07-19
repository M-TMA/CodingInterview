var app = angular.module('myApp', ['angularModalService']);
app.controller('MainController', ['$scope', '$http', '$timeout', 'ModalService', 'EmpService', function ($scope, $http, $timeout, ModalService, EmpService) {

    "use strict";
    // GET LIST emp with size default
    $scope.initFirst = function (size) {
        EmpService.initDatas(size).success(function (response) {
            $scope.accounts = response.hits.hits;
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

    var checkBeforePushToArrayForGUI = function (account) {
        var i;
        var accountList = $scope.accounts;
        var isContainElement = function (account, accountList) {
            for (i = 0; i < accountList.length; i++) {
                if (accountList[i]._source.account_number === account._source.account_number) {
                    return true;
                }
            }
            return false;
        };

        var retrieveOldAccount = function (account, accountList) {
            var i;
            for (i = 0; i < accountList.length; i++) {
                if (accountList[i]._source.account_number === account._source.account_number) {
                    return accountList[i];
                }
            }
            return "";
        };

        var isUpdate = function (accountOld, accountNew) {
            if (accountNew._source.firstname !== accountOld._source.firstname || accountNew._source.lastname !== accountOld._source.lastname || accountNew._source.age !== accountOld._source.age || accountNew._source.gender !== accountOld._source.gender || accountNew._source.address !== accountOld._source.address || accountNew._source.employer !== accountOld._source.employer || accountNew._source.email !== accountOld._source.email || accountNew._source.balance !== accountOld._source.balance || accountNew._source.state !== accountOld._source.state) {
                return true;
            }
            return false;
        };

        if (!isContainElement(account, $scope.accounts)) {
            $scope.accounts.push(account);
        } else {
            var oldAccount = retrieveOldAccount(account, $scope.accounts);
            if (isUpdate(oldAccount, account)) {
                var index = $scope.accounts.indexOf(oldAccount);
                $scope.accounts.splice(index, 1);
                $scope.accounts.push(account);
            }
        }

    };



    var ageSearch = function (age) {
        EmpService.searchAge(age).success(function (response) {
            $scope.accounts = response.hits.hits;
        });
    };



    $scope.genderSearch = function (gender) {
        EmpService.searchGender(gender).success(function (response) {
            $scope.accounts = response.hits.hits;
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
                    ageSearch(result);
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
                checkBeforePushToArrayForGUI(result);
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
                checkBeforePushToArrayForGUI(result);
            });
        });
    };


    // get Detail Employer
    $scope.getDetailFromId = function (account) {
        ModalService.showModal({
            templateUrl: 'desModal.html',
            controller: "DescriptionModalController",
            inputs: {
                item: account
            }
        }).then(function (modal) {
            modal.element.modal(); // open modal dialog
            modal.close.then(function (result) {});
        });
    };
}]);
