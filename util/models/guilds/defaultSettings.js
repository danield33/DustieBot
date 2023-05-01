module.exports = {
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
        toggle: true,
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
      },
      unmute: {
        toggle: true,
        log: true,
        message: '{username} has been unmuted'
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
            protected: true,
            priority: 2
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
            protected: true,
            priority: 1
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
      chat: {
        toggle: true
      },
      connectfour: {
        toggle: true
      },
      crabs: {
        toggle: true
      },
      dog: {
        toggle: true
      },
      figlet: {
        toggle: true
      },
      gunfight: {
        toggle: true
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
        samechannel: true
      },
      hangman: {
        toggle: true
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
      math: {
        toggle: true,
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
      }
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
      stop: {
        toggle: true,
        djs: false
      },
      volume: {
        toggle: true,
        djs: false
      },
      remove: {
        toggle: true,
        djs: false
      },
      move: {
        toggle: true,
        djs: false
      },
      seek: {
        toggle: true,
        djs: false
      },
      soundcloud: {
        toggle: true,
        djs: false
      },
      join: {
        toggle: true,
        djs: false
      },
      loop: {
        toggle: true,
        djs: false
      },
      unlisten: {
        toggle: true,
        djs: false
      }
    },
    //Owner commands
    owner: {
      autorole: {
        roles: [],
        toggle: false
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