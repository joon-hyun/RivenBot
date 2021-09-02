const name = "error";

module.exports = {
  name: name,
  execute(err) {
    console.log(`${name}: ${err.message}`);
  }
};
