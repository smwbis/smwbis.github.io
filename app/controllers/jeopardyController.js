/// <reference path="../../scripts/angular.min.js" />
'use strict';

app.controller('jeopardyController', ['$scope', '$location', 'Data', function ($scope, $location, Data) {
    $scope.data = Data;

    $scope.showTile = function (content, category, value) {
        //alert("showTile " + category + value + content);
        Data.updateModal(content, category, value);
        $('#tileModal').modal('show');
        for (var i = 0; i < $scope.data.values.teams.length; i++) {
            $scope.data.values.teams[i].active = true;
        }
    };

    $scope.hideTile = function () {
        $('#tileModal').modal('hide');
        for (var i = 0; i < $scope.data.values.teams.length; i++) {
            $scope.data.values.teams[i].active = true;
        }
        localStorage.currentContent = JSON.stringify($scope.data.content);
        localStorage.currentValues = JSON.stringify($scope.data.values);
    };

    $scope.selectTile = function (content, category, value) {
        //alert("selectTile");
        content.active = false;
        $scope.showTile(content, category, value);
    };

    $scope.changeScore = function (i, team, amt, up) {
        if (up) {
            team.score = parseInt(team.score) + parseInt(amt);
            $scope.data.values.teamLeader = i;
            $scope.hideTile();
            toastr.success(team.name + ': +$' + amt);
        }
        else {
            team.active = false;
            team.score = parseInt(team.score) - parseInt(amt);
            toastr.error(team.name + ': -$' + amt);

        }
        localStorage.currentContent = JSON.stringify($scope.data.content);
        localStorage.currentValues = JSON.stringify($scope.data.values);
    };

}]);