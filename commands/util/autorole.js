//ProNanigans | 5-4-19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild')

// Please replace Name on line 7 and 27 to command name.
class autorole extends Command {
    constructor(){
        super({
            name: 'autorole',
            aliases: [ 'ar' ], // REMOVE THIS IF THERE IS NONE!
            description: 'Removes/Gives you the specified role that you\'re allowed to have',
            category: 'util', //LOWER CASE!!!!
            usage: 'd.autorole <role name or "roles"> ',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: false, // If Command is not safe for work
            premium: false, // If command is only premium command only
            disabled: false // Disable the command if anything
        }) 
    }
    async run(message, args, bot) { // add ', queue' if working with music/voice
        // CODE HERE
                if (!await Guild.get(message.guild.id, "modules.util.autorole.toggle")) return message.reply("That command is not enabled on this server | guild.")
                let roless = await Guild.get(message.guild.id, 'modules.owner.autorole.roles');
                let rRole = message.guild.roles.find(c => c.name === args.join(' '));
                if(args[0] == 'roles'){
                    if(roless.length < 1) roless = 'None'
                    return message.reply(roless)
                }
            if(!rRole) return message.reply("Couldn't find that role");
            if(!roless.includes(`${rRole.id}`)) return message.reply('You are not allowed to give yourself that role');
            let uUser = message.guild.members.find(c => c.id === message.author.id)
           if(!uUser.roles.has(rRole.id)) uUser.addRole(rRole.id);
           if(uUser.roles.has(rRole.id)){
                uUser.removeRole(rRole.id);
                return message.channel.send(`Removed ${rRole} from you`);
           }
            message.channel.send(`Given ${rRole} to you!`)
    }
}
module.exports = autorole
