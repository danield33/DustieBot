//PlumpOrange | 3/15
const Discord = require("discord.js");
const unirest = require('unirest')
const { Command } = require('../../util/handlers/command/index.js');
const { Guild } = require('../../util/scripts/loader'); // Economy, Levels, Warns, Users

class Joke extends Command {
    constructor() {
        super({
            name: 'joke',
            description: 'Sends a random joke!',
            category: 'fun',
            usage: 'joke',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            disabled: false // Disable the command if anything
        });
    }
    async run(message, args, bot, db) {
        if (!db.modules.fun.joke.toggle) return message.reply("That command is not enabled on this server | guild.")
        unirest.get("https://icanhazdadjoke.com")
            .end(function (result) {
                let s = result.body;
                let lines = s.split("\n");
                for (let i = 0; i < lines.length; i++) {
                    let line = lines[i];
                    if (line.includes('<p class="subtitle">')) return message.reply(line.replace('<p class="subtitle">', '').replace('</p>', '').replace(/<\/br>/g, ''));
                }
            })
    }
}
module.exports = Joke;