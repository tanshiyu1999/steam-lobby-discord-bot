const Command = require("../Structures/Command.js");
const Discord = require("discord.js");
const fs = require("fs")
const creatingLobbyMsg = require("../Scripts/creatingLobbyMsg.js");


module.exports = new Command({
  name: "create",
  description: "Save the link in the database so everyone can access it.",
  permission: "SEND_MESSAGES",
  async run(message, args, client) {
    if (args.length == 0) {
      return;
    }

    let lobbyData = require("../Data/lobbyData.json");
    let lobbyInfo = {};
    lobbyInfo.creator = message.author.username;
    lobbyInfo.timestamp = message.createdTimestamp;
    lobbyInfo.link = args.join(' ');
    if (message.channel.parent) {
      if (message.channel.parent.name == "GGST" || message.channel.parent.name == "MBTL") {
        lobbyInfo.category = message.channel.parent.name;
      } else {
        lobbyInfo.category = message.channel.name;
      }
    } else {
      lobbyInfo.category = message.channel.name;
    }
  
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

    const row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setCustomId("1-hour")
        .setLabel("1 hour")
        .setStyle("PRIMARY"),
      new Discord.MessageButton()
        .setCustomId("2-hours")
        .setLabel("2 hours")
        .setStyle("PRIMARY"),
      new Discord.MessageButton()
        .setCustomId("3-hours")
        .setLabel("3 hours")
        .setStyle("PRIMARY"),
      new Discord.MessageButton()
        .setCustomId("4-hours")
        .setLabel("4 hours")
        .setStyle("PRIMARY"),
      new Discord.MessageButton()
        .setCustomId("10-hours")
        .setLabel("10 hours")
        .setStyle("PRIMARY")
    );
    let chooseTimeMsg = await message.channel.send({content: "Estimated lobby opening duration (Default 5 hours)", components: [row]});


    const filter = (interaction) => {
      return interaction.user.id === message.author.id
    }
    let clickedFlag = false;
    const collector = chooseTimeMsg.createMessageComponentCollector({filter, time: 5000, max: 1});
    collector.on("collect", async i => {
      switch(i.customId) {
        case '1-hour':
          console.log("1 hour")
          lobbyInfo.timeOpening = 3600000;
          clickedFlag = true;
          creatingLobbyMsg(lobbyInfo, lobbyData, message);
          break;
        case '2-hours':
          console.log("2 hours")
          lobbyInfo.timeOpening = 7200000;
          clickedFlag = true;
          creatingLobbyMsg(lobbyInfo, lobbyData, message);
          break;
        case '3-hours':
          console.log("3 hours")
          lobbyInfo.timeOpening = 10800000;
          clickedFlag = true;
          creatingLobbyMsg(lobbyInfo, lobbyData, message);
          break;
        case '4-hours':
          console.log("4 hours")
          lobbyInfo.timeOpening = 14400000;
          clickedFlag = true;
          creatingLobbyMsg(lobbyInfo, lobbyData, message);
          break;
        case '10-hours':
          console.log("10 hours")
          lobbyInfo.timeOpening = 36000000;
          clickedFlag = true;
          creatingLobbyMsg(lobbyInfo, lobbyData, message);
          break;
      }
    })

    collector.on("end", async () => {
      if (clickedFlag == false) {
        console.log("5 hours")
        lobbyInfo.timeOpening = 18000000;
        creatingLobbyMsg(lobbyInfo, lobbyData, message);
      }
      chooseTimeMsg.delete();
    })
  }
});