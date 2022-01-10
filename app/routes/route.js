const express = require('express');
const router = express();
const authController = require('../controller/authController');
const { authenticate, generateToken } = require('../helpers/auth');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cd) {
        cd(null, 'app/upload')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

const upload = multer({
    storage: storage
})

router.get('/', authController.login);
router.get('/dashboard', authenticate, authController.dashboard);
router.post('/loginUser', generateToken, authController.authUser);

router.get('/registration', authController.registration);
router.post("/signup", upload.single('image'), authController.signup);

router.get("/logout", authController.logout)

router.get('/forgetPassword', authController.forgetPassword);
router.post('/verifyEmail', authController.varifyEmail);

router.get("/resetPassword", authenticate, authController.resetPassword);
router.post("/resetPswd", authenticate, authController.resetPswd);

router.get('/otp', authController.otp);
router.post('/varifyOtp', authController.varifyOtp);

router.get('/viewProfile', authenticate, authController.viewProfile);
router.post('/updateProfile', authenticate, upload.single('image'), authController.updateProfile);

router.get('/confirmPassword', authController.confirmPassword);
router.post('/updatePassword', authController.updatePassword);


module.exports = router;


