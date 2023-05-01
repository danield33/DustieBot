//Ned 21/04/19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const { Guild } = require('../../util/scripts/loader'); // Economy, Levels, Warns, Users
const superagent = require(`superagent`)

// Please repalce Name on line 7 and 25 to command name.
class Chat extends Command {
    constructor() {
        super({
            name: 'chat',
            aliases: ['ch'], // REMOVE THIS IF THERE IS NONE!
            description: 'Chat to the bot...',
            category: 'fun', //LOWER CASE!!!!
            usage: 'chat (Message)',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: false, // If Command is not safe for work
            premium: false, // If command is only premium command only
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot, db) { // add ', queue' if working with music/voice
        async function api(msg) {
            let { body } = await superagent
                .get(`https://some-random-api.ml/chatbot/?message=${msg}`)
            if (!{ body }) return "Sorry there was an issue with the api!"
            return body.response
        }

        let msg = args.join("+")
        if (msg) {
            message.channel.stopTyping()
            return message.reply(await api(msg))
        } else {
            message.channel.send("You have started a chat, you got 60 seconds to chat with me :wink:\nYou can type \`end\` to finish the chat whenever!")
            const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 60000 });

            collector.on('collect', async m => {
                message.channel.startTyping()
                if (m.content.toLowerCase() === 'end') {
                    collector.stop()
                    message.channel.stopTyping()
                }
                else {
                    msg = await api(m.content.split(" ").join("+"))
                    message.channel.send(msg)
                    message.channel.stopTyping()
                }
            });

            collector.on('end', async collected => {
                message.channel.stopTyping()
                return message.channel.send(`Uh oh! Time is over. You can try again though!\nOr you have ended the chat!`)
            });
        }
    }
}
module.exports = Chat