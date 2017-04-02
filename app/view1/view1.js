'use strict';

angular.module('myApp.view1', ['ngRoute']).run(function ($rootScope) {
    $rootScope.correctAmt = 0;
    $rootScope.wrongAmt = 0;
})

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope','$route','$rootScope','$window',function($scope,$route,$rootScope,$window) {

    $scope.onFolderNumberKeyPress = function(event)
    {
        if (event.charCode == 13) {
            $scope.checkResult();
        }
    }

    var num1, num2;

    num1 = Math.floor(Math.random() * 10);
    num2 = Math.floor(Math.random() * 10);

    var operators = ["+","-"];

    var operator = operators[num1%2];

    if(operator == "-"){
        if(num1 > num2){
            $scope.num1 = num1;
            $scope.num2 = num2;
        }else{
            $scope.num1 = num2;
            $scope.num2 = num1;
        }
    }else{
        $scope.num1 = num1;
        $scope.num2 = num2;
    }

    $scope.operator = operator;

    document.getElementById("result").focus();

    var today = new Date();

    var baseKey = today.getFullYear()+"-"+today.getMonth()+"-"+today.getDate();

    var wrongKey =  baseKey + "-wrong";

    var correctKey = baseKey + "-correct";

    var correctAmt = readScore(correctKey);

    var wrongAmt = readScore(wrongKey);

    $rootScope.correctAmt = correctAmt;
    $rootScope.wrongAmt = wrongAmt;
    
    $scope.checkResult = function () {
        var key;
        var result;
        if ($scope.operator == "+") {
            result = $scope.num1 + $scope.num2;
        } else if ($scope.operator == "-") {
            result = $scope.num1 - $scope.num2;
        }

        if ($scope.result != result) {
            wrongAmt = updateStore(wrongKey);

            $rootScope.wrongAmt = wrongAmt;

            $scope.error = "答案错误，请检查。";
        } else {
            key = baseKey + "-correct";

            correctAmt = updateStore(correctKey);

            $rootScope.correctAmt = correctAmt;

            $route.reload();
        }
        document.getElementById("result").focus();
    }

    function updateStore(key){
        var amt = readScore(key);

        amt = parseInt(amt) + 1;

        $window.localStorage.setItem(key, amt);

        return amt;
    }

    function readScore(key){
        var amt = $window.localStorage.getItem(key);

        if(!amt){
            amt = 0;
        }

        return amt;
    }
}]);

