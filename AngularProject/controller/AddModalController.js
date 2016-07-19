app.controller('AddModalController', ['$scope', '$http', '$timeout', 'item', 'close', 'EmpService', function ($scope, $http, $timeout, item, close, EmpService) {
    "use strict";

    // item param was inputed from MainController
    var editEmployee = function (item) {
        //debugger;
        $scope.accountno = item._source.account_number;
        $scope.firstname = item._source.firstname;
        $scope.lastname = item._source.lastname;
        $scope.age = item._source.age;
        $scope.gender = item._source.gender;
        $scope.address = item._source.address;
        $scope.employer = item._source.employer;
        $scope.email = item._source.email;
        $scope.balance = item._source.balance;
        $scope.state = item._source.state;
        $scope.description = item._source.description;
    };
    if (item != "") {
        editEmployee(item);
    }

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
                balance: $scope.balance,
                state: $scope.state,
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
            balance: $scope.balance,
            state: $scope.state,
            description: $scope.description
        }, null);

        //Update data to Database.
        // 'close' service to close dialog
        EmpService.updateData(account, jsonData, close);
    };
}]);
