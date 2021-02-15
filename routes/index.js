var express = require('express');
var indexController = require('../controllers/index-controller');

var router = express.Router();

router.get('/', (req,res) => {
  indexController.getApplications(req,res);
});

module.exports = router;
