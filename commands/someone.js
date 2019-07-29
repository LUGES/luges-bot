exports.run = (client, message) => {
    if(message.channel.type === ('dm')) return;
    let memes = message.channel.members.map(m => {if(!m.user.bot) return m.user.id}).filter(Boolean);
    let rando = memes[Math.floor(Math.random() * memes.length)]

    return message.channel.send("<@" + rando + ">")
}

exports.help = {
    admin: false,
    name: process.env.prefix + "someone",
    description: "Pings a random person in the channel."
}