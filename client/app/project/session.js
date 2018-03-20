
class Session {
    constructor() {

        this.stage;
        this.layer;
        this.x;
        this.y;

        this.view;
        this.controller;

        this.wsNames;
        this.wsDescriptions;
        this.wsTemplates;
        this.wsDetails;

        this.currentWorkspaceID = -1;
    }

    init(currWsName, templateJSON, valueJSON) {

        this.wsNames = templateJSON.map(wsTemplate => wsTemplate.name);
        this.wsDescriptions = templateJSON.map(wsTemplate => wsTemplate.description);
        this.wsTemplates = templateJSON;
        this.wsDetails = valueJSON;

        // 1. Create the stage for canvas display
        this.stage = new Konva.Stage({
            // id of container <div>
            container: 'container',
            width: CanvasWidth,
            height: CanvasHeight
        });

        // 2. then create layer
        this.layer = new Konva.Layer();
        this.stage.add(this.layer);

        // 3. Set (x,y) for the workspace to be displayed 
        this.x = CanvasX;
        this.y = CanvasY;

        // 4. Create the view and populate workspaceCollection
        this.view = new SessionView();
        this.view.init(this.layer, this.x, this.y, currWsName, this.wsNames, this.wsDescriptions, this.wsTemplates, this.wsDetails);

        // 5. Setup the controller
        this.controller = new SessionController();
        this.controller.init(this.view);

        // 4. Now wire up the view events to be handled by this controller
        this.view.headerView.scrollLeftButtonText.on("click", this.controller.scrollLeft.bind(this.controller));
        this.view.headerView.scrollRightButtonText.on("click", this.controller.scrollRight.bind(this.controller));

        // 5. Display the view
        this.view.makeVisible(true);
    }

    save() {

        var updatedWorkspaceCollection = [];
        for (var i = 0; i < this.view.boardView.noOfWorkspaces; ++i) {
            updatedWorkspaceCollection[i] = this.view.boardView.workspaceCollection[i].save();
        }
        return updatedWorkspaceCollection;
    }
}