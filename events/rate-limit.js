const name = "rateLimit";

module.exports = {
  name: name,
  execute(data) {
    const { timeout, limit, route } = data;
    console.log(`${name}: ${timeout}ms until rate limit (${limit} requests) ends for ${route}`);
  }
};
