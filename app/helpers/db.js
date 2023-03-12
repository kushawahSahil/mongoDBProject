var mongoose = require('mongoose');

//Database connectivity
mongoose.connect('mongodb://um75qnk7khhftft1nnua:44L5rqM45Gke66Xj4dcB@n1-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017,n2-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017/bc4lu297ckwqepu?replicaSet=rs0')
    .then(() => console.log('connect to mongoDB...'))
    .catch(err => console.error('could not connect to mongoDB...', err));


Schema = mongoose.Schema;

//create Auth Schema
var Auth = new Schema({
    fname: { type: String },
    lName: { type: String },
    gender: { type: String, enum: ['Male', 'Female', 'other'] },
    hobby: { type: Array },
    mobile: { type: Number },
    email: { type: String },
    Password: { type: String },
    city: { type: String },
    image: { type: String }
});

var AuthModel = mongoose.model('Auth', Auth);

module.exports = AuthModel;