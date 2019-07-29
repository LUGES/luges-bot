exports.run = (client, message, args) => {
    if(!client.execCheck(message)) return;
    
    let channelName = message.content.split(" ")[1];
    let content = message.content.split(" ").slice(2).join(" ");
    let channelObj = client.channels.find(channel => channel.name === channelName);

    if(channelObj != undefined && channelObj != null){
        client.logger.write(client.moment().format("DD/MM/YYYY HH:mm") + " [Post]    : " + message.author.tag + " sent: \"" + content + "\" to: #" + channelName + "\n");
        channelObj.send(content);
        
        client.channels.get(process.env.moderationID).send({embed: {
            color: 1037917,
            title: "Message posted in channel",
            fields: [{name: "Channel", value: `#${channelName}`, inline: true}, {name: "Posted By", value: `<@${message.author.id}>`, inline : true}, {name: "Message", value: content, inline : true}]
        }})

        if(message.channel.type != "dm")
            message.delete();
    }
}

exports.help = {
    admin: true,
    name: process.env.prefix + "post <channel name> <message>",
    description: "Submits the message in the channel provided."
}

