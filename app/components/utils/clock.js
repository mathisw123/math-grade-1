/**
 * Created by wanjiexin on 2017-05-03.
 */
'use strict';

angular.module('myApp.clock',[]).directive('appClock',['$interval',function ($interval) {
    return function(scope, element, attrs){
        var format, stopTime;
        var totalSeconds = 0;

        function updateTime(){
            totalSeconds = totalSeconds + 1;
            element.text("Spent Time:  "+totalSeconds + " seconds.");
        }

        scope.$watch(attrs.appClock, function(value){
            updateTime();
        });

        stopTime = $interval(updateTime,1000);

        element.on('$destory',function(){
            $interval.cancel(stopTime);
        });
    }

}]);