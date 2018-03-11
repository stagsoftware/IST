
class BoardView {
    constructor() {

        this.layer;
        this.x;
        this.y;

        this.boardViewRect;

        this.boardCollection = [];
        this.maxNoBoards = 0;
        this.noOfNotes = 0;

        this.selectedBoardID = -1;

        this.isVisible = false;
    }

    init(layer, x, y) {
        // Draw the outer box for BoardView (Konva Rect), display this!
        // Calculate #boards that can be displayed in a view & store in maxNoBoards
        // Now create that many KonvaRect & KonvaText objects that represent 'a-board' in a loop
        // and store in boardCollection object. Make them not-visible for now.
        this.layer = layer;
        this.x = x;
        this.y = y;

        // Draw the outer box for BoardView (Konva Rect)
        var manualConfig = {
            x: this.x,
            y: this.y,
            width: (SectionSettings.skeleton.w * (SectionSettings.boardView.wPct / 100)),
            height: (SectionSettings.skeleton.h * (SectionSettings.boardView.hPct / 100))
        };
        var config = configSettings.getSectionUIConfig(manualConfig, "boardView");
        this.boardViewRect = new Konva.Rect(config);

        this.layer.add(this.boardViewRect);

        // Calculate #boards that can be displayed in a view & store in maxNoBoards
        // Now create that many KonvaRect & KonvaText objects that represent 'a-board' in a loop
        // and store in boardCollection object. Make them not-visible for now.
        var bvW = (SectionSettings.skeleton.w * (SectionSettings.boardView.wPct / 100));
        var bvH = (SectionSettings.skeleton.h * (SectionSettings.boardView.hPct / 100));


        for (var i = 0, boardID = 0; (i + 1) * SectionSettings.board.w <= bvW; ++i) {
            for (var j = 0; (j + 1) * SectionSettings.board.h <= bvH; ++j) {

                this.boardCollection[boardID] = new Board();

                var bX = this.x + (j * SectionSettings.board.w);
                var bY = this.y + (i * SectionSettings.board.h);
                this.boardCollection[boardID].init(this.layer, bX, bY);
                ++this.maxNoBoards;
                ++boardID;
            }
        }
    }

    displayNoteAt(boardID, newNoteID, newNoteText) {
        // Basically we are overwriting the note on this board
        this.boardCollection[boardID].attachNote(newNoteID, newNoteText);
        this.boardCollection[boardID].makeVisible(this.isVisible && true);
    }

    displayNoteAtStart(newNoteID, newNoteText) {
        // Well, we are inserting a new note at the beginning
        // Move the note contents (if any) from the first board to second board and so on
        // Now attach this note to the first board

        // There are 3-scenarios
        // 1. No boards are filled
        // 2. Some boards are filled
        // 3. All boards are filled

        if (this.noOfNotes === 0) {
            // 1. No boards are filled
            this.displayNoteAt(0, newNoteID, newNoteText);
            ++this.noOfNotes;

        } else if (this.noOfNotes < this.maxNoBoards) {
            // 2. Some boards are filled
            for (var i = this.noOfNotes - 1; i >= 0; --i) {
                var currNote = this.boardCollection[i].getNote();
                this.boardCollection[i + 1].attachNote(currNote.noteID, currNote.noteText);
                this.boardCollection[i + 1].makeVisible(this.isVisible && true);
            }
            this.displayNoteAt(0, newNoteID, newNoteText);
            ++this.noOfNotes;

        } else if (this.noOfNotes === this.maxNoBoards) {
            // 3. All boards are filled
            for (var i = this.noOfNotes - 1; i >= 0; --i) {
                var currNote = this.boardCollection[i].getNote();
                // Attach the note only if there is an adjacent board available 
                if (this.boardCollection[i + 1]) {
                    this.boardCollection[i + 1].attachNote(currNote.noteID, currNote.noteText);
                    this.boardCollection[i + 1].makeVisible(this.isVisible && true);
                }
            }
            this.displayNoteAt(0, newNoteID, newNoteText);
        }
    }

