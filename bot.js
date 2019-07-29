/*jshint esversion: 8 */ 
const Discord = require("discord.js");
const Enmap = require("enmap");
const client = new Discord.Client();
client.Discord = Discord;
client.moment = require('moment');
client.fs = require("fs");

// Function that checks if the user has the role needed to execute elevated commands.
client.execCheck = function exec(message) {
  let srv = client.guilds.get(process.env.srvID);
  let usr = srv.members.get(message.author.id);

  if (!usr.roles.find(role => role.id === process.env.execRole)) {
    message.channel.send("You do not have permission to use that command.");
    return false;
  } else
    return true;
};

  // Populates the commands enmap with those in the commands folder.
  client.commands = new Enmap();

  client.fs.readdir(__dirname + "/commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let props = require(`./commands/${file}`);
      let commandName = file.split(".")[0];
      client.commands.set(commandName, props);
    });
  });

  // Creates event handlers for all Discord API events that exist in the events folder.

  client.on('error', error => console.log(error.message));

  client.fs.readdir(__dirname + "/events", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      const event = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      client.on(eventName, event.bind(null, client));
      delete require.cache[require.resolve(`./events/${file}`)];
    });
  });

  client.login(process.env.token);