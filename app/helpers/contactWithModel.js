var mongoose = require('mongoose');


Schema = mongoose.Schema;

var contact = new Schema({
    contactName: { type: String },
    email: { type: String },
    contactNumber: { type: String },
    messages: { type: String },
    date: { type: String }
});

var contactWithModel = mongoose.model('contact', contact);

module.exports = contactWithModel;