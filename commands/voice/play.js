//ProNanigans | 3-22-19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const pUtil = require('../../util/models/voice/util.js'); // Economy, Levels, Warns, Users
const { URLSearchParams } = require("url");
const fetch = require("node-fetch");
const ytdl = require('ytdl-core')
const YouTube = require('simple-youtube-api');
const youtube = new YouTube("AIzaSyBrQhDJ_S2KTDNof2SS_muxDeqF5dHvOmo")

// Please repalce Name on line 7 and 25 to command name.
class play extends Command {
    constructor() {
        super({
            name: 'play',
            aliases: ['p'], // REMOVE THIS IF THERE IS NONE!
            description: 'Plays a video from youtube and if you tag someone, it\'ll play what they\'re listening to',
            category: 'voice', //LOWER CASE!!!!
            usage: 'd.play <link, query or @user listening to spotify> ("listen" to keep listening to what the user is listening to can only listen to one person at a time)',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            disabled: false, // Disable the command if anything
            emoji: 'fas fa-play'
        })
    }
    async run(message, args, bot, db, queue) {
        // CODE HERE
        if (!db.modules.voice.play.toggle) return message.reply("That command is not enabled on this server | guild.")

        if (!message.member || !message.member.voiceChannel) return message.reply("You must be in a voice channel for this command.");
        let sUser = Guild.findUser(message, args[0]);
        if(sUser && !sUser.presence.game) return message.reply("That user is not listening to spotify")

        const player = await bot.player.join({
            guild: message.guild.id,
            channel: message.member.voiceChannel.id,
            host: bot.player.nodes.first().host,
        }, { selfdeaf: false });
        if (!player) return message.channel.send(returnM("Error", "I could not join the voice channel, there was an error."));


        function returnM(title, string) {
            let embed = new Discord.RichEmbed()
                .setAuthor(title, bot.user.avatarURL)
                .setColor(bot.embed)
                .setDescription(string)
                .setFooter(message.author.username, message.author.avatarURL)
                .setTimestamp()
            return embed
        }
        let song
        const serverQueue = queue.get(message.guild.id)
        if (!args[0]) return message.reply("Please specify what to search or a youtube link")
        if (args[0].match(/^https?:\/\/(www.youtube.com|youtube.com)\/(watch\?v=(.*)?=(.*)|playlist(.*))$/)) {
            const playlist = await youtube.getPlaylist(args[0])
            const videos = await playlist.getVideos()
            for (const video of Object.values(videos)) {
                const video2 = await youtube.getVideoByID(video.id);
                [song] = await getSongs(`${video2.url}`)
                if (song == undefined) continue
                if (!song) return message.channel.send(returnM("Error", 'No playlist found. Make sure it\'s a public playlist or try again!'))
                setTimeout(() => { dostuff(song, 'NO') }, 5000)
            }
        } else {
            const track = args.join(" ");
            if (args[0].match(/^https?:\/\/(www.youtube.com|youtube.com)\/watch\?v=/)) [song] = await getSongs(`ytsearch: ${track}`)
            else {
                if (!sUser) [song] = await getSongs(`ytsearch: ${track}`)
                if (sUser && sUser.presence.game.name == 'Spotify') [song] = await getSongs(`ytsearch: ${sUser.presence.game.details} by ${sUser.presence.game.state}`)
            }
            if (!song) return message.channel.send(returnM("Error", "No songs found. Try again!"));

            let thumbnail
            youtube.getVideo(song.info.uri)
                .then(async result => {
                    thumbnail = await result.raw.snippet.thumbnails.default.url
                    await dostuff(song, thumbnail, 'yes')
                }).catch(console.log);
        }

        async function dostuff(song, thumbnail, send) {

            const serverQueue = queue.get(message.guild.id)
            const songStuff = {
                title: song.info.title,
                author: song.info.author,
                track: song.track,
                url: song.info.uri,
                time: song.info.length,
                user: message.author,
                thumbnailurl: thumbnail
            }

            let aEmbed
            if (!serverQueue) {
                const queueConstruct = {
                    songs: [],
                    channel: message.member.voiceChannel,
                    loop: false,
                    serverloop: false,
                    listen: false
                }

                queueConstruct.songs.push(songStuff);
                queue.set(message.guild.id, queueConstruct);

                try {
                    play(message.guild, queueConstruct.songs[0].track)
                    let pEmbed = new Discord.RichEmbed()
                        .setTitle('🎶 Now playing')
                        .setThumbnail(songStuff.thumbnailurl)
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
                aEmbed = new Discord.RichEmbed()
                    .setTitle('🎶 Added to Queue')
                    .setThumbnail(songStuff.thumbnailurl)
                    .setDescription(`**${songStuff.title}** by **${songStuff.author}**`)
                    .setColor(bot.embed)
                    .addField(`${serverQueue.songs[0].url}`, `Connected in ${message.member.voiceChannel.name}`);
            }
            if (send == 'yes') return message.channel.send(aEmbed).then(msg => { msg.delete(5000) })
        }
        async function play(guild, song) {
            pUtil.play(message, queue, player, song, guild, args, returnM, bot)
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
module.exports = play