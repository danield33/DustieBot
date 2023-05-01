const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Guild = require('../../util/models/guild')
const { google } = require('googleapis');
let keys = require("../../util/json/key.json")
const Tabletop = require('tabletop')

class Name extends Command {
    constructor() {
        super({
            name: 'test',
            description: 'for testing purposes',
            category: 'dev', //LOWER CASE!!!!
            usage: 'test',
            dev: true
        })
    }
    async run(message, args, bot) {
        console.log(finduser.finduser(message, args[0]))
    }
}
module.exports = Name