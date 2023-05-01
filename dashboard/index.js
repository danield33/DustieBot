const express = require('express');
const app = express();
const flash = require("express-flash");
const passport = require("passport")
var DiscordStrategy = require('passport-discord').Strategy;
const refresh = require('passport-oauth2-refresh');
const session = require('express-session')
const bodyParser = require('body-parser');


const enc = require('../util/encode')

const Discord = require("discord.js")
const bot = new Discord.Client({ disableEveryone: true })
bot.on('error', (err) => console.error(err));

module.exports.bot = bot;
module.exports.Discord = Discord;

const settings = require('../util/models/guild')

// Start Website
let port = 80;
app.listen(port)
console.log('Website is running on port ' + port)

// Things for login
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

var scopes = ['identify', 'guilds'];


passport.use(new DiscordStrategy({
  clientID: '549264914485870619',
  clientSecret: '5j2uuvH0nn2kRnVQasx3sWRCw_EjyBW7',
  callbackURL: 'https://dustie.xyz/callback',
  scope: scopes
}, function (accessToken, refreshToken, profile, done) {
  process.nextTick(function () {
    return done(null, profile);
  });
}));

app.use(session({
  secret: 'mySecret123',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(flash());

// Other Things
app.use(express.static(__dirname + '/src'));
app.set('view engine', 'ejs')

module.exports.checkAuth = async (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

module.exports.getModules = async (id) => {
  let mod = await settings.get(id, "modules.moderation")
  let welcome = await settings.get(id, "modules.welcome")
  let logs = await settings.get(id, "modules.logs")
  let fun = await settings.get(id, "modules.fun")

  let modules = {
    mod: mod,
    welcome: welcome,
    logs: logs,
    fun: fun
  }

  return new Promise(resolve => {
    resolve(modules)
  })
}

module.exports.getModCmds = async (id) => {
  let ban = await settings.get(id, "modules.moderation.ban")
  let kick = await settings.get(id, "modules.moderation.kick")
  let warn = await settings.get(id, "modules.moderation.warn")
  let mute = await settings.get(id, "modules.moderation.mute")


  let cmds = {
    ban: ban,
    kick: kick,
    warn: warn,
    mute: mute
  }

  return new Promise(resolve => {
    resolve(cmds)
  })
}

module.exports.getFunCommands = async (id) => {
  let meme = await settings.get(id, "modules.fun.meme")
  let joke = await settings.get(id, "modules.fun.joke")
  let cat = await settings.get(id, "modules.fun.cat")
  let dog = await settings.get(id, "modules.fun.dog")
  let catfact = await settings.get(id, "modules.fun.catfact")
  let dogfact = await settings.get(id, "modules.fun.dogfact")
  let flip = await settings.get(id, "modules.fun.flip")
  let gottem = await settings.get(id, "modules.fun.gottem")
  let eightball = await settings.get(id, "modules.fun.eightball")
  let roll = await settings.get(id, "modules.fun.roll")
  let img = await settings.get(id, "modules.fun.image")
  let tic = await settings.get(id, "modules.fun.tictactoe")


  let cmds = {
    meme: meme,
    joke: joke,
    cat: cat,
    dog: dog,
    catfact: catfact,
    dogfact: dogfact,
    flip: flip,
    gottem: gottem,
    eightball: eightball,
    roll: roll,
    image: img,
    tictactoe: tic
}

  // let keys = Object.keys(await settings.get(id, "modules.fun"))

  // let notCmds = ["$init", "toggle"]

  // let cmds = [];

  // for(var i = 0; i < keys.length;i++) {
  //   let key = keys[i]
  //   if(!notCmds.includes(key)) {
  //     let cmdData = await settings.get(id, `modules.fun.${key}`)
  //     let data = {
  //       cmd: key,
  //       data: cmdData
  //     }
  //     cmds.push(data)
  //   }
  // }

  return new Promise(resolve => {
    resolve(cmds)
  })
}

// Routing
let indexRouter = require('./routes/index')
app.use('/', indexRouter)

// Dashboard
let dashboardRouter = require('./routes/dashboard')
app.use('/dashboard', dashboardRouter)

//Api
let apiRouter = require('./routes/api')
app.use('/api', apiRouter)

// Callback
app.get('/callback',
  passport.authenticate('discord', { failureRedirect: '/' }), function (req, res) {
    res.redirect('/dashboard')
  }
);



app.use(function (req, res) {
  res.render('web/error.ejs', { user: req.user });
});

bot.login(enc.decode(require('../util/json/botconfig.json').token))