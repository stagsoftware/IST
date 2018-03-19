
var ist = angular.module('ist');
ist.controller('LoginController', function ($scope, $http, $window, $location, $cookies) {

    $scope.title = applicationSettings.loginPageTitle;

    $scope.loginCall = function () {
        console.log("in here");
        $http.post(applicationSettings.publicRepositoryServer, {
            username: $scope.userName,
            password: $scope.password,
        }).then(function onSuccess(response) {
            console.log(response);

            if (response.status === 200) {
                $scope.publicToken = response.data.token
            }

            $window.localStorage.setItem('publicToken', response.data.token);
            $window.localStorage.setItem('userName', response.data.user_display_name);
            $window.localStorage.setItem('userEmail', response.data.user_email);

            $cookies.putObject('UserName', response.data.user_display_name);
            // $window.location = applicationSettings.ISTWorkspaceLocation;
            $location.path(applicationSettings.ISTWorkspaceLocation);

        }, function onError(response) {
            $scope.error = stringsJson.loginErrorMessage;

        });
        return true;
    }

    $scope.loginFormSubmit = function (user) {
        console.log(user);
        if (user) {
            $scope.error = '';
            $scope.userName = user.name;
            $scope.password = user.password;
            $scope.loginCall();
        }
        else {
            $scope.error = stringsJson.loginErrorMessage;
        }
    }
});


