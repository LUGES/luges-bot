exports.run = (client, message, args) => {
    message.channel.send("Pong!");
}

exports.help = {
    admin: false,
    name: process.env.prefix + "ping",
    description: "Pong!"
}