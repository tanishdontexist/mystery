const { Color } = require('../../config.json');
const { Permissions, MessageEmbed } = require("discord.js");

module.exports = {
  name: "purge",
  aliases: ["clear"],
  description: "Delete 100+ messages.",
  usage: "purge (amount) [user]",
  category: "Moderation",
  run: async (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATION)) {
      if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
        const nooem = new MessageEmbed()
          .setColor(Color)
          .setDescription("You don't have permission to use this command.");
        return message.channel.send({ embeds: [nooem] });
      }
    }
    if (!message.guild.me.permissions.has(Permissions.FLAGS.ADMINISTRATION)) {
      if (
        !message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)
      ) {
        const nooem = new MessageEmbed()
          .setColor(Color)
          .setDescription("I don't have permission to delete messages.");
        return message.channel.send({ embeds: [nooem] });
      }
    }
    let amount = args[0];

    if (!amount) {
      const nooem = new MessageEmbed()
        .setColor(Color)
        .setDescription("You must specify any value to delete messages.");
      return message.channel.send({ embeds: [nooem] });
    }
    if (isNaN(amount)) {
      const nooem = new MessageEmbed()
        .setColor(Color)
        .setDescription("You must specify any valid value.");
      return message.channel.send({ embeds: [nooem] });
    }
    let target = message.mentions.members.first();
    let Messages = await message.channel.messages.fetch();

    if (target) {
      let i = 0;
      const filtered = [];
      (await Messages).filter((m) => {
        if (m.author.id === target.id && amount > i) {
          filtered.push(m);
          i++;
        }
      });

      amount = Math.floor(amount + 1);
      filtered = Math.floor(filtered + 1);

      message.channel.bulkDelete(filtered, true);
    } else {
      await message.channel.bulkDelete(amount);
    }

    const embed = new MessageEmbed()
      .setColor(Color)
      .setDescription(`\`${amount}\` messages deleted successfully.`);
    message.channel.send({ embeds: [embed] }).then((msg) => {
      setTimeout(() => msg.delete(), 2000);
    });
  },
};
