const { Command } = require('../../util/handlers/command/index.js');
const Discord = require('discord.js');

class Ping extends Command {
    constructor() {
        super({
            name: 'ping',
            description: 'A command to get the bots ping',
            category: 'util',
            usage: 'ping',
        })
    }
    async run(message, args, bot) {

        let messageping1 = new Date();
        let botping = new Date() - message.createdAt;
        let messageping2 = new Date() - messageping1;

        let pingembed = new Discord.RichEmbed()
            .setColor("#36393F")
            .addField('API Ping : ', Math.floor(bot.ping) + 'ms', true)
            .addField('Bot Ping : ', Math.floor(botping) + 'ms', true)
            .setTimestamp(new Date())
            .setFooter(`Requested by ${message.author.tag}`);

        return message.channel.send(pingembed);

    }
}
module.exports = Ping;
