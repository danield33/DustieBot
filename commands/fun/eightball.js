//PlumpOrange | 3/14
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild')

// Please repalce Name on line 7 and 25 to command name.
class Eightball extends Command {
    constructor() {
        super({
            name: '8ball',
            description: 'Let me set your fate!',
            category: 'fun',
            usage: '8ball [question]',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot) {
        if (!await Guild.get(message.guild.id, "modules.fun.eightball.toggle")) return message.reply("That command is not enabled on this server | guild.")
        let response = Math.floor((Math.random() * 10) + 1);
        if (response == 1) response = "Yes";
        else if (response == 2) response = "No";
        else if (response == 3) response = "Maybe";
        else if (response == 4) response = "Negative";
        else if (response == 5) response = "I'm very positive";
        else if (response == 6) response = "Unsure";
        else if (response == 7) response = "Ask again later";
        else if (response == 8) response = "Absolutely";
        else if (response == 9) response = "Definently not";
        else if (response == 10) response = "Probably";
        return message.reply(response);
    }
}
module.exports = Eightball