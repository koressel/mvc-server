var express = require('express');
var applicationsController = require('../controllers/applications-controller');
var router = express.Router();

// router.get('/', applicationsController.getApplications);
router.post('/createNew', (req,res) => {
    console.log(req.body);
    // applicationsController.createApplication(req,res)
});
// router.get('/edit', applicationsController.editApplication);
// router.get('/delete', applicationsController.deleteApplication);

module.exports = router;
