exports.run = (client, message) => {
    if (!client.execCheck(message) || message.channel.type === ("dm")) return;

    message.guild.fetchMembers().then(() => {
        let kickables = message.guild.members.filter(m => !m.roles.find(role => role.id == process.env.execRole) && !m.user.bot);

        message.channel.send({embed: {
            color: 1037917,
            title: "Discord Server Reset",
            description: "Type '*confirm' within 10 Seconds to proceed",
            fields: [{name: "Total Users", value: message.guild.memberCount, inline: true}, {name: "Users to be kicked", value: kickables.size, inline : true}]
        }});

        const collector = new client.Discord.MessageCollector(message.channel, m => m.content == "*confirm" && m.author.id === message.author.id, { time: 10000 });

        collector.on("collect", message => {
            message.channel.send("Member purge confirmed! Sending messages then kicking users.");
            kickables.forEach(member => {
                member.send("All users have been been kicked from the LUGES Discord.\nYou can rejoin via https://discord.gg/luges").then(() => member.kick);
            });
            collector.stop();
        });

        collector.on("end", (msgs) => {
            if (msgs.size == 0)
                message.channel.send("No confirmation, purge halted.");
        });
    });
};

exports.help = {
    admin: true,
    name: process.env.prefix + "purge",
    description: "Kicks all non-committee and non-bot users from the Discord Server."
};