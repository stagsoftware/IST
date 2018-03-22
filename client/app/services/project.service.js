
// NOTE: Uncomment for LOCAL db connection
var ist = angular.module('ist');
ist.service('ProjectService', function ($http) {
    this.getProjects = function () {
        return $http.get("https://gist.githubusercontent.com/shivarajavate/c44b478d73c546ecfb4c68a2c66559d2/raw/62fa256a50c7cf0726a9b1333fd42c94f2d2ca23/projects.json");
    };

    this.getUISettings = function () {
        return $http.get("https://gist.githubusercontent.com/shivarajavate/c44b478d73c546ecfb4c68a2c66559d2/raw/4a4060dd3e63243c8cb8f93a1da5a1b4fc70b21d/UISettings.json");
    };

    this.getTemplate = function () {
        return $http.get("https://gist.githubusercontent.com/shivarajavate/c44b478d73c546ecfb4c68a2c66559d2/raw/45f5aefc8e99aae4935312841f9f219c47c6e0b2/projectTemplate.json");
    };

    this.getValue = function () {
        return $http.get("https://gist.githubusercontent.com/shivarajavate/c44b478d73c546ecfb4c68a2c66559d2/raw/2e405bc2701674c983cf2dbd51a8767d91d4d1ca/projectValue.json");
    };
});


// NOTE: Uncomment for SERVER db connection
// var ist = angular.module('ist');
// ist.service('ProjectService', function ($http) {
//     this.getProjects = function () {
//         return $http.get("/workspace/GetProject");
//     };

//     this.getUISettings = function () {
//         return $http.get("/workspace/GetUISettings");
//     };

//     this.getTemplate = function (templateName) {
//         return $http.get("/workspace/SearchTemplate/" + templateName);
//     };

//     this.getValue = function (projectName) {
//         return $http.get("/workspace/SearchProject/" + projectName);
//     };

//     this.saveProjectDetails = function (projectName, projectDetails) {
//         return $http.put("/workspace/SaveProject/" + projectName, { details: JSON.stringify(projectDetails) });
//     };
// });