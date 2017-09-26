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


            var options = {
                mode: 'text',
                pythonOptions: ['-u'],
                scriptPath: '/Users/Ben/Desktop/github/GithubMusic/lib/mp3_merge.py',
                args: ['./public', track.loc, this.mainFileLoc, toString(track.timing)]
            }


            PythonShell.run('gitMusic.py', options, (err, results) => {
                console.log("!@#$!@#$!@")
                console.log(results)
                /*ncp(results[0], "./public/users/" + this.owner + "/" + this.id, () => {
                    console.log("HERE12345")
                })*/
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
            fs.mkdir("./public/users/" + userId)
            let profile = new Profile(userId, username, name, email)
            profileMap[userId] = profile
        },

        deleteProfile: userId => {
            fs.removeSync("./public/users/" + userId)
            profileMap[userId] = null;
        },

        createNewRepo: (userId, repoName) => {
            profileMap[userId].newRepository(new Repositiory(repoName, userId))
            fs.mkdirSync("./public/users/" + userId + "/" + repoName)
        },

        addToRepo: (sourcePath, targetUserId, targetRepoName, fileName, timing) => {
            console.log(path.join(__dirname, 'public/users', targetUserId, targetRepoName))
            let trackDir = "./public/users/" + targetUserId + "/" + targetRepoName + "/" + fileName;
            fs.moveSync(sourcePath, trackDir)
            profileMap[targetUserId].repositories[targetRepoName].addTrack(new Track(trackDir, timing))
        },

        deleteRepo: (userId, repoName) => {
            fs.removeSync("./public/users/" + userId + "/" + repoId)
            profileMap[userId].repositories[repoName] = null
        },

        getUserRepo: (userId, repoName) => {
            console.log("pmap: "+profileMap[userId]);
            return profileMap[userId].repositories[repoName]
        },

        cloneRepo: (sourceProfileId, sourceRepoId, targetProfileId, targetRepoName) => {
            ncp("./public/users/" + sourceProfileId + '/' + sourceRepoId, "./public/users/" + targetProfileId + "/" + targetRepoName, () => {
                profileMap[sourceProfileId].obtainRepo(sourceRepoId).forkedVersions.push(targetProfileId)
                profileMap[targetProfileId].repositories[targetRepoName] =
                    new Repositiory(targetRepoName, "./public/users/" + sourceProfileId + "/" + sourceRepoId)
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
