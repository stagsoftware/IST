
var ist = angular.module('ist');
ist.controller('WorkspaceController', function ($scope, $http, $window, $location, $cookies, $controller, ProjectService) {

  // NOTE: Model values used
  $scope.projects;
  $scope.selectedProject;
  $scope.selectedSession;
  $scope.selectedDuration;
  $scope.isProjectOpen = false;
  $scope.userName;
  $scope.template;
  $scope.value;
  $scope.project;
  $scope.jotting;
  $scope.note;
  $scope.question;

  var load = function () {
    ProjectService.getProjects().then(function (response) {
      $scope.projects = response.data;
      $scope.selectedProject = $scope.projects[0] || {};
      $scope.selectedSession = "RECON";
      $scope.selectedDuration = "45";
    });
  }

  $(document).ready(function () {

    $("#logout").click(function () {
      var userName = $cookies.remove('UserName');
      saveProjectDetails();
      $location.path('/');
      console.log("logged out");
      $("#myModal").modal("hide");
    });

    $(".jottings-dropup-header").click(function () {
      $(".jottings-dropup .dropdown-menu").slideDown("slow");
    });

    $(".jottings-dropdown-header").click(function () {
      $(".jottings-dropup .dropdown-menu").slideUp("slow");
    });

    $(".notes-dropup-header").click(function () {
      $(".notes-dropup .dropdown-menu").slideDown("slow");
    });

    $(".notes-dropdown-header").click(function () {
      $(".notes-dropup .dropdown-menu").slideUp("slow");
    });

    $(".questions-dropup-header").click(function () {
      $(".questions-dropup .dropdown-menu").slideDown("slow");
    });

    $(".questions-dropdown-header").click(function () {
      $(".questions-dropup .dropdown-menu").slideUp("slow");
    });

  });

  $scope.userName = $cookies.getObject('UserName');

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

    ProjectService.getValue($scope.selectedProject.name).then(function (response) {
      $scope.value = JSON.parse(response.data[0].details);
      var templateName = response.data[0].templateName;

      ProjectService.getTemplate(templateName).then(function (response) {
        $scope.template = JSON.parse(response.data[0].value);

        ProjectService.getUISettings().then(function (response) {
          UISettings = JSON.parse(response.data[0].value);

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
          //CanvasHeight = window.screen.availHeight - (window.outerHeight - window.innerHeight) - ($('header').height() + $('footer').height());
          CanvasHeight = $('section.workspace-main').height();

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
          $scope.project.init($scope.selectedSession, $scope.template, $scope.value);

          $scope.isProjectOpen = true;
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

  var saveProjectDetails = function () {
    if ($scope.project) {
      $scope.value = $scope.project.save();
      ProjectService.saveProjectDetails($scope.selectedProject.name, $scope.value).then(function (response) { });
    }
  };

  load();
});