const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');

const Guild = require('../../util/models/guild')
let defaultSettings = require('../../util/models/defaultSettings')

const Warn = require('../../util/models/warn')
let defaultWarns = require('../../util/models/defaultWarns')

const Economy = require('../../util/models/economy')
let defaultEconomy = require('../../util/models/defaultEconomy')

const Levels = require('../../util/models/levels')
let defaultLevels = require('../../util/models/defaultLevel')


class changeDB extends Command {
    constructor() {
        super({
            name: 'changedb',
            description: 'Update the database',
            category: 'dev', //LOWER CASE!!!!
            usage: 'changedb [-guild | -econmy | -warns | -levels]',
            dev: true,
            disable: true
        })
    }
    async run(message, args, bot) {
        if (!args[0]) return message.reply("Please add one of the flags ``-guild -economy -warns -levels`` to select the database type.")
        try {
            switch (args[0]) {
                case "-guild":
                    bot.guilds.forEach(async function (g) {
                        let newGuild = new Guild(defaultSettings)
                        await Guild.deleteServer(g.id)
                        newGuild.guildid = g.id;
                        newGuild.save((err, res) => { if (err) console.log(err) })
                    })
                    return message.channel.send("Complete changing the default settings database!")
                case "-economy":
                    bot.guilds.forEach(async function (g) {
                        let newEconomy = new Economy(defaultEconomy)
                        await Economy.deleteServer(g.id)
                        newEconomy.guildid = g.id;
                        newEconomy.save((err, res) => { if (err) console.log(err) })
                    })
                    return message.channel.send("Complete changing the economy database!")
                case "-warns":
                    bot.guilds.forEach(async function (g) {
                        let newWarn = new Warn(defaultWarns)
                        await Warn.deleteServer(g.id)
                        newWarn.guildid = g.id;
                        newWarn.save((err, res) => { if (err) console.log(err) })
                    })
                    return message.channel.send("Complete changing the warns database!")
                case "-levels":
                    bot.guilds.forEach(async function (g) {
                        let newLevel = new Levels(defaultLevels)
                        await Levels.deleteServer(g.id)
                        newLevel.guildid = g.id;
                        newLevel.save((err, res) => { if (err) console.log(err) })
                    })
                    return message.channel.send("Complete changing the levels database!")
                default:
                    return
            }
        } catch (e) {
            console.log(e)
        }

    }
}
module.exports = changeDB
