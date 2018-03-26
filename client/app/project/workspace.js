
class Workspace {
    constructor() {

        this.layer;
        this.x;
        this.y;

        this.wsName;
        this.levelTemplates;
        this.levelDetails;

        this.levelCollection = [];
        this.noOfLevels = 0;

        this.isVisible = false;
    }

    init(layer, x, y, wsName, templateJSON, valueJSON = {}) {

        this.layer = layer;
        this.x = x;
        this.y = y;

        this.wsName = wsName;
        this.levelTemplates = templateJSON.levels;
        this.levelDetails = valueJSON.value || [];

        this.noOfLevels = templateJSON.levels.length;

        for (var i = 0; i < this.noOfLevels; ++i) {

            this.levelCollection[i] = new Level();

            var levelX = this.x;
            var levelY = this.y + (i * LevelHeight);

            this.levelCollection[i].init(layer, levelX, levelY, wsName, this.levelTemplates[i], this.levelDetails[i], WorkspaceSettings[wsName][i]);
        }
    }

    save() {
  
        var wsName = this.wsName;
        var updatedLevelCollection = [];
        for (var i = 0; i < this.noOfLevels; ++i) {
            updatedLevelCollection[i] = this.levelCollection[i].save();
        }
        
        return {
            name: wsName,
            value: updatedLevelCollection
        };
    }

    makeVisible(isVisible) {

        for (var i = 0; i < this.noOfLevels; ++i) {
            this.levelCollection[i].view.makeVisible(isVisible);
        }
        this.isVisible = isVisible;
    }

}
