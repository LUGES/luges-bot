exports.run = (client, message) => {
    let tempA = [];
    let srv = client.guilds.get(process.env.srvID);
    let usr = srv.members.get(message.author.id);
    let allowed;

    if(!usr.roles.find(role => role.id === process.env.execRole))
        allowed = false;
    else 
        allowed = true;


    client.fs.readdir(__dirname, (err, files) => {
        if (err) return console.error (err);
        files.forEach(file => {
            if(!file.endsWith(".js")) return;
            let details = require("./" + file);
            if(details.help.admin && allowed){
                tempA.push({name: details.help.name, value: details.help.description});
            }
            else if(!details.help.admin){
                tempA.push({name: details.help.name, value: details.help.description});
            }
        });
        // message.channel.send(temp);
        message.author.send({embed: {
            color: 3447003,
            title: "Commands List",
            fields: tempA
        }});
    });

    if(message.channel.type != "dm")
        message.delete();


};

exports.help = {
    admin:  false,
    name: process.env.prefix + "commands",
    description: "Lists all the commands you can use as your current role."
};