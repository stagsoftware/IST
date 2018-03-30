
var ist = angular.module('ist');
ist.controller('WorkspaceController', function ($scope, $http, $window, $location, $cookies, $controller, HeaderService, ProjectService) {

  // NOTE: Model values used
  $scope.projects;
  $scope.currProject;
  $scope.currSession;
  $scope.currDuration;
  $scope.isProjectOpen = false;
  $scope.userName;
  $scope.template;
  $scope.value;
  $scope.project;
  $scope.jotting;
  $scope.note;
  $scope.question;
  $scope.timer;
  $scope.selectedProject;

  HeaderService.wireUpEventHandlers();

  var load = function () {
    ProjectService.getProjects().then(function (response) {
      $scope.projects = response.data;
      $scope.currProject = $scope.projects[0] || {};
      $scope.currSession = "RECON";
      $scope.currDuration = "45";
    });
    ProjectService.getTemplates().then(function (response) {
      $scope.tempName = [];
      $scope.templates = response.data;
      for (let m in $scope.templates) {
        $scope.tempName.push($scope.templates[m].name);
      }
    });
    $scope.selectedProject = {};
  };

  $scope.userName = $cookies.getObject('UserName');

  $scope.startSession = function () {

    ProjectService.getValue($scope.currProject.name).then(function (response) {
      // NOTE: Uncomment for no db connection
      $scope.value = response.data[0].details;
      // NOTE: Uncomment for mongo db connection
      // $scope.value = JSON.parse(response.data[0].details);

      var templateName = response.data[0].templateName;

      ProjectService.getTemplate(templateName).then(function (response) {
        // NOTE: Uncomment for no db connection
        $scope.template = response.data[0].value;
        // NOTE: Uncomment for mongo db connection
        // $scope.template = JSON.parse(response.data[0].value);

        ProjectService.getUISettings().then(function (response) {
          // NOTE: Uncomment for no db connection
          UISettings = response.data[0].value;
          // NOTE: Uncomment for mongo db connection
          // UISettings = JSON.parse(response.data[0].value);

          UISettings.getSessionConfig = function (manualConfig, styleConfigID) {
            var config = Object.assign({}, manualConfig, UISettings.Styles.Session[styleConfigID]);
            config.x = config.x + (config.strokeWidth ? ((config.strokeWidth) / 2) : 0);
            config.y = config.y + (config.strokeWidth ? ((config.strokeWidth) / 2) : 0);
            config.width = config.width - ((config.strokeWidth) || 0);
            config.height = config.height - ((config.strokeWidth) || 0);
            switch (config.verticalAlign) {
              case "top":
                config.y = config.y;
                break;
              case "center":
                config.y = config.y + (config.height / 2) - (config.fontSize / 2);
                break;
              case "bottom":
                config.y = config.y + config.height - config.fontSize;
                break;
            }
            return config;
          };

          UISettings.getLevelConfig = function (manualConfig, styleConfigID) {
            var config = Object.assign({}, manualConfig, UISettings.Styles.Level[styleConfigID]);
            config.x = config.x + (config.strokeWidth ? ((config.strokeWidth) / 2) : 0);
            config.y = config.y + (config.strokeWidth ? ((config.strokeWidth) / 2) : 0);
            config.width = config.width - ((config.strokeWidth) || 0);
            config.height = config.height - ((config.strokeWidth) || 0);
            switch (config.verticalAlign) {
              case "top":
                config.y = config.y;
                break;
              case "center":
                config.y = config.y + (config.height / 2) - (config.fontSize / 2);
                break;
              case "bottom":
                config.y = config.y + config.height - config.fontSize;
                break;
            }
            return config;
          };

          UISettings.getSectionConfig = function (manualConfig, styleConfigID) {
            var config = Object.assign({}, manualConfig, UISettings.Styles.Section[styleConfigID]);
            config.x = config.x + (config.strokeWidth ? ((config.strokeWidth) / 2) : 0);
            config.y = config.y + (config.strokeWidth ? ((config.strokeWidth) / 2) : 0);
            config.width = config.width - ((config.strokeWidth) || 0);
            config.height = config.height - ((config.strokeWidth) || 0);
            switch (config.verticalAlign) {
              case "top":
                config.y = config.y;
                break;
              case "center":
                config.y = config.y + (config.height / 2) - (config.fontSize / 2);
                break;
              case "bottom":
                config.y = config.y + config.height - config.fontSize;
                break;
            }
            return config;
          };

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
          $scope.project.init($scope.currSession, $scope.template, $scope.value);

          HeaderService.startTimer();
          HeaderService.startCountDown($scope.currDuration);
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
      ProjectService.saveProjectDetails($scope.currProject.name, $scope.value).then(function (response) { });
    }
  };

  var projectExists = function () {
    return $scope.projects.find((project) => project.name === $scope.selectedProject.name) ? true : false;
  };

  $scope.addNewProject = function () {
    $scope.deletemessage = false;
    if ($scope.selectedProject.name && $scope.selectedProject.templateName) {
      $scope.incompletemessage = false;
      if (!projectExists()) {
        $scope.alertmessage = false;
        $scope.selectedProject.details = JSON.stringify({});
        ProjectService.addNewProject($scope.selectedProject).then(function (response) {
          console.log('Data Saved Successfully');
          load();
        });
      }
      else {
        $scope.alertmessage = true;
      }

    }
    else {
      $scope.incompletemessage = true;
      $scope.alertmessage = false;
    }
    $scope.selectedProject = {};
  }

  $scope.cloneProject = function (selectedProject) {
    $scope.add = true;
    $scope.clone = true;
    $scope.modify = false;
    $scope.incompletemessage = false;
    $scope.alertmessage = false;
    $scope.deletemessage = false;
    ProjectService.getValue(selectedProject.name).then(function (response) {
      $scope.myprojectDetails = response.data[0].details;
      $scope.selectedProject = {
        name: response.data[0].name + "(Copy)",
        description: response.data[0].description,
        templateName: response.data[0].templateName
      }
      document.getElementById('tempname').disabled = true;
    });
  }

  $scope.modifyProject = function (selectedProject) {
    $scope.add = true;
    $scope.clone = false;
    $scope.modify = true;
    $scope.incompletemessage = false;
    $scope.alertmessage = false;
    $scope.deletemessage = false;
    ProjectService.getValue(selectedProject.name).then(function (response) {
      $scope.selectedProject = {
        _id: response.data[0]._id,
        name: response.data[0].name,
        description: response.data[0].description,
        templateName: response.data[0].templateName,
      }
      document.getElementById('tempname').disabled = true;
    });
  }

  $scope.addClonedProject = function () {
    $scope.deletemessage = false;
    if ($scope.selectedProject.name && $scope.selectedProject.templateName) {
      $scope.incompletemessage = false;

      if (!projectExists()) {
        $scope.alertmessage = false;
        $scope.selectedProject.details = $scope.myprojectDetails;
        $http.post('/workspace/AddProject', $scope.selectedProject).then(function (response) {
          console.log('Data Saved Successfully');
          load();
        });
      }
      else {
        $scope.alertmessage = true;
      }
    }
    else {
      $scope.incompletemessage = true;
      $scope.alertmessage = false;
    }
    $scope.selectedProject = {};
    document.getElementById('tempname').disabled = false;
  }

  $scope.addModifiedProject = function () {
    $scope.deletemessage = false;
    if ($scope.selectedProject.name && $scope.selectedProject.templateName) {
      $scope.incompletemessage = false;
      if (!projectExists()) {
        $scope.alertmessage = false;
        $http.put("/workspace/UpdateProject/" + $scope.selectedProject._id, $scope.selectedProject).then(function (response) {
          console.log('Data updated Successfully');
          load();
        });
      }
      else {
        $scope.alertmessage = true;
      }
    }
    else {
      $scope.incompletemessage = true;
      $scope.alertmessage = false;
    }
    $scope.selectedProject = {};
    document.getElementById('tempname').disabled = false;
  }

  $scope.abort = function () {
    $scope.incompletemessage = false;
    $scope.deletemessage = false;
    $scope.alertmessage = false;
    $scope.selectedProject = {};
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

  $scope.Delete = function (selectedProject) {
    $scope.deletemessage = true;
    $scope.incompletemessage = false;
    $scope.alertmessage = false;
    $scope.projectName = selectedProject.name;
  }

  $scope.logout = function () {
    var userName = $cookies.remove('UserName');
    saveProjectDetails();
    $location.path('/');
  };

  $scope.clear = function () {
    $scope.deletemessage = false;
  };

  load();
});