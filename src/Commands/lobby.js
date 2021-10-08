const Command = require("../Structures/Command.js");
const makeFields = require("../Scripts/makeFields")
const Discord = require("discord.js");

module.exports = new Command({
  name: "lobby",
  description: "Shows the active lobbies.",
  permission: "SEND_MESSAGES",
  async run(message, args, client) {
    let lobbyData = require("../Data/lobbyData.json");
    let fields = makeFields(lobbyData)

    const displayLobby = new Discord.MessageEmbed();


    displayLobby
      .setTitle(`Currently active lobbies.`)
      .setTimestamp(message.createdTimestamp)
      .addFields(...fields)
      .setColor("GREEN")
    
    message.channel.send({embeds:[displayLobby]})
  }
});