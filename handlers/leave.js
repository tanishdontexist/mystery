const moment = require("moment");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = (client) => {
  client.on("guildMemberRemove", (member) => {
    let chx = db.get(`leavechannel_${member.guild.id}`);
    if (chx === null) {
      return;
    }

    let embed = new MessageEmbed()
      .setAuthor(member.user.username, member.user.avatarURL({ dynamic: true }))
      .setThumbnail(member.user.avatarURL({ dynamic: true }))
      .setDescription(
        `${member.user.tag} Left \nNow we have ${
          member.guild.memberCount
        } members left \n\nMember information - \nI'd - \`${
          member.user.id
        }\` \nJoined server at - \`${moment(member.joinedAt).format(
          "MMMM DD YYYY"
        )}\``
      )
      .setFooter(
        `Member left our server`,
        member.guild.iconURL({ dynamic: true })
      );

    member.guild.channels.cache.get(chx).send({ embeds: [embed] });
  });
};
