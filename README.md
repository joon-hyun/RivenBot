# Riven Bot
Riven Bot was created under Riot Games' "Legal Jibber Jabber" policy using
assets owned by Riot Games.  Riot Games does not endorse or sponsor this
project.

Riven Bot is a Discord bot that conveniently provides League of Legends
information to help players improve.

## Features
* Summoner search:
  * Rank
  * Champion mastery
* Game information search:
  * Champions
  * Items
  * Runes
  * Summoner spells

## Setup
**Node.js v16.8.0+ is required.**
1. Clone this repository.
   ```
   $ git clone https://github.com/HyoonJun/RivenBot.git
   $ cd RivenBot
   ```

2. Install dependencies.
   ```
   $ npm install
   ```

3. Fill out `config-template.json` and rename it to `config.json`.
   ```
   $ mv config-template.json config.json
   ```

4. Place [Data Dragon](https://developer.riotgames.com/docs/lol) in the current
   directory. Create and fill up the `data` directory with the necessary Data
   Dragon files.
   ```
   $ mkdir data
   $ tar -xvzf dragontail-*.tgz
   $ mv dragontail-*/*/data/en_US/championFull.json data/
   $ mv dragontail-*/*/data/en_US/item.json data/
   $ mv dragontail-*/*/data/en_US/runesReforged.json data/
   $ mv dragontail-*/*/data/en_US/summoner.json data/
   ```

5. Register the slash commands.
   ```
   $ node deploy-commands.js guild # Register to single server.
   $ node deploy-commands.js global # Register to all servers.
   ```

6. Start the bot.
   ```
   $ node index.js
   ```

## Links
* [Node](https://nodejs.org/en/)
* [Discord API Documentation](https://discord.com/developers/docs/intro)
* [Riot API Documentation](https://developer.riotgames.com/apis)
