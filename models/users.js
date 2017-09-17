const mongoose = require('mongoose');
const vcs = require("../lib/version_control")

const RepositorySchema = mongoose.Schema({

})

// User Schema
const UserSchema = mongoose.Schema({
    uniqId:{ type: String, required: false},
    name:{ type: String, required: false },
    email:{ type: String, required: false },
    username:{ type: String, required: true },
    password:{ type: String, required: true },
    repositories: [{
        tracks: [String],
        previousVersion: String,
        forkedVersions: [String],
    }]
})

const User = module.exports = mongoose.model('User', UserSchema)