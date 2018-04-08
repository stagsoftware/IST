
class SectionHeaderView {
    constructor() {

        this.layer;
        this.x;
        this.y;
        this.w;
        this.h;

        this.secNameRect;
        this.secNameText;

        this.addButtonRect;
        this.addButtonText;

        this.deleteButtonRect;
        this.deleteButtonText;

        this.scrollLeftButtonRect;
        this.scrollLeftButtonText;

        this.scrollBar;

        this.scrollRightButtonRect;
        this.scrollRightButtonText;

        this.isVisible = false;
    }

    init(layer, x, y, w, h, secName) {

        this.layer = layer;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        //  Set secName text inside the Konva Rect that represents the title of the section
        //  Setup secName display object in Konva
        var manualConfig = {
            x: this.x,
            y: this.y,
            width: (this.w * (SectionSettings.secNameRect.wPct / 100)),
            height: (this.h * (SectionSettings.secNameRect.hPct / 100))
        };
        var config = UISettings.getSectionConfig(manualConfig, "secNameRect");
        this.secNameRect = new Konva.Rect(config);

        var manualConfig = {
            x: this.x,
            y: this.y,
            width: (this.w * (SectionSettings.secNameText.wPct / 100)),
            height: (this.h * (SectionSettings.secNameText.hPct / 100)),
            text: secName
        };
        var config = UISettings.getSectionConfig(manualConfig, "secNameText");
        this.secNameText = new Konva.Text(config);

        this.layer.add(this.secNameRect);
        this.layer.add(this.secNameText);

        //  Setup addButton display object in Konva
        var manualConfig = {
            x: this.x
                + (this.w * (SectionSettings.secNameRect.wPct / 100)),
            y: this.y,
            width: (this.w * (SectionSettings.addButtonRect.wPct / 100)),
            height: (this.h * (SectionSettings.addButtonRect.hPct / 100))
        };
        var config = UISettings.getSectionConfig(manualConfig, "addButtonRect");
        this.addButtonRect = new Konva.Rect(config);

        var manualConfig = {
            x: this.x
                + (this.w * (SectionSettings.secNameRect.wPct / 100)),
            y: this.y,
            width: (this.w * (SectionSettings.addButtonText.wPct / 100)),
            height: (this.h * (SectionSettings.addButtonText.hPct / 100))
        };
        var config = UISettings.getSectionConfig(manualConfig, "addButtonText");
        this.addButtonText = new Konva.Text(config);

        this.layer.add(this.addButtonRect);
        this.layer.add(this.addButtonText);

        //  Setup scrollLeftButton display object in Konva
        var manualConfig = {
            x: this.x,
            y: this.y
                + (this.h * (SectionSettings.secNameRect.hPct / 100)),
            width: (this.w * (SectionSettings.scrollLeftButtonRect.wPct / 100)),
            height: (this.h * (SectionSettings.scrollLeftButtonRect.hPct / 100))
        };
        var config = UISettings.getSectionConfig(manualConfig, "scrollLeftButtonRect");
        this.scrollLeftButtonRect = new Konva.Rect(config);

        var manualConfig = {
            x: this.x,
            y: this.y
                + (this.h * (SectionSettings.secNameRect.hPct / 100)),
            width: (this.w * (SectionSettings.scrollLeftButtonText.wPct / 100)),
            height: (this.h * (SectionSettings.scrollLeftButtonText.hPct / 100))
        };
        var config = UISettings.getSectionConfig(manualConfig, "scrollLeftButtonText");
        this.scrollLeftButtonText = new Konva.Text(config);

        this.layer.add(this.scrollLeftButtonRect);
        this.layer.add(this.scrollLeftButtonText);

        //  Setup scrollBar display object in Konva
        var manualConfig = {
            x: this.x
                + (this.w * (SectionSettings.scrollLeftButtonRect.wPct / 100)),
            y: this.y
                + (this.h * (SectionSettings.secNameRect.hPct / 100)),
            width: (this.w * (SectionSettings.scrollBar.wPct / 100)),
            height: (this.h * (SectionSettings.scrollBar.hPct / 100))
        };
        var config = UISettings.getSectionConfig(manualConfig, "scrollBar");
        this.scrollBar = new Konva.Rect(config);

        this.layer.add(this.scrollBar);

        //  Setup scrollRightButton display object in Konva
        var manualConfig = {
            x: this.x
                + (this.w * (SectionSettings.scrollLeftButtonRect.wPct / 100))
                + (this.w * (SectionSettings.scrollBar.wPct / 100)),
            y: this.y
                + (this.h * (SectionSettings.secNameRect.hPct / 100)),
            width: (this.w * (SectionSettings.scrollRightButtonRect.wPct / 100)),
            height: (this.h * (SectionSettings.scrollRightButtonRect.hPct / 100))
        };
        var config = UISettings.getSectionConfig(manualConfig, "scrollRightButtonRect");
        this.scrollRightButtonRect = new Konva.Rect(config);

        var manualConfig = {
            x: this.x
                + (this.w * (SectionSettings.scrollLeftButtonRect.wPct / 100))
                + (this.w * (SectionSettings.scrollBar.wPct / 100)),
            y: this.y
                + (this.h * (SectionSettings.secNameRect.hPct / 100)),
            width: (this.w * (SectionSettings.scrollRightButtonText.wPct / 100)),
            height: (this.h * (SectionSettings.scrollRightButtonText.hPct / 100))
        };
        var config = UISettings.getSectionConfig(manualConfig, "scrollRightButtonText");
        this.scrollRightButtonText = new Konva.Text(config);

        this.layer.add(this.scrollRightButtonRect);
        this.layer.add(this.scrollRightButtonText);
    }

