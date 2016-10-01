/// <reference path="../../scripts/jquery.min.js" />
/// <reference path="../../scripts/bootstrap.min.js" />
/// <reference path="../../scripts/angular.min.js" />
'use strict';

app.controller('contentController', ['$scope', '$location', 'Data', function ($scope, $location, Data) {
    $scope.data = Data;

    $scope.closeContent = function () {
        $location.path('/');
    };
}]);