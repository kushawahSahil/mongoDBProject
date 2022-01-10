const express = require('express');
const router = express();
const testimonialController = require('../controller/testimonialController');
const { authenticate } = require('../helpers/auth');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cd) {
        cd(null, 'app/upload')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldName + '-' + Date.now());
    }
});

const upload = multer({
    storage: storage
})


router.get('/testimonial', authenticate, testimonialController.viewTestimonial);
router.get('/showAddTestimonial', authenticate, testimonialController.showAddTestimonial);
router.post('/addTestimonial', upload.single('testimonialImage'), authenticate, testimonialController.addTestimonial);

router.get('/multipleDeleteTestimonial', authenticate, testimonialController.multipleDeleteTestimonial);

router.get('/deleteTestimonial/:id', authenticate, testimonialController.deleteTestimonial);

router.get('/showEditTestimonial/:id', authenticate, testimonialController.showEditTestimonial);
router.get('/showEditTestimonial/updateTestimonial/:id', upload.single('testimonialImage'), authenticate, testimonialController.updateTestimonial);

module.exports = router;