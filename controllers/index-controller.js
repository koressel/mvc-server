var applicationsModel = require('../models/applications-model');

module.exports = {
    getApplications: function(req,res) {
        applicationsModel.getAll()
            .then(result => {
                res.render('index', {applications: result})
            });
    }
}