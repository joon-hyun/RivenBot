const name = "warn";

module.exports = {
  name: name,
  execute(info) {
    console.log(`${name}: ${info}`);
  }
};
