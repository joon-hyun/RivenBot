const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { getSummoner, getChampionMasteries, getMasteryScore } = require("./utils/lol-requests.js");
const { keys: championKeys, data: championData } = require("../data/championFull.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mastery")
    .setDescription("Searches for a summoner's top 3 champion masteries.")
    .addStringOption((option) => {
      return option
        .setName("name")
        .setDescription("Summoner names are 3-16 characters long")
        .setRequired(true);
    }),
  async execute(interaction) {
    const summonerName = interaction.options.getString("name");
    let summoner;
    let championMastery;
    let masteryScore;

    try {
      summoner = await getSummoner(summonerName);
      championMasteries = await getChampionMasteries(summoner);
      masteryScore = await getMasteryScore(summoner);
    } catch(err) {
      throw err;
    }

    const embed = new MessageEmbed()
      .setTitle(summoner.name)
      .setDescription(`Score: ${masteryScore.toLocaleString()}`);

    // View summoner's top 3 champion masteries.
    for (let i = 0; i < 3; i++) {
      const { championId, championPoints } = championMasteries[i];
      const key = championKeys[championId.toString()];
      const champion = championData[key];

      embed.addField(`${i + 1}. ${champion.name}`,
                     `${championPoints.toLocaleString()} points`,
                     true);
    }

    await interaction.editReply({ embeds: [embed] });
  }
};
