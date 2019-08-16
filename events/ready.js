module.exports = async (client) => {
    client.user.setPresence({ game: { name: process.env.prefix + "commands" }, status: "online" });

    client.channels.get(process.env.moderationID).send({embed: {
        color: 1037917,
        title: "Online and ready!",
        timestamp: new Date()
    }});
    
    console.log("Online");
};