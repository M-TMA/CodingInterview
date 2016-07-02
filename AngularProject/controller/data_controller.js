var app = angular.module('myApp', []);
app.controller('ProcessDataController',['$scope', '$http', function ($scope, $http){
	//debugger;
	
	// GET LIST emp
	$scope.initFirst = function(){
	 $http.get('http://192.168.95.222:9200/bank/account/_search?size=40')
    .then(function(response) {
        $scope.accounts = response.data.hits.hits;
    });
};
	//ADD new emp
	$scope.add = function (){
		//debugger;
		/*var newObject = {
			"_id":$scope.accountno,
			 _source : {
			"account_number":$scope.accountno,
			"firstname":$scope.firstname,
			"lastname":$scope.lastname,
			"age":$scope.age,
			"gender":$scope.gender,
			"address":$scope.address,
			"employer": $scope.employer,
			"email":$scope.email
			}
		}
		if (newObject!=null){
			$scope.accounts.push(newObject);
		} */
    var jsonData = JSON.stringify({account_number:$scope.accountno,firstname:$scope.firstname,lastname:$scope.lastname,age:$scope.age,gender:$scope.gender,address:$scope.address, employer: $scope.employer, email:$scope.email}, null);
		// var jsonData = JSON.stringify(newObject);
		var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }
			if (($scope.firstname && $scope.lastname && $scope.age && $scope.gender && $scope.address && $scope.employer && $scope.email) != null ) {
			
	$http.post('http://192.168.95.222:9200/bank/account?pretty', jsonData, config)
   .then(
       function(response){
		   // success callback
		   $scope.account = response.data;
		   $scope.initFirst();
       }, 
       function(response){
         // failure callback
       }
    );
 }
}

// Delete Employer
$scope.deleteEmp = function (account){
	//debugger;
	var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }
	var urlDel = "http://192.168.95.222:9200/bank/account/" + account._id + "?pretty";
	$http.delete(urlDel, config)
   .then(
       function(response){
		   // success callback
		var index = $scope.accounts.indexOf(account);
		$scope.accounts.splice(index, 1);
       }, 
       function(response){
         // failure call back
       }
    );
}	

//In case of edit employee, populate form with employee data
                $scope.editEmployee = function(account) {
					debugger;
					$scope.accountno = account._source.account_number;
                    $scope.firstname = account._source.firstname;
                    $scope.lastname = account._source.lastname;
					$scope.age = account._source.age;
                    $scope.gender = account._source.gender;
                    $scope.address = account._source.address;
					$scope.employer = account._source.employer;
                    $scope.email = account._source.email;
                };

}])


