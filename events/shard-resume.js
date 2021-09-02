const name = "shardResume";

module.exports = {
  name: name,
  execute(id, events) {
    console.log(`${name}: Shard ${id} with ${events} replayed events`);
  }
};
