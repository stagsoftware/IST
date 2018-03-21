var mongoose = require('mongoose');
var templateSchema = mongoose.Schema({
    name: String,
    value: String
});

module.exports = mongoose.model('Template', templateSchema);