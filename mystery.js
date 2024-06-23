const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const { Token, ownerId, clientId, Color } = require('./config.json');
const db = require("quick.db");
const client = new Client({
  intents: 32767,
});

client.slashCommands = new Collection();
client.commands = new Collection();
client.aliases = new Collection();
client.categories = readdirSync("./mCommands/");

[
  "ready",
  "command",
  "message",
  "interaction",
  "welrole",
  "welcome",
  "leave",
  "afk",
  "tags",
  "restrictions",
  "afk-message",
].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

const data = [];

readdirSync("./sCommands/").forEach((dir) => {
  const slashCommandFiles = readdirSync(`./sCommands/${dir}/`).filter((file) =>
    file.endsWith(".js")
  );

  for (const file of slashCommandFiles) {
    const slashCommand = require(`./sCommands/${dir}/${file}`);
    if (!slashCommand.name)
      return console.error(
        `slashCommandNameError: ${
          slashCommand.name
        } application command name is required.`
      );
    if (!slashCommand.description)
      return console.error(
        `slashCommandDescriptionError: ${
          slashCommand.name
        } application command description is required.`
      );

    client.slashCommands.set(slashCommand.name, slashCommand);
    data.push(slashCommand);
  }
});

client.on("ready", async () => {
  await client.application.commands.set(data);
});

client.login(Token);
