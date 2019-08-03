exports.run = (client, message) => {
    if (!client.execCheck(message) || message.channel.type === ("dm")) return;

    let currentMemberRole = message.guild.roles.find(role => role.name === "Current Member");
    let pastMemberRole = message.guild.roles.find(role => role.name === "Past Member");

    if(currentMemberRole == undefined || pastMemberRole == undefined)
        return (message.channel.send("Unable to locate the Member roles."));


    message.guild.fetchMembers().then(() => {
        let enrolled = message.guild.members.filter(m => m.roles.find(role => role.name == "Current Member"));
        enrolled.forEach(member => {
            member.removeRole(currentMemberRole)
                .then(member.addRole(pastMemberRole));
            
        });
    });

    if (message.channel.type != "dm")
        message.delete();
};

exports.help = {
    admin: true,
    name: process.env.prefix + "pastify",
    description: "Assigns all Members to the Past Member role and removes the Current Member role."
};