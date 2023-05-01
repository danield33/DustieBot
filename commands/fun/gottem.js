//PlumpOrange | 3/12
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild')

class Gottem extends Command {
    constructor() {
        super({
            name: 'gottem',
            description: 'Ha, gottem!',
            category: 'fun',
            usage: 'gottem',
            dev: false,
            owner: false,
            mod: false,
            disabled: false
        })
    }
    async run(message, args, bot) {
        if (!await Guild.get(message.guild.id, "modules.fun.gottem.toggle")) return message.reply("That command is not enabled on this server | guild.")
        let embed = new Discord.RichEmbed()
            .setTitle("Gottem")
            .setColor("#36393F")
            .setImage("https://i.imgur.com/9SmzRJA.jpg");
        return message.channel.send(embed);
    }
}
module.exports = Gottem