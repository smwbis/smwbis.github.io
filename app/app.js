/// <reference path="../scripts/jquery.min.js" />
/// <reference path="../scripts/angular.min.js" />
'use strict';

var app = angular.module('ConferenceJeopardy', ['ngRoute', 'ngAnimate']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        controller: 'titleController',
        templateUrl: './app/views/title.html'
    })
    .when('/jeopardy', {
        controller: 'jeopardyController',
        templateUrl: './app/views/jeopardy.html'
    })
    .when('/double', {
        controller: 'doubleJeopardyController',
        templateUrl: './app/views/doubleJeopardy.html'
    })
    .when('/final', {
        controller: 'finalJeopardyController',
        templateUrl: './app/views/finalJeopardy.html'
    })
    .when('/content', {
        controller: 'contentController',
        templateUrl: './app/views/content.html'
    })
    .otherwise({ redirectTo: '/' });
}]);
