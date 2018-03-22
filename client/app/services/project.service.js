
// NOTE: Uncomment for LOCAL db connection
// var ist = angular.module('ist');
// ist.service('ProjectService', function ($http) {
//     this.getUISettings = function () {
//         return $http.get("https://gist.githubusercontent.com/shivarajavate/c44b478d73c546ecfb4c68a2c66559d2/raw/2398b8cda88d418e42543ece0358c72ff7293707/UISettings.json");
//     };
//     this.getTemplate = function () {
//         return $http.get("https://gist.githubusercontent.com/shivarajavate/c44b478d73c546ecfb4c68a2c66559d2/raw/2398b8cda88d418e42543ece0358c72ff7293707/projectTemplate.json");
//     };
//     this.getValue = function () {
//         return $http.get("https://gist.githubusercontent.com/shivarajavate/c44b478d73c546ecfb4c68a2c66559d2/raw/2398b8cda88d418e42543ece0358c72ff7293707/projectValue.json");
//     };
// });


// NOTE: Uncomment for SERVER db connection
var ist = angular.module('ist');
ist.service('ProjectService', function ($http) {
    this.getProjects = function () {
        return $http.get("/workspace/GetProject");
    };

    this.getUISettings = function () {
        return $http.get("/workspace/GetUISettings");
    };

    this.getTemplate = function (templateName) {
        return $http.get("/workspace/SearchTemplate/" + templateName);
    };

    this.getValue = function (projectName) {
        return $http.get("/workspace/SearchProject/" + projectName);
    };

    this.saveProjectDetails = function (projectName, projectDetails) {
        return $http.put("/workspace/SaveProject/" + projectName, { details: JSON.stringify(projectDetails) });
    };
});