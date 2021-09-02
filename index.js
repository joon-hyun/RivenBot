const fs = require("fs");
const { Client, Collection } = require("discord.js");
const { discordToken } = require("./config.json");

const client = new Client({ intents: [] });
client.commands = new Collection();

const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));

for (const file of eventFiles) {
  const { name, execute } = require(`./events/${file}`);
  client.on(name, (...args) => execute(...args));
}

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (err) {
    /**
     * The HTTP status codes that the Riot API will return if there is an error
     * with the response.
     */
    const statusCodes = new Map([
      ["400", "Bad request"],
      ["401", "Unauthorized"],
      ["403", "Forbidden"],
      ["404", "Data not found"],
      ["405", "Method not allowed"],
      ["415", "Unsupported media type"],
      ["429", "Rate limit exceeded"],
      ["500", "Internal server error"],
      ["502", "Bad gateway"],
      ["503", "Service unavailable"],
      ["504", "Gateway timeout"]
    ]);
    const statusMessage = statusCodes.get(err.message);

    if (statusMessage === undefined) {
      console.error(err);
      await interaction.reply({ content: "There was a problem while executing this command." });
    } else {
      await interaction.reply({ content: statusMessage });
    }
  }
});

client.login(discordToken);
