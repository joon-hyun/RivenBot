const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { getSummoner, getRankData } = require("./utils/lol-requests.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rank")
    .setDescription("Provides info about a summoner's rank.")
    .addStringOption((option) => {
      return option
        .setName("name")
        .setDescription("Summoner names are 3-16 characters long")
        .setRequired(true);
    }),
  async execute(interaction) {
    const summonerName = interaction.options.getString("name");
    let summoner;
    let rankData;

    try {
      summoner = await getSummoner(summonerName);
      rankData = await getRankData(summoner);
    } catch (err) {
      throw err;
    }

    const rankQueues = new Map([
      ["solo", "RANKED_SOLO_5x5"],
      ["flex", "RANKED_FLEX_SR"]
    ]);
    const rankStats = new Map();

    rankQueues.forEach((queue) => {
      rankStats.set(queue, { rank: "Unranked", games: 0, winRate: "N/A" });
    });

    const embed = new MessageEmbed()
      .setTitle(summoner.name)
      .setDescription(`Lv. ${summoner.summonerLevel}`);

    rankData.forEach((element) => {
      const { queueType, tier, rank: division, leaguePoints, wins, losses } = element;
      const rank = `${tier} ${division}: ${leaguePoints} LP`;
      const games = wins + losses;
      const winRate = (wins / games * 100).toFixed(2);

      rankStats.set(queueType, { rank: rank, games: games, winRate: winRate });
    });

    rankStats.forEach((stats, queue) => {
      const { rank, games, winRate } = stats;
      const value = `${rank} | ${winRate}% WR (${games} games)`;

      if (queue === rankQueues.get("solo")) {
        embed.addField("Ranked Solo/Duo", value, false);
      }
      else if (queue === rankQueues.get("flex")) {
        embed.addField("Ranked Flex", value, false);
      }
    });

    await interaction.editReply({ embeds: [embed] });
  }
};
