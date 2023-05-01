// Dubbel | 26 May 2019

module.exports.get = (language) => {
    let lan = require(`../util/languages/${language}.json`)
    return lan
}