    relocateAt(newX, newY) {

        this.secNameRect.setX(newX + (this.secNameRect.x() - this.x));
        this.secNameRect.setY(newY + (this.secNameRect.y() - this.y));
        this.secNameText.setX(newX + (this.secNameText.x() - this.x));
        this.secNameText.setY(newY + (this.secNameText.y() - this.y));

        this.addButtonRect.setX(newX + (this.addButtonRect.x() - this.x));
        this.addButtonRect.setY(newY + (this.addButtonRect.y() - this.y));
        this.addButtonText.setX(newX + (this.addButtonText.x() - this.x));
        this.addButtonText.setY(newY + (this.addButtonText.y() - this.y));

        this.scrollLeftButtonRect.setX(newX + (this.scrollLeftButtonRect.x() - this.x));
        this.scrollLeftButtonRect.setY(newY + (this.scrollLeftButtonRect.y() - this.y));
        this.scrollLeftButtonText.setX(newX + (this.scrollLeftButtonText.x() - this.x));
        this.scrollLeftButtonText.setY(newY + (this.scrollLeftButtonText.y() - this.y));

        this.scrollBar.setX(newX + (this.scrollBar.x() - this.x));
        this.scrollBar.setY(newY + (this.scrollBar.y() - this.y));

        this.scrollRightButtonRect.setX(newX + (this.scrollRightButtonRect.x() - this.x));
        this.scrollRightButtonRect.setY(newY + (this.scrollRightButtonRect.y() - this.y));
        this.scrollRightButtonText.setX(newX + (this.scrollRightButtonText.x() - this.x));
        this.scrollRightButtonText.setY(newY + (this.scrollRightButtonText.y() - this.y));

        this.x = newX;
        this.y = newY;
    }

    // redrawAt(newX, newY, newW, newH) {

    //     this.secNameRect.setX(newX);
    //     this.secNameRect.setY(newY);
    //     this.secNameRect.setWidth(newW * (SectionSettings.secNameRect.wPct / 100));
    //     this.secNameRect.setHeight(newH * (SectionSettings.secNameRect.hPct / 100));
    //     this.secNameText.setX(newX);
    //     this.secNameText.setY(newY);
    //     this.secNameText.setWidth(newW * (SectionSettings.secNameText.wPct / 100));
    //     this.secNameText.setHeight(newH * (SectionSettings.secNameText.hPct / 100));

