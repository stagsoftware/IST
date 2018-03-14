
class Workspace {
    constructor() {

        this.layer;
        this.x;
        this.y;

        this.workspaceName;

        this.levelCollection = [];
        this.noOfLevels = 0;
    }

    init(layer, x, y, workspaceName, templateJSON, valueJSON) {

        this.layer = layer;
        this.x = x;
        this.y = y;

        this.workspaceName = workspaceName;

        this.noOfLevels = templateJSON.length;

        for (var i = 0; i < this.noOfLevels; ++i) {

            this.levelCollection[i] = new Level();

            var levelX = this.x;
            var levelY = this.y + (i * LevelSettings.skeleton.h);

            this.levelCollection[i].init(layer, levelX, levelY, workspaceName, templateJSON[i], valueJSON[i]);
        }
    }

}
