var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var vcs = require('../lib/version_control.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('fileUpload', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  // create an incoming form object
   var form = new formidable.IncomingForm();

   // specify that we want to allow the user to upload multiple files in a single request
   form.multiples = true;

   // store all uploads in the /uploads directory
   form.uploadDir = path.join(__dirname, '../public/uploads');

   // every time a file has been uploaded successfully,
   // rename it to it's orignal name
   form.on('file', function(field, file) {
     fs.rename(file.path, path.join(form.uploadDir, file.name));
    vcs.createNewRepo(req.user.uniqId, req.query.reponame);
       vcs.addToRepo(path.join(form.uploadDir, file.name), req.user.uniqId, req.query.reponame, file.name)
   });

   // log any errors that occur
   form.on('error', function(err) {
     console.log('An error has occured: \n' + err);
   });

   // once all the files have been uploaded, send a response to the client
   form.on('end', function() {
     res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req);

})

module.exports = router;
