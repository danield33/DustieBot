const Discord = require("discord.js")
const bot = require('../index.js')
const { Handler } = require('../util/handlers/command/index.js');

const Guild = require('../util/models/guild')
let defaultSettings = require('../util/models/defaultSettings')

const Warn = require('../util/models/warn')
let defaultWarns = require('../util/models/defaultWarns')

const Economy = require('../util/models/economy')
let defaultEconomy = require('../util/models/defaultEconomy')

const Levels = require('../util/models/levels')
let defaultLevels = require('../util/models/defaultLevel')

const User = require('../util/models/user')

const { PlayerManager } = require("discord.js-lavalink");

const nodes = [
    { host: "localhost", port: 2332, password: "=QHc8B{PxRh#gsK" }
];


bot.on("ready", () => {

    //Auto changing game information - 30 seconds
    setInterval(function () {
        let status = ['Prefix: d.', 'Under Dev!', `Helping ${bot.users.size} Users!`, `On ${bot.guilds.size} Servers`]
        bot.user.setActivity(`dustie.xyz | ${status[Math.floor(Math.random() * status.length)]}`)
    }, 30000);

    //Command handler loading

    bot.Handler = new Handler(bot, {
        directory: `${__dirname}/../commands/`,
        devs: bot.guilds.get("549254272039256094").roles.get("549647957780332568").members.map(m => m.id)
    });

    console.log(bot.readyAt) //Ready date

    //Music system loading

    bot.player = new PlayerManager(bot, nodes, {
        user: bot.user.id,
        shards: 0
    });
    bot.queue = new Discord.Collection()
    console.log("Music system loaded!")

    /*
    This bellow is if the DB craches and we need a way to get it back DO NOT TOUCH!
    */

    // bot.guilds.forEach(g => {
    //     let newGuild = new Guild(defaultSettings)
    //     Guild.createGuild(newGuild, g.id, function (err, guild) {
    //         if (err) return console.log(err)
    //     })
    // })

    // bot.guilds.forEach(g => {
    //   let newGuild = new Warn(defaultWarns)
    //   Warn.createGuild(newGuild, g.id ,function(err, guild) {
    //     if(err) return console.log(err)
    //   })
    // })

    // bot.guilds.forEach(g => {
    //     let newGuild = new Economy(defaultEconomy)
    //     Economy.createGuild(newGuild, g.id, function (err, guild) {
    //         if (err) return console.log(err)
    //     })
    // })

    // bot.guilds.forEach(g => {
    //     let newLevel = new Levels(defaultLevels)
    //     Levels.createGuild(newLevel, g.id, function (err, guild) {
    //         if (err) return console.log(err)
    //     })
    // })

    // let newUser = new User({users:[]})
    // User.createUser(newUser,function(err,guild){
    //     if(err) console.log(err)
    // })
});