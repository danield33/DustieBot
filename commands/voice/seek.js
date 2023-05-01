//ProNanigans | 5-22-19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild');
const Economy = require('../../util/models/economy');
const ytdl = require('ytdl-core')
const ms = require('ms')


// Please replace Name on line 7 and 27 to command name.
class seek extends Command {
    constructor() {
        super({
            name: 'seek',
            aliases: ['forward'], // REMOVE THIS IF THERE IS NONE!
            description: 'Go to the designated spot in the music',
            category: 'voice', //LOWER CASE!!!!
            usage: 'seek \n<+ or - #s/m/h/d>\n<HH:MM:SS>\n<#s/m/h/d>',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: false, // If Command is not safe for work
            premium: true, // If command is only premium command only
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot, queue) { // add ', queue' if working with music/voice
        // CODE HERE

        function returnM(title, string) {
            let embed = new Discord.RichEmbed()
                .setAuthor(title, bot.user.avatarURL)
                .setColor(bot.embed)
                .setDescription(string)
                .setFooter(message.author.username, message.author.avatarURL)
                .setTimestamp()
            return embed
        }
        if(!message.member.voiceChannel) return message.reply("You must be in a voice channel")
        let voiceChannel = message.member.voiceChannel;
        const serverQueue = queue.get(message.guild.id);
        let player = bot.player.get(message.guild.id);
        if (!player) return message.channel.send(returnM("Error", "Currently not playing anything"));
        if(!serverQueue) return message.channel.send("There's nothing playing");
        if (!voiceChannel) return message.channel.send(returnM("Error", "Please join a voice channel"));
        if(!args[0]) return message.reply("Please specify a time")
        let seconds
        if (args[0].includes(':')) {
            let hms = args[0];
            let a = hms.split(':');
            if (a.length < 3) return message.channel.send(returnM("Error", "Please specify the time to skip in HH:MM:SS"))
            seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
            seconds = seconds * 1000
             player.seek(seconds)
             message.reply(`Set position to ${args[0]}`)
             return
        }
         if(args[0].includes('+') || args[0].includes('-')){
            let pos
            args[0].includes('-')?pos = player.state.position - ms(args[0].split('').splice(1).join('')):pos = player.state.position + ms(args[0].split('').splice(1).join(''))
            args[0]=args[0].split('').splice(1).join('');
            console.log(player.state.position)
           await player.seek(pos)
           console.log(player.state.position)
            setTimeout(() => { 
                message.reply(`Set position to ${msToTime(player.state.position)}`)
            },500)
            return
         }
         message.channel.send(`Set position to ${msToTime(ms(args[0]))}`)
        return player.seek(ms(args[0]))
        
    }
}
module.exports = seek
function msToTime(duration) {
    let milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
   
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
   
    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
   }
