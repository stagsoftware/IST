
var ist = angular.module('ist');
ist.controller('WorkspaceController', function ($scope, $http, $window, $location, $cookies, $controller) {

  $scope.projectArray = [{
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
  }, {
    projectName: "project 5",
    projectDescription: "this is my fifth project",
  }, {
    projectName: "project 6",
    projectDescription: "this is my sixth project",
  }, {
    projectName: "project 7",
    projectDescription: "this is my seventh project",
  }];
  console.log($scope.projectArray);

  $scope.isProjectOpen = false;

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

  });
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
    $controller('ProjectController', { $scope: $scope });
  };
});