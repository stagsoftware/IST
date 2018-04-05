
var ist = angular.module('ist');
ist.service('ProjectService', function ($http) {
    function getProjects() {
        // NOTE: Uncomment for no db connection
        return $http.get("/assets/data/projects.json");
        // NOTE: Uncomment for mongo db connection
        // return $http.get("/workspace/GetProject");
    };

    function getTemplates() {
        // NOTE: Uncomment for no db connection
        return $http.get("/assets/data/templates.json");
        // NOTE: Uncomment for mongo db connection
        // return $http.get("/workspace/GetTemplate");
    };

    function loadMenuData() {
        return getProjects().then(function (response) {
            var projects = response.data;

            return getTemplates().then(function (response) {
                var templates = response.data;
                var templateNames = templates.map(template => template.name);
                return {
                    projects: projects,
                    templateNames: templateNames
                }
            })
        });
    };

    function loadProject(projectName) {
        return getValue(projectName).then(function (response) {
            // NOTE: Uncomment for no db connection
            var value = response.data[0].details;
            // NOTE: Uncomment for mongo db connection
            // var value = JSON.parsem(response.data[0].details);

            var templateName = response.data[0].templateName;

            return getTemplate(templateName).then(function (response) {
                // NOTE: Uncomment for no db connection
                var template = response.data[0].value;
                // NOTE: Uncomment for mongo db connection
                // var template = JSON.parse(response.data[0].value);

                return getUISettings().then(function (response) {
                    // NOTE: Uncomment for no db connection
                    UISettings = response.data[0].value;
                    // NOTE: Uncomment for mongo db connection
                    // UISettings = JSON.parse(response.data[0].value);

                    UISettings.getSessionConfig = function (manualConfig, styleConfigID) {
                        var config = Object.assign({}, manualConfig, UISettings.Styles.Session[styleConfigID]);
                        config.x = config.x + (config.strokeWidth ? ((config.strokeWidth) / 2) : 0);
                        config.y = config.y + (config.strokeWidth ? ((config.strokeWidth) / 2) : 0);
                        config.width = config.width - ((config.strokeWidth) || 0);
                        config.height = config.height - ((config.strokeWidth) || 0);
                        switch (config.verticalAlign) {
                            case "top":
                                config.y = config.y;
                                break;
                            case "center":
                                config.y = config.y + (config.height / 2) - (config.fontSize / 2);
                                break;
                            case "bottom":
                                config.y = config.y + config.height - config.fontSize;
                                break;
                        }
                        return config;
                    };

                    UISettings.getLevelConfig = function (manualConfig, styleConfigID) {
                        var config = Object.assign({}, manualConfig, UISettings.Styles.Level[styleConfigID]);
                        config.x = config.x + (config.strokeWidth ? ((config.strokeWidth) / 2) : 0);
                        config.y = config.y + (config.strokeWidth ? ((config.strokeWidth) / 2) : 0);
                        config.width = config.width - ((config.strokeWidth) || 0);
                        config.height = config.height - ((config.strokeWidth) || 0);
                        switch (config.verticalAlign) {
                            case "top":
                                config.y = config.y;
                                break;
                            case "center":
                                config.y = config.y + (config.height / 2) - (config.fontSize / 2);
                                break;
                            case "bottom":
                                config.y = config.y + config.height - config.fontSize;
                                break;
                        }
                        return config;
                    };

                    UISettings.getSectionConfig = function (manualConfig, styleConfigID) {
                        var config = Object.assign({}, manualConfig, UISettings.Styles.Section[styleConfigID]);
                        config.x = config.x + (config.strokeWidth ? ((config.strokeWidth) / 2) : 0);
                        config.y = config.y + (config.strokeWidth ? ((config.strokeWidth) / 2) : 0);
                        config.width = config.width - ((config.strokeWidth) || 0);
                        config.height = config.height - ((config.strokeWidth) || 0);
                        switch (config.verticalAlign) {
                            case "top":
                                config.y = config.y;
                                break;
                            case "center":
                                config.y = config.y + (config.height / 2) - (config.fontSize / 2);
                                break;
                            case "bottom":
                                config.y = config.y + config.height - config.fontSize;
                                break;
                        }
                        return config;
                    };

                    CanvasX = 0;
                    CanvasY = 0;

                    CanvasWidth = window.screen.availWidth; // - (window.outerWidth - window.innerWidth);
                    //CanvasHeight = window.screen.availHeight - (window.outerHeight - window.innerHeight) - ($('header').height() + $('footer').height());
                    CanvasHeight = $('section.workspace-main').height();

                    SessionSettings = UISettings.Properties.Session;
                    WorkspaceSettings = UISettings.Properties.Workspace;
                    LevelSettings = UISettings.Properties.Level;
                    SectionSettings = UISettings.Properties.Section;

                    SessionWidth = (CanvasWidth)
                        * (SessionSettings.skeleton.wPct / 100);
                    SessionHeight = (CanvasHeight)
                        * (SessionSettings.skeleton.hPct / 100);

                    LevelWidth = (CanvasWidth)
                        * (SessionSettings.skeleton.wPct / 100)
                        * (LevelSettings.skeleton.wPct / 100);
                    LevelHeight = (CanvasHeight)
                        * (SessionSettings.skeleton.hPct / 100)
                        * (LevelSettings.skeleton.hPct / 100);

                    return {
                        valueJSON: value,
                        templateJSON: template
                    };
                });

            });
        });
    };

    function getUISettings() {
        // NOTE: Uncomment for no db connection
        return $http.get("/assets/data/ui.settings.json");
        // NOTE: Uncomment for mongo db connection
        // return $http.get("/workspace/GetUISettings");
    };

    function getTemplate(templateName) {
        // NOTE: Uncomment for no db connection
        return $http.get("/assets/data/project.template.json");
        // NOTE: Uncomment for mongo db connection
        // return $http.get("/workspace/SearchTemplate/" + templateName);
    };

    function getValue(projectName) {
        // NOTE: Uncomment for no db connection
        return $http.get("/assets/data/project.value.json");
        // NOTE: Uncomment for mongo db connection
        // return $http.get("/workspace/SearchProject/" + projectName);
    };

    function saveProjectDetails(projectName, projectDetails) {
        return $http.put("/workspace/SaveProject/" + projectName, { details: JSON.stringify(projectDetails) });
    };

    function addNewProject(newProject) {
        return $http.post('/workspace/AddProject', newProject);
    };

    return {
        loadMenuData: loadMenuData,
        loadProject: loadProject,
        getUISettings: getUISettings,
        getTemplate: getTemplate,
        getValue: getValue,
        saveProjectDetails: saveProjectDetails,
        addNewProject: addNewProject
    }

});