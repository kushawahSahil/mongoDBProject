var express = require('express');
var app = express();

const cookie = require('cookie-parser');

const bodyParser = require('body-parser');
const db = require('./app/helpers/db');

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookie());
const path = require('path');
const req = require('express/lib/request');
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

app.use('/', require('./app/routes/route'));
app.use('/', require('./app/routes/contact_route'));
app.use('/', require('./app/routes/category_route'));
app.use('/', require('./app/routes/testimonial_route'));
app.use('/', require('./app/routes/portfolio_route'));

app.use(express.static('app/upload'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${3000}....`));
