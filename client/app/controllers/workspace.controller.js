
var ist = angular.module('ist');
ist.controller('WorkspaceController', function ($scope, $http, $window, $location, $cookies, $controller, HeaderService, ProjectService) {

  // NOTE: Model values used
  $scope.projects;
  $scope.templateNames;
  $scope.currProject;
  $scope.currSession;
  $scope.currDuration;
  $scope.selectedProject;
  $scope.isProjectOpen = false;
  $scope.userName;
  $scope.project;
  $scope.jotting;
  $scope.note;
  $scope.question;
  $scope.timer;

  HeaderService.wireUpEventHandlers();

  var load = function () {
    ProjectService.loadMenuData().then(function (response) {
      $scope.projects = response.projects;
      $scope.templateNames = response.templateNames;
      $scope.currProject = $scope.projects[0] || {};
      $scope.currSession = "RECON";
      $scope.currDuration = "45";
      $scope.selectedProject = {};
    });
  };

  $scope.userName = $cookies.getObject('UserName');

  $scope.startSession = function () {

    ProjectService.loadProject($scope.currProject.name).then(function (response) {

      $scope.project = new Project();
      $scope.project.init($scope.currSession, response.templateJSON, response.valueJSON);

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
  };

  var saveProjectDetails = function () {
    if ($scope.project) {
      var valueJSON = $scope.project.save();
      ProjectService.saveProjectDetails($scope.currProject.name, valueJSON);
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
      $scope.clear();
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