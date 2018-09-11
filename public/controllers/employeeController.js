var myApp = angular.module('empApp', []);
myApp.controller('empCtrl', ['$scope', '$http', function($scope, $http) {
    var getEmployeeDetails = function(){
        $http.get('/api/employees').then(function(response){
            $scope.employeeList = response.data;
        });
    }
    getEmployeeDetails();
    $scope.addEmployeeDetails = function(){
        console.log($scope.employeeObj);
        $http.post('/api/addEmployee', $scope.employeeObj).then(function(response){
            $scope.employeeList.push(response.data);
        })
    }
    $scope.removeEmoployee = function(id){
        console.log(id);
        $http.delete('/api/removeEmployee/'+id).then(function(response){
            getEmployeeDetails();
        });
    }
    $scope.editEmoployee = function(id){

    }
}]);