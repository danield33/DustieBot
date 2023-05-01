//ArmourHUD | 6/5/2019
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild')

// Please replace Name on line 7 and 27 to command name.
class Hug extends Command {
    constructor(){
        super({
            name: 'hug',
            description: 'Hug the person you love the most <3',
            category: 'fun', //LOWER CASE!!!!
            usage: 'hug <@user>',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: false, // If Command is not safe for work
            premium: false, // If command is only premium command only
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot) { // add ', queue' if working with music/voice
    if(!await Guild.get(message.guild.id,"modules.fun.hug.toggle")) return message.reply("That command is not enabled on this server | guild.")
    if (args.length === 1){
        let hugee = message.mentions.users.first();
        let embed = new Discord.RichEmbed()
        .setColor(bot.embed)
        .setTitle(message.author.username + ' sends virtual hugs to ' + hugee.username)
        .setImage('https://i.imgur.com/b1Rcb.gif');
        return message.channel.send(embed);
        }
    else if (args.length === 0){
            let hugee = message.mentions.users.first();
            let embed = new Discord.RichEmbed()
            .setColor(bot.embed)
            .setTitle(message.author.username + ' sends virtual hugs to everyone!')
            .setImage('https://i.imgur.com/b1Rcb.gif');
            return message.channel.send(embed);
        }
    }

}
module.exports = Hug
