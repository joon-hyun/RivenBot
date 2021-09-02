const name = "shardReady";

module.exports = {
  name: name,
  async execute(id) {
    console.log(`${name}: Shard ${id}`);
  }
};
