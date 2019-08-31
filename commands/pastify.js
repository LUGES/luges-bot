exports.run = (client, message) => {
    if (!client.execCheck(message) || message.channel.type === ("dm")) return;

    let currentMemberRole = message.guild.roles.find(role => role.id === process.env.currentMemberRole);
    let pastMemberRole = message.guild.roles.find(role => role.id === process.env.pastMemberRole);

    if(currentMemberRole == undefined || pastMemberRole == undefined)
        return (message.channel.send("Unable to locate the Member roles."));

    message.guild.fetchMembers().then(() => {
        message.channel.send({embed: {
            color: 1037917,
            title: "Member Reassignment",
            description: "Type '*confirm' within 10 Seconds to proceed",
            fields: [{name: "Members to reassign", value: message.guild.members.filter(m => m.roles.find(role => role.id === process.env.currentMemberRole)).size, inline : true}]
        }});
    });

    const collector = new client.Discord.MessageCollector(message.channel, m => m.content == "*confirm" && m.author.id === message.author.id, { time: 10000 });

    collector.on("collect", message => {
        message.channel.send("Refresh confirmed, reassigning Member roles.");
        message.guild.fetchMembers().then(() => {
            let enrolled = message.guild.members.filter(m => m.roles.find(role => role.id === process.env.currentMemberRole));
            enrolled.forEach(member => {
                member.removeRole(currentMemberRole)
                    .then(() => {
                        if(!member.roles.find(role => role.id === process.env.pastMemberRole))
                            member.addRole(pastMemberRole);
                        member.send("Your membership has expired so I've given you the Past Member role! You can now purchase Membership for next year from the SU Website: <http://lancastersu.co.uk/groups/gaming-and-esports-society> and get the Current Member role again by following the instructions in the #get-roles channel.");
                    });
            });
        });
        collector.stop();
    });

    collector.on("end", (msgs) => {
        if (msgs.size == 0)
            message.channel.send("No confirmation, operation halted.");
    });
    

    if (message.channel.type != "dm")
        message.delete();
};

exports.help = {
    admin: true,
    name: process.env.prefix + "pastify",
    description: "Assigns all Members to the Past Member role and removes the Current Member role."
};