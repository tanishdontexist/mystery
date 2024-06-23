const { MessageEmbed } = require("discord.js");
const { Color, ownerId } = require('../../config.json');
const moment = require("moment");

module.exports = {
  name: "guildinfo",
  aliases: ["ginfoo"],
  description: "MysTeRy Guild Information",
  usage: "guildinfo (guildId)",
  category: "Administration",
  run: async (client, message, args) => {
    if (message.author.id !== ownerId) {
      const embed = new MessageEmbed()
        .setColor(Color)
        .setAuthor(
          `| Oop's this is locked!`,
          message.member.user.avatarURL({ dynamic: true })
        );
      return message.channel.send({ embeds: [embed] });
    }
    try {
      const server = client.guilds.cache.find(
        g => g.name === args.slice(0).join(" ")
      );

      const serverembed = new MessageEmbed()
        .setAuthor(server.name, server.iconURL({ dynamic: true }))
        .setColor(Color)
        .setThumbnail(server.iconURL({ dynamic: true }))

        .addField(
          "Server Created At",
          moment(server.createdAt).format("MMM DD YYYY, h:mma")
        )

        .addField(
          "Common Information",
          `Owner: <@${server.ownerId}> \nServer Id: \`${server.id}\``
        )
        .addField(
          "Count Information",
          `Text Channels: \`${
            server.channels.cache.filter(ch => ch.type === "GUILD_TEXT").size
          }\`  \nCategorys: \`${
            server.channels.cache.filter(ch => ch.type === "GUILD_CATEGORY")
              .size
          }\` \nVoice Channels: \`${
            server.channels.cache.filter(ch => ch.type === "GUILD_VOICE").size
          }\` \nRoles: \`${server.roles.cache.size}\` \nMembers: \`${
            server.memberCount
          }\``
        )
        .addField(
          "Additional Information",
          `Verification: \`${server.verificationLevel}\` \nBoost Count: \`${
            server.premiumSubscriptionCount
          }\` \nBoost Tier: \`${server.premiumTier || "`Level 0`"}\``
        );

      message.channel.send({ embeds: [serverembed] });
    } catch {
      return message.reply("I can't get this server information.");
    }
  }
};
