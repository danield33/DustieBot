// Dubbel | 11 May 2019
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const { Guild } = require('../../util/scripts/loader'); // Economy, Levels, Warns, Users

let fighting = new Set()
const yes = ['yes', 'y', 'ye', 'yeah', 'yup', 'yea', 'ya'];
const no = ['no', 'n', 'nah', 'nope', 'nop'];

// Please replace Name on line 7 and 27 to command name.
class gunfight extends Command {
    constructor() {
        super({
            name: 'gunfight',
            description: 'Play a gunfight against a other member.',
            category: 'fun', //LOWER CASE!!!!
            usage: 'gunfight',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: false, // If Command is not safe for work
            premium: false, // If command is only premium command only
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot, db) { // add ', queue' if working with music/voice
        if (!db.modules.fun.gunfight.toggle) return message.reply("That command is not enabled on this server | guild.")
        let words = db.modules.fun.gunfight.custwords
        let cuswords = ['fire', 'draw', 'shoot', 'bang', 'pull', 'boom'];
        if (!words) words = cuswords
        if (words.length < 1) {
            words = cuswords
        }
        async function verify(channel, user) {
            let filter = res => {
                const value = res.content.toLowerCase();
                return res.author.id === user.id && (yes.includes(value) || no.includes(value));
            };
            let verify = await channel.awaitMessages(filter, {
                max: 1,
                time: 30000
            });
            if (!verify.size) return 0;
            const choice = verify.first().content.toLowerCase();
            if (yes.includes(choice)) return true;
            if (no.includes(choice)) return false;
            return false;
        }
        async function delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        let opponent = await Guild.findUser(message, args.join(' '))
        if (!opponent) return message.channel.send(`That member does not exist.`)
        if (opponent.bot) return message.channel.send(`You cannot play gunfight against a bot.`)
        if (opponent.id === message.author.id) return message.channel.send(`You cannot play gunfight against yourself.`)
        if (fighting.has(`${message.guild.id}-${message.channel.id}`)) return message.channel.send(`There can only be one gunfight in a channel.`)
        fighting.add(`${message.guild.id}-${message.channel.id}`)
        try {
            await message.channel.send(`<@${opponent.id}>, do you accept the gunfight?`)
            const verification = await verify(message.channel, opponent)
            if (!verification) {
                fighting.delete(`${message.guild.id}-${message.channel.id}`)
                return message.channel.send(`<@${opponent.id}> declined your gunfight.`)
            }
            await message.channel.send(`Get ready...`)
            let randomTime = Math.floor(Math.random() * (1000 - 1000 + 1)) + 1000;
            await delay(randomTime)
            const word = words[Math.floor(Math.random() * words.length)];
            await message.channel.send(`TYPE \`${word.toUpperCase()}\` NOW!`)
            const filter = res => [opponent.id, message.author.id].includes(res.author.id) && res.content.toLowerCase() === word
            const winner = await message.channel.awaitMessages(filter, {
                max: 1,
                time: 10000
            });
            fighting.delete(`${message.guild.id}-${message.channel.id}`)
            if (!winner.size) return message.channel.send(`There is no winner!`)
            return message.channel.send(`The winner is ${winner.first().author}!`)
        } catch (err) {
            fighting.delete(`${message.guild.id}-${message.channel.id}`)
            throw err;
        }
    }
}
module.exports = gunfight