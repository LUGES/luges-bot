exports.run = (client, message) => {
    if(message.channel.id != "605128989207429153")
        message.author.send("This command can only be used in the #get-roles channel.");
    else {
        let mess = message.content.split(" ");
        if(!mess[1])
            message.author.send("Please provide your name so we can check our records.");
        else{
            message.author.send("Access to the Member Role has been requested, someone should verify this for you over the next hour (Unless its late!)");

            mess.splice(0,1);
            let usrName = mess.join(" ");
            client.channels.get("605134841939230776").send({embed: {
                color: 1037917,
                title: "User requested the Member Role.",
                fields: [{name: "User", value: `<@${message.author.id}>`, inline: true}, {name: "Name Provided", value: usrName, inline : true}]
            }});
    
        }


    }
    
    if(message.channel.type != "dm")
        message.delete();
};

exports.help = {
    admin: true,
    name: process.env.prefix + "member <name>",
    description: "Requests access to the Member role."
};