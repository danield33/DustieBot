//PlumpOrange | 3/15
const Discord = require("discord.js");
const superagent = require(`superagent`);
const { Command } = require('../../util/handlers/command/index.js');
const { Guild } = require('../../util/scripts/loader'); // Economy, Levels, Warns, Users

class Cat extends Command {
    constructor() {
        super({
            name: 'cat',
            description: 'Sends a random cat picture!',
            category: 'fun',
            usage: 'cat',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            disabled: false // Disable the command if anything
        });
    }
    async run(message, args, bot, db) {
        if (!db.modules.fun.cat.toggle) return message.reply("That command is not enabled on this server | guild.")
        const flavorText = [
            'You should all have a cat in your life, but an image will do.',
            'Am I cute yet?',
            'Aww, here, take a cat.',
            'Aww, a cat',
            'kitty , UwU',
            `I think you should have a cat.`,
            `O_o`,
            `Are you sad? ;w; take a cat!`,
            `You like cats?`
        ]
        let description = flavorText[Math.floor(Math.random() * flavorText.length)]
        let { body } = await superagent.get("http://aws.random.cat/meow");
        let embed = new Discord.RichEmbed()
            .setAuthor(description)
            .setColor(bot.embed)
            .setImage(body.file);
        return message.channel.send(embed);
    }
}
module.exports = Cat
