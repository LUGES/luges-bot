exports.run = (client, message) => {
    if (!client.execCheck(message) || message.channel.type === ("dm")) return;

    message.guild.fetchMembers().then(() => {
        let enrolled = message.guild.members.filter(m => m.roles.find(role => role.name == "Discord User"));
        message.channel.send(`Total users enrolled: ${enrolled.size}`);
        message.channel.send(`Total users in the Discord: ${message.guild.memberCount}`);
    });
};

exports.help = {
    admin: true,
    name: process.env.prefix + "enrol",
    description: "Assigns all users the Discord User Role"
};