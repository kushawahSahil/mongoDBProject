const express = require('express');
const router = express();
const categoryController = require('../controller/categoryController');
const { authenticate } = require('../helpers/auth');

router.get('/category', authenticate, categoryController.viewCategory);
router.get('/showAddCategory', authenticate, categoryController.showAddCategory);
router.post('/addCategory', authenticate, categoryController.addCategory);

router.get("/multipleDeleteCategory", authenticate, categoryController.multipleDeleteCategory);

router.get("/deleteCategory/:id", authenticate, categoryController.deleteCategory);

router.get('/showEditCategory/:id', authenticate, categoryController.showEditCategory);
router.post('/showEditCategory/updateCategory/:id', authenticate, categoryController.updateCategory);



module.exports = router;