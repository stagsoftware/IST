class Level {
    constructor() {

        this.layer;
        this.x;
        this.y;

        this.model;
        this.view;
        this.controller;

        this.levelNumber;
        this.levelName;
        this.sectionTemplates;
        this.sectionDetails;
    }

    init(layer, x, y, wsName, templateJSON, valueJSON) {

        this.layer = layer;
        this.x = x;
        this.y = y;

        this.levelNumber = templateJSON.number;
        this.levelName = templateJSON.name;
        this.sectionTemplates = templateJSON.sections;
        this.sectionDetails = valueJSON.value;

        // 2. Create the view and populate sectionCollection
        this.view = new LevelView();
        this.view.init(layer, x, y, wsName, this.levelNumber, this.levelName, this.sectionTemplates, this.sectionDetails);

        // 3. Setup the controller to mediate between 'model' and 'view'
        this.controller = new LevelController();
        this.controller.init(this.model, this.view);

        // 4. Now wire up the view events to be handled by this controller
        this.view.headerView.scrollLeftButtonText.on("click", this.controller.scrollLeft.bind(this.controller));
        this.view.headerView.scrollRightButtonText.on("click", this.controller.scrollRight.bind(this.controller));

        // 5. Display the view
        this.view.makeVisible(true);

    }

    save() {

        var updatedSectionCollection = [];
        for (var i = 0; i < this.view.boardView.noOfSections; ++i) {
            updatedSectionCollection[i] = this.view.boardView.sectionCollection[i].save();
        }

        return {
            name: this.levelName,
            value: updatedSectionCollection
        };
    }

}