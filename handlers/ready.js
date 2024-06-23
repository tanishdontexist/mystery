const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');

module.exports = (client) => {
  const status = db.get(`status`);
  const activity = db.get(`activity`);
  const actname = db.get(`actname`);

  client.on("ready", () => {
    console.log(`${client.user.tag} connected to discord`);

    client.user.setPresence({
      activities: [{ name: `Music`, type: ActivityType.Listening }],
      status: 'dnd',
    });
   
  });
};
