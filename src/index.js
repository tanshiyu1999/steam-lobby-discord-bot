console.clear();


const Client = require("./Structures/Client.js");
const client = new Client();

const keepAlive = require('./Hosting/server.js')
keepAlive();

require("dotenv").config()
client.start(process.env.TOKEN);