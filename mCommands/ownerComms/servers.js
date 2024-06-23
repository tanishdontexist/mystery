const { MessageEmbed, Permissions } = require("discord.js");
const { ownerId, Color } = require('../../config.json');

module.exports = {
  name: "servers",
  aliases: ["tser"],
  description: "Show All Servers MysTeRy Are In",
  usage: "servers",
  category: "OwnerComms",
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
    let guildId = client.guilds.cache.map(guild => guild.id);
    let guildName = client.guilds.cache.map(guild => guild.name);

    const embed = new MessageEmbed()
      .setColor(Color)
      .addField(`Server [${client.guilds.cache.size}]`, guildName.join(`, `));

    message.channel.send({ embeds: [embed] });
  }
};
