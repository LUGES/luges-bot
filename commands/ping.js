exports.run = (client, message) => {
    message.channel.send("Pong!");
};

exports.help = {
    admin: false,
    name: process.env.prefix + "ping",
    description: "Pong!"
};