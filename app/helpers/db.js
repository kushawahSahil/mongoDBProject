var mongoose = require('mongoose');

//Database connectivity
mongoose.connect('mongodb://uxwu6yorypg72pvrj7hh:yqyntzaogrcr4YiltwFr@n1-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017,n2-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017/b8lotx2u1psv7qf?replicaSet=rs0')
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