const { MessageEmbed } = require("discord.js");
const { evaluate } = require("mathjs");
const { Color } = require('../../config.json');

module.exports = {
  name: "math",
  type: 1,
  description: "Ask me a math question.",
  options: [
    {
      name: "equation",
      type: 3,
      description: "Syntaxes: + - / *",
      required: true
    }
  ],
  run: async (client, interaction) => {
    try {
      const { options } = interaction;

      const equation = options.getString("equation");

      const embed = new MessageEmbed()
        .setColor(Color)
        .setDescription(
          `Your Equation - ${equation} \nYour Equation Solution - ${evaluate(
            equation
          )}`
        );
      interaction.reply({ embeds: [embed] });
    } catch (e) {
      interaction.reply(
        "Your Equation Is Not Valid \nValid Syntaxes - Add + Min - Divide / Multiply *"
      );
    }
  }
};
