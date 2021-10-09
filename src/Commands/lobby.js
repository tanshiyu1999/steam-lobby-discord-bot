const Command = require("../Structures/Command.js");
const makeFields = require("../Scripts/makeFields")
const Discord = require("discord.js");
const fs = require("fs")

module.exports = new Command({
  name: "lobby",
  description: "Shows the active lobbies.",
  permission: "SEND_MESSAGES",
  async run(message, args, client) {
    let lobbyData = require("../Data/lobbyData.json");
    console.log(message.createdTimestamp)
    lobbyData = lobbyData.filter( lobby => {
      if ((lobby.timestamp + lobby.timeOpening) < message.createdTimestamp) {
        console.log(`${lobby.creator} time has passed.`)
        return false;
      } else {
        return true;
      }
    })
    fs.writeFileSync("./src/Data/lobbyData.json", JSON.stringify(lobbyData, undefined, 2));

    
    


    let fields = makeFields(lobbyData);

    const displayLobby = new Discord.MessageEmbed();


    displayLobby
      .setTimestamp(message.createdTimestamp)
      .addFields(...fields)
      .setColor("GREEN")

    if (lobbyData.length == 0) {
      displayLobby.setTitle("There are currently no lobbies.")
    } else {
      displayLobby.setTitle("Currently active lobbies: ")
    }
    
    message.channel.send({embeds:[displayLobby]})
  }
});