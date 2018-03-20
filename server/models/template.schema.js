var mongoose = require('mongoose');
var templateSchema = mongoose.Schema({
    Name: String,
    templateValue: Object
});

module.exports = mongoose.model('Template', templateSchema);