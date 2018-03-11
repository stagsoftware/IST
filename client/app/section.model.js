class SectionModel {

    constructor() {
        this.noteCollection;
    }

    init(sectionJSON) {
        this.noteCollection = sectionJSON;
    }

    addNote(newNote) {
        this.noteCollection.push(newNote);
    }

    insertNote(newNote, noteID) {
        this.noteCollection.splice(noteID, 0, newNote);
    }

    getNoteByName(name) {
        return this.noteCollection.find((note) => note.name === name);
    }

    deleteNote(noteID) {
        if (noteID !== -1) {
            return this.noteCollection.splice(noteID, 1);
        }
    }

    updateNote(noteID, updatedNote) {
        this.noteCollection[noteID] = updatedNote;
    }

}