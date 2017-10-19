module.exports = {
    isLink: (message) => {
        return message.startsWith('http') || message.startsWith('https')
    },
    hasImage: (message) => {
        return message.endsWith('jpg') || message.endsWith('jpeg') || message.endsWith('png')
    }
}