// Dubbel | 8 May 2019
const { Command } = require('../../util/handlers/command/index.js');
const Discord = require('discord.js');
const superagent = require(`superagent`)
const { Guild } = require('../../util/scripts/loader'); // Economy, Levels, Warns, Users

class Meme extends Command {
    constructor() {
        super({
            name: 'meme',
            description: 'Gives you a random meme.',
            category: 'fun',
            usage: 'meme (-image/text | OPTIONAL)',
            disabled: false
        })
    }
    async run(message, args, bot) {
        let DB = db.modules.fun.meme.toggle
        if (!DB) return message.reply("That command is not enabled on this server | guild.")
        let msg = await message.channel.send("Generating...")

        let memeembed = new Discord.RichEmbed()
            .setAuthor("Meme", bot.user.displayavatarURL)
            .setColor(bot.embed)

        let { body } = await superagent
            .get(`https://www.reddit.com/r/memes.json?sort=top&t=week`)
            .query({ limit: 800 });
        if (!{ body }) return message.channel.send("Failed to recieve a **meme**. Try again!")
        const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(meme => !meme.data_over_18);
        if (!allowed.length) return message.channel.send("Failed to recieve a **meme**. Try again!")

        const randomnum = Math.floor(Math.random() * allowed.length)
        if (allowed[randomnum].data.url == null || allowed[randomnum].data.url == "") {
            allowed[randomnum].data.url = "https://reddit"
            return
        }

        memeembed.setImage(allowed[randomnum].data.url)
        return msg.edit(memeembed)
    }
}
module.exports = Meme;
