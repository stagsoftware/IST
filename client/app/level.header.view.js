
class LevelHeaderView {
    constructor() {

        this.layer;
        this.x;
        this.y;

        this.scrollLeftButtonRect;
        this.scrollLeftButtonText;

        this.scrollRightButtonRect;
        this.scrollRightButtonText;

        this.levelIDRect;
        this.levelIDText;

        this.levelNameRect;
        this.levelNameText;

        this.isVisible = false;
    }

    init(layer, x, y, wsName, levelNumber, levelName) {

        this.layer = layer;
        this.x = x;
        this.y = y;

        switch (wsName) {
            case "RECON":
                //  Setup scrollLeftButton display object in Konva
                var manualConfig = {
                    x: this.x,
                    y: this.y,
                    width: (LevelSettings.skeleton.w * (LevelSettings.scrollLeftButtonRect.wPct / 100)),
                    height: (LevelSettings.skeleton.h * (LevelSettings.scrollLeftButtonRect.hPct / 100))
                };
                var config = configSettings.getLevelUIConfig(manualConfig, "scrollLeftButtonRect");
                this.scrollLeftButtonRect = new Konva.Rect(config);

                var manualConfig = {
                    x: this.x,
                    y: this.y,
                    width: (LevelSettings.skeleton.w * (LevelSettings.scrollLeftButtonText.wPct / 100)),
                    height: (LevelSettings.skeleton.h * (LevelSettings.scrollLeftButtonText.hPct / 100)),
                    text: '<'
                };
                var config = configSettings.getLevelUIConfig(manualConfig, "scrollLeftButtonText");
                this.scrollLeftButtonText = new Konva.Text(config);

                this.layer.add(this.scrollLeftButtonRect);
                this.layer.add(this.scrollLeftButtonText);

                //  Setup scrollRightButton display object in Konva
                var manualConfig = {
                    x: this.x,
                    y: this.y
                        + (LevelSettings.skeleton.h * (LevelSettings.scrollLeftButtonRect.hPct / 100)),
                    width: (LevelSettings.skeleton.w * (LevelSettings.scrollRightButtonRect.wPct / 100)),
                    height: (LevelSettings.skeleton.h * (LevelSettings.scrollRightButtonRect.hPct / 100))
                };
                var config = configSettings.getLevelUIConfig(manualConfig, "scrollRightButtonRect");
                this.scrollRightButtonRect = new Konva.Rect(config);

                var manualConfig = {
                    x: this.x,
                    y: this.y
                        + (LevelSettings.skeleton.h * (LevelSettings.scrollLeftButtonRect.hPct / 100)),
                    width: (LevelSettings.skeleton.w * (LevelSettings.scrollRightButtonText.wPct / 100)),
                    height: (LevelSettings.skeleton.h * (LevelSettings.scrollRightButtonText.hPct / 100)),
                    text: '>'
                };
                var config = configSettings.getLevelUIConfig(manualConfig, "scrollRightButtonText");
                this.scrollRightButtonText = new Konva.Text(config);

                this.layer.add(this.scrollRightButtonRect);
                this.layer.add(this.scrollRightButtonText);

                //  Setup levelID display object in Konva
                var manualConfig = {
                    x: this.x
                        + (LevelSettings.skeleton.w * (LevelSettings.scrollLeftButtonRect.wPct / 100)),
                    y: this.y,
                    width: (LevelSettings.skeleton.w * (LevelSettings.levelIDRect.wPct / 100)),
                    height: (LevelSettings.skeleton.h * (LevelSettings.levelIDRect.hPct / 100))
                };
                var config = configSettings.getLevelUIConfig(manualConfig, "levelIDRect");
                this.levelIDRect = new Konva.Rect(config);

                var manualConfig = {
                    x: this.x
                        + (LevelSettings.skeleton.w * (LevelSettings.scrollLeftButtonRect.wPct / 100)),
                    y: this.y,
                    width: (LevelSettings.skeleton.w * (LevelSettings.levelIDText.wPct / 100)),
                    height: (LevelSettings.skeleton.h * (LevelSettings.levelIDText.hPct / 100)),
                    text: levelNumber
                };
                var config = configSettings.getLevelUIConfig(manualConfig, "levelIDText");
                this.levelIDText = new Konva.Text(config);

                this.layer.add(this.levelIDRect);
                this.layer.add(this.levelIDText);

                //  Setup levelName display object in Konva
                var manualConfig = {
                    x: this.x
                        + (LevelSettings.skeleton.w * (LevelSettings.scrollLeftButtonRect.wPct / 100)),
                    y: this.y
                        + (LevelSettings.skeleton.h * (LevelSettings.levelIDRect.hPct / 100)),
                    width: (LevelSettings.skeleton.w * (LevelSettings.levelNameRect.wPct / 100)),
                    height: (LevelSettings.skeleton.h * (LevelSettings.levelNameRect.hPct / 100))
                };
                var config = configSettings.getLevelUIConfig(manualConfig, "levelNameRect");
                this.levelNameRect = new Konva.Rect(config);

                var manualConfig = {
                    x: this.x
                        + (LevelSettings.skeleton.w * (LevelSettings.scrollLeftButtonRect.wPct / 100)),
                    y: this.y
                        + (LevelSettings.skeleton.h * (LevelSettings.levelIDRect.hPct / 100)),
                    width: (LevelSettings.skeleton.w * (LevelSettings.levelNameText.wPct / 100)),
                    height: (LevelSettings.skeleton.h * (LevelSettings.levelNameText.hPct / 100)),
                    text: levelName
                };
                var config = configSettings.getLevelUIConfig(manualConfig, "levelNameText");
                this.levelNameText = new Konva.Text(config);

                this.layer.add(this.levelNameRect);
                this.layer.add(this.levelNameText);

                break;
            case "SEARCH":
                //  Setup levelID display object in Konva
                var manualConfig = {
                    x: this.x,
                    y: this.y,
                    width: (LevelSettings.skeleton.w * (LevelSettings.levelIDRect.wPct / 100)),
                    height: (LevelSettings.skeleton.h * (LevelSettings.levelIDRect.hPct / 100))
                };
                var config = configSettings.getLevelUIConfig(manualConfig, "levelIDRect");
                this.levelIDRect = new Konva.Rect(config);

                var manualConfig = {
                    x: this.x,
                    y: this.y,
                    width: (LevelSettings.skeleton.w * (LevelSettings.levelIDText.wPct / 100)),
                    height: (LevelSettings.skeleton.h * (LevelSettings.levelIDText.hPct / 100)),
                    text: levelNumber
                };
                var config = configSettings.getLevelUIConfig(manualConfig, "levelIDText");
                this.levelIDText = new Konva.Text(config);

                this.layer.add(this.levelIDRect);
                this.layer.add(this.levelIDText);

                //  Setup levelName display object in Konva
                var manualConfig = {
                    x: this.x,
                    y: this.y
                        + (LevelSettings.skeleton.h * (LevelSettings.levelIDRect.hPct / 100)),
                    width: (LevelSettings.skeleton.w * (LevelSettings.levelNameRect.wPct / 100)),
                    height: (LevelSettings.skeleton.h * (LevelSettings.levelNameRect.hPct / 100))
                };
                var config = configSettings.getLevelUIConfig(manualConfig, "levelNameRect");
                this.levelNameRect = new Konva.Rect(config);

                var manualConfig = {
                    x: this.x,
                    y: this.y
                        + (LevelSettings.skeleton.h * (LevelSettings.levelIDRect.hPct / 100)),
                    width: (LevelSettings.skeleton.w * (LevelSettings.levelNameText.wPct / 100)),
                    height: (LevelSettings.skeleton.h * (LevelSettings.levelNameText.hPct / 100)),
                    text: levelName
                };
                var config = configSettings.getLevelUIConfig(manualConfig, "levelNameText");
                this.levelNameText = new Konva.Text(config);

                this.layer.add(this.levelNameRect);
                this.layer.add(this.levelNameText);

                //  Setup scrollLeftButton display object in Konva
                var manualConfig = {
                    x: this.x
                        + (LevelSettings.skeleton.w * (LevelSettings.levelIDRect.wPct / 100)),
                    y: this.y,
                    width: (LevelSettings.skeleton.w * (LevelSettings.scrollLeftButtonRect.wPct / 100)),
                    height: (LevelSettings.skeleton.h * (LevelSettings.scrollLeftButtonRect.hPct / 100))
                };
                var config = configSettings.getLevelUIConfig(manualConfig, "scrollLeftButtonRect");
                this.scrollLeftButtonRect = new Konva.Rect(config);

                var manualConfig = {
                    x: this.x
                        + (LevelSettings.skeleton.w * (LevelSettings.levelIDRect.wPct / 100)),
                    y: this.y,
                    width: (LevelSettings.skeleton.w * (LevelSettings.scrollLeftButtonText.wPct / 100)),
                    height: (LevelSettings.skeleton.h * (LevelSettings.scrollLeftButtonText.hPct / 100)),
                    text: '<'
                };
                var config = configSettings.getLevelUIConfig(manualConfig, "scrollLeftButtonText");
                this.scrollLeftButtonText = new Konva.Text(config);

                this.layer.add(this.scrollLeftButtonRect);
                this.layer.add(this.scrollLeftButtonText);

                //  Setup scrollRightButton display object in Konva
                var manualConfig = {
                    x: this.x
                        + (LevelSettings.skeleton.w * (LevelSettings.levelIDRect.wPct / 100)),
                    y: this.y
                        + (LevelSettings.skeleton.h * (LevelSettings.scrollLeftButtonRect.hPct / 100)),
                    width: (LevelSettings.skeleton.w * (LevelSettings.scrollRightButtonRect.wPct / 100)),
                    height: (LevelSettings.skeleton.h * (LevelSettings.scrollRightButtonRect.hPct / 100))
                };
                var config = configSettings.getLevelUIConfig(manualConfig, "scrollRightButtonRect");
                this.scrollRightButtonRect = new Konva.Rect(config);

                var manualConfig = {
                    x: this.x
                        + (LevelSettings.skeleton.w * (LevelSettings.levelIDRect.wPct / 100)),
                    y: this.y
                        + (LevelSettings.skeleton.h * (LevelSettings.scrollLeftButtonRect.hPct / 100)),
                    width: (LevelSettings.skeleton.w * (LevelSettings.scrollRightButtonText.wPct / 100)),
                    height: (LevelSettings.skeleton.h * (LevelSettings.scrollRightButtonText.hPct / 100)),
                    text: '>'
                };
                var config = configSettings.getLevelUIConfig(manualConfig, "scrollRightButtonText");
                this.scrollRightButtonText = new Konva.Text(config);

                this.layer.add(this.scrollRightButtonRect);
                this.layer.add(this.scrollRightButtonText);

                break;
        }

    }

    makeVisible(isVisible) {

        // Make the headerView itself visible/not-visible
        if (isVisible) {

            this.scrollLeftButtonRect.show();
            this.scrollLeftButtonText.show();


            this.scrollRightButtonRect.show();
            this.scrollRightButtonText.show();

            this.levelIDRect.show();
            this.levelIDText.show();

            this.levelNameRect.show();
            this.levelNameText.show();

        } else {

            this.scrollLeftButtonRect.hide();
            this.scrollLeftButtonText.hide();

            this.scrollRightButtonRect.hide();
            this.scrollRightButtonText.hide();

            this.levelIDRect.hide();
            this.levelIDText.hide();

            this.levelNameRect.hide();
            this.levelNameText.hide();
        }

        this.layer.batchDraw();
        this.isVisible = isVisible;
    }
}