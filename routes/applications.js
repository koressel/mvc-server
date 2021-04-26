var express = require('express');
fs = require('fs');
var applicationsController = require('../controllers/applications-controller');
var router = express.Router();

router.get('/', (req,res) => {
    applicationsController.getAll(req,res);
});
router.post('/new', (req,res) => {
    applicationsController.createApplication(req,res);
});
router.post('/delete', (req,res) => {
    applicationsController.deleteApplication(req,res);
});

router.post('/update', (req,res) => {
    applicationsController.editApplication(req,res);
});
router.get('/files/:fileName', (req,res) => {
    let stream = fs.createReadStream('public/assets/testResume.pdf');
    let fileName = req.params.fileName;
    fileName = encodeURIComponent(fileName);

    res.setHeader('Content-disposition', 'inline; filename="' + fileName + '"');
    res.contentType("application/pdf");

    stream.pipe(res);

    // fs.readFile(filePath , function (err,data){
    //     res.setHeader('Content-disposition', 'inline; filename="' + filename + '"');
    //     res.contentType("application/pdf");
    //     res.send(data);
    // });

    // res.sendFile('testResume.pdf', {root: './public/assets/'});
    // res.download('public/assets/testResume.pdf', 'resume.pdf');

});


module.exports = router;
