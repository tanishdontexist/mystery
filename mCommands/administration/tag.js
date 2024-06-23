const { MessageEmbed, Permissions } = require("discord.js");
let db = require("quick.db");
let { Color } =require('../../config.json');

module.exports = {
  name: "tag",
  aliases: ["tg"],
  description: "Add/Edit/Delete A Tag",
  usage: "tag [command]",
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

    if (args[0] === "create") {
      let tag = args[1];
      let text = args.slice(2).join(" ");

      let premiumId = db.get(`serverpremium_${message.guild.id}`);

      let num = 1;

      let tag1 = db.get(`server_tag_1_${message.guild.id}`);
      let text1 = db.get(`server_tag.text_1_${message.guild.id}`);

      if (tag1 !== null && text1 !== null) {
        num = 2;
      }

      let tag2 = db.get(`server_tag_2_${message.guild.id}`);
      let text2 = db.get(`server_tag.text_2_${message.guild.id}`);

      if (tag2 !== null && text2 !== null) {
        num = 3;
        if (message.guild.id !== premiumId) {
          const embed = new MessageEmbed()
            .setColor(Color)
            .setDescription(
              `You need to upgrade your server to premium to add more tags.`
            );
          return message.channel.send({ embeds: [embed] });
        }
      }

      let tag3 = db.get(`server_tag_3_${message.guild.id}`);
      let text3 = db.get(`server_tag.text_3_${message.guild.id}`);

      if (tag3 !== null && text3 !== null) {
        num = 4;
      }

      let tag4 = db.get(`server_tag_4_${message.guild.id}`);
      let text4 = db.get(`server_tag.text_4_${message.guild.id}`);

      if (tag4 !== null && text4 !== null) {
        num = 5;
      }

      let tag5 = db.get(`server_tag_5_${message.guild.id}`);
      let text5 = db.get(`server_tag.text_5_${message.guild.id}`);

      if (tag5 !== null && text5 !== null) {
        const embed = new MessageEmbed()
          .setColor(Color)
          .setDescription(`No more tags can be added for now.`);
        return message.channel.send({ embeds: [embed] });
      }

      db.set(`server_tag_${num}_${message.guild.id}`, tag);
      db.set(`server_tag.text_${num}_${message.guild.id}`, text);

      const embed = new MessageEmbed()
        .setColor(Color)
        .setDescription(
          `Successfully added tag \nTag - ${tag} \nResponse - ${text}`
        );

      message.channel.send({ embeds: [embed] });
    } else if (args[0] === "edit") {
      let name1 = db.get(`server_tag_1_${message.guild.id}`);
      let name2 = db.get(`server_tag_2_${message.guild.id}`);
      let name3 = db.get(`server_tag_3_${message.guild.id}`);
      let name4 = db.get(`server_tag_4_${message.guild.id}`);
      let name5 = db.get(`server_tag_5_${message.guild.id}`);

      let name = args[1];
      let response = args.slice(2).join(" ");

      if (!name) {
        const embed = new MessageEmbed()
          .setColor(Color)
          .setDescription(`You must specify any tag name to edit.`);
        return message.channel.send({ embeds: [embed] });
      }

      if (!response) {
        const embed = new MessageEmbed()
          .setColor(Color)
          .setDescription(`You must specify any response to edit.`);
        return message.channel.send({ embeds: [embed] });
      }

      if (name === name1) {
        db.set(`server_tag.text_1_${message.guild.id}`, response);
      } else if (name === name2) {
        db.set(`server_tag.text_2_${message.guild.id}`, response);
      } else if (name === name3) {
        db.set(`server_tag.text_3_${message.guild.id}`, response);
      } else if (name === name4) {
        db.set(`server_tag.text_4_${message.guild.id}`, response);
      } else if (name === name5) {
        db.set(`server_tag.text_5_${message.guild.id}`, response);
      } else {
        const embed = new MessageEmbed()
          .setColor(Color)
          .setDescription(`You must specify any valid tag name.`);
        return message.channel.send({ embeds: [embed] });
      }

      const embed = new MessageEmbed()
        .setColor(Color)
        .setDescription(`Successfully changed ${name} respone to ${response}`);

      message.channel.send({ embeds: [embed] });
    } else if (args[0] === "delete") {
      let embed = new MessageEmbed().setColor(Color);

      let num = 1;

      let tag1 = db.get(`server_tag_1_${message.guild.id}`);
      let text1 = db.get(`server_tag.text_1_${message.guild.id}`);

      if (tag1 === null) {
        return message.reply("No Tag Founded.");
        return;
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

      message.channel.send({ embeds: [embed] }).then((msg) => {
        msg.react("1️⃣");

        if (tag2 !== null && text2 !== null) {
          msg.react("2️⃣");
        }

        if (tag3 !== null && text3 !== null) {
          msg.react("3️⃣");
        }

        if (tag4 !== null && text4 !== null) {
          msg.react("4️⃣");
        }

        if (tag5 !== null && text5 !== null) {
          msg.react("5️⃣");
        }

        const filter = (reaction, user) => {
          return (
            ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣"].includes(reaction.emoji.name) &&
            user.id === message.author.id
          );
        };

        msg
          .awaitReactions({ filter, max: 1, time: 10000, errors: ["time"] })
          .then((collected) => {
            const reaction = collected.first();

            if (reaction.emoji.name === "1️⃣") {
              db.delete(`server_tag_1_${message.guild.id}`);
              db.delete(`server_tag.text_1_${message.guild.id}`);
              message.channel.send("Successfully Deleted 1st Tag");
              db.set(`server_tag_1_${message.guild.id}`, tag2);
              db.set(`server_tag.text_1_${message.guild.id}`, text2);
              db.delete(`server_tag_2_${message.guild.id}`);
              db.delete(`server_tag.text_2_${message.guild.id}`);
            } else if (reaction.emoji.name === "2️⃣") {
              db.delete(`server_tag_2_${message.guild.id}`);
              db.delete(`server_tag.text_2_${message.guild.id}`);
              message.channel.send("Successfully Deleted 2nd Tag");
              db.set(`server_tag_2_${message.guild.id}`, tag3);
              db.set(`server_tag.text_2_${message.guild.id}`, text3);
              db.delete(`server_tag_3_${message.guild.id}`);
              db.delete(`server_tag.text_3_${message.guild.id}`);
            } else if (reaction.emoji.name === "3️⃣") {
              db.delete(`server_tag_3_${message.guild.id}`);
              db.delete(`server_tag.text_3_${message.guild.id}`);
              message.channel.send("Successfully Deleted 3rd Tag");
              db.set(`server_tag_3_${message.guild.id}`, tag4);
              db.set(`server_tag.text_3_${message.guild.id}`, text4);
              db.delete(`server_tag_4_${message.guild.id}`);
              db.delete(`server_tag.text_4_${message.guild.id}`);
            } else if (reaction.emoji.name === "4️⃣") {
              db.delete(`server_tag_4_${message.guild.id}`);
              db.delete(`server_tag.text_4_${message.guild.id}`);
              message.channel.send("Successfully Deleted 4th Tag");
              db.set(`server_tag_4_${message.guild.id}`, tag5);
              db.set(`server_tag.text_4_${message.guild.id}`, text5);
              db.delete(`server_tag_5_${message.guild.id}`);
              db.delete(`server_tag.text_t_${message.guild.id}`);
            } else if (reaction.emoji.name === "5️⃣") {
              db.delete(`server_tag_5_${message.guild.id}`);
              db.delete(`server_tag.text_5_${message.guild.id}`);
              message.channel.send("Successfully Deleted 5th Tag");
            }
          });
      });
    } else if (!args[0]) {
      const embed = new MessageEmbed()
        .setColor(Color)
        .setDescription(
          `**Aliases:** tg \n**Description:** Create/Edit/Delete A Tag \n\n**Sub Commands:** \ntag create - Create A Tag \ntag delete - Delete A Tag \ntag edit - Edit A Tag \n\n**Usage:** \ntag create [tag] [response] \ntag delete \ntag edit [tag] [response] \n\n**Examples:** \ntag create Hi Hlo \ntag delete \ntag edit Hi Hello`
        );

      message.channel.send({ embeds: [embed] });
    } else {
      const embed = new MessageEmbed()
        .setColor(Color)
        .setDescription(
          `**Aliases:** tg \n**Description:** Create/Edit/Delete A Tag \n\n**Sub Commands:** \ntag create - Create A Tag \ntag delete - Delete A Tag \ntag edit - Edit A Tag \n\n**Usage:** \ntag create [tag] [response] \ntag delete \ntag edit [tag] [response] \n\n**Examples:** \ntag create Hi Hlo \ntag delete \ntag edit Hi Hello`
        );

      message.channel.send({ embeds: [embed] });
    }
  },
};
