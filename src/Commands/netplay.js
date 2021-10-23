const Command = require("../Structures/Command.js");
const fs = require("fs");

const Discord = require("discord.js");
const lobby = require("./lobby.js");
const { channel } = require("diagnostics_channel");

module.exports = new Command({
  name: "netplay",
  description: "Grant netplay role.",
  permission: "SEND_MESSAGES",
  async run(message, args, client) {
    if (args.length > 0) {
      return;
    }

    const helpMsg = new Discord.MessageEmbed();
    helpMsg
      .setTitle("Select the game you want to play?")
      .setColor("BLUE");
    const row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setCustomId("mbtl")
        .setLabel("MBTL")
        .setStyle("PRIMARY"),
      new Discord.MessageButton()
        .setCustomId("ggst")
        .setLabel("GGST")
        .setStyle("PRIMARY")
    )

    let getRole = await message.channel.send({embeds: [helpMsg], components: [row]});

    const filter = (interaction) => {
      return interaction.user.id === message.author.id
    };

    let role;
    let msgDeleted = false;
    let guild = message.guild.members.fetch();
    let roleCount;
    const roleGranted = new Discord.MessageEmbed();

    const collectorA = getRole.createMessageComponentCollector({filter, time: 20000});
    collectorA.on("collect", async i => {
      switch(i.customId) {
        case "ggst":
          msgDeleted = true;
          getRole.delete();
          role = message.guild.roles.cache.find(r => r.name == "netplay GGST");
          await message.member.roles.add(role);
          roleCount = await role.members.size;
          roleGranted
            .setDescription(`**netplay GGST** role granted.\n**${roleCount - 1}** others have this role now.\n\`!stop\` to remove role.`)
            .setColor("GREEN")
          message.channel.send({embeds:[roleGranted]})
          break;
        case "mbtl":
          msgDeleted = true;
          getRole.delete();
          role = message.guild.roles.cache.find(r => r.name == "netplay MBTL");
          await message.member.roles.add(role);
          roleCount = await role.members.size;
          roleGranted
            .setDescription(`**netplay MBTL** role granted.\n**${roleCount - 1}** others have this role now.\n\`!stop\` to remove role.`)
            .setColor("GREEN")
          message.channel.send({embeds:[roleGranted]})
          break;
      }
    });

    collectorA.on("end", async () => {
      if (msgDeleted == false) {
        getRole.delete();
      }
    })
    
    
  }
});