const name = "shardError";

module.exports = {
  name: name,
  execute(err, id) {
    console.log(`${name}: Shard ${id}: ${err.message}`);
  }
};
