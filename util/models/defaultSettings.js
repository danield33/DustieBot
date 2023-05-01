const defaultData = {
  //Default settings
  settings: {
    botPrefix: "d.",
    botPremium: false,
    deleteSmessage: false,
    ownersID: [],
    embedColor: "#36393F"
  },
  //Module settings
  modules: {
    //Moderation
    moderation: {
      //Moderation settings
      toggle: true,
      logchannel: "",
      allowedroles: [],
      //Moderation command settings
      ban: {
        toggle: true,
        log: true,
        message: "{username} was banned from the server."
      },
      clear: {
        toggle: true,
        log: true
      },
      clearwarn: {
        toggle: true,
        log: true
      },
      kick: {
        toggle: true,
        log: true,
        message: "{username} was kicked from the server by {sUsername}."
      },
      merge: {
        toggle: true,
        log: true
      },
      mute: {
        toggle: true,
        mutedrole: "",
        log: true,
        message: "{username} has been muted for {time}."
      },
      rename: {
        toggle: true,
        log: true
      },
      warn: {
        toggle: false,
        log: true,
        message: "{username} has been warned by {sUsername}, you currently have {warns} warns.",
      },
      warns: {
        toggle: true
      },
      bannedwords: {
        toggle: false,
        default: true,
        log: true,
        message: "You are not allowed to swear :angry:",
        filter: []
      },
      voicekick: {
        toggle: true,
        role: '',
        log: true,
        message: '{username} has been voice muted by {mUser} for {time}'
      },
      blacklist: {
        toggle: true,
        log: true,
        message: '{username} has been muted in {channel} for {time}'
      },
      timeout: {
        toggle: true,
        log: true,
        timeoutrole: "",
        channel: ""
      }
    },

    //Welcome message
    welcome: {
      //Welcome settings
      toggle: true,
      channel: "",
      format: 0, // 0-Image 1-Text 2-Embed

      //Settings stored
      //image
      image: {
        background: "http://www.mediafire.com/convkey/215e/6zybupxlrfeikldzg.jpg",
        layers: [
          {
            name: "Welcome",
            type: "text",
            msg: "Welcome {username}!",
            font: "33",
            color: "#ffffff",
            x: 190,
            y: 170,
            protected: true
          },
          {
            name: "Avatar",
            type: "image",
            url: "usrImage",
            curve: true,
            w: 130,
            h: 130,
            x: 38,
            y: 90,
            protected: true
          }
        ]
      },
      //text
      text: {
        randmsg: false,
        randmsgs: [],
        text: "Welcome to {server}, hope you enjoy your stay {username}",
      },
      //embed
      embed: {
        title: "",
        description: "",
        url: "",
        color: "RANDOM",
        timestamp: true,
        footer: {
          icon_url: "",
          text: ""
        },
        thumbnail: "",
        image: "{usrImage}",
        author: {
          name: "",
          url: "",
          icon_url: ""
        },
        fields: [
          {
            title: `Welcome {username}!`,
            value: "Hope you enjoy your stay!",
            inline: false
          }
        ]
      }
    },

    bye: {
      //Goodbye settlings
      toggle: true,
      channel: "",
      format: 0, // 0-Image 1-Text 2-Embed

      //Settings stored
      //image
      image: {
        background: "http://www.mediafire.com/convkey/215e/6zybupxlrfeikldzg.jpg",
        layers: [
          {
            name: "Welcome",
            type: "text",
            msg: "Goodbye {username}!",
            font: "33",
            asize: false,
            color: "#ffffff",
            x: 190,
            y: 170,
            protected: true
          },
          {
            name: "Avatar",
            type: "image",
            url: "usrImage",
            curve: true,
            w: 130,
            h: 130,
            x: 39,
            y: 90,
            protected: true
          }
        ]
      },
      //text
      text: {
        randmsg: false,
        randmsgs: [],
        text: "Goodbye to {username}, hope you enjoyed your stay ;(",
      },
      //embed
      embed: {
        title: "",
        description: "",
        url: "",
        color: "RANDOM",
        timestamp: true,
        footer: {
          icon_url: "",
          text: ""
        },
        thumbnail: "",
        image: "{usrImage}",
        author: {
          name: "",
          url: "",
          icon_url: ""
        },
        fields: [
          {
            title: `Goodbye {username}!`,
            value: "Hope you enjoyed your stay ;(",
            inline: false
          }
        ]
      }
    },

    //Logs module
    logs: {
      toggle: false,
      logchannel: "",
      messagedelete: {
        toggle: false,
      },
      messageedit: {
        toggle: false,
      },
    },

    //Fun module
    fun: {
      toggle: true,
      cat: {
        toggle: true
      },
      catfact: {
        toggle: true
      },
      chat: {
        toggle: true
      },
      connectfour: {
        toggle: true
      },
      crabs: {
        toggle: true
      },
      dice: {
        toggle: true
      },
      dog: {
        toggle: true
      },
      dogfact: {
        toggle: true
      },
      eightball: {
        toggle: true
      },
      figlet: {
        toggle: true
      },
      flip: {
        toggle: true
      },
      gunfight: {
        toggle: true,
      },
      joke: {
        toggle: true
      },
      meme: {
        toggle: true
      },
      rockpaperscissors: {
        toggle: true
      },
      roll: {
        toggle: true
      },
      tictactoe: {
        toggle: true
      },
      typinggame: {
        toggle: true,
        sentances: []
      },
      quote: {
        toggle: true
      },
      chess: {
        toggle: true,
        samechannel: false
      }
    },

    //Misc module
    misc: {
      toggle: true,
      embed: {
        toggle: true
      },
      emoji: {
        toggle: true
      },
      emojis: {
        toggle: true
      },
      math: {
        toggle: true,
        simple: true,
      },
      poll: {
        toggle: true
      },
      unscramble: {
        toggle: true
      },
      urban: {
        toggle: true
      },
      wikipedia: {
        toggle: true
      },
      youtube: {
        toggle: true
      },
    },

    //Voice module

    voice: {
      toggle: false,
      djRole: "",
      vChannel: "",
      tChannel: "",
      alwaysIn: false,
      leave: {
        toggle: true,
        djs: false
      },
      nowplaying: {
        toggle: true,
        djs: false
      },
      pause: {
        toggle: true,
        djs: false
      },
      play: {
        toggle: true,
        djs: false
      },
      queue: {
        toggle: true,
        djs: false
      },
      queueloop: {
        toggle: true,
        djs: true
      },
      resume: {
        toggle: true,
        djs: false
      },
      search: {
        toggle: true,
        djs: false
      },
      skip: {
        toggle: true,
        djs: true
      },
      soundeffect: {
        toggle: true,
        customsfx: []
      },
      stop: {
        toggle: true,
        djs: false
      },
      volume: {
        toggle: true,
        previousVol: 5
      },
      remove: {
        toggle: true,
      },
      move: {
        toggle: true
      },
      lyrics: {
        toggle: true
      },
      seek: {
        toggle: true
      },
      queueTop: {
        toggle: true
      },
      rewind: {
        toggle: true
      },
      forward: {
        toggle: true
      },
      queuejump: {
        toggle: true
      },
      removedups: {
        toggle: true
      },
      soundcloud: {
        toggle: true
      }
    },
    //Owner commands
    owner: {
      autorole: {
        roles: ""
      }
    },

    //Economy module
    economy: {
      toggle: true,

    },

    //Levels module
    levels: {
      toggle: false
    }
  }
}

module.exports = defaultData