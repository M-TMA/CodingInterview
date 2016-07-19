app.controller('DescriptionModalController', ['$scope', 'item', function ($scope, item) {
    //debugger;
    $scope.state = "State: " + item._source.state;
    $scope.balance = "Balance: " + item._source.balance + " $";
    $scope.description = !item._source.description ? "Description: " + item._source.description : "";
}]);
