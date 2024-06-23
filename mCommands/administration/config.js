const { MessageEmbed, Permissions } = require("discord.js");
const db = require("quick.db");
const { Color } = require('../../config.json');

module.exports = {
  name: "config",
  aliases: ["cfg"],
  description: "Config of your server.",
  usage: "config",
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

    let premium = db.get(`serverpremium_${message.guild.id}`);

    let bwordsstate = db.get(`resbadwords_${message.guild.id}`);
    let resstate = db.get(`reslinks_${message.guild.id}`);
    let bwordsstate1 = db.get(`resbadwords_warn_${message.guild.id}`);
    let resstate1 = db.get(`reslinks_warn_${message.guild.id}`);

    let muteRole =
      message.guild.roles.cache.find(r => r.name === "Muted") ||
      message.guild.roles.cache.find(r => r.name === "muted") ||
      db.get(`muterole_${message.guild.id}`);

    let welchannel = db.get(`welchannel_${message.guild.id}`);
    let welrole = db.get(`welrole_${message.guild.id}`);
    let leavechannel = db.get(`leavechannel_${message.guild.id}`);

    if (bwordsstate !== null) {
      bwordsstate = "On";
    } else {
      bwordsstate = "Off";
    }

    if (resstate !== null) {
      resstate = "On";
    } else {
      resstate = "Off";
    }

    if (bwordsstate1 !== null) {
      bwordsstate1 = "On";
    } else {
      bwordsstate1 = "Off";
    }
    if (resstate1 !== null) {
      resstate1 = "On";
    } else {
      resstate1 = "Off";
    }
    if (premium !== null) {
      premium = "Activated";
    } else {
      premium = "Not Activated";
    }

    if (muteRole !== null) {
      muteRole = `${"<@&" + muteRole + ">"}`;
    } else {
      muteRole = "No Role";
    }

    if (welrole !== null) {
      welrole = `${"<@&" + welrole + ">"}`;
    } else {
      welrole = "No Role Seted";
    }

    if (welchannel !== null) {
      welchannel = `${"<#" + welchannel + ">"}`;
    } else {
      welchannel = "No Channel";
    }

    if (leavechannel !== null) {
      leavechannel = `${"<#" + leavechannel + ">"}`;
    } else {
      leavechannel = "No Channel";
    }

    const embed = new MessageEmbed()
      .setColor(Color)
      .setDescription(
        `Mute Role \n- ${muteRole} \nJoin Role \n- ${welrole} \nWelcome & Leave \n- ${welchannel} & ${leavechannel} \nPremium - ${premium} \n[ Restrictions - \nLinks - ${resstate} & Warn - ${resstate1} \nBad Words - ${bwordsstate} & Warn - ${bwordsstate1} ]`
      );

    message.channel.send({ embeds: [embed] });
  }
};
