const { Route } = require("express");
let express = require("express");
let router = express.Router();

const route = require('./route');
const contact_route = require('./contact_route');
const category_route = require('./category_route');
const testimonial_route = require('./testimonial_route');
const portfolio_route = require('./portfolio_route');

router.use('/', route);
router.use('/', contact_route);
router.use('/', category_route);
router.use('/', testimonial_route);
router.use('/', portfolio_route);

module.exports = router;