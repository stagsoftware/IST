
var ist = angular.module('ist');
ist.service('ProjectService', function ($http) {
    this.getProjects = function () {
        // NOTE: Uncomment for no db connection
        // return $http.get("/public/data/projects.json");
        // NOTE: Uncomment for mongo db connection
        return $http.get("/workspace/GetProject");
    };

    this.getTemplates = function () {
        // NOTE: Uncomment for no db connection
        // return $http.get("/public/data/templates.json");
        // NOTE: Uncomment for mongo db connection
        return $http.get("/workspace/GetTemplate");
    };

    this.getUISettings = function () {
        // NOTE: Uncomment for no db connection
        return $http.get("/public/data/ui.settings.json");
        // NOTE: Uncomment for mongo db connection
        // return $http.get("/workspace/GetUISettings");
    };

    this.getTemplate = function (templateName) {
        // NOTE: Uncomment for no db connection
        // return $http.get("/public/data/project.template.json");
        // NOTE: Uncomment for mongo db connection
        return $http.get("/workspace/SearchTemplate/" + templateName);
    };

    this.getValue = function (projectName) {
        // NOTE: Uncomment for no db connection
        // return $http.get("/public/data/project.value.json");
        // NOTE: Uncomment for mongo db connection
        return $http.get("/workspace/SearchProject/" + projectName);
    };

    this.saveProjectDetails = function (projectName, projectDetails) {
        return $http.put("/workspace/SaveProject/" + projectName, { details: JSON.stringify(projectDetails) });
    };

    this.addNewProject = function (newProject) {
        return $http.post('/workspace/AddProject', newProject);
    };

});