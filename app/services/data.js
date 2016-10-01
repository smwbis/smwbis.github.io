/// <reference path="../../scripts/toastr.min.js" />
/// <reference path="../../scripts/jquery.min.js" />
/// <reference path="../../scripts/angular.min.js" />
'use strict';

app.factory('Data', function () {
    var data = {};

    data.values = {};
    data.values.teams = [];
    data.values.numRounds = 2;
    data.values.bonusRound = true;
    data.values.numCategories = 6;
    data.values.numQuestions = 5;
    data.values.numTeams = 3;
    data.values.teamLeader = 0;
    data.values.baseValue = 100;

    data.content = [];

    data.modalContent = {
        content: {},
        category: 'smw',
        value: 999
    };

    data.updateModal = function (content, category, value) {
        data.modalContent.content = content;
        data.modalContent.category = category;
        data.modalContent.value = value;

    };

    toastr.options = {
        "closeButton": false,
        "debug": false,
        "positionClass": "toast-top-right",
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "3000",
        "extendedTimeOut": "1000",
        "showEasing": "linear",
        "hideEasing": "linear",
        "showMethod": "show",
        "hideMethod": "hide"
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

    data.restoreCurrent = function () {
        data.content = JSON.parse(localStorage.currentContent);
        data.values = JSON.parse(localStorage.currentValues);
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
                score: 0,
                active: true,
                wager: 0
            };
        }
    };

    data.init = function () {
        data.updateTeams();
        data.updateContent();
    };

    data.updateContent = function () {
        data.content.length = data.values.numRounds;
        for (var i = 0; i < data.values.numRounds; i++) {
            data.content[i] = {name:'Round ' + (i + 1), categories:[]};
            for (var j = 0; j < data.values.numCategories; j++) {
                data.content[i].categories[j] = {name:'Category ' + (j + 1), content:[]};
                for (var k = 0; k < data.values.numQuestions; k++) {
                    data.content[i].categories[j].content[k] = {
                        q: 'This is a question that takes up room for providing a demo of functionality.',
                        a: 'This is the answer.  You could format it as a question if you would like.',
                        active: true,
                        special: false
                    };
                }
            }
        }
        if (data.values.bonusRound) {
            data.content[data.content.length] = {
                name: 'Bonus Round',
                categories: [{
                    name: 'Bonus Category',
                    content: [{
                        q: 'This is a question that takes up room for providing a demo of functionality.',
                        a: 'This is the answer.  You could format it as a question if you would like.',
                        active: true,
                        special: false
                    }]
                }]
            };
        }
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