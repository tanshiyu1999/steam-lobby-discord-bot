const Command = require("../Structures/Command.js");
const fs = require("fs");

const Discord = require("discord.js");
const lobby = require("./lobby.js");

module.exports = new Command({
  name: "r",
  description: "Remove your lobby",
  permission: "SEND_MESSAGES",
  async run(message, args, client) {
    let lobbyData = require("../Data/lobbyData.json");
    let userName = message.author.username;

    for (let i = 0; i < lobbyData.length; i++) {
      if (lobbyData[i].creator == userName) {
        let removed = lobbyData.splice(i, 1)
        console.log(`Removed: ${removed}`)
        const removedMessage = new Discord.MessageEmbed();
        removedMessage
        .setTitle(`${removed[0].creator}'s ${removed[0].category} lobby has been removed.`)
        .setTimestamp(message.createdTimestamp)
        .setColor("LIGHT_GREY")
        
        message.channel.send({embeds:[removedMessage]});

        fs.writeFileSync("./src/Data/lobbyData.json", JSON.stringify(lobbyData,undefined, 2));
        return
      }
    }
  }
});