const fs = require("fs")
const Discord = require("discord.js")

const creatingLobbyMsg = (lobbyInfo, lobbyData, message) => {
  lobbyData.push(lobbyInfo);
  fs.writeFileSync("./src/Data/lobbyData.json", JSON.stringify(lobbyData,undefined, 2));


  const lobbyCreated = new Discord.MessageEmbed();



  lobbyCreated
    .setTitle(`${lobbyInfo.category} lobby created for ${lobbyInfo.timeOpening / 3600000} ${((lobbyInfo.timeOpening / 3600000 == 1) ? "hour." : "hours.")}`)
    .setDescription(lobbyInfo.link)
    .setAuthor(
      message.author.username, 
      message.author.avatarURL({ dynamic: true })
    )
    .setTimestamp(message.createdTimestamp)

  let file;
  switch(lobbyInfo.category) {
    case "MBTL":
      file = new Discord.MessageAttachment('./src/Assets/Images/MBTL.png')
      lobbyCreated
        .setColor("BLUE")
        .setThumbnail('attachment://MBTL.png')
      message.channel.send({embeds: [lobbyCreated], files: [file]})
      break;
    case "GGST":
      file = new Discord.MessageAttachment('./src/Assets/Images/GGST.png')
      lobbyCreated
        .setColor("DARK_RED")
        .setThumbnail('attachment://GGST.png')
      message.channel.send({embeds: [lobbyCreated], files: [file]})
      break;
    default:
      lobbyCreated
        .setColor("DARK_GREEN")
        .setThumbnail(message.author.avatarURL({ dynamic: true }))
      message.channel.send({embeds: [lobbyCreated]})
      break;
  }
}

module.exports = creatingLobbyMsg;