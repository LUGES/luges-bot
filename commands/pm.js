exports.run = (client, message, args) => {
    if(!client.execCheck(message) || message.channel.type === ('dm')) return;

    let mess = message.content.split(" ")
    let rawTagID = mess[1]
    mess.splice(0,2)
    
    let tagID = rawTagID.replace(/[<@!>]/g, '');

    if(message.guild.members.find(member => member.user.id === tagID))
    {
        client.logger.write(client.moment().format("DD/MM/YYYY HH:mm") + " [PM]      : " + message.author.tag + " sent: \"" + mess.join(" ") + "\" to: " + message.guild.members.get(tagID).user.tag + "\n");
        client.users.get(tagID).send(mess.join(" "))

        client.channels.get(process.env.moderationID).send({embed: {
            color: 1037917,
            title: "Message sent to user.",
            fields: [{name: "User", value: rawTagID, inline: true}, {name: "Messaged By", value: `<@${message.author.id}>`, inline : true}, {name: "Message", value: mess.join(" "), inline : true}]
        }})

        if(message.channel.type != "dm")
            message.delete();
    }else
        message.channel.send("This is not a valid ID")
        return;
}

exports.help = {
    admin: true,
    name: process.env.prefix + "pm <@mention> <message>",
    description: "Makes the bot PM the message to the specified person."
}