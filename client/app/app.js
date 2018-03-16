var wsName = "SEARCH";

var project = new Project();
project.init(wsName, templateJSON, projectJSON);

var newProjectJSON = project.save();

setTimeout(function() {
    var project = new Project();
    project.init(wsName, templateJSON, newProjectJSON);
}, 5000);

