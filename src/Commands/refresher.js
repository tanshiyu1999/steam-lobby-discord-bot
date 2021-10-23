const Command = require("../Structures/Command.js");
const Discord = require("discord.js");
const fs = require("fs")
const {makeFields, makeRefresherFields} = require("../Scripts/makeFields")
const dateFunct = require("date-fns")


module.exports = new Command({
  name: "refresher",
  description: "Shows the active lobbies.",
  permission: "SEND_MESSAGES",
  async run(message, args, client) {
    if (message.channel.name != "active-lobbies") {
      return;
    }

    let lobbyData = require("../Data/lobbyData.json");
    lobbyData = lobbyData.filter( lobby => {
      if ((lobby.timestamp + lobby.timeOpening) < message.createdTimestamp) {
        console.log(`${lobby.creator} is to be removed.`)
        return false;
      } else {
        return true;
      }
    })
    fs.writeFileSync("./src/Data/lobbyData.json", JSON.stringify(lobbyData, undefined, 2));    
    
    let fields = makeFields(lobbyData);
    const refresherMsg = new Discord.MessageEmbed();
    refresherMsg
      .addFields(...fields)
      .setColor("GREEN")
    if (lobbyData.length == 0) {
      refresherMsg.setTitle("There are currently no lobbies.")
    } else {
      refresherMsg.setTitle("Currently active lobbies: ")
    }
    const msg = await message.channel.send({embeds:[refresherMsg]})
  
    const editEmbed = () => {
      const currentDate = new Date();
      const timestamp = currentDate.getTime();
      let lobbyData = require("../Data/lobbyData.json");
      // console.log(lobbyData)

      lobbyData = lobbyData.filter( lobby => {
        if ((lobby.timestamp + lobby.timeOpening) < timestamp) {
          // console.log(`${lobby.creator} time has passed.`)
          return false;
        } else {
          return true;
        }
      })

      fs.writeFileSync("./src/Data/lobbyData.json", JSON.stringify(lobbyData, undefined, 2));


      let edittedFields = makeRefresherFields(lobbyData);
      const edittedEmbed = new Discord.MessageEmbed();
      edittedEmbed
        .addFields(...edittedFields)
        .setColor("GREEN")

      if (lobbyData.length == 0) {
        edittedEmbed.setTitle("There are currently no lobbies.")
      } else {
        edittedEmbed.setTitle("Currently active lobbies: ")
      }
      msg.edit({embeds: [edittedEmbed]})
    }
    var refresher = setInterval(editEmbed, 5000);

    // Will figure out how to stop refresher at a later date
  }
});


