const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const hastebin = require('hastebin-gen');

class servers extends Command {
    constructor() {
        super({
            name: 'servers',
            category: 'dev',
            dev: true
        })
    }
    async run(message, args, bot) {
        let bicon = bot.user.displayAvatarURL;
        let string = '';
        bot.guilds.forEach(guild => {
            string += guild.name + ` (${guild.id})` + '\n';
        })
        let bt = bot.user.username;

        hastebin(string, "txt").then(r => {
            let botembed = new Discord.RichEmbed()
                .setColor("#36393F")
                .addField("Here is the list:", r)
                .setTimestamp()
                .setFooter("Requested By: " + message.author.username, message.author.avatarURL);
            return message.channel.send(botembed);
        }).catch(console.error);
    }
}

module.exports = servers;
