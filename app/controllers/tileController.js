/// <reference path="../../scripts/jquery.min.js" />
/// <reference path="../../scripts/bootstrap.min.js" />
/// <reference path="../../scripts/angular.min.js" />
'use strict';

app.controller('tileController', ['$scope', '$location', 'Data', function ($scope, $location, Data) {
    $scope.data = Data;

    //$scope.changeScore = function (i, team, amt, up) {
    //    Data.changeScore(i, team, amt, up);
    //};

    $scope.showAdmin = function () {
        $('#adminModal').modal('show');
    };

    $scope.hideAdmin = function () {
        $('#adminModal').modal('hide');
    };

    $scope.editContent = function () {
        $scope.hideAdmin();
        $location.path('/content');
    };

}]);