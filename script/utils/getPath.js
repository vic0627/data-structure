const { resolve } = require("node:path");

module.exports = function (...paths) {
  return resolve(__dirname, "../../", ...paths);
};
