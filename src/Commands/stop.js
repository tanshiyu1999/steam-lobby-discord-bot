const Command = require("../Structures/Command.js");
const fs = require("fs");

const Discord = require("discord.js");
const lobby = require("./lobby.js");

module.exports = new Command({
  name: "stop",
  description: "Remove netplay role",
  permission: "SEND_MESSAGES",
  async run(message, args, client) {
    message.guild.roles.cache.find(r => {
      if (r.name == "netplay GGST") {
        message.member.roles.remove(r);
      } else if (r.name == "netplay MBTL") {
        message.member.roles.remove(r)
      }
    });
    message.channel.send("You have removed all your netplay roles. Thanks for playing.")
  }
});