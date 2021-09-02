const name = "debug";

module.exports = {
  name: name,
  execute(info) {
    console.log(`${name}: ${info}`);
  }
};
