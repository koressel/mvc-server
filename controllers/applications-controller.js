var applicationsModel = require('../models/applications-model');

module.exports = {
    createApplication: function(req,res) {
        console.log(req.body);
        // applicationsModel.createNew()
        //     .then(result => {
        //         res.render('index', {applications: result})
        //     });
        res.sendStatus(200);
    }
}