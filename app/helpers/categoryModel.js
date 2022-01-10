var mongoose = require('mongoose');


Schema = mongoose.Schema;

var category = new Schema({
    categoryName: { type: String },

});

var categoryModel = mongoose.model('category', category);

module.exports = categoryModel;