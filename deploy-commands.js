const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { clientId, guildId, discordToken } = require("./config.json");

const commands = [];
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(discordToken);
const options = { body: commands };

// An IIFE is used due to the await expressions.
(async () => {
  try {
    /**
     * Determine whether to register commands globally or to a specified guild.
     * The user should execute `node deploy-commands.js [global|guild]`.
     */
    switch(process.argv[2]) {
      case "global":
        await rest.put(Routes.applicationCommands(clientId), options);
        break;
      case "guild":
        await rest.put(Routes.applicationGuildCommands(clientId, guildId), options);
        break;
      default:
        console.error(new Error("Must specify how to register the application commands."));
        return;
    }

    console.log("Successfully registered application commands.");
  } catch (err) {
    console.error(err);
  }
})();
