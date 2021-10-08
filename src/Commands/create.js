const Command = require("../Structures/Command.js");
const Discord = require("discord.js");
const fs = require("fs")

module.exports = new Command({
  name: "create",
  description: "Save the link in the database so everyone can access it.",
  permission: "SEND_MESSAGES",
  async run(message, args, client) {
    if (args.length < 1) {
      console.log("Please only insert 1 link.")
      return;
    }

    let regex = /^steam:\/\/joinlobby\//i

    if (!args[0].match(regex)) {
      console.log("Did not match with anything")
      return;
    }


    
    let lobbyData = require("../Data/lobbyData.json");
    let lobbyInfo = {}
    lobbyInfo.creator = message.author.username;
    lobbyInfo.category = message.channel.parent.name;
    lobbyInfo.timestamp = message.createdTimestamp;
    lobbyInfo.link = args[0];

    for (let i = 0; i < lobbyData.length; i++) {
      // console.log("Lobby Data: " + lobbyData[i].creator)
      // console.log("New Lobby Info: " + lobbyInfo.creator)
      if (lobbyData[i].creator == lobbyInfo.creator) {
        console.log(`Removed: ${lobbyData[i].creator}`)
        lobbyData.splice(i, 1);
        i--;
      }
      // console.log("\n")
    }
    lobbyData.push(lobbyInfo);
    fs.writeFileSync("./src/Data/lobbyData.json", JSON.stringify(lobbyData,undefined, 2));

    const lobbyCreated = new Discord.MessageEmbed();
    lobbyCreated
      .setTitle(`${lobbyInfo.category} lobby created, join us!`)
      .setDescription(lobbyInfo.link)
      .setThumbnail(message.author.avatarURL({ dynamic: true }))
      .setAuthor(
        message.author.username, 
        message.author.avatarURL({ dynamic: true })
      )
      .setTimestamp(message.createdTimestamp)
    if (lobbyInfo.category == "MBTL") {
      lobbyCreated.setColor("BLUE")
    } else if (lobbyInfo.category == "GGST") {
      lobbyCreated.setColor("DARK_RED")
    } else {
      lobbyCreated.setColor("DARK_GREEN")
    }

    
    message.channel.send({embeds: [lobbyCreated]})

  }
});