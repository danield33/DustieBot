//Ned | 30/03/19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild')
const Gamedig = require('gamedig');
const hastebin = require('hastebin-gen');

// Please repalce GameInfo on line 7 and 25 to command name.
class GameInfo extends Command {
    constructor() {
        super({
            name: 'gameinfo',
            aliases: ['gi'], // REMOVE THIS IF THERE IS NONE!
            description: 'Shows game information for game you choose. List: \`gameinfo list\`',
            category: 'misc', //LOWER CASE!!!!
            usage: 'gameinfo (game) (ip:port <- PORT IS OPTIONAL)',
            dev: false, // Developers only, defined in index.js
            owner: false, // Server owners only
            mod: false, // Moderator role only defined in dashboard
            nsfw: false, // If Command is not safe for work
            premium: false, // If command is only premium command only
            disabled: false // Disable the command if anything
        })
    }
    async run(message, args, bot) { // add ', queue' if working with music
        if (!await Guild.get(message.guild.id, "modules.misc.gameinf.toggle")) return message.reply("That command is not enabled on this server | guild.")
        let msg = await message.channel.send("Searching...")
        let game = args[0]
        if (!game) return msg.edit("Please specify a game!")

        function getInfo(state) {

        }

        if (game == "list") {
            hastebin(games.join("\n"), "gamelist").then(r => {
                return msg.edit(`Here is the games list: ${r}`)
            }).catch(console.error);
        } else {
            if (!games.includes(game)) return msg.edit(`That is not a game! Please check the list at \`${await Guild.get(message.guild.id, "settings.botPrefix")}help gameinfo\``)

            let ip;
            let port;
            if (args[1].includes(":")) {
                ip = args[1].substring(0, args[1].indexOf(':'));
                port = args[1].slice(ip.length + 1)
            }
            else ip = args[1]
            if (!ip) return msg.edit("Please specify a servers ip!")

            if (port) {
                Gamedig.query({
                    type: game,
                    host: ip,
                    port: port
                }).then((state) => {
                    hastebin(JSON.stringify(state, null, 4), "raw").then(r => {
                        return msg.edit(`Here is the game's raw information: ${r}`)
                    }).catch(console.error);
                }).catch((error) => {
                    return msg.edit("There was an error | Server doesn't exist!")
                });
            } else {
                Gamedig.query({
                    type: game,
                    host: ip,
                }).then((state) => {
                    hastebin(JSON.stringify(state, null, 4), "raw").then(r => {
                        return msg.edit(`Here is the game's raw information: ${r}`)
                    }).catch(console.error);
                }).catch((error) => {
                    return msg.edit("There was an error | Server doesn't exist!")
                });
            }
        }
    }
}

