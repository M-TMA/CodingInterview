app.controller('SearchModalController', ['$scope', 'close', '$http', 'EmpService', function ($scope, close, $http, EmpService) {
    //debugger;

    $scope.Yes = function () {
        result = parseInt($scope.ageSelected);
        close(result, 500); // close, but give 500ms for bootstrap to animate
    };

    $scope.No = function () {
        result = "You choose NO, please try again"
        close(result, 500); // close, but give 500ms for bootstrap to animate
    };

    $scope.Cancel = function () {
        result = "You can't type input";
        close(result, 500); // close, but give 500ms for bootstrap to animate
    };

    $scope.ageArr = [];


    var groupByAge = function () {
        // debugger;
        var ageGroupByData = {
            "size": 0,
            "aggs": {
                "group_by_age": {
                    "terms": {
                        "field": "age"
                    }
                }
            }
        }
        var loadAgeUrl = "http://192.168.95.222:9200/bank/account/_search?pretty";
        EmpService.loadAges(loadAgeUrl, ageGroupByData).success(function (response) {
            $scope.ageArr = response.aggregations.group_by_age.buckets;
            $scope.ageArr.splice(0, 1);
        })
    };
    groupByAge();
}]);
