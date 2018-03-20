
class Project {
    constructor() {

        this.session;
        this.jottings;
        this.notes;
        this.questions;
    }

    init(currWsName, templateJSON, valueJSON) {

        this.session = new Session();
        this.session.init(currWsName, templateJSON.workspaces, valueJSON.workspaces);

        this.jottings = valueJSON.jottings;
        this.notes = valueJSON.notes;
        this.questions = valueJSON.questions;
    }

    save() {
        
        var updatedSession = this.session.save();
        return {
            "workspaces": updatedSession,
            "jottings": this.jottings,
            "notes": this.notes,
            "questions": this.questions
        };    
    }
}