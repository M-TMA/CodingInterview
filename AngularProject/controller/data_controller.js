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
			if (($scope.firstname && $scope.lastname && $scope.age && $scope.gender && $scope.address && $scope.employer && $scope.email) != null ) {
			
			
	$http.post('http://192.168.95.222:9200/bank/account?pretty', data, config)
   .then(
       function(response){
		   // success callback
		   $scope.account = response.data;
		   $scope.myVariable=response;
		   $scope.initFirst();
       }, 
       function(response){
         // failure callback
       }
    );
 }
}
	
})


