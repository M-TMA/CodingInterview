// Get 1 Data from RestService
var app = angular.module('myApp', []);
app.controller('getDataController', function($scope, $http) {
	debugger;
    $http.get('http://192.168.95.222:9200/bank/account/25?pretty')
    .then(function(response) {
        $scope.fluentd = response.data;
    });
})

.controller('getAllDataController', function ($scope,$http){
	//debugger;
    $http.get('http://192.168.95.222:9200/bank/account/_search?size=30')
    .then(function(response) {
        $scope.accounts = response.data.hits.hits;
		console.log($scope.accounts);
    });
	
	
})

.controller('addNewController', function ($scope,$http){
	//debugger;
$scope.add = function (){
	debugger;
    var data = JSON.stringify({firstname:$scope.firstname,lastname:$scope.lastname,age:$scope.age,gender:$scope.gender,address:$scope.address, employer: $scope.employer, email:$scope.email}, null);
		var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }
	$http.post('http://192.168.95.222:9200/bank/account?pretty',data,config)
   .then(
       function(response){
		   $scope.account = response.data;
         // success callback
       }, 
       function(response){
         // failure callback
       }
    );
}
});
