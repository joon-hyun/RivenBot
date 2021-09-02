const name = "shardDisconnect";

module.exports = {
  name: name,
  execute(event, id) {
    const { code, reason } = event;
    console.log(`${name}: Shard ${id} (${code}: ${reason})`);
  }
};
