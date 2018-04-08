
var ist = angular.module('ist', ['ngRoute', 'ngCookies']);
ist.config(function ($routeProvider, $locationProvider) {
    // $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix("");
    $routeProvider.when('/login', {
        templateUrl: './views/login.html',
        controller: 'LoginController',
    }).when('/workspace', {
        templateUrl: './views/workspace.html',
        controller: 'WorkspaceController'
    }).otherwise({ redirectTo: '/login' });
});