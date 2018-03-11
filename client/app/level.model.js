
class LevelModel {
    constructor() {
        this.sectionCollection;
    }

    init(sectionCollection) {
        this.sectionCollection = sectionCollection;
    }

    createsection(section) {
        this.sectionCollection.push(section);
    }

    getsectionByName(name) {
        return this.sectionCollection.find((section) => section.name === name);
    }

    deletesection(sectionID) {
        if (sectionID !== -1) {
            return this.sectionCollection.splice(sectionID, 1);
        }
    }

    updatesection(sectionID, updatedSection) {
        this.sectionCollection[sectionID] = updatedSection;
    }
}