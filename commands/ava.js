exports.run = (client, message) => {
  if(message.channel.type === 'dm')
    return  message.channel.send("This command can only be run from a bot channel.")

        let id = message.mentions.members.first().user.id
        client.fetchUser(id).then( meh => message.channel.send(meh.avatarURL))
}

exports.help = {
        admin: false,
        name: process.env.prefix + "ava <@mention>",
        description: "Pulls the profile picture of whoever you mention."
    }
