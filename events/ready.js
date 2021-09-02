const name = "ready";

module.exports = {
  name: name,
  execute(client) {
    console.log(`${name}: ${client.user.tag}`);
  }
};