    //     this.addButtonRect.setX(newX 
    //         + (newW * (SectionSettings.secNameRect.wPct / 100)));
    //     this.addButtonRect.setY(newY);
    //     this.addButtonRect.setWidth(newW * (SectionSettings.addButtonRect.wPct / 100));
    //     this.addButtonRect.setHeight(newH * (SectionSettings.addButtonRect.hPct / 100));
    //     this.addButtonText.setX(newX + (newW * (SectionSettings.secNameRect.wPct / 100)));
    //     this.addButtonText.setY(newY);
    //     this.addButtonText.setWidth(newW * (SectionSettings.addButtonText.wPct / 100));
    //     this.addButtonText.setHeight(newH * (SectionSettings.addButtonText.hPct / 100));

    //     this.scrollLeftButtonRect.setX(newX);
    //     this.scrollLeftButtonRect.setY(newY 
    //         + (newH * (SectionSettings.secNameRect.hPct / 100)));
    //     this.scrollLeftButtonRect.setWidth(newW * (SectionSettings.scrollLeftButtonRect.wPct / 100));
    //     this.scrollLeftButtonRect.setHeight(newH * (SectionSettings.scrollLeftButtonRect.hPct / 100));
    //     this.scrollLeftButtonText.setX(newX);
    //     this.scrollLeftButtonText.setY(newY 
    //         + (newH * (SectionSettings.secNameRect.hPct / 100)));
    //     this.scrollLeftButtonText.setWidth(newW * (SectionSettings.scrollLeftButtonText.wPct / 100));
    //     this.scrollLeftButtonText.setHeight(newH * (SectionSettings.scrollLeftButtonText.hPct / 100));

    //     this.scrollBar.setX(newX 
    //         + (newW * (SectionSettings.scrollLeftButtonRect.wPct / 100)));
    //     this.scrollBar.setY(newY 
    //         + (newH * (SectionSettings.secNameRect.hPct / 100)));
    //     this.scrollBar.setWidth(newW * (SectionSettings.scrollBar.wPct / 100));
    //     this.scrollBar.setHeight(newH * (SectionSettings.scrollBar.hPct / 100));

    //     this.scrollRightButtonRect.setX(newX
    //         + (newW * (SectionSettings.scrollLeftButtonRect.wPct / 100))
    //         + (newW * (SectionSettings.scrollBar.wPct / 100)));
    //     this.scrollRightButtonRect.setY(newY 
    //         + (newH * (SectionSettings.secNameRect.hPct / 100)));
    //     this.scrollRightButtonRect.setWidth(newW * (SectionSettings.scrollRightButtonRect.wPct / 100));
    //     this.scrollRightButtonRect.setHeight(newH * (SectionSettings.scrollRightButtonRect.hPct / 100));
    //     this.scrollRightButtonText.setX(newX
    //         + (newW * (SectionSettings.scrollLeftButtonRect.wPct / 100))
    //         + (newW * (SectionSettings.scrollBar.wPct / 100)));
    //     this.scrollRightButtonText.setY(newY 
    //         + (newH * (SectionSettings.secNameRect.hPct / 100)));
    //     this.scrollRightButtonText.setWidth(newW * (SectionSettings.scrollRightButtonRect.wPct / 100));
    //     this.scrollRightButtonText.setHeight(newH * (SectionSettings.scrollRightButtonText.hPct / 100));

    //     this.x = newX;
    //     this.y = newY;
    //     this.w = newW;
    //     this.h = newH;
    // }

    makeVisible(isVisible) {

        // Make the headerView itself visible/not-visible
        if (isVisible) {

            this.secNameRect.show();
            this.secNameText.show();

            this.addButtonRect.show();
            this.addButtonText.show();

            this.scrollLeftButtonRect.show();
            this.scrollLeftButtonText.show();

            this.scrollBar.show();

            this.scrollRightButtonRect.show();
            this.scrollRightButtonText.show();
        } else {

            this.secNameRect.hide();
            this.secNameText.hide();

            this.addButtonRect.hide();
            this.addButtonText.hide();

            this.scrollLeftButtonRect.hide();
            this.scrollLeftButtonText.hide();

            this.scrollBar.hide();

            this.scrollRightButtonRect.hide();
            this.scrollRightButtonText.hide();
        }
        this.layer.batchDraw();
        this.isVisible = isVisible;
    }
}