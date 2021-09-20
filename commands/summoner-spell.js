const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { findName } = require("./utils/name-finder.js");
const { formatHTML } = require("./utils/html-formatter.js");
const { data: summonerSpellData } = require("../data/summoner.json");
const { patch } = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("summonerspell")
    .setDescription("Provides info about a summoner spell.")
    .addStringOption((option) => {
      return option
        .setName("name")
        .setDescription("Summoner spell names cannot be abbreviated")
        .setRequired(true)
    }),
  async execute(interaction) {
    const summonerSpellName = interaction.options.getString("name");
    const summonerSpell = findName(summonerSpellData, summonerSpellName);

    if (!summonerSpell) {
      await interaction.editReply("That summoner spell does not exist.");
      return;
    }

    let title = summonerSpell.name;
    const cooldown = summonerSpell.cooldownBurn;

    // Teleport has a cooldownBurn of 0. Let the description provide info.
    title = (cooldown === "0" ? title : `${title} (${cooldown}s)`);

    /**
     * Smite's description uses the placeholder @SmiteBaseDamage@ for its base
     * damage. It is simply removed so that future changes to the summoner
     * spell will not make the current info inaccurate and manual adjustments
     * will not need to be made. Additionally, it uses base smite's description
     * as it is lacking info about the interactions with champions (when
     * upgraded) and pets.
     */
    const embed = new MessageEmbed()
      .setTitle(title)
      .setDescription(summonerSpell.description.replaceAll("@SmiteBaseDamage@", ""))
      .setFooter(`Patch ${patch}`);

    await interaction.editReply({ embeds: [embed] });
  }
};
