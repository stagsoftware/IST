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
        HTMLString += '<input type="text" id="noteText" placeholder="Enter Note Text" />' + '<br />';
        this.elementCollection['noteText'] = value;

        var noOfLines = noteTemplate.length;
        for (var i = 0; i < noOfLines; i++) {

            var noOfElements = noteTemplate[i].element.length;
            for (var j = 0; j < noOfElements; j++) {

                var type = noteTemplate[i].element[j].type;
                var value = noteTemplate[i].element[j].value;

                switch (type) {
                    case "LABEL":
                        HTMLString += '<label>' + value + '</label>';
                        break;

                    case "VALUE-CHARSTRING":
                        HTMLString += '<input type="text" id="input' + inputIDIndex + '" value="' + value + '" />' + '<br />';
                        this.elementCollection['input' + inputIDIndex] = value;
                        ++inputIDIndex;
                        break;

                    case "VALUE-NUMSTRING":
                        HTMLString += '<input type="number" id="input' + inputIDIndex + '" value="' + value + '"/>' + '<br />';
                        this.elementCollection['input' + inputIDIndex] = value;
                        ++inputIDIndex;
                        break;

                    case "VALUE-LIST":
                        HTMLString += '<select id="input' + inputIDIndex + '">';
                        for (var k = 0; k < value.length; k++) {
                            HTMLString += '<option>' + value[k] + '</option>';
                        }
                        HTMLString += '</select>' + '<br />';
                        this.elementCollection['input' + inputIDIndex] = value[0];
                        ++inputIDIndex;
                        break;
                }
            }
        }

        HTMLString += '<br />';
        HTMLString += '<input type="button" value="OK" id="ok"/>';
        HTMLString += '<input type="button" value="CANCEL" id="cancel"/>' + '<br />';

        document.getElementById('note').innerHTML = HTMLString;

        document.getElementById('ok').onclick = this.submit.bind(this, updateHandlerCallBack);
        document.getElementById('cancel').onclick = this.cancel.bind(this);

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