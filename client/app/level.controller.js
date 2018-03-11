
class LevelController {
    constructor() {

        this.startSectionID = -1;
        this.endSectionID = -1;

        this.model;
        this.view;
    }

    init(model, view) {
        this.model = model;
        this.view = view;
    }

    // Need to respond to (>)scrollRight (<)scrollLeft

    // Handler for (SCROLL-LEFT) button
    // It scrolls left iff any note is available on the left
    // 1. Decrement the startNoteID and fetch the note to be displayed at start from the model
    // 2. Update the view by adding the note at the start
    // 3. Update the endNoteID
    scrollLeft() {
        this.view.sectionCollection[0].view.relocateAt(200, 200);
        this.view.sectionCollection[0].view.makeVisible(true);
        this.view.sectionCollection[1].view.makeVisible(false);
    }

    // Handler for (SCROLL-RIGHT) button
    // It scrolls right iff any note is available on the right
    // 1. Increment the endNoteID and fetch the note to be displayed at end from the model
    // 2. Update the view by adding the note at the end
    // 3. Update the startNoteID
    scrollRight() {
        this.view.sectionCollection[0].view.relocateAt(-200, -200);
        this.view.sectionCollection[0].view.makeVisible(true);
        this.view.sectionCollection[1].view.makeVisible(true);
    }
}