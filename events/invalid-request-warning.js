const name = "invalidRequestWarning";

module.exports = {
  name: name,
  execute(data) {
    const { count, remainingTime } = data;
    console.log(`${name}: ${count} invalid requests (${remainingTime}ms until reset)`);
  }
};
