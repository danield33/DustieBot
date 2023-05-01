//ProNanigans | 19-8-19
const Discord = require("discord.js");
const { Command } = require('../../util/handlers/command/index.js');
const { createCanvas, loadImage } = require('canvas')
const Tabletop = require('tabletop');


// Please replace Name on line 7 and 27 to command name.
class growth extends Command {
    constructor() {
        super({
            name: 'growth',
            aliases: ['botgrowth', 'bg', 'g'], // REMOVE THIS IF THERE IS NONE!
            description: 'Shows a graph of the bots growth since August 8th 2019',
            category: 'util', //LOWER CASE!!!!
            usage: 'growth',
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
        Tabletop.init({
            key: '1A8IQWQ6T92ufz95Io4GjCM-bpHEKF0gpQkBvvCHflsY',
            callback: await gotData,
            simpleSheet: true
        });
        async function gotData(stuff, tabletop) {
            let data = await stuff;
            let lable = args[0] == 'guilds'?'Guild':'User'
            let average = lable == 'Guild'?bot.guilds.size:bot.users.size
            try {
                if(data.length < 3) throw {}
            let arr = [], dates = []
            let bgc = [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 255, 255, 0.2)'
        ], bc = [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ]
           for(let i of data){
               if(lable == 'Guild'){
                   arr.push(i.Guilds)
                   average += Number(i.Guilds)
               }else {arr.push(i.Users)
                  average+=Number(i.Users)
                }
                  dates.push(i.Timestamp.split(' ')[0]);

            }
            for(let i = 0; bgc.length != arr.length+1; i++){
                bgc.push(bgc[i])
                bc.push(bc[i])
            }
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0');
            let yyyy = today.getFullYear();
            today = mm + '/' + dd + '/' + yyyy;
            if(lable == 'User') arr.push(bot.users.size);
            else arr.push(bot.guilds.size)
            dates.push(today)
           const { CanvasRenderService } = require('chartjs-node-canvas');
           const width = 700;
           const height = 400;
           const configuration = {
               type: 'line',
               data: {
                   labels: dates,
                   datasets: [{
                       label: `Dustie ${lable} size\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nAverage of ${Math.ceil(average/(data.length+1))} ${lable}s`,
                       data: arr,
                       backgroundColor: bgc,
                       borderColor: bc,
                       borderWidth: 2
                   }],
               },
               options: {
                   scales: {
                       yAxes: [{
                           ticks: {
                               beginAtZero: false,
                               callback: (value) => '#' + value
                           }
                       }]
                   }
               }
           };
           const chartCallback = (ChartJS) => {
               ChartJS.defaults.global.elements.rectangle.borderWidth = 2;
               ChartJS.plugins.register({
                   // plugin implementation
               });
               ChartJS.controllers.MyType = ChartJS.DatasetController.extend({
                   // chart implementation
               });
           };
            
           (async () => {
               const canvasRenderService = new CanvasRenderService(width, height, chartCallback);
               const image = await canvasRenderService.renderToBuffer(configuration);
               const dataUrl = await canvasRenderService.renderToDataURL(configuration);
               const stream = canvasRenderService.renderToStream(configuration);
               const attachment = new Discord.Attachment(image, 'graph.png');
            //    let gEmbed = new Discord.RichEmbed()
            //    .setColor(bot.embed)
            //    .setImage(attachment);
               message.channel.send(attachment)
           })();
        }catch(err){
            Tabletop.init({
                key: '1A8IQWQ6T92ufz95Io4GjCM-bpHEKF0gpQkBvvCHflsY',
                callback: await gotData,
                simpleSheet: true
            });
    
        }

        }

    }
}
module.exports = growth