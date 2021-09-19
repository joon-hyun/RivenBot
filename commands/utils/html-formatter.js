const { JSDOM } = require("jsdom");
const { window } = new JSDOM("<!DOCTYPE html>");
const $ = require("jquery")(window);

module.exports = {
  formatHTML(text) {
    /**
     * Skill descriptions may contain certain tags that we may want to
     * replicate the behavior of, especially spacing. Thus, replace those tags
     * with a newline.
     */
    const str = text
      .replaceAll("<br>", "\n")
      .replaceAll("<li>", "\n")
    return $("<div />").html(str).text();
  }
};
