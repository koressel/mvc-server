var applicationsModel = require('../models/applications-model');

module.exports = {
    getApplications: function(req,res) {
        const applicationsData = applicationsModel.getApplications();
        res.render('index', {applications: applicationsData});
    }
}