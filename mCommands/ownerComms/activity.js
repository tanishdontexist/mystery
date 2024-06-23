const { MessageEmbed, Permissions } = require("discord.js");
const { ownerId, Color } = require('../../config.json');
const db = require("quick.db");

module.exports = {
  name: "activity",
  aliases: ["actname"],
  description: "Change Activity Of The Bot With A Command",
  usage: "activity (activity) (actname)",
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
    const actname = args[0];
    const activity = args.slice(1).join(" ");

    db.set(`activity`, activity);
    db.set(`actname`, actname);

    client.user.setActivity(activity, { type: actname });

    const embed = new MessageEmbed()
      .setColor(Color)
      .setDescription(
        `Sucessfully seted activity as ${args[0]} ${args.slice(1).join(" ")}`
      );

    message.channel.send({ embeds: [embed] });
  }
};
