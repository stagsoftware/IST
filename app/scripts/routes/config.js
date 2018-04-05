
var ist = angular.module('ist', ['ngRoute', 'ngCookies']);
ist.config(function ($routeProvider, $locationProvider) {
    $routeProvider.when('/login', {
        templateUrl: './views/login.html',
        controller: 'LoginController',
    }).when('/workspace', {
        templateUrl: './views/workspace.html',
        controller: 'WorkspaceController'
    }).otherwise({ redirectTo: '/login' });
});