const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { findName } = require("./utils/name-finder.js");
const { formatHTML } = require("./utils/html-formatter.js");
const { data: itemData } = require("../data/item.json");
const { patch } = require("../config.json");

function getBuildPath(items) {
  let buildPath;

  for (let i = 0; i < items.length; i++) {
    const item = itemData[items[i]].name;

    // Append item name to buildPath with newline separator.
    buildPath = (i === 0 ? `${item}` : `${buildPath}\n${item}`);
  }

  return buildPath;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("item")
    .setDescription("Searches for an item's stats and abilities.")
    .addStringOption((option) => {
      return option
        .setName("name")
        .setDescription("Item names cannot be abbreviated")
        .setRequired(true)
    }),
  async execute(interaction) {
    const itemName = interaction.options.getString("name");
    const item = findName(itemData, itemName);

    if (!item) {
      await interaction.editReply("That item does not exist.");
      return;
    }

    const embed = new MessageEmbed()
      .setTitle(item.name)
      .setDescription(formatHTML(item.description))
      .setFooter(`Patch ${patch}`)
      .addField("Total Price", `${item.gold.total} G`, true)
      .addField("Base Price", `${item.gold.base} G`, true) // Total Price - Component Price
      .addField("Sell Price", `${item.gold.sell} G`, true);

    if(item.hasOwnProperty("from")) {
      embed.addField("Builds From", getBuildPath(item.from), true);
    }

    if (item.hasOwnProperty("into")) {
      embed.addField("Builds Into", getBuildPath(item.into), true);
    }

    await interaction.editReply({ embeds: [embed] });
  }
};
