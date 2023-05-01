const Discord  = require('discord.js');

module.exports.play = function (message, queue, player, song, guild, args, returnM, bot){

    const serverQueue = queue.get(guild.id);
    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id)
        return
    }
    player.play(song).on('end', async data => {
        if (args[1] == 'listen') serverQueue.listen = true
        if (data.reason === "REPLACED") return;
        if (serverQueue.serverloop == true) {
            serverQueue.songs.push(serverQueue.songs[0])
            serverQueue.songs.shift()
            let pEmbed = new Discord.RichEmbed()
                .setTitle('🎶 Starting to Play')
                .setThumbnail(serverQueue.songs[0].thumbnailurl)
                .setDescription(`**${serverQueue.songs[0].title}** by **${serverQueue.songs[0].author}**`)
                .setColor(bot.embed)
                .addField(`${serverQueue.songs[0].url}`, `Connected in ${serverQueue.channel.name}`)
                .setFooter(`Requested by ${serverQueue.songs[0].user.username}`);
            player.play(serverQueue.songs[0].track)
            return message.channel.send(pEmbed).then(msg => { msg.delete(serverQueue.songs[0].time) })
        }

        if (serverQueue.loop == true) {
            let pEmbed = new Discord.RichEmbed()
                .setTitle('🎶 Starting to Play')
                .setThumbnail(serverQueue.songs[0].thumbnailurl)
                .setDescription(`**${serverQueue.songs[0].title}** by **${serverQueue.songs[0].author}**`)
                .setColor(bot.embed)
                .addField(`${serverQueue.songs[0].url}`, `Connected in ${serverQueue.channel.name}`)
                .setFooter(`Requested by ${serverQueue.songs[0].user.username}`);

            player.play(serverQueue.songs[0].track)
            return message.channel.send(pEmbed).then(msg => { msg.delete(serverQueue.songs[0].time) })

        }
        serverQueue.songs.shift()

        if (serverQueue.listen == true) {
            try {
                if (sUser.presence.game.name != 'Spotify') {
                    serverQueue.listen = false
                    return message.channel.send(`${sUser.user.username} has stopped listening to spotify`)
                }
                let [song] = await getSongs(`ytsearch: ${sUser.presence.game.details} by ${sUser.presence.game.state}`)
                youtube.getVideo(song.info.uri)
                    .then(async result => {

                        let thumbnail = await result.raw.snippet.thumbnails.default.url
                        await dostuff(song, thumbnail, 'yes')
                        await player.play(serverQueue.songs[0].track)
                    }).catch(console.log);
                args[1] = ''
                return
            } catch (err) {
                message.channel.send(returnM("Music player", `No more songs left in the queue, stopping the stream.`))
                queue.delete(message.guild.id)
                return await bot.player.leave(message.guild.id);

            }
        }

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