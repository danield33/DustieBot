const mongoose = require('../../scripts/loader').mongoose
let Guild = module.exports = mongoose.model('guilds', require('./defaultSchema'));
let defaultSettings = require('./defaultSettings')

module.exports.createGuild = function (guild, id) {
  guild.guildid = id;
  guild.save((err, res) => { if (err) console.log(err) })
}

module.exports.createGuildExport = id => {
  let guild = new Guild(defaultSettings)
  guild.guildid = id
  guild.save((err, res) => { if (err) console.log(err) })
  return defaultSettings
}

module.exports.deleteServer = function (id) {
  Guild.findOneAndDelete({ guildid: id },
    (err, res) => { if (err) console.log(err) }
  )
}

module.exports.get = async function (id, path) {
  let data = await get(id);
  if (path) return eval(`data.${path}`)
  return data
}


module.exports.set = function (id, path, newV) {
  let update = {}
  update[path] = newV

  Guild.updateOne({ guildid: id }, {
    $set: update
  }, (err, raw) => { if (err) console.error(err) })
}

module.exports.push = async function (id, path, value) {
  let oldv = await this.get(id, path)
  oldv.push(value)
  let update = {}
  update[path] = oldv
  Guild.updateOne({ guildid: id }, {
    $set: update
  }, (err, raw) => { if (err) console.error(err) })
}

module.exports.remove = async function (id, path, value) {
  let oldv = await this.get(id, path)
  var index = oldv.indexOf(value);
  if (index > -1) {
    oldv.splice(index, 1);
  }
  let update = {}
  update[path] = oldv
  Guild.updateOne({ guildid: id }, {
    $set: update
  }, (err, raw) => { if (err) console.error(err) })
}

module.exports.findUser = async function (message, arg){

  if(!isNaN(arg)){
    let user = message.guild.members.find(u => u.id == arg);
    if(!user) return null
    return user
  }else if(message.mentions.users.size > 0){//0arg.match(/^<@!?\d{15,}>$/)
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!user) return null
    return user
  }else if(arg.match(/.*#\d{4}/)){
    let user = message.guild.members.find(u => u.user.tag == arg)
    if(!user) return null
    return user
  }else {
    let user = message.guild.members.find(u => u.user.username == arg) || message.guild.members.find(u => u.nickname == arg);
    if(!user) return null
    return user
  }

}



function get(id) {
  return new Promise(resolve => {
    Guild.findOne({ guildid: id }, function (err, guild) {
      if (err) console.log(err)
      resolve(guild)
    })
  })
}
