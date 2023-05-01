//ProNanigans | 28-5-19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild');
const Economy = require('../../util/models/economy');
const { URLSearchParams } = require("url");
const fetch = require("node-fetch");


// Please replace Name on line 7 and 27 to command name.
class queuetop extends Command {
    constructor(){
        super({
            name: 'queuetop',
            aliases: [ 'topqueue', 'qt', 'tq'], // REMOVE THIS IF THERE IS NONE!
            description: 'Adds the song to the top of the queue',
            category: 'voice', //LOWER CASE!!!!
            usage: 'queuetop <song>',
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
        if (!await Guild.get(message.guild.id, "modules.voice.rewind.toggle")) return message.reply("That command is not enabled on this server | guild.")
        if(!message.member.voiceChannel) return message.reply("You must be in a voice channel")

    let serverQueue = queue.get(message.guild.id);
    const player = bot.player.get(message.guild.id);
    if(!serverQueue) return message.reply("You must create a queue first by playing a song with the play command.")
        const track = args.join(" ");
        const [song] = await getSongs(`ytsearch: ${track}`);
        const songStuff = {
            title: song.info.title,
            author: song.info.author,
            track: song.track,
            url: song.info.uri,
            time: song.info.length
        }
        
        serverQueue.songs.shift()
        serverQueue.songs.unshift(songStuff)
        return message.channel.send(`Added **${songStuff.title}** by **${songStuff.author}** to the top of the queue!`)
        function getSongs(search) {
            const node = bot.player.nodes.first();

            const params = new URLSearchParams();
            params.append("identifier", search);

            return fetch(`http://${node.host}:${node.port}/loadtracks?${params.toString()}`, { headers: { Authorization: node.password } })
                .then(res => res.json())
                .then(data => data.tracks)
                .catch(err => {
                    console.error(err);
                    return null;
                });
        }
    }
}
module.exports = queuetop
