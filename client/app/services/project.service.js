
// NOTE: Uncomment for no db connection
// var ist = angular.module('ist');
// ist.service('ProjectService', function ($http) {
//     this.getProjects = function () {
//         return $http.get("https://gist.githubusercontent.com/shivarajavate/c44b478d73c546ecfb4c68a2c66559d2/raw/62fa256a50c7cf0726a9b1333fd42c94f2d2ca23/projects.json");
//     };

//     this.getTemplates = function () {
//         return $http.get("https://gist.githubusercontent.com/shivarajavate/c44b478d73c546ecfb4c68a2c66559d2/raw/b6b929912705028f7519ad35936c22180e9f6405/projectTemplate.json");
//     };

//     this.getUISettings = function () {
//         return $http.get("https://gist.githubusercontent.com/shivarajavate/c44b478d73c546ecfb4c68a2c66559d2/raw/765279d2e5bd5a2be5dcc49522e3213ce3bfbaad/UISettings.json");
//     };

//     this.getTemplate = function () {
//         return $http.get("https://gist.githubusercontent.com/shivarajavate/c44b478d73c546ecfb4c68a2c66559d2/raw/b6b929912705028f7519ad35936c22180e9f6405/projectTemplate.json");
//     };

//     this.getValue = function () {
//         return $http.get("https://gist.githubusercontent.com/shivarajavate/c44b478d73c546ecfb4c68a2c66559d2/raw/2e405bc2701674c983cf2dbd51a8767d91d4d1ca/projectValue.json");
//     };
// });


// NOTE: Uncomment for mongo db connection
var ist = angular.module('ist');
ist.service('ProjectService', function ($http) {
    this.getProjects = function () {
        return $http.get("/workspace/GetProject");
    };

    this.getTemplates = function () {
        return $http.get("/workspace/GetTemplate");
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

    this.addNewProject = function (newProject) {
        return $http.post('/workspace/AddProject', newProject);
    };

});