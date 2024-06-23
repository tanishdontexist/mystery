const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { Default_Prefix, Color } = require('../config.json');
const { Permissions, EmbedBuilder } = require("discord.js");

module.exports = client => {
  client.on("messageCreate", async message => {
    let prefix = db.get(`serverprefix_${message.guild.id}`);
    if (prefix === null) prefix = Default_Prefix;

    if (message.author.bot) return;
    if (
      message.content.startsWith(`<@!${client.user.id}>`) ||
      message.content.startsWith(`<@${client.user.id}>`)
    ) {
      const embed = new EmbedBuilder()
      .setColor(Color)
      .setDescription(`My prefix in this server is [ ${prefix} ]`)
      return message.channel.send({embeds: [embed]});
    }

    if (!message.content.startsWith(prefix)) return;
    if (!message.guild) return;
    if (!message.member)
      message.member = await message.guild.fetchMember(message);
    const args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);
    const cmd = await args.shift().toLowerCase();
    if (cmd.length == 0) return;
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) command.run(client, message, args);
  });
};
