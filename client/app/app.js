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

var templateJSON = configSettings.levelTemplate;
var valueJSON = configSettings.levelValue;

var level = new Level();
level.init(layer, x, y, templateJSON, valueJSON);