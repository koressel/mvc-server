var applicationsModel = require('../models/applications-model');

module.exports = {
    createApplication: function(req,res) {
        // applicationsModel.createNew()
        //     .then(result => {
        //         res.render('index', {applications: result})
        //     });
        res.sendStatus(200);
    }
}