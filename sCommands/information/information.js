const { MessageEmbed, Permissions } = require("discord.js");
const { Color } = require('../../config.json');
const moment = require("moment");

module.exports = {
  name: "information",
  type: 1,
  description: "Get user, role or server information.",
  options: [
    {
      name: "user_or_role",
      type: 9,
      description:
        "Tag user/role for the information you want or leave blank for server information.",
      required: false,
    },
  ],
  run: async (client, interaction) => {
    const { options } = interaction;
    const member = options.getMentionable("user_or_role");

    if (member === null) {
      const server = interaction.guild;
      const serverembed = new MessageEmbed()
        .setAuthor(server.name, server.iconURL({ dynamic: true }))
        .setColor(Color)
        .setThumbnail(server.iconURL({ dynamic: true }))

        .addField(
          "Created At",
          moment(server.createdAt).format("MMM DD YYYY, h:mma")
        )

        .addField(
          "Common Information",
          `Owner: <@${server.ownerId}> \nI'd: ${server.id}`
        )
        .addField(
          "Count Information",
          `Text Channels: ${
            server.channels.cache.filter((ch) => ch.type === "GUILD_TEXT").size
          }  \nCategorys: ${
            server.channels.cache.filter((ch) => ch.type === "GUILD_CATEGORY")
              .size
          } \nVoice Channels: ${
            server.channels.cache.filter((ch) => ch.type === "GUILD_VOICE").size
          } \nRoles: ${server.roles.cache.size} \nMembers: ${
            server.memberCount
          }`
        )
        .addField(
          "Additional Information",
          `Verification: ${server.verificationLevel} \nBoost Count: ${server.premiumSubscriptionCount}`
        )
        .setFooter(
          `Requested By ${interaction.member.user.tag}`,
          interaction.member.user.avatarURL({ dynamic: true })
        );

      interaction.reply({ embeds: [serverembed] });
      return;
    }
    const memberid = member.id;

    if (
      member === interaction.guild.roles.cache.find((r) => r.id === memberid)
    ) {
      const roleEmbed = new MessageEmbed()
        .setAuthor(member.name)
        .setColor(member.color)
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .addField(`Color`, ` ${member.hexColor}`)
        .addField(`I'd`, `${member.id}`)
        .addField(
          `Position`,
          `${member.position} / ${interaction.guild.roles.highest.position}`
        )
        .addField(`Hoisted`, `${member.hoist}`)
        .addField(`Mentionable`, `${member.mentionable}`)
        .addField(`Mention`, `${member}`)
        .addField(
          `Created at`,
          `${moment(member.createdAt).format("MMM DD YYYY h:mma")}`
        )
        .setFooter(
          `Requested By ${interaction.member.user.tag}`,
          interaction.member.user.avatarURL({ dynamic: true })
        );

      interaction.reply({ embeds: [roleEmbed] });
      return;
    } else {
      const target = interaction.guild.members.cache.get(memberid);
      const badges = target.user.flags.toArray();
      let targetstate = "Server Member";
      if (target.user.bot) targetstate = "Discord Bot";
      else if (target.user.id === interaction.guild.ownerId)
        targetstate = "Server Owner";
      else if (
        target.permissions.has(Permissions.FLAGS.ADMINISTRATOR) ||
        target.permissions.has(Permissions.FLAGS.MANAGE_GUILD)
      )
        targetstate = "Server Admin";
      else if (target.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES))
        targetstate = "Server Moderator";
      else targetstate = "Server Member";

      const embed = new MessageEmbed()
        .setAuthor(
          target.user.username,
          target.user.avatarURL({ dynamic: true })
        )
        .setColor(
          target.displayHexColor === "#000000"
            ? "#ffffff"
            : target.displayHexColor
        )
        .setThumbnail(target.displayAvatarURL({ dynamic: true }))
        .addField(
          "Joined Server At",
          moment(target.joinedAt).format("MMM DD YYYY, h:mma")
        )
        .addField(
          "Account Created At",
          moment(target.user.createdAt).format("MMM DD YYYY, h:mma")
        )

        .addField(
          "Common Information",
          `Discriminator: \`${target.user.discriminator}\`\nUser Id: \`${target.id}\``
        )

        .addField(`Badges`, `${badges.join(", ") || "No Badges"}`)

        .addField(
          `Roles [${target.roles.cache.size - 1 || "0"}]`,
          `${
            target.roles.cache
              .map((r) => r)
              .join(" ")
              .replace("@everyone", "") || "No Roles"
          }`
        )
        .addField(`Acknowledgements`, `${targetstate}`)

        .setFooter(
          `Requested By ${interaction.member.user.tag}`,
          interaction.member.user.avatarURL({ dynamic: true })
        );

      interaction.reply({ embeds: [embed] });
    }
  },
};
