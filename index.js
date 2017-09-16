'use strict';

const http = require('http'),
    express = require('express'),
    path = require('path'),
    siofu = require("socketio-file-upload");

const app = express().use(siofu.router),
    server = http.Server(app);



app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'html');

server.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'));
});
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
        args: ['']
    }


    PythonShell.run('test.py', options, (err, results) => {
        console.log(results);
        res.send(results)
    })

})




app.use((req, res) => {
    res.status(404).send({ url: req.url });
});