const games = [
    "7d2d",
    "ageofchivalry",
    "aoe2",
    "alienarena",
    "alienswarm",
    "arkse",
    "atlas",
    "avp2",
    "avp2010",
    "americasarmy",
    "americasarmy2",
    "americasarmy3",
    "americasarmypg",
    "arcasimracing",
    "arma",
    "arma2",
    "arma2oa",
    "armacwa",
    "armar",
    "arma3",
    "armagetron",
    "baldursgate",
    "bat1944",
    "bf1942",
    "bfv",
    "bf2",
    "bf2142",
    "bfbc2",
    "bf3",
    "bf4",
    "bfh",
    "breach",
    "breed",
    "brink",
    "buildandshoot",
    "cod",
    "coduo",
    "cod2",
    "cod3",
    "cod4",
    "codwaw",
    "codmw2",
    "codmw3",
    "callofjuarez",
    "chaser",
    "chrome",
    "codenameeagle",
    "commandos3",
    "cacrenegade",
    "conanexiles",
    "contactjack",
    "cs15",
    "cs16",
    "cs2d",
    "cscz",
    "css",
    "csgo",
    "crossracing",
    "crysis",
    "crysiswars",
    "crysis2",
    "daikatana",
    "dmomam",
    "darkesthour",
    "dayz",
    "dayzmod",
    "deadlydozenpt",
    "dh2005",
    "descent3",
    "deusex",
    "devastation",
    "dinodday",
    "dirttrackracing2",
    "dnl",
    "dod",
    "dods",
    "doi",
    "doom3",
    "dota2",
    "drakan",
    "etqw",
    "fear",
    "f12002",
    "f1c9902",
    "farcry",
    "farcry2",
    "fortressforever",
    "operationflashpoint",
    "flashpointresistance",
    "ffow",
    "fivem",
    "garrysmod",
    "graw",
    "graw2",
    "giantscitizenkabuto",
    "globaloperations",
    "geneshift",
    "ges",
    "gore",
    "gunmanchronicles",
    "hldm",
    "hldms",
    "hl2dm",
    "halo",
    "halo2",
    "heretic2",
    "hexen2",
    "hidden",
    "had2",
    "homefront",
    "homeworld2",
    "hurtworld",
    "igi2",
    "il2",
    "insurgency",
    "insurgencysandstorm",
    "ironstorm",
    "jamesbondnightfire",
    "jc2mp",
    "killingfloor",
    "killingfloor2",
    "kingpin",
    "kisspc",
    "kspdmp",
    "kzmod",
    "left4dead",
    "left4dead2",
    "m2mp",
    "m2o",
    "medievalengineers",
    "mohaa",
    "mohsh",
    "mohbt",
    "mohpa",
    "mohab",
    "moh2010",
    "mohwf",
    "minecraft",
    "minecraftpe",
    "mnc",
    "mtavc",
    "mtasa",
    "mumble",
    "mumbleping",
    "nascarthunder2004",
    "netpanzer",
    "nmrih",
    "ns",
    "ns2",
    "nfshp2",
    "nab",
    "nwn",
    "nwn2",
    "nexuiz",
    "nitrofamily",
    "nolf",
    "nolf2",
    "nucleardawn",
    "openarena",
    "openttd",
    "painkiller",
    "postal2",
    "prey",
    "primalcarnage",
    "quake1",
    "quake2",
    "quake3",
    "quake4",
    "ragdollkungfu",
    "r6",
    "r6roguespear",
    "r6ravenshield",
    "rallisportchallenge",
    "rallymasters",
    "redorchestra",
    "redorchestraost",
    "redorchestra2",
    "redline",
    "rtcw",
    "rfactor",
    "ricochet",
    "riseofnations",
    "rune",
    "rust",
    "samp",
    "spaceengineers",
    "ss",
    "ss2",
    "shatteredhorizon",
    "ship",
    "shogo",
    "shootmania",
    "sin",
    "sinep",
    "soldat",
    "sof",
    "sof2",
    "stalker",
    "stbc",
    "stvef",
    "stvef2",
    "swbf",
    "swbf2",
    "swjk",
    "swjk2",
    "swrc",
    "starbound",
    "starmade",
    "starsiege",
    "suicidesurvival",
    "swat4",
    "svencoop",
    "synergy",
    "tacticalops",
    "takeonhelicopters",
    "teamfactor",
    "tfc",
    "tf2",
    "teamspeak2",
    "teamspeak3",
    "terminus",
    "terraria",
    "thps3",
    "thps4",
    "thu2",
    "towerunite",
    "trackmania2",
    "trackmaniaforever",
    "tremulous",
    "tribes1",
    "tribesvengeance",
    "tron20",
    "turok2",
    "universalcombat",
    "unreal",
    "unturned",
    "ut",
    "ut2003",
    "ut2004",
    "ut3",
    "urbanterror",
    "v8supercar",
    "vcmp",
    "ventrilo",
    "vietcong",
    "vietcong2",
    "warsow",
    "wheeloftime",
    "wolfenstein2009",
    "wolfensteinet",
    "xpandrally",
    "zombiemaster",
    "zps"
]

module.exports = GameInfo