var mongoose = require('mongoose');

Schema = mongoose.Schema;

var portfolio = new Schema({
    projectCategory: { type: String },
    projectName: { type: String },
    projectImage: { type: Array },
    projectTitle: { type: String },
    projectDate: { type: String },
    projectDescription: { type: String }
});

var portfolioModel = mongoose.model('portfolio', portfolio);

module.exports = portfolioModel;