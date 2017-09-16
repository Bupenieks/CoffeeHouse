'use strict';

const http = require('http'),
    express = require('express'),
    path = require('path'),
		logger = require('morgan'),
    // cookieParser = require('cookie-parser'),
    siofu = require("socketio-file-upload"),
		bodyParser = require('body-parser'),
    index = require('./routes/index'),
    fileUpload = require('./routes/fileUpload'),
    home = require('./routes/home'),
    project = require('./routes/project'),
    vcs = require('./lib/version_control.js');

const app = express().use(siofu.router),
			server = http.Server(app);

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(cookieParser());
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');

app.use('/', index);
app.use('/upload', fileUpload);
app.use('/home', home);
app.use('/project', project);

/*
io.on("connection", function(socket){
    var uploader = new siofu();
    uploader.dir = "/path/to/save/uploads";
    uploader.listen(socket);
});
*/

app.get('/test/', (req, res) => {
    const PythonShell = require('python-shell')

    PythonShell.defaultOptions = {
        scriptPath: './lib'
    }

    var options = {
        mode: 'text',
        pythonOptions: ['-u'],
        args: ['./exports', './users/user1/repoId/e.mp3', './users/user1/repoId/f.mp3']
    }

   /* vcs.createNewProfile("user1")
    vcs.createNewProfile("user2")
    vcs.createNewRepo("user1", "repoId")
    vcs.cloneRepo("user1", "repoId", "user2")*/


    PythonShell.run('gitMusic.py', options, (err, results) => {
        console.log(results);
        res.send(results)
    })

})

server.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'));
});

app.use((req, res) => {
    res.status(404).send({ url: req.url });
});

module.exports = app;
