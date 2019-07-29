exports.run = (client, message, args) => {
    if(!client.execCheck(message)) return;

    let mess = message.content.split(" ")
    let rawTagID = mess[1]
    let tagID = mess[1].replace(/[<@!>]/g, '');

    if(message.guild.members.find(member => member.user.id === tagID))
    {
        message.author.send(rawTagID+": "+tagID);
        if(message.channel.type != "dm")
            message.delete();
    }else
        message.channel.send("This is not a valid ID")
        return;
        
}

exports.help = {
    admin: true,
    name: process.env.prefix + "userid <@mention>",
    description: "The bot DMs you with the specified user's unique ID. For bot testing purposes only."
}