var mongoose = require('mongoose');
const url = 'mongodb://nedst:C4rl0N3d@dustie-shard-00-00-iozun.mongodb.net:27017,dustie-shard-00-01-iozun.mongodb.net:27017,dustie-shard-00-02-iozun.mongodb.net:27017/test?ssl=true&replicaSet=Dustie-shard-0&authSource=admin&retryWrites=true'

mongoose.connect(url, { useNewUrlParser: true })

var LevelsSchema = mongoose.Schema({
    guildid: String,
    users: Array
});

var Economy = module.exports = mongoose.model('levels', LevelsSchema);

let defaultLevels = {
    id: "userid",
    level: 0,
    totalxp: 0,
    xp: 0,
    commandsused: 0,
    settings: {
        image: false,
        biamge: "",
        color: ""
    }
}

module.exports.createGuild = function (guild, id) {
    guild.guildid = id;
    guild.save((err, res) => { if (err) console.log(err) })
}

module.exports.get = async function (id, path) {
    let data = await get(id);
    if (path) return eval(`data.${path}`)
    return data
}

module.exports.check = async function (message, person) {
    let users = await this.get(message.guild.id, "users")
    let user = users.find(u => u.id === person.id)
    if (!user) return false
    return true
}

module.exports.user = async function (message, person) {
    let users = await this.get(message.guild.id, "users")
    let user = users.find(u => u.id === person.id)

    if (!user) return undefined;
    return user
}

module.exports.createuser = async function (guild, userid) {
    let array = defaultLevels
    array.id = userid

    this.push(guild, `users`, array)
}

module.exports.deleteServer = function (id) {
    Economy.findOneAndDelete({ guildid: id },
        (err, res) => { if (err) console.log(err) }
    )
}

module.exports.set = function (id, user, path, newV) {
    update = {}
    update[`users.$.${path}`] = Number(newV);
    Economy.updateOne(
        {
            "guildid": id,
            "users.id": user
        },
        {
            "$set": update
        },
        function (err, raw) {
            if (err) return new Error(err);
        }
    );
}

module.exports.add = async function (id, user, path, added) {
    let index;
    let users = await this.get(id, "users")
    for (var i = 0; users.length > i; i++) {
        if (users[i].id == user) {
            index = i;
        }
    }
    let oldV = await this.get(id, "users[" + index + "]." + path)
    update = {}
    update[`users.$.${path}`] = Number(added) + Number(oldV);
    Economy.updateOne(
        {
            "guildid": id,
            "users.id": user
        },
        {
            "$set": update
        },
        function (err, raw) {
            if (err) return new Error(err);
        }
    );
}

module.exports.take = async function (id, user, path, taken) {
    let index;
    let users = await this.get(id, "users")
    for (var i = 0; users.length > i; i++) {
        if (users[i].id == user) {
            index = i;
        }
    }
    let oldV = await this.get(id, "users[" + index + "]." + path)
    update = {}
    update[`users.$.${path}`] = Number(oldV) - Number(taken);
    Economy.updateOne(
        {
            "guildid": id,
            "users.id": user
        },
        {
            "$set": update
        },
        function (err, raw) {
            if (err) return new Error(err);
        }
    );
}

module.exports.reset = async function (id, user, path) {
    let resetVal = 0,
        update = {}
    update[`users.$.${path}`] = Number(resetVal);
    Economy.updateOne(
        {
            "guildid": id,
            "users.id": user
        },
        {
            "$set": update
        },
        function (err, raw) {
            if (err) return new Error(err);
        }
    );
}

module.exports.push = async function (id, path, value) {
    let oldv;
    if (path) {
        oldv = await this.get(id, path)
    } else {
        oldv = await this.get(id)
    }
    oldv.push(value)
    let update = {}
    update[path] = oldv
    Economy.updateOne({ guildid: id }, {
        $set: update
    }, (err, raw) => { if (err) console.error(err) })
}

module.exports.remove = async function (id, path, value) {
    let oldv;
    if (path) {
        oldv = await this.get(id, path)
    } else {
        oldv = await this.get(id)
    }
    var index = oldv.indexOf(value);
    if (index > -1) {
        oldv.splice(index, 1);
    }
    let update = {}
    update[path] = oldv
    Economy.updateOne({ guildid: id }, {
        $set: update
    }, (err, raw) => {
        if (err) console.error(err)
    })
}

module.exports.defaultLevels = defaultLevels

function get(id) {
    return new Promise(resolve => {
        Economy.findOne({ guildid: id }, function (err, guild) {
            if (err) console.log(err)
            resolve(guild)
        })
    })
}
