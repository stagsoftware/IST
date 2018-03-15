
class SessionHeaderView {
    constructor() {

        this.layer;
        this.x;
        this.y;

        this.scrollLeftButtonRect;
        this.scrollLeftButtonText;

        this.wsNameRect;
        this.wsNameText;

        this.scrollRightButtonRect;
        this.scrollRightButtonText;

        this.wsNames = ["Reconnaissance Workspace", "Search Workspace"];

        this.isVisible = false;
    }

    init(layer, x, y, wsName) {

        this.layer = layer;
        this.x = x;
        this.y = y;

        //  Setup scrollLeftButton display object in Konva
        var manualConfig = {
            x: this.x,
            y: this.y,
            width: (SessionSettings.skeleton.w * (SessionSettings.scrollLeftButtonRect.wPct / 100)),
            height: (SessionSettings.skeleton.h * (SessionSettings.scrollLeftButtonRect.hPct / 100))
        };
        var config = configSettings.getSessionUIConfig(manualConfig, "scrollLeftButtonRect");
        this.scrollLeftButtonRect = new Konva.Rect(config);

        var manualConfig = {
            x: this.x,
            y: this.y,
            width: (SessionSettings.skeleton.w * (SessionSettings.scrollLeftButtonText.wPct / 100)),
            height: (SessionSettings.skeleton.h * (SessionSettings.scrollLeftButtonText.hPct / 100)),
            text: '<'
        };
        var config = configSettings.getSessionUIConfig(manualConfig, "scrollLeftButtonText");
        this.scrollLeftButtonText = new Konva.Text(config);

        this.layer.add(this.scrollLeftButtonRect);
        this.layer.add(this.scrollLeftButtonText);

        //  Setup wsName display object in Konva
        var manualConfig = {
            x: this.x
                + (SessionSettings.skeleton.w * (SessionSettings.scrollLeftButtonRect.wPct / 100)),
            y: this.y,
            width: (SessionSettings.skeleton.w * (SessionSettings.wsNameRect.wPct / 100)),
            height: (SessionSettings.skeleton.h * (SessionSettings.wsNameRect.hPct / 100))
        };
        var config = configSettings.getSessionUIConfig(manualConfig, "wsNameRect");
        this.wsNameRect = new Konva.Rect(config);

        var manualConfig = {
            x: this.x
                + (SessionSettings.skeleton.w * (SessionSettings.scrollLeftButtonRect.wPct / 100)),
            y: this.y,
            width: (SessionSettings.skeleton.w * (SessionSettings.wsNameText.wPct / 100)),
            height: (SessionSettings.skeleton.h * (SessionSettings.wsNameText.hPct / 100)),
            text: wsName
        };
        var config = configSettings.getSessionUIConfig(manualConfig, "wsNameText");
        this.wsNameText = new Konva.Text(config);

        this.layer.add(this.wsNameRect);
        this.layer.add(this.wsNameText);

        //  Setup scrollRightButton display object in Konva
        var manualConfig = {
            x: this.x
                + (SessionSettings.skeleton.w * (SessionSettings.scrollLeftButtonRect.wPct / 100))
                + (SessionSettings.skeleton.w * (SessionSettings.wsNameRect.wPct / 100)),
            y: this.y,
            width: (SessionSettings.skeleton.w * (SessionSettings.scrollRightButtonRect.wPct / 100)),
            height: (SessionSettings.skeleton.h * (SessionSettings.scrollRightButtonRect.hPct / 100))
        };
        var config = configSettings.getSessionUIConfig(manualConfig, "scrollRightButtonRect");
        this.scrollRightButtonRect = new Konva.Rect(config);

        var manualConfig = {
            x: this.x
                + (SessionSettings.skeleton.w * (SessionSettings.scrollLeftButtonRect.wPct / 100))
                + (SessionSettings.skeleton.w * (SessionSettings.wsNameRect.wPct / 100)),
            y: this.y,
            width: (SessionSettings.skeleton.w * (SessionSettings.scrollRightButtonText.wPct / 100)),
            height: (SessionSettings.skeleton.h * (SessionSettings.scrollRightButtonText.hPct / 100)),
            text: '>'
        };
        var config = configSettings.getSessionUIConfig(manualConfig, "scrollRightButtonText");
        this.scrollRightButtonText = new Konva.Text(config);

        this.layer.add(this.scrollRightButtonRect);
        this.layer.add(this.scrollRightButtonText);
    }

    setWorkspaceName(workspaceID) {
        this.wsNameText.setText(this.wsNames[workspaceID]);
        this.layer.batchDraw();
    }

    makeVisible(isVisible) {

        // Make the headerView itself visible/not-visible
        if (isVisible) {

            this.scrollLeftButtonRect.show();
            this.scrollLeftButtonText.show();

            this.wsNameRect.show();
            this.wsNameText.show();

            this.scrollRightButtonRect.show();
            this.scrollRightButtonText.show();
        } else {

            this.scrollLeftButtonRect.hide();
            this.scrollLeftButtonText.hide();

            this.wsNameRect.hide();
            this.wsNameText.hide();

            this.scrollRightButtonRect.hide();
            this.scrollRightButtonText.hide();
        }

        this.layer.batchDraw();
        this.isVisible = isVisible;
    }
}