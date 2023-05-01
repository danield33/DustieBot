//ProNanigans | 17/8/19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const Doc = require('discord.js-docs')

class docs extends Command {
    constructor() {
        super({
            name: 'docs',
            aliases: [`documentation`, `documentations`],
            description: 'Search something in the documentation of Discord.JS',
            category: 'dev', //LOWER CASE!!!!
            usage: 'docs [ search ]',
            dev: false,
            disable: false
        })
    }
    async run(message, args, bot) {
        const doc = await Doc.fetch('stable', 'stable', { force: true })
  let stuff = [args[0]]
  if(args[0].includes('.')){ stuff = args[0].split('.')}else if(args[0].includes('#')) stuff = args[0].split('#')
  let a = doc.get(...stuff)
    if(!a) return message.reply("Couldn't find anything regarding your search")
  let link
  console.log(a.originalJSON)
  if(a.originalJSON.inherits) link = `[${a.originalJSON.inherits}](https://discord.js.org/#/docs/main/stable/class/${a.originalJSON.inherits.split('#')[0]}?scrollTo=${a.originalJSON.inherits.split('#')[1]})`
  else link = `[${a.originalJSON.name}](https://discord.js.org/#/docs/main/stable/class/${a.originalJSON.name})`
  let dEmbed = new Discord.RichEmbed()
    .addField(`Discord.js Stable Documentation`, `**${link}** \n ${a.originalJSON.description.replace(/<(.*)>/g, '')}`)
    .setColor(bot.embed)
    if(a.originalJSON.inherits || a.originalJSON.implements) {
      dEmbed.addField('Params', '\u200B');

    a.originalJSON.params.forEach((i, j) => {
      //if(j == 0) return
      if(i.default == undefined) i.default = 'None'
      if(i.optional == undefined) i.optional = false
      dEmbed.addField(`**${i.name}**`, `${i.description} \n **Default:** ${i.default} \n **Optional:** ${i.optional}`)
    })
    dEmbed.addField(`Examples`, `\`\`\`js
    ${a.originalJSON.examples}\`\`\``);
  }
  if(!a.originalJSON.inherits && a.originalJSON.implements){
    if(a.originalJSON.props){
      let arr = []
      a.originalJSON.props.forEach((i, j) => {
        arr.push(i.name)
    })
    dEmbed.addField('Properties:',  `\`${arr.join(', ')}\``);
    arr = []
  }
  if(a.originalJSON.methods){
    let arr = [];
    a.originalJSON.methods.forEach(i => {
      arr.push(i.name)
    })
    dEmbed.addField("Methods:", `\`${arr.join(', ')}\``)
  }
  }
  message.channel.send(dEmbed)
    }
}
module.exports = docs
