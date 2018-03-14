
class LevelView {
    constructor() {

        this.headerView;
        this.boardView;

        this.isVisible = false;
    }

    init(layer, x, y, workspaceName, levelNumber, levelName, templateJSON, valueJSON) {

        switch (workspaceName) {
            case "RECON":
                this.boardView = new LevelBoardView();
                this.boardView.init(layer, x, y, templateJSON, valueJSON);

                // Calculate the (x,y) for headerView
                var hvX = x
                    + (LevelSettings.skeleton.w * (LevelSettings.boardViewRect.wPct / 100));
                var hvY = y;

                this.headerView = new LevelHeaderView();
                this.headerView.init(layer, hvX, hvY, workspaceName, levelNumber, levelName);
                break;

            case "SEARCH":
                this.headerView = new LevelHeaderView();
                this.headerView.init(layer, x, y, workspaceName, levelNumber, levelName);

                // Calculate the (x,y) for BoardView
                var bvX = x
                    + (LevelSettings.skeleton.w * (LevelSettings.scrollLeftButtonRect.wPct / 100))
                    + (LevelSettings.skeleton.w * (LevelSettings.levelIDRect.wPct / 100));
                var bvY = y;

                this.boardView = new LevelBoardView();
                this.boardView.init(layer, bvX, bvY, templateJSON, valueJSON);
                break;
        }


    }

    makeVisible(isVisible) {
        this.headerView.makeVisible(isVisible);
        this.boardView.makeVisible(isVisible);
        this.isVisible = isVisible;
    }
}