const db = require("quick.db");
const { Color } = require('../../config.json')
const { MessageEmbed, Permissions } = require("discord.js");

module.exports = {
  name: "afk",
  type: 1,
  description: "Set your afk.",
  options: [
    {
      name: "message",
      type: 3,
      description: "Will display this message when someone tag you,",
      required: true
    }
  ],
  run: async (client, interaction) => {
    let afkmodule = db.get(`afkmod_${interaction.guild.id}`);

    let { options } = interaction;

    const reason = options.getString("message");

    db.set(
      `afk_${interaction.user.id}_${interaction.guild.id}`,
      interaction.user.id
    );
    db.set(`afk.reason_${interaction.user.id}_${interaction.guild.id}`, reason);
    db.set(
      `afk.name_${interaction.user.id}_${interaction.guild.id}`,
      interaction.member.displayName
    );
    db.set(
      `afk.time_${interaction.user.id}_${interaction.guild.id}`,
      Date.now()
    );

    if (interaction.member.manageable) {
      interaction.member.setNickname(`[AFK] ${interaction.member.displayName}`);
    }
    const embed = new MessageEmbed()
      .setAuthor(
        interaction.user.username,
        interaction.user.avatarURL({ dynamic: true })
      )
      .setColor(Color)
      .setDescription(`${interaction.user} i've set your afk successfully for ${reason}`);
    interaction.reply({ embeds: [embed] });
  }
};
