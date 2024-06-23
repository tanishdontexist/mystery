const { MessageEmbed, Permissions } = require("discord.js");
const { Color } = require('../../config.json');
module.exports = {
  name: "permsinfo",
  aliases: ["infoperms"],
  description: "Commands permissions.",
  usage: "permsinfo",
  category: "Administration",
  run: async (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATION)) {
      if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
        const nooem = new MessageEmbed()
          .setColor(Color)
          .setDescription("You don't have permission to use this command.");
        return message.channel.send({ embeds: [nooem] });
      }
    }
    let permsembed = new MessageEmbed()
      .setColor(Color)
      .setDescription(
        "**Moderation Commands** \nBan-Unban - `Ban_Members` \nKick - `Kick_Members` \nMute² - `Mute_Members & Manage_Roles` \nTimeout² - `Mute_Members & Moderate_Members` \nAdd-Delrole - `Manage_Roles` \nRole³ - `Manage_Roles` \nWarn³ - `Manage_Messages` \nSetnick - `Manage_Nicknames` \nPurge - `Manage_Messages` \n\n**Administration Commands**\nMemberlogs - `Manage_Guild` \nPrefix - `Manage_Guild` \nAnnounce - `Manage_Guild` \nTag² - `Manage_Guild` \nPremium - `Manage_Guild` \nRestrict - `Manage_Guild ` \nSlowmode - `Manage_Guild`"
      )
      .setFooter(`I also need this permission to execute this commands`);

    message.channel.send({ embeds: [permsembed] });
  }
};
