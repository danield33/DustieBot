//ProNanigans | 24-7-19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const pUtil = require('../../util/models/voice/util.js'); // Economy, Levels, Warns, Users
const { URLSearchParams } = require("url");
const fetch = require("node-fetch");
const ytdl = require('ytdl-core')
const YouTube = require('simple-youtube-api');
const youtube = new YouTube("AIzaSyBrQhDJ_S2KTDNof2SS_muxDeqF5dHvOmo")


// Please replace Name on line 7 and 27 to command name.
class soundcloud extends Command {
    constructor() {
        super({
            name: 'soundcloud',
            aliases: ['sc'], // REMOVE THIS IF THERE IS NONE!
            description: 'Plays requested music from soundcloud',
            category: 'voice', //LOWER CASE!!!!
            usage: 'soundcloud <query/link>',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: false, // If Command is not safe for work
            premium: false, // If command is only premium command only
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot, db, queue) { // add ', queue' if working with music/voice
        // CODE HERE
        if (!db.modules.voice.soundcloud.toggle) return message.reply("That command is not enabled on this server | guild.")

        if (!message.member || !message.member.voiceChannel) return message.reply("You must be in a voice channel for this command.");

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
        if (!args[0]) return message.reply("Please specify what to search or a soundcloud link")
        const track = args.join(" ");
        [song] = await getSongs(`scsearch: ${track}`)
        if (!song) return message.channel.send(returnM("Error", "No songs found. Try again!"));
        let thumbnail = 'https://www.google.com/imgres?imgurl=http%3A%2F%2Fwww.fouroverfour.jukely.com%2Fwp-content%2Fuploads%2F2017%2F07%2Fsclogo.png&imgrefurl=http%3A%2F%2Fwww.fouroverfour.jukely.com%2Fnews%2Fwhats-happening-with-soundcloud%2F&docid=O2pR3HaGdzJqAM&tbnid=HHhA1pbeFITf9M%3A&vet=10ahUKEwiu65nMgs_jAhVQVK0KHdJsCrgQMwiBASgEMAQ..i&w=2000&h=2000&safe=active&client=opera&bih=787&biw=1157&q=soundcloud%20logo&ved=0ahUKEwiu65nMgs_jAhVQVK0KHdJsCrgQMwiBASgEMAQ&iact=mrc&uact=8'
        await dostuff(song, thumbnail, 'yes')//idk why i chose to use yes and no for this stuff + play command, should have used true or false 

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
                let aEmbed = new Discord.RichEmbed()
                    .setTitle('🎶 Added to Queue')
                    .setThumbnail(songStuff.thumbnailurl)
                    .setDescription(`**${songStuff.title}** by **${songStuff.author}**`)
                    .setColor(bot.embed)
                    .addField(`${serverQueue.songs[0].url}`, `Connected in ${message.member.voiceChannel.name}`);
                if (send == 'yes') return message.channel.send(aEmbed).then(msg => { msg.delete(5000) })
            }
        }
        async function play(guild, song) {
            pUtil.play(message, queue, player, song, guild, args, returnM, bot);
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
module.exports = soundcloud