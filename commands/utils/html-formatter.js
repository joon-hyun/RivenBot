const { JSDOM } = require("jsdom");
const { window } = new JSDOM("<!DOCTYPE html>");
const $ = require("jquery")(window);

module.exports = {
  formatHTML(text) {
    return $("<div />").html(text.replaceAll("<br>", "\n")).text();
  }
};
