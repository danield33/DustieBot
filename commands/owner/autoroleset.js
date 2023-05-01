//ProNanigans | 5-4-19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild')

// Please replace Name on line 7 and 27 to command name.
class autoroleset extends Command {
    constructor(){
        super({
            name: 'autoroleset',
            aliases: [ 'ars', 'autoset', 'roleset', 'autorole'], // REMOVE THIS IF THERE IS NONE!
            description: 'Allows you to have users give them their own roles with this command.',
            category: 'owner', //LOWER CASE!!!!
            usage: 'd.autoroleset <role name>',
            dev: false, // Developers only, defined in index.js
            owner: true, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: false, // If Command is not safe for work
            premium: false, // If command is only premium command only
            disabled: true // Disable the command if anything
        })
    }
    async run(message, args, bot) { // add ', queue' if working with music/voice
        // CODE HERE
        if (!await Guild.get(message.guild.id, "modules.owner.autorole.toggle")) return message.reply("That command is not enabled on this server | guild.")
        if (args.length === 1){
            let rRole = message.guild.roles.find(r => r.name === args[0]);
            let roles = await Guild.get(message.guild.id, 'modules.owner.autorole.roles');
            switch(args[0]){
                case 'roles':
                    return message.reply(roles.length < 1 ? 'None' : roles)
                case 'clear':
                    Guild.remove(message.guild.id, 'modules.owner.autorole.roles', roles)
                    return message.reply('Succesfully cleared autorole!')
            }
            if(!rRole) return message.reply("Couldn't find that role");

            if(roles.includes(rRole.id)) return message.reply("That already is a role allowed to be given");
            Guild.push(message.guild.id, 'modules.owner.autorole.roles', rRole.id)
            message.channel.send(`Done!`)

        }
        else {
            message.channel.send('Please specify a role name!')
        }


       
    }
}
module.exports = autoroleset
