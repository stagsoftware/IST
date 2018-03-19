
var ist = angular.module('ist');
ist.controller('ProjectController', function ($scope, ProjectService) {

    var currWsName = "SEARCH";

    $scope.template;
    $scope.value;
    $scope.project;

    ProjectService.getTemplate.then(function(response) {
        $scope.template = response.data;

        ProjectService.getValue.then(function(response) {
            $scope.value = response.data;

            ProjectService.getUISettings.then(function(response) {
                UISettings = response.data;

                UISettings.getSessionConfig = function (manualConfig, styleConfigID) {
                    return Object.assign({}, manualConfig, UISettings.Styles.Session[styleConfigID]);
                }
                
                UISettings.getLevelConfig = function (manualConfig, styleConfigID) {
                    return Object.assign({}, manualConfig, UISettings.Styles.Level[styleConfigID]);
                }
                
                UISettings.getSectionConfig = function (manualConfig, styleConfigID) {
                    return Object.assign({}, manualConfig, UISettings.Styles.Section[styleConfigID]);
                }
                
                CanvasX = 0;
                CanvasY = 0;
                
                //const CanvasMinWidth = 1000;
                //const CanvasMinHeight = 800;
                //const CanvasWidth = (window.innerWidth > CanvasMinWidth) ? window.innerWidth : CanvasMinWidth;
                //const CanvasHeight = (window.innerHeight > CanvasMinHeight) ? window.innerHeight : CanvasMinHeight;
                
                CanvasWidth = window.screen.availWidth; // - (window.outerWidth - window.innerWidth);
                CanvasHeight = window.screen.availHeight - (window.outerHeight - window.innerHeight);
                
                SessionSettings = UISettings.Properties.Session;
                LevelSettings = UISettings.Properties.Level;
                SectionSettings = UISettings.Properties.Section;
                
                SessionWidth = (CanvasWidth)
                    * (SessionSettings.skeleton.wPct / 100);
                SessionHeight = (CanvasHeight)
                    * (SessionSettings.skeleton.hPct / 100);
                
                LevelWidth = (CanvasWidth)
                    * (SessionSettings.skeleton.wPct / 100)
                    * (LevelSettings.skeleton.wPct / 100);
                LevelHeight = (CanvasHeight)
                    * (SessionSettings.skeleton.hPct / 100)
                    * (LevelSettings.skeleton.hPct / 100);
                
                SectionWidth = (CanvasWidth)
                    * (SessionSettings.skeleton.wPct / 100)
                    * (LevelSettings.skeleton.wPct / 100)
                    * (SectionSettings.skeleton.wPct / 100);
                SectionHeight = (CanvasHeight)
                    * (SessionSettings.skeleton.hPct / 100)
                    * (LevelSettings.skeleton.hPct / 100)
                    * (SectionSettings.skeleton.hPct / 100);

                $scope.project = new Project();
                $scope.project.init(currWsName, $scope.template, $scope.value);
            })
            
        });
    });

    // $scope.newProject = function() {
    //     var newProjectValueJSON = $scope.project.save();
    //     $scope.project = new Project();
    //     $scope.project.init(currWsName, projectTemplateJSON, newProjectValueJSON);
    //     //setTimeout($scope.newProject, 10000);
    // }

    //setTimeout($scope.newProject, 10000);

    $scope.jotting = "";
    $scope.note = "";
    $scope.question = {
        text: "",
        isChecked: false
    };

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
        if ($scope.question.text !== "") {
            $scope.project.questions.push($scope.question);
        }
        $scope.question = {
            text: "",
            isChecked: false
        };
    };

});
