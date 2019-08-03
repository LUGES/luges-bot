exports.run = (client, message) => {
    if(!client.execCheck(message) || message.channel.type === ("dm")) return;

    let mess = message.content.split(" ");
    let rawTagID = mess[1];
    mess.splice(0,2);
    
    let tagID = rawTagID.replace(/[<@!>]/g, "");

    if(message.guild.members.find(member => member.user.id === tagID))
    {
        if(message.guild.members.get(tagID).user.bot){
            message.delete();
            return message.channel.send("Please don't try to change a bot's nickname, thanks :heart:");

        }else if(message.guild.members.get(tagID).highestRole.comparePositionTo(message.guild.members.get("535892789213528065").highestRole) >= 0){
            message.delete();
            console.log(message.guild.members.get(tagID).highestRole.comparePositionTo(message.guild.members.get("535892789213528065").highestRole));
            return message.channel.send("<@"+tagID+">'s power level is too great. I have failed you...");

        }else{
            message.guild.members.get(tagID).setNickname(mess.join(" "));
            client.channels.get(process.env.moderationID).send({embed: {
                color: 3447003,
                title: "User's nickname was changed",
                fields: [{name: "User", value: rawTagID, inline: true}, {name: "Messaged By", value: `<@${message.author.id}>`, inline : true}, {name: "Nickname", value: mess.join(" "), inline : true}]
            }});
        }

        if(message.channel.type != "dm")
            message.delete();
    }else
        message.channel.send("This is not a valid ID");
    return;
};

exports.help = {
    admin: true,
    name: process.env.prefix + "nickname <usertag> <new nickname>",
    description: "Changes the user's nickname to the new one provided"
};