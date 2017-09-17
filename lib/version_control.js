var fs = require('fs-extra'),
    ncp = require('ncp'),
    path = require('path'),
    uuid = require('uuid')


class Profile {
    constructor(profileId, username, fullname, email) {
        this.id = profileId
        this.username = username
        this.fullname = fullname
        this.email = email
        this.repositories = {}
    }

    newRepository(repo) {
        this.repositories[repo.id] = repo
    }

    obtainRepo(repoId) {
        return this.repositories[repoId]
    }

}

class Repositiory {
    constructor(repoId, owner, previousVerison = null) {
        this.tracks = []
        this.previousVersion = previousVerison
        this.forkedVersions = []
        this.id = repoId
        this.mainFileLoc = null
        this.owner = owner
    }

    addTrack(track) {
        if (this.tracks.length == 0) {
            this.mainFileLoc = track.loc
            console.log("ADDDED:")
            console.log(track)
        } else {
            const PythonShell = require('python-shell')

            PythonShell.defaultOptions = {
                scriptPath: './lib'
            }

            var options = {
                mode: 'text',
                pythonOptions: ['-u'],
                args: ['./exports', track.loc, this.mainFileLoc, toString(track.timing)]
            }


            PythonShell.run('gitMusic.py', options, (err, results) => {
                console.log(results[0])
                ncp(results[0], "./users/" + this.owner + "/" + this.id, () => {

                })
            })
            console.log("pushed:")
            console.log(track)
        }
        this.tracks.push(track)
    }

    toJSON() {
        return {
            tracks: this.tracks,
            previousVersion: this.previousVersion,
            forkedVersions: this.forkedVersions,
            id: this.id,
            mainFileLoc: this.mainFileLoc,
            owner: this.owner,
        }
    }
}

class Track {
    constructor(loc, time) {
        this.loc = loc
        this.timing = time
    }
}

let profileMap = {}
let usernameMap = {}

exports = module.exports = (function() {

    return {
        getUserId: (username) => {
            return usernameMap[username]
        },

        createNewProfile: function(userId, username, name, email) {
            usernameMap[username] = userId
            fs.mkdir("./users/" + userId)
            let profile = new Profile(userId, username, name, email)
            profileMap[userId] = profile
        },

        deleteProfile: userId => {
            fs.removeSync("./users/" + userId)
            profileMap[userId] = null;
        },

        createNewRepo: (userId, repoName) => {
            profileMap[userId].newRepository(new Repositiory(repoName, userId))
            fs.mkdirSync("./users/" + userId + "/" + repoName)
        },

        addToRepo: (sourcePath, targetUserId, targetRepoName, fileName, timing) => {
            console.log(path.join(__dirname, 'users', targetUserId, targetRepoName))
            let trackDir = "./users/" + targetUserId + "/" + targetRepoName + "/" + fileName;
            fs.moveSync(sourcePath, trackDir)
            profileMap[targetUserId].repositories[targetRepoName].addTrack(new Track(trackDir, timing))
        },

        deleteRepo: (userId, repoName) => {
            fs.removeSync("./users/" + userId + "/" + repoId)
            profileMap[userId].repositories[repoName] = null
        },

        getUserRepo: (userId, repoName) => {
            console.log("pmap: "+profileMap[userId]);
            return profileMap[userId].repositories[repoName]
        },

        cloneRepo: (sourceProfileId, sourceRepoId, targetProfileId, targetRepoName) => {
            ncp("./users/" + sourceProfileId + '/' + sourceRepoId, "./users/" + targetProfileId + "/" + targetRepoName, () => {
                profileMap[sourceProfileId].obtainRepo(sourceRepoId).forkedVersions.push(targetProfileId)
                profileMap[targetProfileId].repositories[targetRepoName] =
                    new Repositiory(targetRepoName, "./users/" + sourceProfileId + "/" + sourceRepoId)
            });

        },

        ownerToUser: (owner) => {
          return profileMap[owner].username;
        },

        getJSON: (username = null) => {
            let json = []
            if (username) {
                json = profileMap[usernameMap[username]]
            } else {
                for (id in profileMap) {
                    json.push(profileMap[id])
                }
            }
            return json;
        }
    }
})()
