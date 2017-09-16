var fs = require('fs-extra'),
    ncp = require('ncp'),
    path = require('path');


class Profile {
    constructor(profileId) {
        this.id = profileId
        this.repositories = {}
    }

    newRepository(id, repoId) {
        this.repositories[repoId] = repo
    }

    obtainRepo(repoId) {
        return this.repositories[repoId]
    }
}

class Repositiory {
    constructor(repoId, previousVerison = null) {
        this.tracks = []
        this.previousVersion = previousVerison
        this.id = repoId
    }

    addTrack(track) {
        this.tracks.push(track)
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
        },

        createNewRepo: (userId, repoId) => {
            fs.mkdirSync("./users/" + userId + "/" + repoId)
        },

        getUserRepo: userId => {
            return profileMap[userId].obtainRepo()
        },

        cloneRepo: (sourceProfileId, sourceRepoId, targetProfileId) => {
            let targetRepoId = "targetId"

            const callback = () => {}

            //ncp(path.join(__dirname, "users", sourceProfileId, sourceRepoId), path.join(__dirname, "users", targetProfileId, targetRepoId), callback);
            ncp("./users/" + sourceProfileId + '/' + sourceRepoId, "./users/" + targetProfileId + "/" + targetRepoId, callback);
        }
    }
})()










