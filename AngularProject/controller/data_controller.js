// Get 1 Data from RestService
var app = angular.module('myApp', []);
app.controller('ProcessDataController', function ($scope,$http){
	//debugger;
	
	$scope.initFirst = function(){
    $http.get('http://192.168.95.222:9200/bank/account/_search?size=30')
    .then(function(response) {
        $scope.accounts = response.data.hits.hits;
		     $scope.myVariable=response;

    });
};
	
	$scope.add = function (){
    var data = JSON.stringify({firstname:$scope.firstname,lastname:$scope.lastname,age:$scope.age,gender:$scope.gender,address:$scope.address, employer: $scope.employer, email:$scope.email}, null);
		var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }
	$http.post('http://192.168.95.222:9200/bank/account?pretty', data, config)
   .then(
       function(response){
		   $scope.account = response.data;
		   $scope.myVariable=response;
		   $scope.initFirst();

         // success callback
       }, 
       function(response){
         // failure callback
       }
    );
}
	
})


