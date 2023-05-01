var mongoose = require('mongoose');
const url = 'mongodb://nedst:C4rl0N3d@dustie-shard-00-00-iozun.mongodb.net:27017,dustie-shard-00-01-iozun.mongodb.net:27017,dustie-shard-00-02-iozun.mongodb.net:27017/test?ssl=true&replicaSet=Dustie-shard-0&authSource=admin&retryWrites=true'

mongoose.connect(url, { useNewUrlParser: true })

var EconomySchema = mongoose.Schema({
    guildid: String,
    users: Array
});

var Economy = module.exports = mongoose.model('economy', EconomySchema);

let defaultSetup = {
    id: "userid",
    onhand: 0,
    bank: 0,
    lastdaily: 0,
    dailystreak: 0,
    workid: 0,
    lastworked: 0,
    workstreak: 0,
    bankmult: 1,
    lastintrest: 0,
    bankmultlength: 0,
    laststeal: 0,
    lastdeposit: 0
}

let jobsSave =
    [
        { name: "Homeless", pay: 10, streak: 6 },
        { name: "Dishwasher", pay: 15, streak: 5},
        { name: "Car wash", pay: 17, streak: 4 },
        { name: "Cleaner", pay: 25, streak: 10 },
        { name: "Dancer", pay: 20, streak: 4},
        { name: "Macdonalds", pay: 30, streak: 5 },
        { name: "Journalist", pay: 40, streak: 5 },
        { name: "Accountant", pay: 45, streak: 6 },
        { name: "Carpenter", pay: 50, streak: 7},
        { name: "Cartoonist", pay: 55, streak: 8},
        { name: "Salesman", pay: 60, streak: 9},
        { name: "Geographer", pay: 65, streak: 10},
        { name: "Butler", pay: 100, streak: 20 },
        { name: "Law Enforcement", pay: 105, streak: 15 },
        { name: "Politics", pay: 110, streak: 20 },
        { name: "President", pay: 120, streak: 15 },
        { name: "Queen", pay: 130, streak: 30 },
        { name: "King", pay: 135, streak: 35 },
    ]

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
    let array = defaultSetup
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

module.exports.jobs = jobsSave
module.exports.defaultSetup = defaultSetup

function get(id) {
    return new Promise(resolve => {
        Economy.findOne({ guildid: id }, function (err, guild) {
            if (err) console.log(err)
            resolve(guild)
        })
    })
}
