//PlumpOrange | 3/15
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild');

class Roll extends Command {
    constructor() {
        super({
            name: 'roll',
            description: 'Roll a die!',
            category: 'fun',
            usage: 'roll [sides]',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            disabled: false // Disable the command if anything
        });
    }
    async run(message, args, bot) {
        if (!await Guild.get(message.guild.id, "modules.fun.roll.toggle")) return message.reply("That command is not enabled on this server | guild.")
        if (!args[0]) return message.reply("What do i roll? Please specify something.")
        if (!/^\d+$/.test(args[0])) return message.reply("Make sure it is a number :ok_hand:")
        var sides = args[0] || 6;
        var result = Math.floor((Math.random() * sides) + 1);
        return message.reply(result.toString());
    }
}
module.exports = Roll;