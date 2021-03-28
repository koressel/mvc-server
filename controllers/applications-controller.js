var applicationsModel = require('../models/applications-model');

module.exports = {
    createApplication: function(req,res) {
        applicationsModel.create(req.body)
            .then(result => {
                res.render('index', {applications: result})
            });
        res.sendStatus(200);
    }
}