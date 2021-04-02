var express = require('express');
var applicationsController = require('../controllers/applications-controller');
var router = express.Router();

router.post('/new', (req,res) => {
    applicationsController.createApplication(req,res);
});
router.post('/delete', (req,res) => {
    applicationsController.deleteApplication(req,res);
});

// router.get('/', applicationsController.getApplications);
// router.get('/edit', applicationsController.editApplication);

module.exports = router;
