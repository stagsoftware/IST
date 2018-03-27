
var ist = angular.module('ist');
ist.controller('WorkspaceController', function ($scope, $http, $window, $location, $cookies, $controller, HeaderService, ProjectService) {

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
  $scope.timer;

  var load = function () {
    ProjectService.getProjects().then(function (response) {
      $scope.projects = response.data;
      $scope.selectedProject = $scope.projects[0] || {};
      $scope.selectedSession = "RECON";
      $scope.selectedDuration = "45";
    });
    ProjectService.getTemplates().then(function (response) {
      $scope.tempName = [];
      $scope.templates = response.data;
      for (let m in $scope.templates) {
        $scope.tempName.push($scope.templates[m].name);
      }
    });
  };

  $(document).ready(function () {

    $("#logout").click(function () {
      var userName = $cookies.remove('UserName');
      saveProjectDetails();
      $location.path('/');
      console.log("logged out");
      $("#myModal").modal("hide");
    });

    $('#hamburgerCheckBox').change(function () {
      if ($('#hamburgerCheckBox').is(":checked")) {
        $('#myModal').modal('show');
      } else {
        $('#myModal').modal('hide');
      }
    });

    $('#myModal').on('hidden.bs.modal', function () {
      $('#hamburgerCheckBox').prop('checked', false).change();
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

  $scope.startSession = function () {

    ProjectService.getValue($scope.selectedProject.name).then(function (response) {
      // NOTE: Uncomment for LOCAL db connection
      // $scope.value = response.data[0].details;
      // NOTE: Uncomment for SERVER db connection
      $scope.value = JSON.parse(response.data[0].details);
      var templateName = response.data[0].templateName;

      ProjectService.getTemplate(templateName).then(function (response) {
        // NOTE: Uncomment for LOCAL db connection
        // $scope.template = response.data[0].value;
        // NOTE: Uncomment for SERVER db connection
        $scope.template = JSON.parse(response.data[0].value);

        ProjectService.getUISettings().then(function (response) {
          // NOTE: Uncomment for LOCAL db connection
          // UISettings = response.data[0].value;
          // NOTE: Uncomment for SERVER db connection
          UISettings = JSON.parse(response.data[0].value);

          UISettings.getSessionConfig = function (manualConfig, styleConfigID) {
            var config = Object.assign({}, manualConfig, UISettings.Styles.Session[styleConfigID]);
            config.x = config.x + (config.strokeWidth ? ((config.strokeWidth) / 2) : 0);
            config.y = config.y + (config.strokeWidth ? ((config.strokeWidth) / 2) : 0);
            config.width = config.width - ((config.strokeWidth) || 0);
            config.height = config.height - ((config.strokeWidth) || 0);
            // if (config.text) {
            //   config.padding = ((config.height > config.width ? config.width : config.height) - config.fontSize) / 2;
            // }
            return config;
          }

          UISettings.getLevelConfig = function (manualConfig, styleConfigID) {
            var config = Object.assign({}, manualConfig, UISettings.Styles.Level[styleConfigID]);
            config.x = config.x + (config.strokeWidth ? ((config.strokeWidth) / 2) : 0);
            config.y = config.y + (config.strokeWidth ? ((config.strokeWidth) / 2) : 0);
            config.width = config.width - ((config.strokeWidth) || 0);
            config.height = config.height - ((config.strokeWidth) || 0);
            // if (config.text) {
            //   config.padding = ((config.height > config.width ? config.width : config.height) - config.fontSize) / 2;
            // }
            return config;
          }

          UISettings.getSectionConfig = function (manualConfig, styleConfigID) {
            var config = Object.assign({}, manualConfig, UISettings.Styles.Section[styleConfigID]);
            config.x = config.x + (config.strokeWidth ? ((config.strokeWidth) / 2) : 0);
            config.y = config.y + (config.strokeWidth ? ((config.strokeWidth) / 2) : 0);
            config.width = config.width - ((config.strokeWidth) || 0);
            config.height = config.height - ((config.strokeWidth) || 0);
            // if (config.text) {
            //   config.padding = ((config.height > config.width ? config.width : config.height) - config.fontSize) / 2;
            // }
            return config;
          }

          CanvasX = 0;
          CanvasY = 0;

          CanvasWidth = window.screen.availWidth; // - (window.outerWidth - window.innerWidth);
          //CanvasHeight = window.screen.availHeight - (window.outerHeight - window.innerHeight) - ($('header').height() + $('footer').height());
          CanvasHeight = $('section.workspace-main').height();

          SessionSettings = UISettings.Properties.Session;
          WorkspaceSettings = UISettings.Properties.Workspace;
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

          $scope.project = new Project();
          $scope.project.init($scope.selectedSession, $scope.template, $scope.value);

          HeaderService.startTimer();
          HeaderService.startCountDown($scope.selectedDuration);
          $scope.timer = HeaderService.timer;

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

          $scope.isProjectOpen = true;

        });
      });
    });
  };

  var saveProjectDetails = function () {
    if ($scope.project) {
      $scope.value = $scope.project.save();
      ProjectService.saveProjectDetails($scope.selectedProject.name, $scope.value).then(function (response) { });
    }
  };

  $scope.addNewProject = function () {
    $scope.pro.details = JSON.stringify({});
    $http.post('/workspace/AddProject', $scope.pro).then(function (response) {
      console.log('Data Saved Successfully');
    });
    load();
    $scope.pro = {};
  }

  $scope.cloneProject = function (pro) {
    $scope.add = true;
    $scope.clone = true;
    $scope.modify = false;
    ProjectService.getValue(pro.name).then(function (response) {
      $scope.myprojectDetails = response.data[0].details;
      $scope.pro = {
        name: response.data[0].name + "(Copy)",
        description: response.data[0].description,
        templateName: response.data[0].templateName
      }
      document.getElementById('tempname').disabled = true;
    });
  }

  $scope.modifyProject = function (pro) {
    $scope.add = true;
    $scope.clone = false;
    $scope.modify = true;
    ProjectService.getValue(pro.name).then(function (response) {
      $scope.pro = {
        _id: response.data[0]._id,
        name: response.data[0].name,
        description: response.data[0].description,
        templateName: response.data[0].templateName,
      }
      document.getElementById('tempname').disabled = true;
    });
  }

  $scope.addClonedProject = function () {
    $scope.pro.details = $scope.myprojectDetails;
    $http.post('/workspace/AddProject', $scope.pro).then(function (response) {
      console.log('Data Saved Successfully');
      load();
    });
    $scope.pro = {};
  }

  $scope.addModifiedProject = function () {
    $http.put("/workspace/UpdateProject/" + $scope.pro._id, $scope.pro).then(function (response) {
      console.log('Data updated Successfully');
      load();
    });
    $scope.pro = {};
  }


  $scope.abort = function () {
    $scope.pro = {};
    $scope.add = false;
    $scope.clone = false;
    $scope.modify = false;
    document.getElementById('tempname').disabled = false;
  }

  $scope.deleteProject = function () {
    $http.delete('/workspace/DeleteProject/' + $scope.projectName).then(function (response) {
      console.log('project Removed Successfully');
      load();
    });
  }

  $scope.Delete = function (pro) {
    $scope.projectName = pro.name;
  }

  load();
});