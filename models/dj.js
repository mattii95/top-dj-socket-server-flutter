const {v4: uuidV4} = require('uuid');

class Dj {
    constructor(name = 'no-name'){
        this.id = uuidV4(); //id unico
        this.name = name;
        this.votes = 0;
    }
}

module.exports = Dj;