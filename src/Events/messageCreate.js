const Event = require("../Structures/Event.js");
const fs = require("fs")
const Discord = require("discord.js");
const creatingLobbyMsg = require("../Scripts/creatingLobbyMsg.js");


module.exports = new Event("messageCreate", async (client, message) => {
  let regex = /^steam:\/\/joinlobby\//i;
  const args = message.content.substring(client.prefix.length).split(/ +/);

  if (message.content.match(regex) && args.length == 1) {
    let lobbyData = require("../Data/lobbyData.json");
    let lobbyInfo = {};
    lobbyInfo.creator = message.author.username;
    lobbyInfo.timestamp = message.createdTimestamp;
    lobbyInfo.link = message.content;
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





  if (message.author.bot) return;

  if (!message.content.startsWith(client.prefix)) return;



  if (args.length == 1 && args[0] == 'l') {
    console.log("Only l command is included")
    return;
  }

  


  // return the command if it is equal to the first argument
  const command = client.commands.find(cmd => {
    if(cmd.name == args[0]) {
      args.shift()
      return cmd;
    };
  })



  if (!command){
    // console.log(command);
    return; //message.reply(`${args[0]} is not a valid command!`)
  }



  

  command.run(message, args, client);

})