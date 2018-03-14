// Create the stage for canvas display
var stage = new Konva.Stage({
    container: 'container', // id of container <div>
    width: window.innerWidth,
    height: window.innerHeight
});

// then create layer
var layer = new Konva.Layer();
stage.add(layer);

// Load up the WS template into templateJSON
// Right now setup a templateJSON variable here
// Right now setup a valueJSON variable here

// Set (x,y) for the section to be displayed 
// Right now harcode (x,y) to (0,0)
var x = 0;
var y = 0;

var projectName = projectJSON.name;
//var workspaceName = "RECON";
var workspaceName = "SEARCH";
var valueJSON = projectJSON.value;

var workspace = new Workspace();
workspace.init(layer, x, y, workspaceName, templateJSON, valueJSON);

//var workspaceName = "SEARCH";
//var workspace = new Workspace();
//workspace.init(layer, x, y, workspaceName, templateJSON, valueJSON);
