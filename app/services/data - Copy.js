/// <reference path="../../scripts/toastr.min.js" />
/// <reference path="../../scripts/jquery.min.js" />
/// <reference path="../../scripts/angular.min.js" />
'use strict';

app.factory('Data', function () {
    var data = {};

    data.values = {};
    data.values.teams = [];
    data.values.numTeams = 3;
    data.values.teamLeader = 0;
    data.values.jeopardyValue = 200;
    data.values.doubleValue = 400;
    data.values.categoriesPerRound = 6;

    data.content = {};
    data.content.jeopardy = [];
    data.content.double = [];
    data.content.final = {};

    toastr.options = {
        "positionClass": "toast-bottom-right",
    };

    data.restoreValues = function () {
        if (localStorage.values) {
            data.values = JSON.parse(localStorage.values);
            toastr.success('Data restored');
        }
        else {
            toastr.warning('No stored data');
        }
    };

    data.saveValues = function () {
        localStorage.values = JSON.stringify(data.values);
        toastr.success('Data saved');
    };

    data.restoreContent = function () {
        if (localStorage.content) {
            data.content = JSON.parse(localStorage.content);
            toastr.success('Data restored');
        }
        else {
            toastr.warning('No stored data');
        }
    };

    data.saveContent = function () {
        localStorage.content = JSON.stringify(data.content);
        toastr.success('Data saved');
    };

    data.updateTeams = function () {
        data.values.teams.length = data.values.numTeams;
        for (var i = 0; i < data.values.numTeams; i++) {
            data.values.teams[i] = {
                name: 'Team ' + String.fromCharCode('A'.charCodeAt(0) + i),
                score: 0
            };
        }
    };

    data.init = function () {
        data.updateTeams();
        data.updateContent();
    };

    data.updateContent = function () {
        data.content.jeopardy.length = data.values.categoriesPerRound;
        for (var i = 0; i < data.values.categoriesPerRound; i++) {
            data.content.jeopardy[i] = {
                category: '',
                answers: [{ val: '', active: true }, { val: '', active: true }, { val: '', active: true }, { val: '', active: true }, { val: '', active: true }],
                questions: [{ val: '' }, { val: '' }, { val: '' }, { val: '' }, { val: '' }],

            };
        }
        data.content.double.length = data.values.categoriesPerRound;
        for (var i = 0; i < data.values.categoriesPerRound; i++) {
            data.content.double[i] = {
                category: '',
                answers: [{ val: '' }, { val: '' }, { val: '' }, { val: '' }, { val: '' }],
                questions: [{ val: '' }, { val: '' }, { val: '' }, { val: '' }, { val: '' }],
            };
        }
        data.content.final = {
            category: '',
            answer: '',
            question: ''
        };
    };

    data.changeScore = function (i, team, amt, up) {
        if (up) {
            team.score = parseInt(team.score) + parseInt(amt);
            data.values.teamLeader = i;
        }
        else {
            team.score = parseInt(team.score) - parseInt(amt);
        }
        localStorage.currentContent = JSON.stringify(data.content);
        localStorage.currentValues = JSON.stringify(data.values);
    };

    data.saveCurrent = function () {
        localStorage.currentContent = JSON.stringify(data.content);
        localStorage.currentValues = JSON.stringify(data.values);
    };

    data.init();

    return data;
});