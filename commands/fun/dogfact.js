//PlumpOrange | 3/15
const Discord = require("discord.js");
const superagent = require(`superagent`)
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild')

class Dogfact extends Command {
    constructor() {
        super({
            name: 'dogfact',
            description: 'Sends a random dog fact!',
            category: 'fun',
            usage: 'dogfact',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot) {
        if (!await Guild.get(message.guild.id, "modules.fun.dogfact.toggle")) return message.reply("That command is not enabled on this server | guild.")
        let { body } = await superagent.get("https://api-to.get-a.life/dogfact");
        return message.reply(body.fact);
    }
}
module.exports = Dogfact