    displayNoteAtEnd(newNoteID, newNoteText) {
        // Well, we are appending a new note to the end
        // Move the note contents (if any) from the last board to last but one and so on
        // Now attach this note to the last board

        // There are 3-scenarios
        // 1. No boards are filled
        // 2. Some boards are filled
        // 3. All boards are filled

        if (this.noOfNotes < this.maxNoBoards) {
            // 1. No boards are filled
            // 2. Some boards are filled
            this.displayNoteAt(this.noOfNotes, newNoteID, newNoteText);
            ++this.noOfNotes;

        } else {
            // 3. All boards are filled 
            for (var i = 0; i < this.noOfNotes - 1; ++i) {
                var nextNote = this.boardCollection[i + 1].getNote();
                this.boardCollection[i].attachNote(nextNote.noteID, nextNote.noteText);
                this.boardCollection[i].makeVisible(this.isVisible && true);
            }
            this.displayNoteAt(this.noOfNotes - 1, newNoteID, newNoteText);
        }
    }

    deleteNote(boardID) {
        // Unattach note from this board, ripple move any notes present after this board

        // 1. Unattach the note from the board
        this.boardCollection[boardID].unattachNote();
        this.boardCollection[boardID].makeVisible(this.isVisible && false);

        // 2. Move the empty note board to the end by shifting the notes present (if any) one by one
        for (var i = boardID; i < this.noOfNotes - 1; ++i) {

            var nextNote = this.boardCollection[i + 1].getNote();

            // *warning*: The noteID is decremented to keep it in-sync with the (model.noteCollection) noteID
            --nextNote.noteID;

            this.boardCollection[i].attachNote(nextNote.noteID, nextNote.noteText);
            this.boardCollection[i].makeVisible(this.isVisible && true);

            this.boardCollection[i + 1].unattachNote();
            this.boardCollection[i + 1].makeVisible(this.isVisible && false);
        }

        // 3. Decrement the noOfNotes by 1 as the note is deleted now
        --this.noOfNotes;
    }

    selectBoard(boardID) {

        // Set the board as selected
        this.selectedBoardID = boardID;

        if (this.selectedBoardID !== -1) {
            // Now hightlight the 'board' i.e. decorate the outer KonvaRect to highlight selection
            var config = configSettings.getSectionUIConfig({}, "selectedKonvaRect");
            this.boardCollection[boardID].konvaRect.fill(config.fill);
            this.boardCollection[boardID].konvaRect.stroke(config.stroke);
            this.layer.draw();
        }
    }

    unselectBoard() {

        // Unselect the selected board (if any)
        if (this.selectedBoardID !== -1) {

            // Now un-decorate the board to restore it to its defaults
            var config = configSettings.getSectionUIConfig({}, "konvaRect");
            this.boardCollection[this.selectedBoardID].konvaRect.fill(config.fill);
            this.boardCollection[this.selectedBoardID].konvaRect.stroke(config.stroke);
            this.layer.draw();

            // Set the board as unselected
            this.selectedBoardID = -1; // => no note
        }
    }

    relocateAt(newOffsetX, newOffsetY) {

        this.boardViewRect.setX(newOffsetX + this.boardViewRect.x());
        this.boardViewRect.setY(newOffsetY + this.boardViewRect.y());
        
        for (var i = 0; i < this.maxNoBoards; ++i) {

            this.boardCollection[i].konvaRect.setX(newOffsetX + this.boardCollection[i].konvaRect.x());
            this.boardCollection[i].konvaRect.setY(newOffsetY + this.boardCollection[i].konvaRect.y());

            this.boardCollection[i].konvaText.setX(newOffsetX + this.boardCollection[i].konvaText.x());
            this.boardCollection[i].konvaText.setY(newOffsetY + this.boardCollection[i].konvaText.y());
        }
    }

    makeVisible(isVisible) {

        // Make the boardView itself visible/not-visible
        if (isVisible) {
            this.boardViewRect.show();
        } else {
            this.boardViewRect.hide();
        }

        // Make all the associated 'boards' visible/not-visible
        for (var i = 0; i < this.maxNoBoards; ++i) {
            var isBoardVisible = (i < this.noOfNotes);
            this.boardCollection[i].makeVisible(isVisible && isBoardVisible);
        }

        this.layer.draw();
        this.isVisible = isVisible;
    }

}