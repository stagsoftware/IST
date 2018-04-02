class NoteForm {
    constructor() {

        this.elementCollection;
    }

    init(secName, noteTemplate, updateHandlerCallBack) {

        // 1. Build the HTML String for the 'note' div
        // 2. Assign ids to the input fields
        // 3. Populate the input field values to the elementCollection
        // 4. Append the form 'div' to the 'note' div
        // 5. Attach the click event handlers
        // 6. Close the 'note' div
        this.elementCollection = {};
        var inputIDIndex = 0;

        var HTMLString = "";
        HTMLString += '<label>' + secName + '</label>';
        HTMLString += '<input type="text" id="noteText" placeholder="enter note text" />';
        this.elementCollection['noteText'] = value;

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
                        HTMLString += '<input type="text" id="' + id + '" placeholder="' + value + '" />';
                        this.elementCollection[id] = value;
                        ++inputIDIndex;
                        break;

                    case "VALUE-NUMSTRING":
                        HTMLString += '<input type="number" id="' + id + '" placeholder="' + value + '"/>';
                        this.elementCollection[id] = value;
                        ++inputIDIndex;
                        break;

                    case "VALUE-LIST":
                        HTMLString += '<select id="' + id + '">';
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
                        HTMLString += '<div class="panel"><textarea id="' + id + '" placeholder="' + value + '"></textarea></div>';
                        this.elementCollection[id] = value;
                        break;
                }
            }
        }

        HTMLString += '<br />';

        // Accordion for Information Notes
        var id = "iNotes";
        var label = "iNotes";
        var value = "enter extra information";
        HTMLString += '<button class="accordion">' + label + '<i class="fa fa-angle-down down-icon"></i></button>';
        HTMLString += '<div class="panel"><textarea id="' + id + '" placeholder="' + value + '"></textarea></div>';
        this.elementCollection[id] = value;

        // Accordion for Links
        var id = "links";
        var label = "links";
        var value = "enter links (if any)";
        HTMLString += '<button class="accordion">' + label + '<i class="fa fa-angle-down down-icon"></i></button>';
        HTMLString += '<div class="panel"><textarea id="' + id + '" placeholder="' + value + '"></textarea></div>';
        this.elementCollection[id] = value;

        HTMLString += '<input type="button" value="OK" id="ok"/>';
        HTMLString += '<input type="button" value="CANCEL" id="cancel"/>' + '<br />';

        document.getElementById('note').innerHTML = HTMLString;

        document.getElementById('ok').addEventListener("click", this.submit.bind(this, updateHandlerCallBack));
        document.getElementById('cancel').addEventListener("click", this.cancel.bind(this));
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

        document.getElementById('note').style.display = 'none';
    }

    show(note) {
        // Populate the note details (if exists)
        if (note) {
            for (var inputID in note) {
                document.getElementById(inputID).value = note[inputID];
            }
        }

        document.getElementById('note').style.display = 'block';
    }

    submit(updateHandlerCallBack) {
        // Populate the this.elementCollection with the 'updated' input values
        for (var inputID in this.elementCollection) {
            this.elementCollection[inputID] = document.getElementById(inputID).value;
        }

        document.getElementById('note').style.display = 'none';
        updateHandlerCallBack();
    }


    cancel() {
        document.getElementById('note').style.display = 'none';
    }
}