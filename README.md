# Riven Bot
Riven Bot was created under Riot Games' "Legal Jibber Jabber" policy using
assets owned by Riot Games.  Riot Games does not endorse or sponsor this
project.

Riven Bot is a Discord bot that provides information about:
* Summoner's rank and their mastery
* Champions
* Items
* Runes
* Summoner spells

## Requirements
* Node.js v16.8.0+
* Discord API Token
* Riot API Token
* Latest version of Data Dragon

## Setup
1. Clone this repository
2. Run `npm install` in the main directory to install all dependencies.

3. Create the file `config.json` in the main directory. Fill it out with the
following:
```
{
  "clientId": "",
  "guildId": "",
  "discordToken": "",
  "riotToken": "",
  "patch": ""
}
```

4. Create the directory `data` in the main directory. From
`dragontail-**.**.*/**.**.*/data/en_US/`, move the following files to the 
`data` directory:
```
championFull.json
item.json
runesReforged.json
summoner.json
```

## Usage
In the main directory, run `node deploy-commands.js` and specify whether the
commands should be registered to a particular guild or globally. Then, run
`node index.js` to start the bot. The following commands should now be
available on your server:
* /rank
* /mastery
* /champion
* /item
* /rune
* /summonerspell

## Links
* [Node](https://nodejs.org/en/)
* [Discord API Documentation](https://discord.com/developers/docs/intro)
* [Riot API Documentation](https://developer.riotgames.com/apis)
