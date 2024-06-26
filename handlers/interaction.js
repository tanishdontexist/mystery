module.exports = async (client, interaction) => {
  client.on("interactionCreate", async interaction => {
    if (interaction.isCommand()) {
      const SlashCommands = client.slashCommands.get(interaction.commandName);
      if (!SlashCommands) return;

      try {
        await SlashCommands.run(client, interaction);
      } catch (error) {
        if (interaction.replied) {
          await interaction
            .editReply({
              content: `An unexcepted error occured, please use /report`
            })
            .catch(() => {});
        } else {
          await interaction
            .followUp({
              ephemeral: true,
              content: `An unexcepted error occured, please use /report`
            })
            .catch(() => {});
        }
        console.error(error);
      }
    } else return;
  });
};
