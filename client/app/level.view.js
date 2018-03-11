
class LevelView {
    constructor() {

        this.layer;
        this.x;
        this.y;

        this.levelViewRect;

        this.scrollLeftButtonRect;
        this.scrollLeftButtonText;

        this.scrollRightButtonRect;
        this.scrollRightButtonText;

        this.levelIDRect;
        this.levelIDText;

        this.levelNameRect;
        this.levelNameText;

        this.sectionCollection = [];
        this.maxNoSections = 0;
        this.noOfSections = 0;

        this.isVisible = false;
    }

    init(layer, x, y, templateJSON, valueJSON) {

        this.layer = layer;
        this.x = x;
        this.y = y;

        // Draw the outer box for levelView (Konva Rect)
        var manualConfig = {
            x: this.x,
            y: this.y,
            width: (LevelSettings.skeleton.w * (LevelSettings.levelViewRect.wPct / 100)),
            height: (LevelSettings.skeleton.h * (LevelSettings.levelViewRect.hPct / 100))
        };
        var config = configSettings.getLevelUIConfig(manualConfig, "levelViewRect");
        this.levelViewRect = new Konva.Rect(config);

        this.layer.add(this.levelViewRect);

        // Calculate #sections that can be displayed in a view & store in maxNoSections
        // Now create that many sections that represent 'a-section' in a loop
        // and store in sectionCollection object
        for (var i = 0; i < templateJSON.length; ++i) {

            this.sectionCollection[i] = new Section();

            var secX = this.x + (i * SectionSettings.skeleton.w);
            var secY = this.y;
            this.sectionCollection[i].init(layer, secX, secY, templateJSON[i], valueJSON[i]);
        }

        //  Setup scrollLeftButton display object in Konva
        var manualConfig = {
            x: this.x
                + (LevelSettings.skeleton.w * (LevelSettings.levelViewRect.wPct / 100)),
            y: this.y,
            width: (LevelSettings.skeleton.w * (LevelSettings.scrollLeftButtonRect.wPct / 100)),
            height: (LevelSettings.skeleton.h * (LevelSettings.scrollLeftButtonRect.hPct / 100))
        };
        var config = configSettings.getLevelUIConfig(manualConfig, "scrollLeftButtonRect");
        this.scrollLeftButtonRect = new Konva.Rect(config);

        var manualConfig = {
            x: this.x
                + (LevelSettings.skeleton.w * (LevelSettings.levelViewRect.wPct / 100)),
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
                + (LevelSettings.skeleton.w * (LevelSettings.levelViewRect.wPct / 100)),
            y: this.y
                + (LevelSettings.skeleton.h * (LevelSettings.scrollLeftButtonRect.hPct / 100)),
            width: (LevelSettings.skeleton.w * (LevelSettings.scrollRightButtonRect.wPct / 100)),
            height: (LevelSettings.skeleton.h * (LevelSettings.scrollRightButtonRect.hPct / 100))
        };
        var config = configSettings.getLevelUIConfig(manualConfig, "scrollRightButtonRect");
        this.scrollRightButtonRect = new Konva.Rect(config);

        var manualConfig = {
            x: this.x
                + (LevelSettings.skeleton.w * (LevelSettings.levelViewRect.wPct / 100)),
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
                + (LevelSettings.skeleton.w * (LevelSettings.levelViewRect.wPct / 100))
                + (LevelSettings.skeleton.w * (LevelSettings.scrollLeftButtonRect.wPct / 100)),
            y: this.y,
            width: (LevelSettings.skeleton.w * (LevelSettings.levelIDRect.wPct / 100)),
            height: (LevelSettings.skeleton.h * (LevelSettings.levelIDRect.hPct / 100))
        };
        var config = configSettings.getLevelUIConfig(manualConfig, "levelIDRect");
        this.levelIDRect = new Konva.Rect(config);

        var manualConfig = {
            x: this.x
                + (LevelSettings.skeleton.w * (LevelSettings.levelViewRect.wPct / 100))
                + (LevelSettings.skeleton.w * (LevelSettings.scrollLeftButtonRect.wPct / 100)),
            y: this.y,
            width: (LevelSettings.skeleton.w * (LevelSettings.levelIDText.wPct / 100)),
            height: (LevelSettings.skeleton.h * (LevelSettings.levelIDText.hPct / 100)),
            text: 'L0'
        };
        var config = configSettings.getLevelUIConfig(manualConfig, "levelIDText");
        this.levelIDText = new Konva.Text(config);

        this.layer.add(this.levelIDRect);
        this.layer.add(this.levelIDText);

        //  Setup levelName display object in Konva
        var manualConfig = {
            x: this.x
                + (LevelSettings.skeleton.w * (LevelSettings.levelViewRect.wPct / 100))
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
                + (LevelSettings.skeleton.w * (LevelSettings.levelViewRect.wPct / 100))
                + (LevelSettings.skeleton.w * (LevelSettings.scrollLeftButtonRect.wPct / 100)),
            y: this.y
                + (LevelSettings.skeleton.h * (LevelSettings.levelIDRect.hPct / 100)),
            width: (LevelSettings.skeleton.w * (LevelSettings.levelNameText.wPct / 100)),
            height: (LevelSettings.skeleton.h * (LevelSettings.levelNameText.hPct / 100)),
            text: 'Level 0'
        };
        var config = configSettings.getLevelUIConfig(manualConfig, "levelNameText");
        this.levelNameText = new Konva.Text(config);

        this.layer.add(this.levelNameRect);
        this.layer.add(this.levelNameText);
    }

    displaySectionAt() {
        // Basically we are overwriting the Section on this board
    }

    displaySectionAtStart() {
        // Well, we are inserting a new Section at the beginning
        // Move the Section contents (if any) from the first board to second board and so on
        // Now attach this Section to the first board
    }

    displaySectionAtEnd() {
        // Well, we are appending a new section to the end
        // Move the section contents (if any) from the last board to last but one and so on
        // Now attach this section to the last board
    }

    makeVisible(isVisible) {
        // Make the levelView itself visible/not-visible
        if (isVisible) {

            this.levelViewRect.show();

            this.scrollLeftButtonRect.show();
            this.scrollLeftButtonText.show();


            this.scrollRightButtonRect.show();
            this.scrollRightButtonText.show();

            this.levelIDRect.show();
            this.levelIDText.show();

            this.levelNameRect.show();
            this.levelNameText.show();

            //this.sectionCollection = [];
        } else {

            this.levelViewRect.hide();

            this.scrollLeftButtonRect.hide();
            this.scrollLeftButtonText.hide();

            this.scrollRightButtonRect.hide();
            this.scrollRightButtonText.hide();

            this.levelIDRect.hide();
            this.levelIDText.hide();

            this.levelNameRect.hide();
            this.levelNameText.hide();

            //this.sectionCollection = [];
        }

        this.layer.draw();
        this.isVisible = isVisible;
    }
}