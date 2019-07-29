//let shrek = require('../commands/someone.js');
module.exports = async (client, message) => {
    if (message.content.includes("@someone") && !message.author.bot && message.channel.type != "dm")
    {
      let leMessage = message.content
      let currID = message.member.id
      
      let memes = message.channel.members.map(m => {if(!m.user.bot) return m.user.id}).filter(Boolean);
      
      let rando;
      while(rando == currID || rando == undefined)
          rando = memes[Math.floor(Math.random() * memes.length)]
      leMessage = leMessage.replace("@someone","<@" + rando + ">");
      message.channel.send(message.author.username + ": " + leMessage);
      message.delete();
    }

    if((message.content.toLowerCase()).includes("good bot"))
      message.react("❤");
    
    if((message.content.toLowerCase()).includes("bad bot"))
      message.react("😢");

    if(message.channel.id == "605128989207429153" && !message.content.startsWith("/member"))
      message.delete();

    if (!message.content.startsWith(process.env.prefix) || message.author.bot || message.content.startsWith(process.env.prefix + process.env.prefix)) return;
    

    const args = message.content.slice(process.env.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const funct = client.commands.get(command);

    if (!funct){
      message.channel.send(`Command not found, you can use ${process.env.prefix}commands to see what I can do!`);
      return;
    }

    funct.run(client, message, args);
}