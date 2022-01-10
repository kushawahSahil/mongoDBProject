var mongoose = require('mongoose');


Schema = mongoose.Schema;

var testimonial = new Schema({
    testimonialName: { type: String },
    designation: { type: String },
    testimonialDescription: { type: String },
    testimonialImage: { type: String },

});

var testimonialModel = mongoose.model('testimonial', testimonial);

module.exports = testimonialModel;