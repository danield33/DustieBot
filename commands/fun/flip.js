//PlumpOrange | 3/15
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild');

class Flip extends Command {
    constructor() {
        super({
            name: 'flip',
            description: 'Flip a coin!',
            category: 'fun',
            usage: 'flip',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            disabled: false // Disable the command if anything
        });
    }
    async run(message, args, bot) {
        if (!await Guild.get(message.guild.id, "modules.fun.flip.toggle")) return message.reply("That command is not enabled on this server | guild.")
        var result = Math.random();
        if (result < 0.5) return message.reply("Heads!");
        else if (result > 0.5) return message.reply("Tails!");
    }
}
module.exports = Flip;