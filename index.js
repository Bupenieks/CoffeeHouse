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
    vcs = require('./lib/version_control.js'),
    create = require('./routes/create'),
    profile = require('./routes/profile'),
    signup = require('./routes/signup'),
    login = require('./routes/login'),
    favicon = require('serve-favicon');

const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const config = require('./lib/database')
const mongoose = require('mongoose');


mongoose.connect(config.database);
let db = mongoose.connection;

const app = express().use(siofu.router),
			server = http.Server(app);

// Check for db errors
db.on('error', (err) => {
    console.log(err);
})

db.once('open', () => {
    console.log('Connected to mongodb');
})



// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

// Express Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}));


app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));

// Passport config
require('./lib/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.all('*', (req, res, next) => {
    res.locals.user = req.user || null;
    next();
})

function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'users')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(cookieParser());
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');

app.use('/', index);
app.use('/upload', fileUpload);
app.use('/home', home);
app.use('/project', project);
app.use('/create', create);
app.use('/profile', profile);
app.use('/signup', signup);
app.use('/login', login);


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

let user = require('./routes/signup.js');
app.use('/users', user);

app.use((req, res) => {
    res.status(404).send({ url: req.url });
});

module.exports = {
  app,
  loggedIn
}
