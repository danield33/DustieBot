//PlumpOrange | 3/15
const Discord = require("discord.js");
const superagent = require(`superagent`);
const { Command } = require('../../util/handlers/command/index.js');
const { Guild } = require('../../util/scripts/loader'); // Economy, Levels, Warns, Users

class Dog extends Command {
    constructor() {
        super({
            name: 'dog',
            description: 'Sends a random dog picture!',
            category: 'fun',
            usage: 'dog',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            disabled: false // Disable the command if anything
        });
    }
    async run(message, args, bot, db) {
        if (!db.modules.fun.dog.toggle) return message.reply("That command is not enabled on this server | guild.")
        const flavorText = [
            'Here you go',
            'Your new best friend?!',
            'doggo, UwU'
        ]
        let description = flavorText[Math.floor(Math.random() * flavorText.length)]
        let { body } = await superagent.get("https://dog.ceo/api/breeds/image/random");
        let embed = new Discord.RichEmbed()
            .setAuthor(description)
            .setColor(bot.embed)
            .setImage(body.message);
        return message.channel.send(embed);
    }
}
module.exports = Dog
