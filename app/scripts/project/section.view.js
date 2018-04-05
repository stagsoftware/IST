
class SectionView {
    constructor() {

        this.headerView;
        this.boardView;

        this.isVisible = false;
    }

    init(layer, x, y, w, h, secName) {

        // Init HeaderView part of SectionView
        this.headerView = new SectionHeaderView();
        this.headerView.init(layer, x, y, w, h, secName);

        // Calculate the (x,y) for BoardView
        var bvX = x;
        var bvY = y
            + (h * (SectionSettings.secNameRect.hPct / 100))
            + (h * (SectionSettings.scrollLeftButtonRect.hPct / 100));

        // Init Boardview part of SectionView
        this.boardView = new SectionBoardView();
        this.boardView.init(layer, bvX, bvY, w, h);
    }

    relocateAt(newX, newY, newW, newH) {
        this.headerView.relocateAt(newX, newY);

        var newBvX = newX;
        var newBvY = newY
            + (newH * (SectionSettings.secNameRect.hPct / 100))
            + (newH * (SectionSettings.scrollLeftButtonRect.hPct / 100));

        this.boardView.relocateAt(newBvX, newBvY);
    }

    makeVisible(isVisible) {
        this.headerView.makeVisible(isVisible);
        this.boardView.makeVisible(isVisible);
        this.isVisible = isVisible;
    }
}