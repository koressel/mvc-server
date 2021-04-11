var applicationsModel = require('../models/applications-model');

module.exports = {
    createApplication: function(req,res) {
        applicationsModel.create(req.body)
            .then(result => {
                res.sendStatus(200);
            })
            .catch(error => {
                console.log(error)
            });
    },
    deleteApplication: function(req,res) {
        applicationsModel.delete(req.body)
            .then(result => {
                res.sendStatus(200);
            })
            .catch(error => console.log(error));
    },
    getAll: function(req,res) {
        applicationsModel.getAll()
            .then(result => {
                res.json(result);
            })
            .catch(error => console.log(error));
    }
}