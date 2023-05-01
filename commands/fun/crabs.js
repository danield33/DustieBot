//Ned | 31/05/19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const { Guild } = require('../../util/scripts/loader'); // Economy, Levels, Warns, Users
const superagent = require("superagent")
const cooldowns = new Discord.Collection();

// Please replace Crabs on line 7 and 27 to command name.
class Crabs extends Command {
    constructor() {
        super({
            name: 'crabs',
            description: 'Creates an awesome crab meme video!',
            aliases: ['crab'], // REMOVE THIS IF THERE IS NONE!
            category: 'fun', //LOWER CASE!!!!
            usage: 'crabs hello world, this is awesome (use `,` to create a new line)',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: false, // If Command is not safe for work
            premium: false, // If command is only premium command only
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot, db) { // add ', queue' if working with music/voice
        if (!db.modules.fun.crabs.toggle) return message.reply("That command is not enabled on this server | guild.")

        if (!cooldowns.has(message.author.id)) {
            cooldowns.set(message.author.id, new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(message.author.id);
        const cooldownAmount = 5 * 1000;

        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before using this command agian!`);
            }
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        if (!message.content.includes(",")) return message.reply("Make sure you separate your text with `,` !")
        let send = await message.channel.send("This may take few seconds!")
        let msg = args.join("+")
        let { body } = await superagent
            .get(`https://dustie.xyz/api/crabs/?text=${msg}`)
            .catch(err => {
                return send.edit("Make sure the bot can actually read the message!")
            })
        const attachment = new Discord.Attachment(body, 'crabs.mp4');
        return message.channel.send(attachment);
    }
}
module.exports = Crabs
