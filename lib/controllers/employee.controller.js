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
        $http.get('/api/address/'+index).then(function(response){
            $scope.address = response.data;
        });
    }
     $scope.addEmployeeDetails = function(){
         debugger;
        $http.get('/api/project/'+$scope.employeeObj.project_name).then(function(response){
            $scope.employeeObj.project_id = response.data[0].project_id;
            $http.post('/api/addEmployee', $scope.employeeObj).then(function(response){
                $scope.employeeList.push(response.data);
                $scope.employeeObj = {};
                getEmployeeDetails();
            });
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
        $http.get('/api/project/'+$scope.employeeUpdateObj.project_name).then(function(response){
            $scope.employeeUpdateObj.project_id = response.data[0].project_id;
            $http.put('/api/employees/'+$scope.employeeUpdateObj._id, $scope.employeeUpdateObj).then(function(response){
                getEmployeeDetails();
                $scope.isEdit = false;
            });
        });
        
    }
}]);