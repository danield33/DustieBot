//error2507 | 5th April, 2019
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild')

// Please repalce Name on line 7 and 27 to command name.
class Name extends Command {
    constructor() {
        super({
            name: 'roles',
            aliases: ['allroles', 'roleslist'], // REMOVE THIS IF THERE IS NONE!
            description: 'List all roles and their members. Roles from bots are not displayed, since just one bot has them.',
            category: 'util', //LOWER CASE!!!!
            usage: 'Just use the command. No extra arguments needed.',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: false, // If Command is not safe for work
            premium: false, // If command is only premium command only
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot) { // add ', queue' if working with music/voice
        let roles = message.guild.roles.filter(r => !r.managed && r.id != message.guild.id).array();
        let embed = new Discord.RichEmbed()
            .setColor(0x3498db)
            .setTitle("Roles and their members")
            .setDescription("All roles and their members. Roles from bots are not displayed, since just one bot has them.");
        if (roles.length > 25) {
            let amountOfEmbeds = Math.ceil(roles.length / 25);
        }
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name) {
                if (roles[i].members.size > 0) {
                    embed.addField(roles[i].name, roles[i].members.map(m => m.user.username).join(", "));
                } else {
                    embed.addField(roles[i].name, "No members have this role");
                }
            }
        }
        return message.channel.send(embed);
    }
}
module.exports = Name