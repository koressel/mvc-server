var applicationsModel = require('../models/applications-model');

module.exports = {
    getApplications: function(req,res) {
        applicationsModel.getApplications()
            .then(result => {
                res.render('index', {applications: result})
            });
    }
}