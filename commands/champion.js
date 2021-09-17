const { JSDOM } = require("jsdom");
const { window } = new JSDOM("<!DOCTYPE html>");
const $ = require("jquery")(window);
const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { data: championData } = require("../data/championFull.json");
const { version } = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("champion")
    .setDescription("Searches for a champion's abilities or stats.")
    .addStringOption((option) => {
      return option
        .setName("type")
        .setDescription("Choose to view a champion's abilities or stats")
        .setRequired(true)
        .addChoice("Abilities", "champion_abilities")
        .addChoice("Stats", "champion_stats");
    })
    .addStringOption((option) => {
      return option
        .setName("name")
        .setDescription("Champion names cannot be abbreviated")
        .setRequired(true);
    }),
  async execute(interaction) {
    let champion;
    const championName = interaction.options.getString("name");
    const commandType = interaction.options.getString("type");

    for (key in championData) {
      if (championData[key].name.toLowerCase() === championName.toLowerCase()) {
        champion = championData[key];
        break;
      }
    }

    if (!champion) {
      await interaction.editReply("That champion does not exist.");
      return;
    }

    const embed = new MessageEmbed()
      .setTitle(champion.name)
      .setDescription(champion.title)
      .setFooter(`Patch ${version}`);

    if (commandType === "champion_abilities") {
      const skills = new Map([
        ["P", champion.passive],
        ["Q", champion.spells["0"]],
        ["W", champion.spells["1"]],
        ["E", champion.spells["2"]],
        ["R", champion.spells["3"]]
      ]);

      skills.forEach((skill, key) => {
        let field = `${key} - ${skill.name}`;

        if (key !== "P") {
          field = `${field} (${skill.cooldownBurn} s)`;
        }

        /*
         * Skill descriptions may contain <br> tags. Therefore, replace them
         * with a newline to replicate the html behavior.
         */
        embed.addField(field,
                       $("<div />").html(skill.description.replaceAll("<br>", "\n")).text(),
                       false);
      });
    } else if (commandType === "champion_stats") {
      const {
        hp,
        hpperlevel,
        hpregen,
        hpregenperlevel,
        mp,
        mpperlevel,
        mpregen,
        mpregenperlevel,
        armor,
        armorperlevel,
        spellblock, // magic resist
        spellblockperlevel, // magic resist per level
        attackdamage,
        attackdamageperlevel,
        attackspeed,
        attackspeedperlevel,
        movespeed,
        attackrange
      } = champion.stats;

      embed
        .addField("HP", hp.toString(), true)
        .addField("HP per Level", hpperlevel.toString(), true)
        .addField("\u200b", "\u200b", true)
        .addField("HP Regen", hpregen.toString(), true)
        .addField("HP Regen per Level", hpregenperlevel.toString(), true)
        .addField("\u200b", "\u200b", true)
        .addField("MP", mp.toString(), true)
        .addField("MP per Level", mpperlevel.toString(), true)
        .addField("\u200b", "\u200b", true)
        .addField("MP Regen", mpregen.toString(), true)
        .addField("MP Regen per Level", mpregenperlevel.toString(), true)
        .addField("\u200b", "\u200b", true)
        .addField("Armor", armor.toString(), true)
        .addField("Armor per Level", armorperlevel.toString(), true)
        .addField("\u200b", "\u200b", true)
        .addField("Magic Resist", spellblock.toString(), true)
        .addField("Magic Resist per Level", spellblockperlevel.toString(), true)
        .addField("\u200b", "\u200b", true)
        .addField("Attack Damage", attackdamage.toString(), true)
        .addField("Attack Damage per Level", attackdamageperlevel.toString(), true)
        .addField("\u200b", "\u200b", true)
        .addField("Attack Speed", attackspeed.toString(), true)
        .addField("Attack Speed per Level", attackspeedperlevel.toString(), true)
        .addField("Attack Range", attackrange.toString(), true)
        .addField("Movement Speed", movespeed.toString(), true);
    }

    await interaction.editReply({ embeds: [embed] });
  }
};
