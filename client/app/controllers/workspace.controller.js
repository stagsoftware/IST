
var ist = angular.module('ist');
ist.controller('WorkspaceController', function ($scope, $http, $window, $location, $cookies, $controller, ProjectService) {

  $scope.projectArray = [
    {
      projectName: "project 1",
      projectDescription: "this is my firtst project",
    },
    {
      projectName: "project 2",
      projectDescription: "this is my second project",
    },
    {
      projectName: "project 3",
      projectDescription: "this is my third project",
    },
    {
      projectName: "project 4",
      projectDescription: "this is my fourth project",
    },
    {
      projectName: "project 5",
      projectDescription: "this is my fifth project",
    },
    {
      projectName: "project 6",
      projectDescription: "this is my sixth project",
    },
    {
      projectName: "project 7",
      projectDescription: "this is my seventh project",
    }
  ];

  $scope.isProjectOpen = false;

  $scope.Name = $cookies.getObject('UserName');

  $scope.openNav = function () {
    document.getElementById("mySidenav").style.width = "550px";
    document.getElementById("mySidenav").style.left = "-310px";
    // document.getElementById("mySidenav").style.marginLeft = "550px";
  };

  $scope.closeNav = function () {
    document.getElementById("mySidenav").style.width = "0";
    // document.getElementById("mySidenav").style.marginLeft= "0";
  };

  $scope.startSession = function () {
    $scope.isProjectOpen = true;
    var currWsName = "SEARCH";

    $scope.template;
    $scope.value;
    $scope.project;

    ProjectService.getTemplate().then(function (response) {
      $scope.template = response.data;

      ProjectService.getValue().then(function (response) {
        $scope.value = response.data;

        ProjectService.getUISettings().then(function (response) {
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
        });
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
  };

  $(document).ready(function () {

    $("#logout").click(function () {
      var Name = $cookies.remove('UserName');
      if ($scope.project) {
        $scope.value = $scope.project.save();
      }
      $location.path('/');
      console.log("logged out");
      $("#myModal").modal("hide");
    });

    $(".jottings-up").click(function () {
      $(".jottings-dropup .dropdown-menu").slideDown("slow");
    });

    $(".jottings-dropdown-header").click(function () {
      $(".jottings-dropup .dropdown-menu").slideUp("slow");
    });

    $(".notes-up").click(function () {
      $(".notes-dropup .dropdown-menu").slideDown("slow");
    });

    $(".notes-dropdown-header").click(function () {
      $(".notes-dropup .dropdown-menu").slideUp("slow");
    });

    $(".questions-up").click(function () {
      $(".questions-dropup .dropdown-menu").slideDown("slow");
    });

    $(".questions-dropdown-header").click(function () {
      $(".questions-dropup .dropdown-menu").slideUp("slow");
    });

  });
  
});