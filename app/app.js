'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}]).directive('myEnter', function () {
    return function (scope, element, attrs){
      element.bind('keydown, keypress', function(event){
        if(event.which === 13){
          scope.$apply(function(){
            scope.$eval(attrs.myEnter);
          });
          event.preventDefault();
        }
      })
    }
});
