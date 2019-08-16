exports.run = (client, message) => {
    if(message.channel.id == process.env.getRolesChannelID || message.channel.type === "dm"){
        let mess = message.content.split(" ");
        if(!mess[1])
            message.author.send("Please provide your name so we can check our records.");
        else{
            message.author.send("Access to the Member Role has been requested, someone should verify this for you over the next hour (Unless its late!)");

            mess.splice(0,1);
            let usrName = mess.join(" ");
            client.channels.get(process.env.requestsChannelID).send({embed: {
                color: 1037917,
                title: "User requested the Member Role.",
                footer: {text: message.author.id},
                fields: [{name: "User", value: `<@${message.author.id}>`, inline: true}, {name: "Tag", value: message.author.tag, inline: true}, {name: "Name Provided", value: usrName, inline : true}]
            }});
        }
    } else
        message.author.send("This command can only be used in the #get-roles channel.");
    
    if(message.channel.type != "dm")
        message.delete();
};

exports.help = {
    admin: true,
    name: process.env.prefix + "member <name>",
    description: "Requests access to the Member role."
};