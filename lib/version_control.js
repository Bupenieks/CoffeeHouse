mongoose.connect('mongodb://localhost/scrabble')
var db = mongoose.connection

class Profile {
    constructor(id) {
        this.id = id
        this.repositories = {}
    }

    newRepository(id, repo) {
        this.repositories[id] = repo
    }

    obtainRepo(id) {
        return this.repositories[id]
    }
}

class Repositiory {
    constructor(previousVerison = null) {
        this.tracks = []
        this.previousVersion = previousVerison
    }

    addTrack(track) {
        this.tracks.push(track)
    }
}


class TrackPointer {
    contstructor(ptr) {
        this.ptr = ptr
    }
}













