//Ned | 14/03/19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild')
const YouTube = require('simple-youtube-api');
const youtube = new YouTube("AIzaSyBrQhDJ_S2KTDNof2SS_muxDeqF5dHvOmo")
const { URLSearchParams } = require("url");
const fetch = require("node-fetch");
let player

// Please repalce Name on line 7 and 25 to command name.
class Youtube extends Command {
    constructor() {
        super({
            name: 'search',
            aliases: ['s'], // REMOVE THIS IF THERE IS NONE!
            description: 'Search for a Youtube video you choose to play on the bot.',
            category: 'voice', //LOWER CASE!!!!
            usage: 'search <video name>',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            disabled: false, // Disable the command if anything
            emoji: 'fas fa-search'
        })
    }
    async run(message, args, bot, queue) {
        if (!await Guild.get(message.guild.id, "modules.voice.search.toggle")) return message.reply("That command is not enabled on this server | guild.")
        if (!message.member || !message.member.voiceChannel) return message.reply("You must be in a voice channel for this command.");
        if (!args[0]) return message.reply("Please provide a video name.")
        if (bot.player.get(message.guild.id)) {
            player = bot.player.get(message.guild.id);
        }
        if (!bot.player.get(message.guild.id)) {
            player = await bot.player.join({
                guild: message.guild.id,
                channel: message.member.voiceChannel.id,
                host: bot.player.nodes.first().host,
            }, { selfdeaf: false });
            if (!player) return message.channel.send(returnM("Error", "I could not join the voice channel, there was an error."));

        }
        //if (!player) return message.reply("Currently not playing anything");
        if (!message.member.voiceChannel) return message.reply("You must be in a voice channel to perform this command.")
        if (!args[0]) return message.reply("Please provide a video name.")

        let vName = args.join(" ")
        let msg = await message.channel.send("Searching...")
        let serverQueue = queue.get(message.guild.id);
        // if (!serverQueue) return message.channel.send(returnM("Error", "You must create a queue first by playing a song with the play command."))

        let r = await youtube.search(vName, 5).catch(err => {
            if (err) return msg.edit("There was an error. Please try again later!")
            return msg.edit("There was an error. Please try again later!")
        })
        if (!r) return msg.edit("There was an error. Please try again later!")

        function pageS(p) {
            let embed = new Discord.RichEmbed()
                .setTitle("Youtube search")
                .setColor(bot.embed)
                .setImage(r[p].thumbnails.medium.url)
                .addField(r[p].raw.snippet.title, `**By**: ${r[p].raw.snippet.channelTitle}`)
                .setFooter(`Page: ${p + 1} | Command will delete in 120 seconds.`)
            return embed
        }

        let page = 0
        if (!r[page].thumbnails.medium.url) return msg.edit("There was an error. Please try again later!")
        setTimeout(async function () {
            await msg.edit(pageS(page))
            await msg.react("◀")
            await msg.react("🇸")
            await msg.react("▶")

            const Filter = (reaction, user) => user.id === message.author.id
            const collector = msg.createReactionCollector(Filter, { time: 120000 });
            const playFilter = (reaction, user) => user.id === message.author.id
            collector.on('collect', async re => {
                if (re.emoji.name === "◀") {
                    re.remove(message.author)
                    page--
                    if (page < 0) page = 4
                    msg.edit(pageS(page))
                }
                if (re.emoji.name === "🇸") {
                    collector.stop()
                    msg.clearReactions()
                    const [song] = await getSongs(`ytsearch: https://www.youtube.com/watch?v=${r[page].id}`);
                    const songStuff = {
                        title: song.info.title,
                        author: song.info.author,
                        track: song.track,
                        url: song.info.uri,
                        time: song.info.length,
                        user: message.author,
                        thumbnailurl: r[page].thumbnails.medium.url
                    }
                    if (!serverQueue) {
                        const queueConstruct = {
                            songs: [],
                            channel: message.member.voiceChannel,
                            loop: false,
                            serverloop: false,
                        }
                        queueConstruct.songs.push(songStuff);
                        queue.set(message.guild.id, queueConstruct);
                        try {
                            play(message.guild, queueConstruct.songs[0].track)
                            let pEmbed = new Discord.RichEmbed()
                                .setTitle('🎶 Now playing')
                                .setDescription(`**${songStuff.title}** by **${songStuff.author}**`)
                                .setColor(bot.embed)
                                .addField(`${songStuff.url}`, `Connected in ${message.member.voiceChannel.name}`);
                            return message.channel.send(pEmbed).then(msg => { msg.delete(songStuff.time) })
                        } catch (err) {
                            console.log(err);
                            queue.delete(message.guild.id);
                            return message.channel.send(returnM("Error", "There was an error trying to play music"));
                        }
                    } else {
                        serverQueue.songs.push(songStuff)
                    }
                    return
                }
                if (re.emoji.name === "▶") {
                    re.remove(message.author)
                    page++
                    if (page > 4) page = 0
                    msg.edit(pageS(page))
                }
            })

        }, 500);
        function play(guild, song) {

            const serverQueue = queue.get(guild.id);
            if (!song) {
                serverQueue.voiceChannel.leave();
                queue.delete(guild.id)
                return
            }
            player.play(song).on('end', async data => {
                if (data.reason === "REPLACED") return;
                if (serverQueue.serverloop == true) {
                    let pEmbed = new Discord.RichEmbed()
                        .setTitle('🎶 Starting to Play')
                        .setThumbnail(serverQueue.songs[0].thumbnailurl)
                        .setDescription(`**${serverQueue.songs[0].title}** by **${serverQueue.songs[0].author}**`)
                        .setColor(bot.embed)
                        .addField(`${serverQueue.songs[0].url}`, `Connected in ${message.member.voiceChannel.name}`)
                        .setFooter(`Requested by ${serverQueue.songs[0].user.username}`);
                    serverQueue.songs.push(serverQueue.songs[0])
                    serverQueue.songs.shift()
                    player.play(serverQueue.songs[0].track)
                    return message.channel.send(pEmbed).then(msg => { msg.delete(serverQueue.songs[0].time) })
                }

                if (serverQueue.loop == true) {
                    let pEmbed = new Discord.RichEmbed()
                        .setTitle('🎶 Starting to Play')
                        .setThumbnail(serverQueue.songs[0].thumbnailurl)
                        .setDescription(`**${serverQueue.songs[0].title}** by **${serverQueue.songs[0].author}**`)
                        .setColor(bot.embed)
                        .addField(`${serverQueue.songs[0].url}`, `Connected in ${message.member.voiceChannel.name}`)
                        .setFooter(`Requested by ${serverQueue.songs[0].user.username}`);

                    player.play(serverQueue.songs[0].track)
                    return message.channel.send(pEmbed).then(msg => { msg.delete(serverQueue.songs[0].time) })

                }
                serverQueue.songs.shift()
                try {
                    let serverQueue = queue.get(guild.id)
                    player.play(serverQueue.songs[0].track)
                    let pEmbed = new Discord.RichEmbed()
                        .setTitle('🎶 Starting to Play')
                        .setThumbnail(serverQueue.songs[0].thumbnailurl)
                        .setDescription(`**${serverQueue.songs[0].title}** by **${serverQueue.songs[0].author}**`)
                        .setColor(bot.embed)
                        .addField(`${serverQueue.songs[0].url}`, `Connected in ${message.member.voiceChannel.name}`)
                        .setFooter(`Requested by ${serverQueue.songs[0].user.username}`);
                    return message.channel.send(pEmbed).then(msg => { msg.delete(serverQueue.songs[0].time) })
                } catch (err) {
                    //console.log(err)
                    message.channel.send(returnM("Music player", `No more songs left in the queue, stopping the stream.`))
                    queue.delete(message.guild.id)
                    return await bot.player.leave(message.guild.id);
                }
            })

        }
        function returnM(title, string) {
            let embed = new Discord.RichEmbed()
                .setAuthor(title, bot.user.avatarURL)
                .setColor(bot.embed)
                .setDescription(string)
                .setFooter(message.author.username, message.author.avatarURL)
                .setTimestamp()
            return embed
        }
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
module.exports = Youtube