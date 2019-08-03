exports.run = (client, message) => {
    if (!client.execCheck(message)) return;
    if (message.channel.id != "513805746681675776") return message.channel.send("This command can only be used in #information.");


    let execs = message.guild.roles.get(process.env.execRole).members;
    let channels = message.guild.channels;
    if(message.channel.type != "dm")
        message.delete();

    message.channel.fetchMessages().then(messages => messages.array().forEach(
        message => message.author.bot && message.delete()
    ));

    if (!execs)
        return message.channel.send("Error occured getting list of Committee Members.");

    let tmpListA = [];

    execs.forEach(tmpExec => {
        if (!tmpExec)
            return message.channel.send("Error occured querying Committee Member Roles.");
        tmpListA.push({
            "name": tmpExec.highestRole.name,
            "displayName": tmpExec.user.tag,
            "execName": tmpExec.nickname,
            "position": tmpExec.highestRole.position
        });
    });

    tmpListA.sort((a, b) => (a.position < b.position) ? 1 : -1);

    let tmpList = [];

    tmpListA.forEach(tmpExec => {
        let inline = tmpExec.displayName.length < 20;
        tmpList.push({
            "name": tmpExec.name,
            "value": tmpExec.displayName,
            "inline": inline
        });
    });

    let tmpChanListA = [];

    channels.forEach(chn => {
        if (!chn)
            return message.channel.send("Error occured querying Channels.");
        if (chn.type === "text")
            if (chn.topic)
                tmpChanListA.push({
                    "name": chn.name,
                    "category": chn.parent.name.toLowerCase(),
                    "topic": chn.topic,
                    "position": chn.position
                });
    });

    tmpChanListA.sort((a, b) => (a.position > b.position) ? 1 : -1);

    let tmpChanList = [];

    tmpChanListA.forEach(chn => {
        let tmpnm = chn.category;
        if ((tmpnm === "society & server" || tmpnm === "community" || tmpnm === "feedback" || tmpnm === "bot zone" || tmpnm === "videogames") && (chn.topic)) {
            tmpChanList.push({
                "name": "#" + chn.name,
                "value": chn.topic
            });
        }
    });

    message.channel.send({
        embed: {
            color: 3447003,
            title: "Committee Members",
            fields: tmpList
        }
    });

    message.channel.send({
        embed: {
            color: 3447003,
            title: "Key Links",
            fields: [{
                "name": "Rules",
                "value": "[LUGES Discord Rules](https://wiki.luges.net/books/society-information/page/discord-rules)",
                "inline": true
            }, {
                "name": "Website",
                "value": "[LUGES Website](https://lancaster.ac.uk/luges)",
                "inline": true
            }, {
                "name": "Calendar",
                "value": "[LUGES Calendar](https://www.lancaster.ac.uk/luges/calendar)",
                "inline": true
            }, {
                "name": "Wiki",
                "value": "[LUGES Wiki](https://wiki.luges.net)",
                "inline": true
            }, {
                "name": "Membership",
                "value": "[Become a Member!](https://lancastersu.co.uk/groups/gaming-and-esports-society)",
                "inline": true
            }, {
                "name": "Discord Invite",
                "value": "[discord.gg/luges](https://discord.gg/luges)",
                "inline": true
            }]
        }
    });

    message.channel.send({
        embed: {
            color: 3447003,
            title: "Channels",
            fields: tmpChanList
        }
    });


};

exports.help = {
    admin: true,
    name: process.env.prefix + "info",
    description: "Prints server info."
};