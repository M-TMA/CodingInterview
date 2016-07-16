app.controller('SearchModalController', ['$scope', 'close', '$http', function ($scope, close, $http) {
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


    $scope.groupByAge = function () {
        debugger;
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
        var loadAgeUrl = "http://localhost:9200/bank/account/_search?pretty";
        $http.post(loadAgeUrl, ageGroupByData)
            .then(function (response) {
                $scope.ageArr = response.data.aggregations.group_by_age.buckets;
                $scope.ageArr.splice(0, 1);
            }, function (failure) {
                alert("Can't found emp with gender is " + gender);
            });
    };
    $scope.groupByAge();
}]);
