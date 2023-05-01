//Ned | 16/03/19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild')

// Please repalce Name on line 7 and 25 to command name.
class Say extends Command {
    constructor() {
        super({
            name: 'say',
            description: 'Make the bot say whatever in the channel you mentioned',
            category: 'owner', //LOWER CASE!!!!
            usage: 'say channel-name message',
            dev: false, // Developers only, defined in index.js
            owner: true, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot) {

        if (!args[0]) return message.channel.send(`Please specify a channel.`)
        if (!args[1]) return message.channel.send(`Please enter a message after the channel`)

        let channel = message.guild.channels.find(ch => ch.name === args[0])
        if (!channel) return message.channel.send(`${args[0]} is an invalid channel!`)

        message.reply(`The message has been sent to ${channel}!`)
        return channel.send(args.slice(1).join(" "))
    }
}
module.exports = Say