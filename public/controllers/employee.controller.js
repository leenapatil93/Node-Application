var myApp = angular.module('empApp', []);
myApp.controller('empCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.isEdit = false;
    $scope.employeeObj = {};
    var getEmployeeDetails = function(){
        $http.get('/api/employees').then(function(response){
            $scope.employeeList = response.data;
        });
    }
    getEmployeeDetails();
    $scope.getAddress = function(index){
        debugger;
        $http.get('https://jsonplaceholder.typicode.com/users/'+index).then(function(response){
            $scope.address = response.data.address;
        });
    }
    $scope.addEmployeeDetails = function(){
        $http.post('/api/addEmployee', $scope.employeeObj).then(function(response){
            $scope.employeeList.push(response.data);
            $scope.employeeObj = {};
        });
    }
    $scope.removeEmoployee = function(id){
        $http.delete('/api/removeEmployee/'+id).then(function(response){
            getEmployeeDetails();
        });
    }
    $scope.editEmoployee = function(id){
        $scope.isEdit = true;
        $scope.empId = id;
        $http.get('/api/employees/'+id).then(function(response){
            $scope.employeeUpdateObj = response.data;
        });
    }
    $scope.updateEmployeeDetails = function(){
        $http.put('/api/employees/'+$scope.employeeUpdateObj._id, $scope.employeeUpdateObj).then(function(response){
            getEmployeeDetails();
            $scope.isEdit = false;
        });
    }
}]);