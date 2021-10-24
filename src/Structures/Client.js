const Discord = require("discord.js");

const Command = require("./Command.js");

const Event = require("./Event.js");

const intents = new Discord.Intents(32767);

const fs = require("fs");
require("dotenv").config()

// const config = require("../Data/config.json")


class Client extends Discord.Client{
  constructor() {
    super({intents});

    this.commands = new Discord.Collection();
    this.prefix = "!";
  }

  start(token) {
    fs.readdirSync('./src/Commands')
      .filter(file => file.endsWith('.js'))
      .forEach(file => {
        const command = require(`../Commands/${file}`);
        console.log(`Command ${command.name} loaded.`);
        this.commands.set(command.name, command);
      });
    
    // no clue what this code means
    fs.readdirSync("./src/Events")
      .filter(file => file.endsWith("js"))
      .forEach(file => {
        const event = require(`../Events/${file}`);
        console.log(`Event ${event.event} loaded`);
        this.on(event.event, event.run.bind(null, this));
      });

    this.login(token);
  }
}

module.exports = Client