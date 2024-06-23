const { Color } = require('../../config.json');
const db = require("quick.db");
const { Permissions, MessageEmbed } = require("discord.js");

module.exports = {
  name: "restrict",
  aliases: ["res"],
  description: "Enable/Disable restrictions.",
  usage: "restrict",
  category: "Administration",
  run: (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATION)) {
      if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
        const nooem = new MessageEmbed()
          .setColor(Color)
          .setDescription("You don't have permission to use this command.");
        return message.channel.send({ embeds: [nooem] });
      }
    }
    let bwordsstate = db.get(`resbadwords_${message.guild.id}`);
    let resstate = db.get(`reslinks_${message.guild.id}`);

    if (bwordsstate !== null && resstate !== null) {
      const embed = new MessageEmbed()
        .setColor(Color)
        .setDescription(
          `Which restriction you want to remove \nLinks - 🚫 \nBad Words - ⛔ \nBoth - 🛑`
        );

      message.channel.send({ embeds: [embed] }).then(msg => {
        msg.react("🚫");
        msg.react("⛔");
        msg.react("🛑");

        const filter = (reaction, user) => {
          return (
            ["🚫", "⛔", "🛑"].includes(reaction.emoji.name) &&
            user.id === message.author.id
          );
        };

        msg
          .awaitReactions({ filter, max: 1, time: 10000, errors: ["time"] })
          .then(collected => {
            const reaction = collected.first();

            if (reaction.emoji.name === "🚫") {
              db.delete(`reslinks_${message.guild.id}`);
              db.delete(`reslinks_warn_${message.guild.id}`);
              const wembed = new MessageEmbed()
                .setAuthor(
                  client.user.username,
                  client.user.avatarURL({ dynamic: true })
                )
                .setColor(Color)
                .setDescription(
                  `Now i won't delete messages have links in it.`
                );
              msg.reactions.removeAll();
              msg.edit({ embeds: [wembed] });
            } else if (reaction.emoji.name === "⛔") {
              db.delete(`resbadwords_${message.guild.id}`);
              db.delete(`resbadwords_warn_${message.guild.id}`);
              const wembed = new MessageEmbed()
                .setColor(Color)
                .setDescription(
                  `Now i won't delete messages have bad words in it.`
                );
              msg.reactions.removeAll();
              msg.edit({ embeds: [wembed] });
            } else if (reaction.emoji.name === "🛑") {
              db.delete(`reslinks_${message.guild.id}`);
              db.delete(`reslinks_warn_${message.guild.id}`);
              db.delete(`resbadwords_${message.guild.id}`);
              db.delete(`resbadwords_warn_${message.guild.id}`);

              const wembed = new MessageEmbed()
                .setColor(Color)
                .setDescription(
                  `Now i won't delete messages have links/bad words in it.`
                );
              msg.reactions.removeAll();
              msg.edit({ embeds: [wembed] });
              return;
            }
          });
      });
    }

    if (bwordsstate === null && resstate === null) {
      const embed = new MessageEmbed()
        .setAuthor(
          client.user.username,
          client.user.avatarURL({ dynamic: true })
        )
        .setColor(Color)
        .setDescription(
          `Which restriction you want to add \nLinks - 🚫 \nBad Words - ⛔ \nBoth - 🛑`
        );

      message.channel.send({ embeds: [embed] }).then(msg => {
        msg.react("🚫");
        msg.react("⛔");
        msg.react("🛑");

        const filter = (reaction, user) => {
          return (
            ["🚫", "⛔", "🛑"].includes(reaction.emoji.name) &&
            user.id === message.author.id
          );
        };

        msg
          .awaitReactions({ filter, max: 1, time: 10000, errors: ["time"] })
          .then(collected => {
            const reaction = collected.first();

            if (reaction.emoji.name === "🚫") {
              db.set(`reslinks_${message.guild.id}`, "On");
              const wembed = new MessageEmbed()
                .setColor(Color)
                .setDescription(
                  `Now i will delete messages have links in it. \nReact with 🚫 if you want to warn user sending links in their messages`
                );
              msg.reactions.removeAll();
              msg.edit({ embeds: [wembed] }).then(mssg => {
                mssg.react("🚫");

                const filter = (reaction, user) => {
                  return (
                    ["🚫"].includes(reaction.emoji.name) &&
                    user.id === message.author.id
                  );
                };

                msg
                  .awaitReactions({
                    filter,
                    max: 1,
                    time: 10000,
                    errors: ["time"]
                  })
                  .then(collected => {
                    const reaction = collected.first();

                    if (reaction.emoji.name === "🚫") {
                      db.set(`reslinks_warn_${message.guild.id}`, "On");

                      const xembed = new MessageEmbed()
                      .setColor(Color)
                        .setDescription(
                          `Now i will delete messages and warn user who send messages have links in it.`
                        );
                      msg.reactions.removeAll();
                      msg.edit({ embeds: [xembed] });

                      return;
                    }
                  })
                  .catch(collected => {
                    msg.reactions.removeAll();

                    const yembed = new MessageEmbed()
                      .setColor(Color)
                      .setDescription(
                        `Now i will delete messages have links in it.`
                      );

                    msg.edit({ embeds: [yembed] });
                    return;
                  });
              });
            } else if (reaction.emoji.name === "⛔") {
              db.set(`resbadwords_${message.guild.id}`, "On");
              const wembed = new MessageEmbed()
                .setColor(Color)
                .setDescription(
                  `Now i will delete messages have bad words in it. \nReact with 🚫 if you want to warn user who will send bad words`
                );

              msg.edit({ embeds: [wembed] }).then(msjg => {
                msjg.reactions.removeAll();
                msjg.react("🚫");

                const filter = (reaction, user) => {
                  return (
                    ["🚫"].includes(reaction.emoji.name) &&
                    user.id === message.author.id
                  );
                };

                msjg
                  .awaitReactions({
                    filter,
                    max: 1,
                    time: 10000,
                    errors: ["time"]
                  })
                  .then(collected => {
                    const reaction = collected.first();

                    if (reaction.emoji.name === "🚫") {
                      db.set(`resbadwords_warn_${message.guild.id}`, "On");

                      const xembed = new MessageEmbed()
                        .setColor(Color)
                        .setDescription(
                          `Now i will delete messages and warn user who send messages have bad words in it.`
                        );

                      msjg.edit({ embeds: [xembed] });

                      return;
                    }
                  })
                  .catch(collected => {
                    msjg.reactions.removeAll();

                    const yembed = new MessageEmbed()
                      .setColor(Color)
                      .setDescription(
                        `Now i will delete messages have bad words in it.`
                      );

                    msjg.edit({ embeds: [yembed] });
                    return;
                  });
              });
            } else if (reaction.emoji.name === "🛑") {
              db.set(`reslinks_${message.guild.id}`, "On");
              db.set(`resbadwords_${message.guild.id}`, "On");

              const wembed = new MessageEmbed()
                .setColor(Color)
                .setDescription(
                  `Now i will delete messages have links/bad words in it. \nReact with 🚫 if you want to warn user send links/bad words`
                );

              msg.edit({ embeds: [wembed] }).then(msdg => {
                msdg.reactions.removeAll();
                msdg.react("🚫");
                const filter = (reaction, user) => {
                  return (
                    ["🚫"].includes(reaction.emoji.name) &&
                    user.id === message.author.id
                  );
                };
                msdg
                  .awaitReactions({
                    filter,
                    max: 1,
                    time: 10000,
                    errors: ["time"]
                  })
                  .then(collected => {
                    const reaction = collected.first();

                    if (reaction.emoji.name === "🚫") {
                      db.set(`reslinks_warn_${message.guild.id}`, "On");
                      db.set(`resbadwords_warn_${message.guild.id}`);

                      const xembed = new MessageEmbed()
                        .setColor(Color)
                        .setDescription(
                          `Now i will delete messages and warn user who send messages have links/bad words in it.`
                        );

                      msdg.edit({ embeds: [xembed] });

                      return;
                    }
                  })
                  .catch(collected => {
                    msdg.reactions.removeAll();

                    const yembed = new MessageEmbed()
                      .setColor(Color)
                      .setDescription(
                        `Now i will delete messages have links/bad words in it.`
                      );

                    msdg.edit({ embeds: [yembed] });
                    return;
                  });
              });
            }
          });
      });
    } else if (bwordsstate !== null && resstate === null) {
      const embed = new MessageEmbed()
        .setColor(Color)
        .setDescription(
          `If you want to add restriction of links react with - 🚫 \n If you want to remove restriction of bad words react with - ⛔`
        );

      message.channel.send({ embeds: [embed] }).then(msig => {
        msig.react("🚫");
        msig.react("⛔");

        const filter = (reaction, user) => {
          return (
            ["🚫", "⛔"].includes(reaction.emoji.name) &&
            user.id === message.author.id
          );
        };

        msig
          .awaitReactions({ filter, max: 1, time: 10000, errors: ["time"] })
          .then(collected => {
            const reaction = collected.first();

            if (reaction.emoji.name === "🚫") {
              db.set(`reslinks_${message.guild.id}`, "On");

              const embed = new MessageEmbed()
                .setColor(Color)
                .setDescription(
                  `Now i will delete messages have links in it. \nReact with 🚫 if want me to warn user`
                );

              msig.edit({ embeds: [embed] }).then(mskg => {
                mskg.reactions.removeAll();
                mskg.react("🚫");

                const filter = (reaction, user) => {
                  return (
                    ["🚫"].includes(reaction.emoji.name) &&
                    user.id === message.author.id
                  );
                };

                mskg
                  .awaitReactions({
                    filter,
                    max: 1,
                    time: 10000,
                    errors: ["time"]
                  })
                  .then(collected => {
                    const reaction = collected.first();

                    if (reaction.emoji.name === "🚫") {
                      db.set(`reslinks_warn_${message.guild.id}`, "On");

                      const xembed = new MessageEmbed()
                        .setColor(Color)
                        .setDescription(
                          `Now i will delete messages and warn user who send messages have links in it.`
                        );

                      mskg.edit({ embeds: [xembed] });
                      return;
                    }
                  })
                  .catch(collected => {
                    mskg.reactions.removeAll();
                    return;
                  });
              });
            }
            if (reaction.emoji.name === "⛔") {
              db.delete(`resbadwords_warn_${message.guild.id}`);
              db.delete(`resbadwords_${message.guild.id}`);

              const xembed = new MessageEmbed()
                .setColor(Color)
                .setDescription(
                  `Now i won't delete messages have bad words in it.`
                );
              msig.reactions.removeAll();
              msig.edit({ embeds: [xembed] });
            }
          })

          .catch(collected => {
            msig.reactions.removeAll();
            return;
          });
      });
    } else if (bwordsstate === null && resstate !== null) {
      const embed = new MessageEmbed()
        .setColor(Color)
        .setDescription(
          `If you want to add restriction of bad words react with - 🚫 \n If you want to remove restriction of links react with - ⛔`
        );

      message.channel.send({ embeds: [embed] }).then(msig => {
        msig.react("🚫");
        msig.react("⛔");

        const filter = (reaction, user) => {
          return (
            ["🚫", "⛔"].includes(reaction.emoji.name) &&
            user.id === message.author.id
          );
        };

        msig
          .awaitReactions({ filter, max: 1, time: 10000, errors: ["time"] })
          .then(collected => {
            const reaction = collected.first();

            if (reaction.emoji.name === "🚫") {
              db.set(`resbadwords_${message.guild.id}`, "On");
              const embed = new MessageEmbed()
                .setColor(Color)
                .setDescription(
                  `Now i will delete messages have bad words in it. \nReact with 🚫 if you want me to warn user`
                );

              msig.edit({ embeds: [embed] }).then(mskg => {
                mskg.reactions.removeAll();
                mskg.react("🚫");

                const filter = (reaction, user) => {
                  return (
                    ["🚫"].includes(reaction.emoji.name) &&
                    user.id === message.author.id
                  );
                };

                mskg
                  .awaitReactions({
                    filter,
                    max: 1,
                    time: 10000,
                    errors: ["time"]
                  })
                  .then(collected => {
                    const reaction = collected.first();

                    if (reaction.emoji.name === "🚫") {
                      db.set(`reslinks_warn_${message.guild.id}`, "On");

                      const xembed = new MessageEmbed()
                        .setColor(Color)
                        .setDescription(
                          `Now i will delete messages and warn user who send messages have bad words in it.`
                        );

                      mskg.edit({ embeds: [xembed] });
                    }
                  });
              });
            } else if (reaction.emoji.name === "⛔") {
              db.delete(`reslinks_warn_${message.guild.id}`);
              db.delete(`reslinks_${message.guild.id}`);

              const xembed = new MessageEmbed()
                .setColor(Color)
                .setDescription(
                  `Now i won't delete messages have links in it.`
                );
              msig.reactions.removeAll();
              msig.edit({ embeds: [xembed] });
            }
          })
          .catch(collected => {
            msig.reactions.removeAll();
            return;
          });
      });
    }
  }
};
