class Command {
    constructor(options = {}) {
        this.name = options.name
        this.aliases = options.aliases || []
        this.description = options.description || null
        this.category = options.category || null
        this.usage = options.usage || null
        this.owner = options.owner || false
        this.dev = options.dev || false
        this.mod = options.mod || false
        this.nsfw = options.nsfw || false
        this.premium = options.premium || false
        this.emoji = options.emoji || 'none'
        this.disabled = options.disabled || false
    }
    async run(message, args, Client) {

    }

    getName() {
        return this.name
    }

    getAliases() {
        return this.aliases
    }

    getDescription() {
        return this.description
    }

    getUsage() {
        return this.usage
    }

    getCategory() {
        return this.category
    }

    isOwner() {
        return this.owner
    }

    isDev() {
        return this.dev
    }

    isMod() {
        return this.mod
    }

    isNSFW() {
        return this.nsfw
    }

    isPremium() {
        return this.premium
    }

    getEmoji() {
        return this.emoji
    }

    isDisabled() {
        return this.disabled
    }
}

module.exports = Command