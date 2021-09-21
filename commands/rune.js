const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { formatHTML } = require("./utils/html-formatter.js");
const runesReforged = require("../data/runesReforged.json");
const { patch } = require("../config.json");

function findRuneName(name) {
  // Traverse through layers of arrays/objects in JSON file.
  for (let i = 0; i < runesReforged.length; i++) {
    const tree = runesReforged[i];
    const slots = tree.slots;

    for (let j = 0; j < slots.length; j++) {
      const runes = slots[j].runes;

      for (let k = 0; k < runes.length; k++) {
        if (runes[k].name.toLowerCase() === name.toLowerCase()) {
          // Save the name of the rune tree so that it can be used later.
          const rune = runes[k];
          runes[k].tree = tree.name;
          return runes[k];
        }
      }
    }
  }
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rune")
    .setDescription("Provides info about a rune.")
    .addStringOption((option) => {
      return option
        .setName("name")
        .setDescription("Rune names cannot be abbreviated")
        .setRequired(true)
    }),
  async execute(interaction) {
    const runeName = interaction.options.getString("name");
    const rune = findRuneName(runeName);

    if (!rune) {
      await interaction.editReply("That rune does not exist.");
      return;
    }

    const embed = new MessageEmbed()
      .setTitle(`${rune.name} (${rune.tree})`)
      .setDescription(formatHTML(rune.longDesc))
      .setFooter(`Patch ${patch}`);

    await interaction.editReply({ embeds: [embed] });
  }
};
