exports.run = (client, message) => {
    if (!client.execCheck(message) || message.channel.type === ("dm")) return;

    message.guild.fetchMembers().then(() => {
        let enrolled = message.guild.members.filter(m => m.roles.find(role => role.name == "Current Member"));


        message.channel.send(`Total Members: ${enrolled.size}`);
        message.channel.send(`Total users in the Discord: ${message.guild.memberCount}`);
    });

    if (message.channel.type != "dm")
        message.delete();
};

exports.help = {
    admin: true,
    name: process.env.prefix + "pastify",
    description: "Assigns all Members to the Past Member role and removes the Current Member role."
};