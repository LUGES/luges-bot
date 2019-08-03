module.exports = async (client) => {
    client.user.setPresence({ game: { name: process.env.prefix + "commands" }, status: "online" });
    console.log("Online");
};