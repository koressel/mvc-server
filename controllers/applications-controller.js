var applicationsModel = require('../models/applications-model');


module.exports = {
    createApplication: function(req,res) {
        const data = req.body;
        data['fileNames'] = '';

        for(let i = 0; i < req.files.length; i++) {
            if(i !== (req.files.length - 1)) {
                data.fileNames += req.files[i].originalname + ',';
            }
            else {
                data.fileNames += req.files[i].originalname;
            } 
        }

        applicationsModel.create(data)
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
    },
    editApplication: function(req,res) {
        applicationsModel.edit(req.body)
        .then(result => {
            res.json(result);
        })
        .catch(error => console.log(error));
    }
}