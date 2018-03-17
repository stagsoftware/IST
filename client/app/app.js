var ist = angular.module('ist', []);

ist.controller('MainController', function ($scope) {

    var currWsName = "SEARCH";

    $scope.project = new Project();
    $scope.project.init(currWsName, projectTemplateJSON, projectValueJSON);

    $scope.newProject = function() {
        var newProjectValueJSON = $scope.project.save();
        $scope.project = new Project();
        $scope.project.init(currWsName, projectTemplateJSON, newProjectValueJSON);
        //setTimeout($scope.newProject, 10000);
    }

    setTimeout($scope.newProject, 10000);

    $scope.jotting = "";
    $scope.note = "";
    $scope.question = "";

    $scope.addJotting = function () {
        if ($scope.jotting !== "") {
            $scope.project.jottings.push($scope.jotting);
        }
        $scope.jotting = "";
    };

    $scope.addNote = function () {
        if ($scope.note !== "") {
            $scope.project.notes.push($scope.note);
        }
        $scope.note = "";
    };

    $scope.addQuestion = function () {
        if ($scope.question !== "") {
            $scope.project.questions.push({ text: $scope.question, isChecked: false });
        }
        $scope.question = "";
    };

});

