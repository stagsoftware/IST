var mongoose = require('mongoose');
var UISettingSchema = mongoose.Schema({
    name: String,
    value: String
});

module.exports = mongoose.model('UISetting', UISettingSchema);