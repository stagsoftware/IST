class Level {
    constructor() {

        this.layer;
        this.x;
        this.y;

        this.model;
        this.view;
        this.controller;
    }

    init(layer, x, y, templateJSON, valueJSON) {

        this.layer = layer;
        this.x = x;
        this.y = y;

        this.levelNumber = templateJSON.number;
        this.levelName = templateJSON.name;
        this.sectionTemplates = templateJSON.section;
        this.sectionCollection = valueJSON;

        // 1. Create level model and load it up
        this.model = new LevelModel();
        // Load up the JSON from the persistent source.
        this.model.init(this.sectionCollection); // levelJSON === emptyArray => new Workspace

        // 2. Create the view and populate valueJSON
        this.view = new LevelView();
        this.view.init(layer, x, y, this.levelNumber, this.levelName, this.sectionTemplates, valueJSON);

        // 3. Setup the controller to mediate between 'model' and 'view'
        this.controller = new LevelController();
        this.controller.init(this.model, this.view);

        // 4. Now wire up the view events to be handled by this controller
        this.view.scrollLeftButtonText.on("click", this.controller.scrollLeft.bind(this.controller));
        this.view.scrollRightButtonText.on("click", this.controller.scrollRight.bind(this.controller));

        // 5. Display the view
        this.view.makeVisible(true);

    }

}