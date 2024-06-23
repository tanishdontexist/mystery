const weather = require("weather-js");
const { MessageEmbed } = require("discord.js");
const { Color } = require('../../config.json');

module.exports = {
  name: "weather",
  type: 1,
  description: "See weather directly from discord.",
  options: [
    {
      name: "place",
      type: 3,
      description:
        "Type name of the place of which you want weather information.",
      required: true,
    },
  ],
  run: async (client, interaction) => {
    let { options } = interaction;
    let args = options.getString("place");

    weather.find({ search: args, degreeType: "C" }, function (err, result) {
      try {
        let embed = new MessageEmbed()
          .setAuthor(`Weather - ${result[0].location.name}`)
          .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
          .setColor(Color)

          .addField(
            "Temperature",
            `${result[0].current.temperature} Celcius`,
            true
          )
          .addField("Sky Text", result[0].current.skytext, true)
          .addField("Humidity", result[0].current.humidity, true)
          .addField("Wind Speed", result[0].current.windspeed, true) //What about image
          .addField("Observation Time", result[0].current.observationtime, true)
          .addField("Wind Display", result[0].current.winddisplay, true)
          .setFooter(
            `Requested By ${interaction.member.user.tag}`,
            interaction.member.user.avatarURL({ dynamic: true })
          );

        interaction.reply({ embeds: [embed] });
      } catch (err) {
        interaction.reply("Unable To Get The Data Of Given Location.");
      }
    });
  },
};
