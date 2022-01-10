const express = require('express');
const router = express();
const contactController = require('../controller/contactController');
const { authenticate, generateToken } = require('../helpers/auth');


router.get('/contact', authenticate, contactController.viewContact);
router.get('/showAddContact', authenticate, contactController.showAddContact);
router.post('/addContact', authenticate, contactController.addContact);

router.get("/multipleDeleteC", authenticate, contactController.multipleDeleteC);

router.get("/deleteContact/:id", authenticate, contactController.deleteContact);

router.get('/showEditContact/:_id', authenticate, contactController.showEditContact);
router.post('/showEditContact/updateContact/:_id', authenticate, contactController.updateContact);


module.exports = router;