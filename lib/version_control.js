var fs = require('fs-extra'),
    ncp = require('ncp'),
    path = require('path');


class Profile {
    constructor(profileId) {
        this.id = profileId
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

exports = module.exports = (function() {
    let profileMap = {}

    return {
        createNewProfile: function(userId) {
            fs.mkdir("./users/" + userId)
            let profile = new Profile(userId)
            profileMap[userId] = profile
        },

        deleteProfile: userId => {
            fs.removeSync("./users/" + userId)
            profileMap[userId] = null;
        },

        createNewRepo: (userId, repoId) => {
            fs.mkdirSync("./users/" + userId + "/" + repoId)
            profileMap[userId].newRepository(new Repositiory(repoId))
        },

        addToRepo: (sourcePath, targetUserId, targetRepoId, fileName) => {
            console.log(path.join(__dirname, 'users', targetUserId, targetRepoId))
            let trackDir = "./users/" + targetUserId + "/" + targetRepoId + "/" + fileName;
            fs.moveSync(sourcePath, trackDir)
            profileMap[targetUserId].repositories[targetRepoId].addTrack(trackDir)
        },

        deleteRepo: (userId, repoId) => {
            fs.removeSync("./users/" + userId + "/" + repoId)
            profileMap[userId].repositories[repoId] = null
        },

        getUserRepo: userId => {
            return profileMap[userId].obtainRepo()

        },

        cloneRepo: (sourceProfileId, sourceRepoId, targetProfileId, targetRepoId) => {
            ncp("./users/" + sourceProfileId + '/' + sourceRepoId, "./users/" + targetProfileId + "/" + targetRepoId, () => {
                profileMap[sourceProfileId].obtainRepo(sourceRepoId).forkedVersions.push(targetProfileId)
                profileMap[targetProfileId].repositories[targetRepoId] =
                    new Repositiory(targetRepoId, "./users/" + sourceProfileId + "/" + sourceRepoId)
            });

        }
    }
})()










