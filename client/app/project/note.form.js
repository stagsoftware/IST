
class NoteForm {
    constructor() {

        this.elementCollection;
    }

    init(wsName, secName, noteTemplate, updateHandlerCallBack) {

        // 1. Build the HTML String for the 'note' div
        // 2. Assign ids to the input fields
        // 3. Populate the input field values to the elementCollection
        // 4. Append the form 'div' to the 'note' div
        // 5. Attach the click event handlers
        // 6. Close the 'note' div
        this.elementCollection = {};
        var inputIDIndex = 0;

        var HTMLString = "";

        HTMLString += '<div class="modal-dialog">';
        HTMLString += '<div class="modal-content">';

        HTMLString += '<div class="modal-header">';
        HTMLString += '<label>' + secName + '</label>';
        HTMLString += '<input type="text" id="name" class="form-control" placeholder="enter note text" />';
        this.elementCollection['name'] = value;
        HTMLString += '</div>';

        HTMLString += '<div class="modal-body">';

        var noOfLines = noteTemplate.length;
        for (var i = 0; i < noOfLines; i++) {

            var noOfElements = noteTemplate[i].element.length;
            for (var j = 0; j < noOfElements; j++) {

                var type = noteTemplate[i].element[j].type;
                var id = noteTemplate[i].element[j].id || ('input' + inputIDIndex);
                var value = noteTemplate[i].element[j].value;

                switch (type) {
                    case "LABEL":
                        HTMLString += '<label>' + value + '</label>';
                        break;

                    case "VALUE-CHARSTRING":
                        HTMLString += '<input type="text" id="' + id + '" class="form-control" placeholder="' + value + '" />';
                        this.elementCollection[id] = value;
                        ++inputIDIndex;
                        break;

                    case "VALUE-NUMSTRING":
                        HTMLString += '<input type="number" id="' + id + '" class="form-control" placeholder="' + value + '"/>';
                        this.elementCollection[id] = value;
                        ++inputIDIndex;
                        break;

                    case "VALUE-LIST":
                        HTMLString += '<select id="' + id + '" class="form-control">';
                        for (var k = 0; k < value.length; k++) {
                            HTMLString += '<option>' + value[k] + '</option>';
                        }
                        HTMLString += '</select>';
                        this.elementCollection[id] = value[0];
                        ++inputIDIndex;
                        break;

                    case "ACCORDION-LABEL":
                        HTMLString += '<button class="accordion">' + value + '<i class="fa fa-angle-down down-icon"></i></button>';
                        break;

                    case "ACCORDION-PANEL":
                        HTMLString += '<div class="panel"><textarea id="' + id + '" class="form-control" placeholder="' + value + '"></textarea></div>';
                        this.elementCollection[id] = value;
                        break;
                }
            }
        }

        // Accordion for Information Notes
        var id = "iNotes";
        var label = "iNotes";
        var value = "enter extra information";
        HTMLString += '<button class="accordion">' + label + '<i class="fa fa-angle-down down-icon"></i></button>';
        HTMLString += '<div class="panel"><textarea id="' + id + '" class="form-control" placeholder="' + value + '"></textarea></div>';
        this.elementCollection[id] = value;

        // Accordion for Links
        var id = "links";
        var label = "links";
        var value = "enter links (if any)";
        HTMLString += '<button class="accordion">' + label + '<i class="fa fa-angle-down down-icon"></i></button>';
        HTMLString += '<div class="panel"><textarea id="' + id + '" class="form-control" placeholder="' + value + '"></textarea></div>';
        this.elementCollection[id] = value;

        HTMLString += '</div>';

        HTMLString += '<div class="modal-footer">';
        HTMLString += '<button id="ok" type="button" class="btn btn-default" data-dismiss="modal">ok</button>';
        HTMLString += '<button id="cancel" type="button" class="btn btn-default" data-dismiss="modal">close</button>';
        HTMLString += '</div>';

        HTMLString += '</div>';
        HTMLString += '</div>';

        document.getElementById('note').innerHTML = HTMLString;

        document.getElementById('ok').addEventListener("click", this.submit.bind(this, updateHandlerCallBack));
        var accordions = document.getElementsByClassName("accordion")
        for (var i = 0; i < accordions.length; i++) {
            accordions[i].addEventListener("click", function () {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = "100px";
                }
            });
        }

        // Get all note links available on the screen

        var scope = angular.element($("#note")).scope();
        var projectData = scope.project.save();

        var currWS = projectData.workspaces.find(ws => ws.name === wsName);
        var levels = currWS.value;
        var sections = [].concat(...levels.map(level => level.value));
        var secWithNotes = sections.filter(section => section.value.length);

        var secNoteTagCollection = secWithNotes.map(sec => sec.value.map(note => sec.name + " : " + note.name));
        var secNoteTags = [].concat(...secNoteTagCollection);

        $('#links').suggest('@', {
            data: secNoteTags,
            map: function (secNoteTag) {
                return {
                    value: secNoteTag,
                    text: '<strong>' + secNoteTag + '</strong>'
                }
            },
            filter: {
                limit: 10
            }
        });

    }

    show(note) {
        // Populate the note details (if exists)
        if (note) {
            for (var inputID in note) {
                document.getElementById(inputID).value = note[inputID];
            }
        }
        $('#note').modal('show');
    }

    submit(updateHandlerCallBack) {
        // Populate the this.elementCollection with the 'updated' input values
        for (var inputID in this.elementCollection) {
            this.elementCollection[inputID] = document.getElementById(inputID).value;
        }
        updateHandlerCallBack();
    }

}