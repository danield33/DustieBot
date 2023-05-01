var mongoose = require('mongoose');
const url = 'mongodb://nedst:C4rl0N3d@dustie-shard-00-00-iozun.mongodb.net:27017,dustie-shard-00-01-iozun.mongodb.net:27017,dustie-shard-00-02-iozun.mongodb.net:27017/test?ssl=true&replicaSet=Dustie-shard-0&authSource=admin&retryWrites=true'
mongoose.connect(url, { useNewUrlParser: true })
const defaultSettings = require('./defaultSettings')

var GuildSchema = mongoose.Schema({
  guildid: String,
  //Default settings
  settings: {
    botPrefix: String,
    botPremium: Boolean,
    deleteSmessage: Boolean,
    ownersID: Array,
    embedColor: String
  },
  //Module settings
  modules: {
    //Moderation
    moderation: {
      //Moderation settings
      toggle: Boolean,
      logchannel: String,
      allowedroles: Array,
      //Moderation command settings
      ban: {
        toggle: Boolean,
        log: Boolean,
        message: String
      },
      clear: {
        toggle: Boolean,
        log: Boolean
      },
      clearwarn: {
        toggle: Boolean,
        log: Boolean
      },
      kick: {
        toggle: Boolean,
        log: Boolean,
        message: String
      },
      merge: {
        toggle: Boolean,
        log: Boolean
      },
      mute: {
        toggle: Boolean,
        mutedrole: String,
        log: Boolean,
        message: String
      },
      rename: {
        toggle: Boolean,
        log: Boolean
      },
      warn: {
        toggle: Boolean,
        log: Boolean,
        message: String,
      },
      warns: {
        toggle: Boolean
      },
      bannedwords: {
        toggle: Boolean,
        default: Boolean,
        log: Boolean,
        message: String,
        filter: Array
      },
      voicekick: {
        toggle: Boolean,
        role: String,
        log: Boolean,
        message: String
      },
      blacklist: {
        toggle: Boolean,
        log: Boolean,
        message: String
      },
      timeout: {
        toggle: Boolean,
        log: Boolean,
        timeoutrole: String,
        channel: String
      }
    },

    //Welcome message
    welcome: {
      //Welcome settings
      toggle: Boolean,
      channel: String,
      format: Number, // 0-Image 1-Text 2-Embed

      //image
      image: {
        background: String,
        layers: Array
      },
      //text
      text: {
        randmsg: Boolean,
        randmsgs: Array,
        text: String,
      },
      //embed
      embed: {
        title: String,
        description: String,
        url: String,
        color: String,
        timestamp: Boolean,
        footer: {
          icon_url: String,
          text: String
        },
        thumbnail: String,
        image: String,
        author: {
          name: String,
          url: String,
          icon_url: String
        },
        fields: [
          {
            title: String,
            value: String,
            inline: Boolean
          }
        ]
      }
    },

    bye: {
      //Goodbye settlings
      toggle: Boolean,
      channel: String,
      format: Number, // 0-Image 1-Text 2-Embed

      //Settings stored
      //image
      image: {
        background: String,
        layers: Array
      },
      //text
      text: {
        randmsg: Boolean,
        randmsgs: Array,
        text: String,
      },
      //embed
      embed: {
        title: String,
        description: String,
        url: String,
        color: String,
        timestamp: Boolean,
        footer: {
          icon_url: String,
          text: String
        },
        thumbnail: String,
        image: String,
        author: {
          name: String,
          url: String,
          icon_url: String
        },
        fields: [
          {
            title: String,
            value: String,
            inline: Boolean
          }
        ]
      }
    },

    //Logs module
    logs: {
      toggle: Boolean,
      logchannel: String,
      //Put moderation events here
      messagedelete: {
        toggle: Boolean,
      },
      messageedit: {
        toggle: Boolean,
      },
    },

    //Fun module
    fun: {
      toggle: Boolean,
      cat: {
        toggle: Boolean
      },
      catfact: {
        toggle: Boolean
      },
      chat: {
        toggle: Boolean
      },
      connectfour: {
        toggle: Boolean
      },
      crabs: {
        toggle: Boolean
      },
      dice: {
        toggle: Boolean
      },
      dog: {
        toggle: Boolean
      },
      dogfact: {
        toggle: Boolean
      },
      eightball: {
        toggle: Boolean
      },
      figlet: {
        toggle: Boolean
      },
      flip: {
        toggle: Boolean
      },
      gunfight: {
        toggle: Boolean,
      },
      joke: {
        toggle: Boolean
      },
      meme: {
        toggle: Boolean
      },
      rockpaperscissors: {
        toggle: Boolean
      },
      roll: {
        toggle: Boolean
      },
      tictactoe: {
        toggle: Boolean
      },
      typinggame: {
        toggle: Boolean,
        sentances: Array
      },
      quote: {
        toggle: Boolean
      },
      chess: {
        toggle: Boolean,
        samechannel: Boolean
      }
    },

    //Misc module
    misc: {
      toggle: Boolean,
      embed: {
        toggle: Boolean
      },
      emoji: {
        toggle: Boolean
      },
      emojis: {
        toggle: Boolean
      },
      math: {
        toggle: Boolean,
        simple: Boolean
      },
      poll: {
        toggle: Boolean
      },
      unscramble: {
        toggle: Boolean
      },
      urban: {
        toggle: Boolean
      },
      wikipedia: {
        toggle: Boolean
      },
      youtube: {
        toggle: Boolean
      },
    },

    //Voice module

    voice: {
      toggle: Boolean,
      djRole: String,
      vChannel: String,
      tChannel: String,
      alwaysIn: Boolean,
      leave: {
        toggle: Boolean,
        djs: Boolean
      },
      nowplaying: {
        toggle: Boolean,
        djs: Boolean
      },
      pause: {
        toggle: Boolean,
        djs: Boolean
      },
      play: {
        toggle: Boolean,
        djs: Boolean
      },
      queue: {
        toggle: Boolean,
        djs: Boolean
      },
      queueloop: {
        toggle: Boolean,
        djs: Boolean
      },
      resume: {
        toggle: Boolean,
        djs: Boolean
      },
      search: {
        toggle: Boolean,
        djs: Boolean
      },
      skip: {
        toggle: Boolean,
        djs: Boolean
      },
      soundeffect: {
        toggle: Boolean,
        customsfx: Array
      },
      stop: {
        toggle: Boolean,
        djs: Boolean
      },
      volume: {
        toggle: Boolean,
        previousVol: Number
      },
      remove: {
        toggle: Boolean
      },
      move: {
        toggle: Boolean
      },
      lyrics: {
        toggle: Boolean
      },
      seek: {
        toggle: Boolean
      },
      queueTop: {
        toggle: Boolean
      },
      rewind: {
        toggle: Boolean
      },
      forward: {
        toggle: Boolean
      },
      queuejump: {
        toggle: Boolean
      },
      removedups: {
        toggle: Boolean
      },
      soundcloud: {
        toggle: Boolean
      }
    },

    //Owner commands
    owner: {
      autorole: {
        roles: String,
        toggle: Boolean
      }
    },

    //Economy module
    economy: {
      toggle: Boolean,

    },

    //Levels module
    levels: {
      toggle: Boolean
    }
  }
});

var Guild = module.exports = mongoose.model('guilds', GuildSchema);

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


function get(id) {
  return new Promise(resolve => {
    Guild.findOne({ guildid: id }, function (err, guild) {
      if (err) console.log(err)
      resolve(guild)
    })
  })
}
