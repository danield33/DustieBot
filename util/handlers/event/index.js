const fs = require("fs")

module.exports.loadEvents = () => {
  fs.readdir("./events", (err, files) => {
    if (err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")

    jsfile.forEach((f, i) => {
      let props = require(`../../../events/${f}`)
      console.log(`\x1b[32m`, `EVENT: ${f} loaded!`, `\x1b[0m`)
    })
  })
}