const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { Color } = require('../config.json');
const { MessageEmbed, Permissions } = require("discord.js");

module.exports = (client) => {
  client.on("messageCreate", (message) => {
    const links = ["discord.gg/", ".gg/", "https://"];
    const blacklisted = [
      "fuck",
      "bhencho",
      "bsdk",
      "bhosdike",
      "bhopdike",
      "bh0sdike",
      "gaand",
      "bhenchod",
      "bhenkaloda",
      "loda",
      "betichod",
      "madarchod",
      "chudvale",
      "madarjaat",
      "motherfucker",
      "ass",
      "ballsack",
      "bloody",
      "blowjob",
      "boob",
      "cock",
      "dick",
      "fuck",
      "fucker",
      "penis",
      "piss",
      "pussy",
      "scrotum",
      "sex",
      "shit",
      "slut",
      "smegma",
      "tit",
      "vagina",
    ];

    if (!message.guild || message.author.bot) return;

    if (message.member && message.member.permissions.has("ADMINISTRATOR")) return;
    
    if (message.member && !message.member.permissions.has("ADMINISTRATOR")) {
      if (message.member.permissions.has("MANAGE_GUILD")) return;
    }
    
    let state = db.get(`reslinks_${message.guild.id}`);
    let warnstate = db.get(`reslinks_warn_${message.guild.id}`);
    let state1 = db.get(`resbadwords_${message.guild.id}`);
    let warnstate1 = db.get(`resbadwords_warn_${message.guild.id}`);

    let foundInText = false;
    for (var i in links) {
      if (message.content.includes(links[i])) foundInText = true;
    }
    if (foundInText) {
      if (state !== null) {
        message.delete();
        const nolik = new MessageEmbed()
          .setColor(Color)
          .setDescription(`${message.member} no links allowed.`);
        message.channel.send({ embeds: [nolik] });

        if (warnstate !== null) {
          db.add(`warn_${message.author}_${message.guild.id}`, 1);

          const w = db.get(`warn_${message.author}_${message.guild.id}`);

          /*     db.set(
            `warn.moderator_${w}_${message.author}_${message.guild.id}`,
            message.author.tag
          );
          db.set(
            `warn.reason_${w}_${message.author}_${message.guild.id}`,
            "Posting Links"
          );
*/
          const warnembed = new MessageEmbed()
            .setColor(Color)
            .setDescription(
              `${message.member} has been warned successfully for sending links.`
            );

          message.channel.send({ embeds: [warnembed] });

          const dmwarnembed = new MessageEmbed()
            .setColor(Color)
            .setDescription(
              `You have been warned in ${message.guild.name} for sending links.`
            );

          message.member.user.send({ embeds: [dmwarnembed] });
        }
      }
    }
    let foundInText1 = false;
    for (var i in blacklisted) {
      if (message.content.includes(blacklisted[i])) foundInText1 = true;
    }
    if (foundInText1) {
      if (state1 !== null) {
        message.delete();
        const nolik = new MessageEmbed()
          .setColor(Color)
          .setDescription(`${message.member} no bad words allowed.`);
        message.channel.send({ embeds: [nolik] });

        if (warnstate1 !== null) {
          db.add(`warn_${message.author}_${message.guild.id}`, 1);

          const w = db.get(`warn_${message.author}_${message.guild.id}`);

          /*   db.set(
            `warn.moderator_${w}_${message.author}_${message.guild.id}`,
            message.author.tag
          );
          db.set(
            `warn.reason_${w}_${message.author}_${message.guild.id}`,
            "Posting Bad Words"
          );*/

          const warnembed = new MessageEmbed()
            .setColor(Color)
            .setDescription(
              `${message.member} has been warned successfully for using bad words.`
            );

          message.channel.send({ embeds: [warnembed] });

          const dmwarnembed = new MessageEmbed()
            .setColor(Color)
            .setDescription(
              `You have been warned in ${message.guild.name} for using bad words.`
            );

          message.member.user.send({ embeds: [dmwarnembed] });
        }
      }
    }
  });
};
