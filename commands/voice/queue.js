//ProNanigans | 3 - 23 - 19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const { Guild } = require('../../util/scripts/loader'); // Economy, Levels, Warns, Users
const { URLSearchParams } = require("url");
const fetch = require("node-fetch");
const ytdl = require('ytdl-core')
const YouTube = require('simple-youtube-api');
const youtube = new YouTube("AIzaSyBrQhDJ_S2KTDNof2SS_muxDeqF5dHvOmo")


// Please repalce Name on line 7 and 25 to command name.
class queue extends Command {
    constructor() {
        super({
            name: 'queue',
            aliases: ['q'], // REMOVE THIS IF THERE IS NONE!
            description: 'Shows you the current queue for this guild or with one of the modifiers, executes it\n or none to see the queue.\n\n-loop, loops the queue \n -randomize, randomizes the queue \n -jump, Jumps to the position of the queue \n -top, Queues a song to the top of the queue \n -deldupes, Deletes any duplicate songs',
            category: 'voice', //LOWER CASE!!!!
            usage: 'queue\n <-loop>\n <-randomize>\n <-jump <position in queue>>\n <-top (search parameter)>\n <-deldupes>',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            disabled: false, // Disable the command if anything
            emoji: 'fas fa-list'
        })
    }
    async run(message, args, bot, db, queue) {
        // CODE HERE
        if (!db.modules.voice.queue.toggle) return message.reply("That command is not enabled on this server | guild.")

        function returnM(title, string) {
            let embed = new Discord.RichEmbed()
                .setAuthor(title, bot.user.avatarURL)
                .setColor(bot.embed)
                .setDescription(string)
                .setFooter(message.author.username, message.author.avatarURL)
                .setTimestamp()
            return embed
        }
        if (!args[0]) {
            if (!message.member.voiceChannel) return message.reply("You must be in a voice channel")

            let player = bot.player.get(message.guild.id);
            if (!player) return message.channel.send(returnM("Error", "Currently not playing anything"));
            let serverQueue = queue.get(message.guild.id)

            let songs = serverQueue.songs.map((song, index) => `${index + 1}) [${song.title}](${song.url}) - ${song.user}`)
            if (songs.length > 10) {
                let page = 1

                function pageS(p) {
                    let currSongs = songs.slice((p - 1) * 10, p * 10)

                    let embed = new Discord.RichEmbed()
                        .setTitle(`${message.guild.name} Queue`, `https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.webp`)
                        .setColor(bot.embed)
                        .setDescription(currSongs.join(`\n`))
                        .setFooter(`Page ${p}/${Math.ceil(songs.length / 10)} - Currently playing ${serverQueue.songs[0].title}`)
                        .setTimestamp()

                    return embed
                }

                let msg = await message.channel.send(pageS(page))

                await msg.react("🗑")
                await msg.react("◀")
                await msg.react("▶")

                const Filter = (reaction, user) => user.id === message.author.id
                const collector = msg.createReactionCollector(Filter, { time: 60000 });
                const playFilter = (reaction, user) => user.id === message.author.id
                collector.on('collect', async re => {
                    if (re.emoji.name === "🗑") {
                        collector.stop()
                        await msg.clearReactions()
                    }
                    if (re.emoji.name === "◀") {
                        re.remove(message.author)
                        page--
                        if (page == 0) page = Math.ceil(songs.length / 10)
                        msg.edit(pageS(page))
                    }
                    if (re.emoji.name === "▶") {
                        re.remove(message.author)
                        page++
                        if (page > Math.ceil(songs.length / 10)) page = 1
                        msg.edit(pageS(page))
                    }
                })
                collector.on("end", re => {
                    return msg.delete()
                })

            } else {
                let embed = new Discord.RichEmbed()
                    .setTitle(`${message.guild.name} Queue`, `https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.webp`)
                    .setColor(bot.embed)
                    .setDescription(songs.join(`\n`))
                    .setFooter(`Currently playing ${serverQueue.songs[0].title}`)
                    .setTimestamp()
                return message.channel.send(embed)
            }
        }

        if (args[0] == '-loop' || args[0] == '-l') {
            if (!db.modules.voice.queueloop.toggle) return message.reply("That command is not enabled on this server | guild.")
            if (!message.member.voiceChannel) return message.reply("You must be in a voice channel")

            let player = bot.player.get(message.guild.id);
            if (!player) return message.channel.send(returnM("Error", "Currently not playing anything"));
            const serverQueue = queue.get(message.guild.id);
            if (!message.member.voiceChannel) return message.channel.send(returnM("Error", "You're not in a voice channel"));
            if (!serverQueue) return message.channel.send(returnM("Error", "There is nothing playing that I can loop"));
            //if (serverQueue.playing === false) return message.reply("The voice is paused");

            if (serverQueue.serverloop == true) {
                serverQueue.serverloop = false;
                return message.channel.send(returnM("Music Player", "Stopping Queue Loop"))
            }
            serverQueue.serverloop = true;
            return message.channel.send(returnM("Music Player", "Now looping the queue"))
        }
        if (args[0] == '-jump') {
            if (!db.modules.voice.queuejump.toggle) return message.reply("That command is not enabled on this server | guild.")
            if (!message.member.voiceChannel) return message.reply("You must be in a voice channel")

            let serverQueue = queue.get(message.guild.id);
            if (!serverQueue) return message.reply("There's nothing playing at this time");
            if (isNaN(args[1]) || args[1] > serverQueue.length || args[1] < 0) return message.reply('Please specify a number in the queue');
            let pos = args[1] - 2;
            serverQueue.songs.splice(1, pos);
            return message.channel.send(`Jumped ahead to position ${args[1]} in the queue`)
        }
        if (args[0] == '-top') {
            if (!db.modules.voice.rewind.toggle) return message.reply("That command is not enabled on this server | guild.")
            if (!message.member.voiceChannel) return message.reply("You must be in a voice channel")

            let serverQueue = queue.get(message.guild.id);
            const player = bot.player.get(message.guild.id);
            if (!serverQueue) return message.reply("You must create a queue first by playing a song with the play command.")
            const track = args.splice(1).join(" ");
            const [song] = await getSongs(`ytsearch: ${track}`);
            let thumbnail
            youtube.getVideo(song.info.uri)
                .then(async result => {
                    thumbnail = await result.raw.snippet.thumbnails.default.url
                    const songStuff = {
                        title: song.info.title,
                        author: song.info.author,
                        track: song.track,
                        url: song.info.uri,
                        time: song.info.length,
                        user: message.author,
                        thumbnailurl: thumbnail

                    }

                    serverQueue.songs.shift()
                    serverQueue.songs.unshift(songStuff)
                    return message.channel.send(`Added **${songStuff.title}** by **${songStuff.author}** to the top of the queue!`)
                }).catch(console.log);
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
        if (args[0] == '-randomize' || args[0] == '-r' || args[0] == '-mix' || args[0] == 'shuffle') {
            if (!message.member.voiceChannel) return message.reply("You must be in a voice channel")

            let serverQueue = queue.get(message.guild.id);
            if (!serverQueue) return message.reply("There's nothing playing");
            if (!message.member.voiceChannel) return message.reply("Please join a voice channel first");
            let arr = []
            for (let i in serverQueue.songs) {
                let r = Math.floor(Math.random() * serverQueue.songs);
                arr.splice(r, 0, serverQueue.songs[i]);
            }
            serverQueue.songs = arr

            message.channel.send(`Shuffled the queue for you!`)

        }
        if (args[0] == '-deldupes' || args[0] == '-removedupes' || args[0] == '-rd' || args[0] == '-dd') {
            if (!message.member.voiceChannel) return message.reply("You must be in a voice channel")

            let serverQueue = queue.get(message.guild.id);

            serverQueue.songs = Array.from(new Set(serverQueue.songs.map(a => a.track))).map(track => {
                return serverQueue.songs.find(a => a.track === track)
            })
            message.channel.send("Removed all the duplicate songs!");

        }

    }
}
module.exports = queue