module.exports = {
  findName(data, name) {
    let value;

    for (key in data) {
      if (data[key].name.toLowerCase() === name.toLowerCase()) {
        value = data[key];
        break;
      }
    }

    return value;
  }
};
