var app = angular.module('myApp', ['angularModalService']);


app.controller('MainController', ['$scope', '$http', '$timeout', 'ModalService', function ($scope, $http, $timeout, ModalService) {
    //debugger;
    // GET LIST emp
    $scope.initFirst = function () {
        $http.get('http://localhost:9200/bank/account/_search?size=20')
            .then(function (response) {
                $scope.accounts = response.data.hits.hits;
            });
    };

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



    // $scope.ageSearch = 0;

    // get Detail Employer
    $scope.getDetailFromId = function (account) {
        debugger;
        $scope.show = true;
        $scope.des = "";
        $scope.des = account._source.description;
        // Sleep 3s and hide description
        $timeout(function () {
            $scope.show = false;
            $scope.des = "";
        }, 3000);
    }

    $scope.ageSearch = function (age) {
        var searchAgeUrl = "http://localhost:9200/bank/account/_search?size=20&q=age:" + age;
        $http.get(searchAgeUrl)
            .then(function (response) {
                $scope.accounts = response.data.hits.hits;
            }, function (failure) {
                alert("Can't found emp with " + age + " years old");
            });
    };



    $scope.genderSearch = function (gender) {
        var searchAgeUrl = "http://localhost:9200/bank/account/_search?size=20&q=gender:" + gender;
        $http.get(searchAgeUrl)
            .then(function (response) {
                $scope.accounts = response.data.hits.hits;
            }, function (failure) {
                alert("Can't found emp with gender is " + gender);
            });
    };

    // Open modal dialog
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
                //$scope.ageSearch(result);
            });
        });
    };

    // Update EMP
    $scope.openUpdateEmpDialog = function (account) {
        ModalService.showModal({
            templateUrl: 'addEmp.html',
            controller: "AddModalController",
            //account: account,
            inputs: {
                item: account
            }
        }).then(function (modal) {
            modal.element.modal(); // open modal dialog
            modal.close.then(function (result) {
                //$scope.ageSearch(result);
            });
        });
    };
}])
