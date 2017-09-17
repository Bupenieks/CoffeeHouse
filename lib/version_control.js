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
    constructor(repoId, previousVerison = null) {
                this.tracks = []
                this.previousVersion = previousVerison
                this.forkedVersions = []
               this.id = repoId
                }

    addTrack(track) {
                this.tracks.push(track)
            }
}


class Track {
    constructor(name) {
        this.name = name
    }
}

let profileMap = {}
let usernameMap = {}

exports = module.exports = (function() {

    return {

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
            profileMap[userId].newRepository(new Repositiory(repoName))
            fs.mkdirSync("./users/" + userId + "/" + repoName)
        },

        addToRepo: (sourcePath, targetUserId, targetRepoName, fileName) => {
            console.log(path.join(__dirname, 'users', targetUserId, targetRepoName))
            let trackDir = "./users/" + targetUserId + "/" + targetRepoName + "/" + fileName;
            fs.moveSync(sourcePath, trackDir)
            profileMap[targetUserId].repositories[targetRepoName].addTrack(trackDir)
        },

        deleteRepo: (userId, repoName) => {
            fs.removeSync("./users/" + userId + "/" + repoId)
            profileMap[userId].repositories[repoName] = null
        },

        getUserRepo: userId => {
            return profileMap[userId].obtainRepo()

        },

        cloneRepo: (sourceProfileId, sourceRepoId, targetProfileId, targetRepoName) => {
            ncp("./users/" + sourceProfileId + '/' + sourceRepoId, "./users/" + targetProfileId + "/" + targetRepoName, () => {
                profileMap[sourceProfileId].obtainRepo(sourceRepoId).forkedVersions.push(targetProfileId)
                profileMap[targetProfileId].repositories[targetRepoName] =
                    new Repositiory(targetRepoName, "./users/" + sourceProfileId + "/" + sourceRepoId)
            });

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
            console.log(json)
        }
    }
})()










