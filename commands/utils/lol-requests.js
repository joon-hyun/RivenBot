const https = require("https");
const { riotToken } = require("../../config.json");

async function sendGetRequest(path) {
  return new Promise((resolve, reject) => {
    // Info to communicate with the NA Riot API.
    const options = {
      host: "na1.api.riotgames.com",
      headers: { "X-Riot-Token": riotToken },
      path: path
    };

    https.get(options, (res) => {
      const { statusCode } = res;

      if (statusCode !== 200) {
        res.resume();
        reject(statusCode);
        return;
      }

      const body = [];

      res.on("data", (chunk) => {
        body.push(chunk);
      });

      res.on("end", () => {
        resolve(JSON.parse(body.join("")));
      });
    }).on("error", (err) => {
      reject(err);
    });
  });
}

module.exports = {
  getSummoner(summonerName) {
    /**
     * Need to encode certain characters, such as spaces, in the summoner name
     * before using it in the path.
     */
    const path = `/lol/summoner/v4/summoners/by-name/${encodeURI(summonerName)}`;
    const summoner = sendGetRequest(path);
    return summoner;
  },
  getRankData(summoner) {
    const path = `/lol/league/v4/entries/by-summoner/${summoner.id}`;
    const rankData = sendGetRequest(path);
    return rankData;
  }
};
