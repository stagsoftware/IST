var ist = angular.module('ist', ['ngRoute', 'ngCookies']);

ist.config(function ($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: './app/views/login.html',
        controller: 'LoginController',
    }).when('/workspace', {
        templateUrl: './app/views/workspace.html',
        controller: 'WorkspaceController'
    }).otherwise({ redirectTo: '/' });
    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});
