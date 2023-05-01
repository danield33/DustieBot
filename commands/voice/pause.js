//ProNanigans | 3-23- 19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const { Guild } = require('../../util/scripts/loader'); // Economy, Levels, Warns, Users

// Please repalce Name on line 7 and 25 to command name.
class pause extends Command {
  constructor() {
    super({
      name: 'pause',
      // aliases: [ '' ], // REMOVE THIS IF THERE IS NONE!
      description: 'Pauses what is playing',
      category: 'voice', //LOWER CASE!!!!
      usage: 'pause',
      dev: false, // Developers only, defined in index.js
      owner: false, // Server owners only
      mod: false, // Moderator role only defined in dashboard
      disabled: false, // Disable the command if anything
      emoji: 'fas fa-pause'
    })
  }
  async run(message, args, bot, db, queue) { // add ', queue' if working with music
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

    if (!db.modules.voice.pause.toggle) return message.reply("That command is not enabled on this server | guild.")
    if (!message.member.voiceChannel) return message.reply("You must be in a voice channel")

    let player = bot.player.get(message.guild.id);
    if (!player) return message.channel.send(returnM("Error", "Currently not playing anything"));
    if (!message.member.voiceChannel) return message.channel.send(returnM("Error", "You must be in a voice channel to perform this command."))
    await player.pause(true);
    return message.channel.send(returnM("Music Player", 'I paused the music for you'));

  }
}
module.exports = pause