const express = require('express');
const router = express();
const portfolioController = require('../controller/portfolioController');
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


router.get('/portfolio', authenticate, portfolioController.viewPortfolio);
router.get('/showAddPortfolio', authenticate, portfolioController.showAddPortfolio);
router.post('/addPortfolio', authenticate, upload.array('projectImage', 5), portfolioController.addPortfolio);

router.get("/multiDeletePortfolio", authenticate, portfolioController.multiDeletePortfolio);

router.get('/deletePortfolio/:id', authenticate, portfolioController.deletePortfolio);

router.get('/showEditPortfolio/:id', authenticate, portfolioController.showEditPortfolio);
router.post('/showEditPortfolio/updatePortfolio/:id', authenticate, upload.array('projectImage', 5), portfolioController.updatePortfolio);



module.exports = router;
