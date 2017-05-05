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
    $scope.data={};
    $rootScope.wrongAnswers=[];
    $scope.data.result="";

    num1 = Math.floor(Math.random() * 10);
    num2 = Math.floor(Math.random() * 10);

    var operators = ["+","-"];

    var operator = operators[num1%2];

    if(operator == "-"){
        if(num1 > num2){
            $scope.data.num1 = num1;
            $scope.data.num2 = num2;
        }else{
            $scope.data.num1 = num2;
            $scope.data.num2 = num1;
        }
    }else{
        $scope.data.num1 = num1;
        $scope.data.num2 = num2;
    }

    $scope.data.operator = operator;

    document.getElementById("result").focus();

    var today = new Date();

    var baseKey = today.getFullYear()+"-"+today.getMonth()+"-"+today.getDate();

    var wrongKey =  baseKey + "-wrong";

    var correctKey = baseKey + "-correct";

    var correctAmt = readScore(correctKey);

    var wrongAmt = readScore(wrongKey);

    $rootScope.correctAmt = correctAmt;
    $rootScope.wrongAmt = wrongAmt;
    $rootScope.wrongAnswers = getWrongs(wrongKey+"s");
    
    $scope.checkResult = function () {
        var result;
        if ($scope.data.operator == "+") {
            result = $scope.data.num1 + $scope.data.num2;
        } else if ($scope.data.operator == "-") {
            result = $scope.data.num1 - $scope.data.num2;
        }


        //console.log($scope.data);

        if ($scope.data.result != result) {
            wrongAmt = updateStore(wrongKey);

            $rootScope.wrongAmt = wrongAmt;

            addWrongs(wrongKey+"s", $scope.data.num1 + " " +$scope.data.operator+" "+$scope.data.num2 +" = " +$scope.data.result)

            $scope.data.error = "答案错误，请检查。";
            $rootScope.wrongAnswers = getWrongs(wrongKey+"s");

            $scope.dummhead = "dum";

        } else {
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
            (1).toString();
            1..toString();
        }
        return amt;
    }

    function addWrongs(key, wrong) {
        var wrongs = JSON.parse($window.localStorage.getItem(key));
        if(!wrongs){
            wrongs = [];
        }

        wrongs.push(wrong);

        $window.localStorage.setItem(key, JSON.stringify(wrongs));

    }

    function getWrongs(key){
        var wrongs = JSON.parse($window.localStorage.getItem(key));
        //var wrongs = [];
        if(!wrongs){
            wrongs = [];
        }

        return wrongs;
    }
}]);

