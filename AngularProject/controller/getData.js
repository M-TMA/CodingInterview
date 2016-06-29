// Get 1 Data from RestService
var app = angular.module('myApp', []);
app.controller('getDataController', function($scope, $http) {
	debugger;
    $http.get('http://192.168.95.222:9200/bank/account/25?pretty')
    .then(function(response) {
        $scope.fluentd = response.data;
    });
}).controller('getAllDataController', function ($scope,$http){
	debugger;
    $http.get('http://192.168.95.222:9200/bank/account/_search?size=30')
    .then(function(response) {
        $scope.accounts = response.data.hits.hits;
		console.log($scope.accounts);
    });
});
