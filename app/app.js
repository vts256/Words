'use strict';

angular.module('words', ['ui.router', 'ui.bootstrap', 'ngResource', 'ngAnimate'])
    .config(['$stateProvider', '$urlRouterProvider', '$qProvider',
    function($stateProvider, $urlRouterProvider, $qProvider) {
      $qProvider.errorOnUnhandledRejections(false);
      $stateProvider.state('main', {
        url: '/main',
        templateUrl: 'controllers/main/main.html',
        controller: 'MainCtrl',
        controllerAs: 'mc'
      }).state('quiz', {
        abstract: true,
        url: '/quiz',
        templateUrl: 'controllers/word-quiz/word-quiz.html',
        controller: 'WordQuizCtrl',
        controllerAs: 'quiz'
      }).state('quiz.question', {
        url: '/quest',
        templateUrl: 'controllers/word-quiz/word-quiz.question.html'
      }).state('quiz.description', {
        url: '/description',
        templateUrl: 'controllers/word-quiz/word-quiz.description.html'
      });

      $urlRouterProvider.otherwise('/main');
}]);
