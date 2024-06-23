const { MessageEmbed, Permissions } = require("discord.js");
let db = require("quick.db");
let { Color } = require('../../config.json');

module.exports = {
  name: "tags",
  aliases: ["tgs"],
  description: "Show Tags",
  usage: "tags",
  category: "Administration",
  run: async (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATION)) {
      if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
        const nooem = new MessageEmbed()
          .setColor(Color)
          .setDescription("You don't have permission to use this command.");
        return message.channel.send({ embeds: [nooem] });
      }
    }

    let embed = new MessageEmbed()
      .setColor(Color)
      .setAuthor(
        client.user.username,
        client.user.avatarURL({ dynamic: true })
      );

    let num = 1;

    let tag1 = db.get(`server_tag_1_${message.guild.id}`);
    let text1 = db.get(`server_tag.text_1_${message.guild.id}`);

    if (tag1 === null) {
       const embed = new MessageEmbed()
          .setColor(Color)
          .setDescription(`No tags founded.`);
        return message.channel.send({ embeds: [embed] });
    }

    if (tag1 !== null && text1 !== null) {
      embed.addField(`[${num}] Tag -`, `${tag1} - ${text1}`);
      num = 2;
    }

    let tag2 = db.get(`server_tag_2_${message.guild.id}`);
    let text2 = db.get(`server_tag.text_2_${message.guild.id}`);

    if (tag2 !== null && text2 !== null) {
      embed.addField(`[${num}] Tag -`, `${tag2} - ${text2}`);
      num = 3;
    }

    let tag3 = db.get(`server_tag_3_${message.guild.id}`);
    let text3 = db.get(`server_tag.text_3_${message.guild.id}`);

    if (tag3 !== null && text3 !== null) {
      embed.addField(`[${num}] Tag -`, `${tag3} - ${text3}`);
      num = 4;
    }

    let tag4 = db.get(`server_tag_4_${message.guild.id}`);
    let text4 = db.get(`server_tag.text_4_${message.guild.id}`);

    if (tag4 !== null && text4 !== null) {
      embed.addField(`[${num}] Tag -`, `${tag4} - ${text4}`);
      num = 5;
    }

    let tag5 = db.get(`server_tag_5_${message.guild.id}`);
    let text5 = db.get(`server_tag.text_5_${message.guild.id}`);

    if (tag5 !== null && text5 !== null) {
      embed.addField(`[${num}] Tag -`, `${tag5} - ${text5}`);
    }

    message.channel.send({ embeds: [embed] });
  }
};
