//ProNanigans | 18-3-19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const { Guild } = require('../../util/scripts/loader'); // Economy, Levels, Warns, Users

// Please repalce Name on line 7 and 25 to command name.
class lock extends Command {
    constructor() {
        super({
            name: 'lock',
            aliases: ['close'], // REMOVE THIS IF THERE IS NONE!
            description: 'Mutes or unmutes everyone in the server | guild',
            category: 'moderation', //LOWER CASE!!!!
            usage: 'd.lock "channel"/"mute"/"new" "<open (only works for channel)>"',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            disabled: true // Disable the command if anything
        })
    }
    async run(message, args, bot, db) {
        // CODE HERE
        if (!db.modules.moderation.lock.toggle) return message.channel.send("That command is not enabled on this server | guild.")
        if (!args[0]) return message.channel.send("Please specify what kind of lock you want this to be: \n'channel' for this channel only, 'new' for new players or 'mute' to lock the whole server")
        let mess
        let locked = db.modules.moderation.lock.locked
        let kicked = db.modules.moderation.lock.kick
        let channeled = db.modules.moderation.lock.channel
        if (args[0].toLowerCase() == 'channel') {
            let cRole = message.guild.roles.find(r => r.name === 'Channel Muted')

            if (args[1] == 'open') {
                if (channeled.includes(message.channel.id)) {
                    message.channel.overwritePermissions(cRole, {
                        SEND_MESSAGES: true,
                        ADD_REACTIONS: true
                    });
                    function chan(value) {
                        return value === message.channel.id
                    }

                    channeled.filter(chan);
                    console.log(channeled)

                    message.channel.send("This channel is now opened");
                    if (channeled.length < 1) {
                        await message.guild.members.forEach(async (member, id) => {
                            member.removeRole(cRole.id)
                        }).catch(err => { });
                        return
                    }
                } else {
                    return message.channel.send("This channel is not locked")
                }
            }
            if (channeled.length < 1) {

                if (!cRole) {
                    message.channel.send("No muted role was found!\nWould you like me to create one?").then(async msg => {
                        await msg.react("✅")
                        await msg.react("❎")

                        const Filter = (reaction, user) => user.id === message.author.id
                        const collector = msg.createReactionCollector(Filter, { time: 10000 });

                        collector.on('collect', r => {
                            collector.stop()
                            if (r.emoji.name === "✅") {
                                msg.clearReactions()
                                message.guild.createRole({ name: 'Channel Muted' })
                                return message.reply("✅Complete!\nRun the command agian for it to work!")
                            }
                            if (r.emoji.name === "❎") {
                                msg.clearReactions()
                                msg.edit("Alright! You can always change the muted role on our dashboard!\nhttps://dustie.xyz/dashboard")
                                return msg.delete(7500)
                            }
                        })
                        collector.on('end', r => {
                            msg.clearReactions()
                            return msg.edit("Time expired... Try agian!")
                        })
                    })
                }//if!cRole
                if (cRole) {
                    Guild.push(message.guild.id, 'modules.moderation.lock.channel', message.channel.id)
                    message.channel.overwritePermissions(cRole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    });
                    await message.guild.members.forEach(async (member, id) => {
                        member.addRole(cRole.id)
                    })//.catch(err => { })

                    message.channel.send(`Now locking ${message.channel.name} until further notice.`)
                }
            }
        }

        if (args[0].toLowerCase() == 'new' || args[0].toLowerCase() == 'kick') {
            if (!kicked) {
                Guild.set(message.guild.id, 'modules.moderation.lock.kick', true);
                message.channel.send('Preventing anyone from joining now.');
            }
            if (kicked) {
                Guild.set(message.guild.id, 'modules.moderation.lock.kick', false);
                message.channel.send("Anyone can join the server now.")
            }
        }
        if (args[0].toLowerCase() == 'mute') {
            if (!locked) {
                mess = await message.channel.send("Attempting to lock the server...")
            }
            if (locked) {
                mess = await message.channel.send("Attempting to unlock the server...")
            }
            let mRole = db.modules.moderation.lock.lockedrole
            let role;

            let mReason = args.slice(0).join(" ")
            if (!mReason) mReason = "Reason was not given :shrug:"

            async function createMuted(dRole) {
                try {
                    mRole = await message.guild.createRole({
                        name: dRole,
                        color: `#00000`
                    })
                    message.guild.channels.forEach(async (channel, id) => {
                        await channel.overwritePermissions(mRole, {
                            SEND_MESSAGES: false,
                            ADD_REACTIONS: false
                        });
                    });
                    Guild.set(message.guild.id, "modules.moderation.lock.lockedrole", mRole.id)
                } catch (err) {
                    console.log(err.stack);
                }
            }

            async function runLock() {
                let dTid = db.modules.moderation.lock.lockedrole
                role = message.guild.roles.find(r => r.id === dTid)
                if (!locked) {
                    message.guild.members.forEach(async (member, id) => {
                        member.addRole(role.id).catch((err) => { })
                    })
                    message.channel.send("Locked the server until further notice. Run this command again to unlock the server");
                    Guild.set(message.guild.id, 'modules.moderation.lock.locked', true);
                }
                if (locked) {
                    message.guild.members.forEach(async (member, id) => {
                        member.removeRole(role.id).catch((err) => { })
                    })
                    message.channel.send("Unlocked the server!");
                    Guild.set(message.guild.id, 'modules.moderation.lock.locked', false);
                }

                let logs = db.modules.moderation.logchannel
                let tog = db.modules.moderation.mute.log
                if (logs) {
                    if (tog) {
                        let channel = message.guild.channels.find(c => c.id === logs)
                        let embed = new Discord.RichEmbed()
                            .setTitle("Server Lock", bot.user.avatarURL)
                            .setColor(bot.embed)
                            .addField("Reason:", mReason)
                            .setFooter(`Locked by: ${message.author.username} • ` + message.createdAt, message.author.avatarURL);

                        channel.send(embed)
                    }
                }
            }

            if (!mRole) {
                mess.edit("No muted role was found!\nWould you like me to create one?").then(async msg => {
                    await msg.react("✅")
                    await msg.react("❎")

                    const Filter = (reaction, user) => user.id === message.author.id
                    const collector = msg.createReactionCollector(Filter, { time: 10000 });

                    collector.on('collect', r => {
                        collector.stop()
                        if (r.emoji.name === "✅") {
                            msg.clearReactions()
                            createMuted("Server Lock")
                            return message.reply("✅Complete!\nRun the command agian for it to work!")
                        }
                        if (r.emoji.name === "❎") {
                            msg.clearReactions()
                            msg.edit("Alright! You can always change the muted role on our dashboard!\nhttps://dustie.xyz/dashboard")
                            return msg.delete(7500)
                        }
                    })
                    collector.on('end', r => {
                        msg.clearReactions()
                        return msg.edit("Time expired... Try agian!")
                    })
                })
            } else {
                runLock()
            }
        }
    }
}
module.exports = lock