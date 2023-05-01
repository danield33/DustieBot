//DEV NAME HERE | DATE HERE
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const moment = require('moment')

// Please repalce Name on line 7 and 25 to command name.
class serverinfo extends Command {
    constructor() {
        super({
            name: 'serverinfo',
            aliases: ['si', 'server'], // REMOVE THIS IF THERE IS NONE!
            description: 'Displays information about the server',
            category: 'util', //LOWER CASE!!!!
            usage: 'd.serverinfo',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot) {
        // CODE HERE
        let sIcon = `https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.webp`;
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

        let region = {
            "brazil": ":flag_br: Brazil",
            "eu-central": ":flag_eu: Central Europe",
            "singapore": ":flag_sg: Singapore",
            "us-central": ":flag_us: U.S. Central",
            "sydney": ":flag_au: Sydney",
            "us-east": ":flag_us: U.S. East",
            "us-south": ":flag_us: U.S. South",
            "us-west": ":flag_us: U.S. West",
            "eu-west": ":flag_eu: Western Europe",
            "vip-us-east": ":flag_us: VIP U.S. East",
            "london": ":flag_gb: London",
            "amsterdam": ":flag_nl: Amsterdam",
            "hongkong": ":flag_hk: Hong Kong",
            "russia": ":flag_ru: Russia",
            "southafrica": ":flag_za:  South Africa"
        };
        let count = await message.guild.fetchBans()
            .then(async bans => {
                bans.size
                message.channel.send(bans.size)
            })
            .catch(console.error);


        let verifLevels = ["None", "Low", "Medium", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];
        let bancount = message.guild.fetchBans().then(async b => await b.size)
        let sEmbed = new Discord.RichEmbed()
            .setTitle('Server Information')
            .setColor(bot.embed)
            .setThumbnail(sIcon)
            .addField('Server Name', message.guild.name, true)
            .addField('Server Owner', message.guild.owner, true)
            .addField('Created On', message.guild.createdAt.toLocaleDateString("en-US", options), true)
            .addField('You Joined', message.member.joinedAt.toLocaleDateString("en-US", options), true)
            .addField('Server Region', region[message.guild.region], true)
            .addField("Verification Level", verifLevels[message.guild.verificationLevel], true)
            .addField('Total Members', `${message.guild.memberCount} [${message.guild.members.filter(u => u.user.bot == false).size} humans and ${message.guild.members.filter(b => b.user.bot === true).size} bots]`, true)
            .addField(`Ban Count`,/*`${count}`*/`Comming Soon`, true)
            //.addField('Ban count', message.guild.fetchBans())
            .setFooter(`ID: ${message.guild.id} |`)
            .setTimestamp();
        return message.channel.send(sEmbed);
    }
}
module.exports = serverinfo
