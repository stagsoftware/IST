
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
        this.sectionAreaCollection = [];
        this.noOfSections = 0;
        this.noOfSectionAreas = 0;

        this.isVisible = false;
    }

    init(layer, x, y, levelNumber, levelName, templateJSON, valueJSON) {

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

        // Calculate #sectionAreas that can be created in a view & store in #noOfSectionAreas
        // Now create that many sectionAreas that represent 'a-section' coordinates in a loop
        var secAreaW = (LevelSettings.skeleton.w * (LevelSettings.levelViewRect.wPct / 100));
        var secAreaH = (LevelSettings.skeleton.h * (LevelSettings.levelViewRect.hPct / 100));

        for (var i = 0; (i + 1) * SectionSettings.skeleton.w <= secAreaW; ++i) {

            this.sectionAreaCollection[i] = new SectionArea();

            var secAreaX = this.x + (i * SectionSettings.skeleton.w);
            var secAreaY = this.y;
            var sectionID = -1;

            this.sectionAreaCollection[i].init(secAreaX, secAreaY, sectionID);
            ++this.noOfSectionAreas;
        }

        // Now create all the sections based on the templateJSON and hide them
        // and store in sectionCollection object
        for (var i = 0; i < templateJSON.length; ++i) {

            this.sectionCollection[i] = new Section();

            var secX = this.x + (i * SectionSettings.skeleton.w);
            var secY = this.y;
            var isVisible = false;

            this.sectionCollection[i].init(layer, secX, secY, templateJSON[i], valueJSON[i], isVisible);
            ++this.noOfSections;
        }

        // Display the sectionCollection in the section area based on noOfSectionAreas available
        if (this.noOfSectionAreas <= this.noOfSections) {

            for (var i = 0; i < this.noOfSectionAreas; ++i) {

                var newX = this.sectionAreaCollection[i].x;
                var newY = this.sectionAreaCollection[i].y;
                var isVisible = true;

                this.sectionCollection[i].view.relocateAt(newX, newY);
                this.sectionCollection[i].view.makeVisible(isVisible);

                this.sectionAreaCollection[i].sectionID = i;
            }
        } else {

            for (var i = 0; i < this.noOfSections; ++i) {

                var secAreaID = (this.noOfSectionAreas - this.noOfSections) + i;
                var newX = this.sectionAreaCollection[secAreaID].x;
                var newY = this.sectionAreaCollection[secAreaID].y;
                var isVisible = true;

                this.sectionCollection[i].view.relocateAt(newX, newY);
                this.sectionCollection[i].view.makeVisible(isVisible);

                this.sectionAreaCollection[secAreaID].sectionID = i;
            }
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
            text: levelNumber
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
            text: levelName
        };
        var config = configSettings.getLevelUIConfig(manualConfig, "levelNameText");
        this.levelNameText = new Konva.Text(config);

        this.layer.add(this.levelNameRect);
        this.layer.add(this.levelNameText);
    }

    displaySectionAt(secAreaID, newSectionID) {
        // Basically we are overwriting the section on this sectionArea
        var newX = this.sectionAreaCollection[secAreaID].x;
        var newY = this.sectionAreaCollection[secAreaID].y;

        this.sectionCollection[newSectionID].view.relocateAt(newX, newY);
        this.sectionCollection[newSectionID].view.makeVisible(true);

        this.sectionAreaCollection[secAreaID].sectionID = newSectionID;
    }

    displaySectionAtStart(newSectionID) {
        // Well, we are inserting a new Section at the beginning
        // Move the SectionArea contents (if any) from the first area to second area and so on
        // Now attach this Section to the first SectionArea

        // There are 3-scenarios
        // 1. No areas are filled
        // 2. Some areas are filled
        // 3. All areas are filled

        if (this.noOfSectionAreas < this.noOfSections) {
            // 3. All areas are filled
            for (var i = this.noOfSectionAreas - 1; i >= 0; --i) {
                var currX = this.sectionAreaCollection[i].x;
                var currY = this.sectionAreaCollection[i].y;
                var currSecID = this.sectionAreaCollection[i].sectionID;

                // Hide the current section that has to be relocated
                this.sectionCollection[currSecID].view.makeVisible(false);

                // Attach the section only if there is an adjacent area available 
                if (this.sectionAreaCollection[i + 1]) {
                    var nextX = this.sectionAreaCollection[i + 1].x;
                    var nextY = this.sectionAreaCollection[i + 1].y;

                    this.sectionCollection[currSecID].view.relocateAt(nextX, nextY);
                    this.sectionCollection[currSecID].view.makeVisible(true);

                    this.sectionAreaCollection[i + 1].sectionID = currSecID;
                }
            }
            this.displaySectionAt(0, newSectionID);
        }
    }

    displaySectionAtEnd(newSectionID) {
        // Well, we are appending a new section to the end
        // Move the SectionArea contents (if any) from the last area to last but one and so on
        // Now attach this section to the last SectionArea

        // There are 3-scenarios
        // 1. No areas are filled
        // 2. Some areas are filled
        // 3. All areas are filled

        if (this.noOfSectionAreas < this.noOfSections) {
            // 3. All areas are filled 
            for (var i = 0; i < this.noOfSectionAreas - 1; ++i) {
                var nextX = this.sectionAreaCollection[i + 1].x;
                var nextY = this.sectionAreaCollection[i + 1].y;
                var nextSecID = this.sectionAreaCollection[i + 1].sectionID;

                var currX = this.sectionAreaCollection[i].x;
                var currY = this.sectionAreaCollection[i].y;

                this.sectionCollection[nextSecID].view.relocateAt(currX, currY);
                this.sectionCollection[nextSecID].view.makeVisible(true);

                this.sectionAreaCollection[i].sectionID = nextSecID;
            }
            this.displaySectionAt(this.noOfSectionAreas - 1, newSectionID);
        }
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
        }

        // Make all the associated 'sections' visible/not-visible
        if (this.noOfSectionAreas <= this.noOfSections) {

            for (var i = 0; i < this.noOfSections; ++i) {
                this.sectionCollection[i].view.makeVisible(false);
            }

            for (var i = 0; i < this.noOfSectionAreas; ++i) {
                var sectionID = this.sectionAreaCollection[i].sectionID;
                this.sectionCollection[sectionID].view.makeVisible(isVisible);
            }
        } else {

            for (var i = 0; i < this.noOfSections; ++i) {
                this.sectionCollection[i].view.makeVisible(isVisible);
            }
        }

        this.layer.draw();
        this.isVisible = isVisible;
    }
}