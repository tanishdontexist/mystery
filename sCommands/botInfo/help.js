const { MessageEmbed, EmbedBuilder } = require('discord.js');
const { Color } = require('../../config.json');

module.exports = {
  data: {
    name: 'help',
    type: 'CHAT_INPUT',
    description: 'Client help command.',
    options: [
      {
        name: 'command',
        type: 'STRING',
        description: 'Type cmd name if you need help for a particular command.',
      },
    ],
  },
  execute: async (interaction) => {
    const options = interaction.options;
    const cmdd = options.getString('command');

    // [ All Commands -
    const botInfo = 'About, Help, Invite, Update, Report';
    const information =
      'Afk, Math, Remindme, Randomcolor, Membercount, Avatar, Information, Weather';
    const moderation =
      'Ban, Unban, Kick, Timeout, Untimeout, Warn, Warnings, Remwarns, Createrole, Delrole, Role, Rolecolor, Rolename, Setnick, Purge';
    const administration =
      'Announce, Config, Permsinfo, Prefix, Restrict, Tag, Tags, Memberlogs, Slowmode';
    // Commands Ended ]

    // [ All Commands Total -
    const botInfoTotal = '5';
    const informationTotal = '8';
    const moderationTotal = '15';
    const administrationTotal = '9';
    // Commands Total Ended ]

    const embed = new EmbedBuilder()
      .setColor(Color)
      .setAuthor(`${interaction.client.user.username} - Help Section`)
      .setDescription(
        `Mystery is a discord bot aim for making server moderation easy and without any obstacles.`
      )
      .addField(`BotInfo Commands ( / ) [${botInfoTotal}]`, `\`${botInfo}\``)
      .addField(
        `Information Commands ( / ) [${informationTotal}]`,
        `\`${information}\``
      )
      .addField(
        `Moderation Commands [${moderationTotal}]`,
        `\`${moderation}\` `
      )
      .addField(
        `Administration Commands [${administrationTotal}]`,
        `\`${administration}\``
      )
      .setFooter(
        `Use /help (commandName) For More Info.`,
        interaction.client.user.displayAvatarURL({ dynamic: true })
      );

    if (!cmdd) return interaction.reply({ embeds: [embed] });

    try {
      const cmd =
        interaction.client.commands.get(cmdd.toLowerCase()) ||
        interaction.client.commands.get(
          interaction.client.aliases.get(cmdd.toLowerCase())
        );

      const embed2 = new MessageEmbed()
        .setAuthor(
          interaction.client.user.username,
          interaction.client.user.displayAvatarURL({ dynamic: true })
        )
        .setColor(Color)
        .setDescription(`
          **Name** - ${cmd.name} \n**Aliases** - ${cmd.aliases} \n**Description** - ${cmd.description} \n**Usage** - ${cmd.usage} \n**Category** - ${cmd.category}`
        )
        .setFooter(
          `Run: CommandName (Needed) [Optional]`,
          interaction.client.user.displayAvatarURL({ dynamic: true })
        );

      if (cmd) {
        interaction.reply({ embeds: [embed2] });
      } else {
        interaction.reply({ embeds: [embed] });
      }
    } catch (error) {
      console.error(error);
      interaction.reply({ embeds: [embed] });
    }
  },
};
