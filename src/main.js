var database = require("./database.js");
var testing = require("./utils/automatedtesting.js");
var sapis = require("./utils/ApiRequests.js");
var utils = require("./utils/utils.js");

module.exports = {
  initialize: function() {
    return database.getStore();
  },
  runTests: function(GlobalStore) {
    testing.wordTest(GlobalStore);
  },
  Mobx: database.getMobx(),
  API: sapis,
  utils: utils
};

console.log("Loaded main.js");
