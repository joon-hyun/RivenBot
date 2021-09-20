const { JSDOM } = require("jsdom");
const { window } = new JSDOM("<!DOCTYPE html>");
const $ = require("jquery")(window);

module.exports = {
  formatHTML(text) {
    /**
     * Skill descriptions may contain certain tags that we may want to
     * replicate the behavior of.
     */
    const str = text
      .replaceAll("<br>", "\n")
      .replaceAll("<li>", "\n- ")
      .replaceAll("<b>", "**")
      .replaceAll("</b>", "**")
      .replaceAll("<i>", "*")
      .replaceAll("</i>", "*");

    return $("<div />").html(str).text();
  }
};
