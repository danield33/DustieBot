const mongoose = require('mongoose')
module.exports = mongoose.Schema({
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
            },
            unmute: {
                toggle: Boolean,
                log: Boolean,
                message: String
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
            chat: {
                toggle: Boolean
            },
            connectfour: {
                toggle: Boolean
            },
            crabs: {
                toggle: Boolean
            },
            dog: {
                toggle: Boolean
            },
            figlet: {
                toggle: Boolean
            },
            gunfight: {
                toggle: Boolean
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
            },
            hangman: {
                toggle: Boolean
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
            math: {
                toggle: Boolean,
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
            stop: {
                toggle: Boolean,
                djs: Boolean
            },
            volume: {
                toggle: Boolean,
                djs: Boolean
            },
            remove: {
                toggle: Boolean,
                djs: Boolean
            },
            move: {
                toggle: Boolean,
                djs: Boolean
            },
            seek: {
                toggle: Boolean,
                djs: Boolean
            },
            soundcloud: {
                toggle: Boolean,
                djs: Boolean
            },
            join: {
                toggle: Boolean,
                djs: Boolean
            },
            loop: {
                toggle: Boolean,
                djs: Boolean
            },
            unlisten: {
                toggle: Boolean,
                djs: Boolean
            }
        },

        //Owner commands
        owner: {
            autorole: {
                roles: Array,
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
