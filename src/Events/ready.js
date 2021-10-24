const Event = require("../Structures/Event.js");
const fs = require("fs");


module.exports = new Event("ready", (client) => {
  if (!fs.existsSync("src/Data/lobbyData.json")) {
    let brackets = [];
    fs.writeFileSync('src/Data/lobbyData.json', JSON.stringify(brackets))
  }


  console.log("Bot is ready.")
})