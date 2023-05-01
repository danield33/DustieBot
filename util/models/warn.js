var mongoose = require('mongoose');
const url = 'mongodb://nedst:C4rl0N3d@dustie-shard-00-00-iozun.mongodb.net:27017,dustie-shard-00-01-iozun.mongodb.net:27017,dustie-shard-00-02-iozun.mongodb.net:27017/test?ssl=true&replicaSet=Dustie-shard-0&authSource=admin&retryWrites=true'

mongoose.connect(url, { useNewUrlParser: true })

var WarnSchema = mongoose.Schema({
    guildid: String,
    users: Array
});

var Warn = module.exports = mongoose.model('warns', WarnSchema);


module.exports.createGuild = function (guild, id) {
    guild.guildid = id;
    guild.save((err, res) => { if (err) console.log(err) })
}

module.exports.get = async function (id, path) {
    let data = await get(id);
    if (path) return eval("data." + path)
    return data
}

module.exports.deleteServer = function (id) {
    Warn.findOneAndDelete({ guildid: id },
        (err, res) => { if (err) console.log(err) }
    )
}

module.exports.set = function (id, path, newV) {
    let update = {}
    update[path] = newV
    Warn.updateOne({ guildid: id }, {
        $set: update
    }, (err, raw) => { if (err) console.error(err) })
}

module.exports.push = async function (id, path, value) {
    let oldv;
    if(path) {
        oldv = await this.get(id, path)
    } else {
        oldv = await this.get(id)
    }
    oldv.push(value)
    let update = {}
    update[path] = oldv
    Warn.updateOne({ guildid: id }, {
        $set: update
    }, (err, raw) => { if (err) console.error(err) })
}

module.exports.remove = async function (id, path, value) {
    let oldv;
    if(path) {
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
    Warn.updateOne({ guildid: id }, {
        $set: update
    }, (err, raw) => { if (err) console.error(err) })
}

module.exports.warn = async function (guildid, userid, wReason, wBy, wTime) {
    let users = await this.get(guildid, "users")
    let userW;
    if (users.find(u => u.id === userid) || users.length < 0) {
        let array = {
            reason: wReason,
            by: wBy,
            time: wTime
        }
        Warn.updateOne(
            {
              "guildid" : guildid,
              "users.id" : userid
            },
            {
              "$push":
              {
                  "users.$.warns": array
              }
            },
            function (err, raw) {
                if (err) return new Error(err);
            }
          );
    } else {
        let array = {
            id: userid,
            warns: [
                {
                    reason: wReason,
                    by: wBy,
                    time: wTime
                }
            ]
        }

        this.push(guildid, "users", array)
    }
}


function get(id) {
    return new Promise(resolve => {
        Warn.findOne({ guildid: id }, function (err, guild) {
            if (err) console.log(err)
            resolve(guild)
        })
    })
}
