var mongoose = require('mongoose');
var UISettingSchema = mongoose.Schema({
    Name: String,
    Value: Object
});

module.exports = mongoose.model('UISetting', UISettingSchema);