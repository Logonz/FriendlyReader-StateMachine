var database = require("./database.js");

module.exports = {
  initialize: function() {
    return database.getStore();
  }
};

console.log("Loaded main.js");
