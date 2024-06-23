const { Color } = require('../config.json');
const moment = require("moment");
const { MessageEmbed } = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = (client) => {
  client.on("guildMemberAdd", (member) => {
    let chx = db.get(`welchannel_${member.guild.id}`);
    if (chx === null) {
      return;
    }

    let embed = new MessageEmbed()
      .setAuthor(member.user.username, member.user.avatarURL({ dynamic: true }))
      .setColor(Color)
      .setThumbnail(member.user.avatarURL({ dynamic: true }))
      .setDescription(
        `Hey, <@${member.user.id}> \nWelcome to **${
          member.guild.name
        }** \nYou are the ${
          member.guild.memberCount
        }th member in our server \n\nMember information - \nI'd - \`${
          member.user.id
        }\` \nRegistered at - \`${moment(member.user.createdAt).format(
          "MMMM DD YYYY"
        )}\``
      )
      .setThumbnail(member.guild.iconURL({ dynamic: true }))
      .setFooter(
        `Thanks for joining our server`,
        member.guild.iconURL({ dynamic: true })
      );

    member.guild.channels.cache
      .get(chx)
      .send({ content: `<@${member.user.id}>`, embeds: [embed] });
  });
};
