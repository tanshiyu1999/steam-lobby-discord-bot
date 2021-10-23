console.clear();


const Client = require("./Structures/Client.js");
const client = new Client();

const keepAlive = require('./Hosting/server.js')
keepAlive();

const config = require("./Data/config.json");
require("dotenv").config()
client.start(config.token);