const { Color } = require('../config.json');
const moment = require("moment");
const { MessageEmbed } = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = client => {
  client.on("guildMemberAdd", member => {
   
    let role = db.get(`welrole_${member.guild.id}`);
    if (role === null) {
      return;
    }

    let addrole = member.guild.roles.cache.find(r => r.id === role);

    member.roles.add(addrole);
  });
};
