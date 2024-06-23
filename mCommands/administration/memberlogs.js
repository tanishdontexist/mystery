const db = require("quick.db");
const { Color } = require('../../config.json');
const moment = require("moment");
const { MessageEmbed, Permissions } = require("discord.js");

module.exports = {
  name: "memberlogs",
  aliases: ["mlogs"],
  description: "All welcome/leave commands.",
  usage: "memberlogs [command]",
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

    if (!args[0]) {
      const embed = new MessageEmbed()
        .setAuthor(
          client.user.username,
          client.user.avatarURL({ dynamic: true })
        )
        .setColor(Color)
        .setDescription(
          `**Aliases:** mlogs \n**Description:** All Welcome/Leave Commands\n\n**Sub Commands:** \nmemberlogs welpreview - Welcome Preview \nmemberlogs leavepreview - Leave Preview \nmemberlogs joinrole - Role For New Members \nmemberlogs welchannel - Set Welcome Channel \nmemberlogs leavechannel - Set Leave Channel \n\n**Usage:** \nmemberlogs welpreview \nmemberlogs leavepreview \nmemberlogs joinrole [role/roleId] \nmemberlogs welchannel [channel/channelId] \nmemberlogs leavechanenl [channel/channelId]] \n\n**Examples:** \nmemberlogs welpreview \nmemberlogs leavepreview \nmemberlogs joinrole 890909951667605534 \nmemberlogs welchannel 890909951667605534 \nmemberlogs leavechannel 890909951667605534`
        )
        .setFooter(`To delete use the commands without any value.`);

      return message.channel.send({ embeds: [embed] });
    } else if (args[0] === "welpreview") {
      const embed = new MessageEmbed()
        .setAuthor(
          message.member.user.username,
          message.member.user.avatarURL({ dynamic: true })
        )
        .setColor(Color)
        .setThumbnail(message.member.user.avatarURL({ dynamic: true }))
        .setDescription(
          `Hey, ${message.member} \nWelcome to **${
            message.guild.name
          }** \nYou are the ${
            message.guild.memberCount
          }th member in our server \n\nMember information - \nI'd - \`${
            message.member.user.id
          }\` \nRegistered at - \`${moment(
            message.member.user.createdAt
          ).format("MMMM DD YYYY")}\``
        )
        .setFooter(
          `Thanks for Joining our server`,
          message.guild.iconURL({ dynamic: true })
        );

      message.channel.send({ embeds: [embed] });
    } else if (args[0] === "leavepreview") {
      let embed = new MessageEmbed()
        .setAuthor(
          message.member.user.username,
          message.member.user.avatarURL({ dynamic: true })
        )

        .setThumbnail(message.member.user.avatarURL({ dynamic: true }))
        .setDescription(
          `${message.member.user.tag} Left \nNow we have ${
            message.guild.memberCount
          } members left \n\nMember information - \nI'd - \`${
            message.member.user.id
          }\` \nJoined server at - \`${moment(message.member.joinedAt).format(
            "MMMM DD YYYY"
          )}\``
        )
        .setFooter(
          `Member left our server`,
          message.guild.iconURL({ dynamic: true })
        );

      message.channel.send({ embeds: [embed] });
    } else if (args[0] === "joinrole") {
      let welr = db.get(`welrole_${message.guild.id}`);

      if (!args[1]) {
        if (welr !== null) {
          db.delete(`welrole_${message.guild.id}`);
          const embed = new MessageEmbed()
            .setColor(Color)
            .setDescription(`Successfully deleted welcome role`);
          return message.channel.send({ embeds: [embed] });
        }
        const rembed = new MessageEmbed()
          .setColor(Color)
          .setDescription(`You must specify any role-id or role.`);
        return message.channel.send({ embeds: [rembed] });
      } else {
        let role =
          message.mentions.roles.first() ||
          message.guild.roles.cache.find((r) => r.id === args[1]);

        let myrole = message.guild.me.roles;

        if (!role) {
          const rembed = new MessageEmbed()
            .setColor(Color)
            .setDescription("You must specify any valid role-id.");
          return message.channel.send({ embeds: [rembed] });
        }

        try {
          message.guild.me.roles.add(role);
          message.guild.me.roles.remove(role);
        } catch (error) {
          const rembed = new MessageEmbed()
            .setColor(Color)
            .setDescription(
              "I don't have permission to give this role to anyone."
            );
          return message.channel.send({ embeds: [rembed] });
        }

        db.set(`welrole_${message.guild.id}`, role.id);

        const embed = new MessageEmbed()
          .setColor(Color)
          .setDescription(`Successfully seted welcome role as ${role}`);

        message.channel.send({ embeds: [embed] });
      }
    } else if (args[0] === "welchannel") {
      let channel =
        message.mentions.channels.first() ||
        message.guild.channels.cache.find((c) => c.id === args[1]);

      let welch = db.get(`welchannel_${message.guild.id}`);

      if (!args[1]) {
        if (welch !== null) {
          db.delete(`welchannel_${message.guild.id}`);

          const embed = new MessageEmbed()
            .setColor(Color)
            .setDescription(`Successfully deleted welcome channel`);
          return message.channel.send({ embeds: [embed] });
        }
        const embed = new MessageEmbed()
          .setColor(Color)
          .setDescription("You must specify any channel-id or channel.");
        return message.channel.send({ embeds: [embed] });
      }

      if (!channel) {
        const embed = new MessageEmbed()
          .setColor(Color)
          .setDescription("You must specify any valid channel-id.");
        return message.channel.send({ embeds: [embed] });
      }

      db.set(`welchannel_${message.guild.id}`, channel.id);

      const embed = new MessageEmbed()
        .setColor(Color)
        .setDescription(`Successfully seted welcome channel as ${channel}`);

      message.channel.send({ embeds: [embed] });
    } else if (args[0] === "leavechannel") {
      let channel =
        message.mentions.channels.first() ||
        message.guild.channels.cache.find((c) => c.id === args[1]);

      let leavech = db.get(`leavechannel_${message.guild.id}`);

      if (!args[1]) {
        if (leavech !== null) {
          db.delete(`leavechannel_${message.guild.id}`);

          const embed = new MessageEmbed()
            .setColor(Color)
            .setDescription(`Successfully deleted leave channel`);

          return message.channel.send({ embeds: [embed] });
        }
        const embed = new MessageEmbed()
          .setColor(Color)
          .setDescription("You must specify any channel-id or channel.");
        return message.channel.send({ embeds: [embed] });
      }
      if (!channel) {
        const embed = new MessageEmbed()
          .setColor(Color)
          .setDescription("You must specify any valid channel-id.");
        return message.channel.send({ embeds: [embed] });
      }

      db.set(`leavechannel_${message.guild.id}`, channel.id);

      const embed = new MessageEmbed()
        .setColor(Color)
        .setDescription(`Successfully seted leave channel as ${channel}`);

      message.channel.send({ embeds: [embed] });
    } else {
      const embed = new MessageEmbed()
        .setColor(Color)
        .setDescription(
          `**Aliases:** mlogs \n**Description:** All Welcome/Leave Commands\n\n**Sub Commands:** \nmemberlogs welpreview - Welcome Preview \nmemberlogs leavepreview - Leave Preview \nmemberlogs joinrole - Role For New Members \nmemberlogs welchannel - Set Welcome Channel \nmemberlogs leavechannel - Set Leave Channel \n\n**Usage:** \nmemberlogs welpreview \nmemberlogs leavepreview \nmemberlogs joinrole [role/roleId] \nmemberlogs welchannel [channel/channelId] \nmemberlogs leavechanenl [channel/channelId]] \n\n**Examples:** \nmemberlogs welpreview \nmemberlogs leavepreview \nmemberlogs joinrole 890909951667605534 \nmemberlogs welchannel 890909951667605534 \nmemberlogs leavechannel 890909951667605534`
        )
        .setFooter(`To delete use the commands without any value.`);

      return message.channel.send({ embeds: [embed] });
    }
  },
};
