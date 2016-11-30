'use strict';

angular.module('words')
  .directive('nextWordNav', ['$animate', function($animate) {
    return {
      restrict: 'A',
      scope: {
        index: '=nextWordNav',
        callback: '&navCallback'
      },
      link: function(scope, element, attrs) {
        scope.$watch('index', function(value) {
          if(value != 0) {
            $animate.addClass(element, 'rollOut').then(function() {
              scope.callback();
              $animate.removeClass(element, 'rollOut');
              $animate.addClass(element, 'rollIn').then(function() {
                $animate.removeClass(element, 'rollIn');
              });
            });
          }
        });
      }
    };
  }]);
