const { MessageEmbed } = require("discord.js");
const ms = require("ms");
const { Color } = require('../../config.json');
const db = require("quick.db");

module.exports = {
  name: "remindme",
  type: 1,
  description: "Will remind you in a certain time.",
  options: [
    {
      name: "time",
      type: 3,
      description: "Duration in which you want to get reminded.",
      required: true,
    },
    {
      name: "reason",
      type: 3,
      description: "Reason of your reminder.",
      required: true,
    },
  ],
  run: async (client, interaction) => {
    const { options } = interaction;

    const time = options.getString("time");
    const reason = options.getString("reason");

    const embed = new MessageEmbed()
      .setAuthor(
        interaction.member.user.username,
        interaction.member.user.avatarURL({ dynamic: true })
      )
      .setColor(Color)
      .setDescription(
        `${interaction.member} i've set your reminder of ${time} \nReason - ${reason}`
      );

    interaction.reply({ embeds: [embed] });

    setTimeout(async function () {
      const timeoutembed = new MessageEmbed()
        .setAuthor(
          interaction.member.user.username,
          interaction.member.user.avatarURL({ dynamic: true })
        )
        .setColor(Color)
        .setDescription(
          `${interaction.member} your reminder is now completed \nReason - ${reason}`
        );

      interaction.channel.send({ embeds: [timeoutembed] });

      interaction.channel.send(`${interaction.member}`).then((msg) => {
        msg.delete();
      });
    }, ms(time));
  },
};
