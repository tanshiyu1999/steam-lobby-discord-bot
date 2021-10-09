const fs = require("fs")
const Discord = require("discord.js")

const creatingLobbyMsg = (lobbyInfo, lobbyData, message) => {
  lobbyData.push(lobbyInfo);
  fs.writeFileSync("./src/Data/lobbyData.json", JSON.stringify(lobbyData,undefined, 2));


  const lobbyCreated = new Discord.MessageEmbed();


  lobbyCreated
    .setTitle(`${lobbyInfo.category} lobby created for ${lobbyInfo.timeOpening / 3600000} ${((lobbyInfo.timeOpening / 3600000 == 1) ? "hour." : "hours.")}`)
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

module.exports = creatingLobbyMsg;