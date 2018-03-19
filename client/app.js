var ist = angular.module('ist', ['ngRoute', 'ngCookies']);

ist.config(function ($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: './views/login.html',
        controller: 'LoginController',
    }).when('/workspace', {
        templateUrl: './views/workspace.html',
        controller: 'WorkspaceController'
    });
    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);
});
