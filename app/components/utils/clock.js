/**
 * Created by wanjiexin on 2017-05-03.
 */
'use strict';

angular.module('myApp.clock',[]).directive('appClock',['$interval',function ($interval) {
    return {
        template:"<div>Spent Time: {{totalSeconds}}  seconds." +
        "<input id='timerBtn' type='button' value='start' ng-click='toggle();'></div>",

        link: function(scope, element, attrs){
            var format, stopTime;
            var isStarted = false;
            scope.totalSeconds = 0;

            function updateTime(){
                scope.totalSeconds = scope.totalSeconds + 1;
            }

            scope.toggle = function(){
                var timerBtn = document.getElementById('timerBtn');
                if(isStarted){
                    $interval.cancel(stopTime);
                    isStarted = false;
                    angular.element(timerBtn).val('start');
                }else{
                    scope.totalSeconds = 0;
                    stopTime = $interval(updateTime,1000);
                    isStarted = true;
                    angular.element(timerBtn).val('stop');
                }
            }

            element.on('$destory',function(){
                $interval.cancel(stopTime);
            });
        }
    }
}]);