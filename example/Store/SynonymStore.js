// This is to create shorthand and also show that these variables are set globally.
var Database = Database;
var Mobx = Database.Mobx;
var utils = utils;

// SynonymStore
class SynonymStore {
  constructor() {
    this.requesting = false;
    this.lastrequestdate = Date.now();
    this.lastfailed = false;

    // @observable
    this.data = {};
    this.options = {};

    Mobx.reaction(() => this.data, data => console.log("SynonymStore: New data", this.data));

    // Does not work due to not being an observable
    // reaction(() => this.requesting, req => console.log("Requesting", this.requesting));
  }

  /**
 * Gets all the synonyms from the SAPIS API for the text passed to the function.
 *
 * Description. TODO
 *
 * @class
 * @augments SynonymStore
 *
 * @alias    realName
 * @memberof namespace
 *
 * @see  ApiRequests.js:SAPISRequest()
 * @link NODEJS:stores/utils/utils#SAPISRequest.
 * @global
 *
 * @fires   SAPIS
 * @options "Synonyms".
 * @listens event:eventName
 * @listens className~event:eventName
 *
 * @param {(string, array.join("")), callback_function} text The text to analye as a string, will use .join("") on array.
 *
 * @return {Object} Returns the suggestions, but also saves them at this.data in the class for the future.
 *
 * @decoration action
 */
  analyzeText(text, _callback) {
    if (!this.requesting) {
      this.requesting = true;
      let stillettOptions = "Synonyms";

      // Function(text) for callback, this.data modifies the state after the data is recived
      Database.API.SAPISRequest(text, function(data) {
        if ("_synonym_suggestions" in data) {
          let suggestions = data["_synonym_suggestions"];
          // Convert the level parameter to float to enable sorting!
          for (const word in suggestions) {
            console.log(word, suggestions[word]);
            for (const id in suggestions[word]) {
              suggestions[word][id]["level"] = parseFloat(suggestions[word][id]["level"]);
            }
          };
          this.data = suggestions;
          console.log(suggestions);
          console.log(JSON.stringify(suggestions));
          this.options = stillettOptions;
          this.requesting = false;
          this.lastfailed = false;
          this.lastrequestdate = Date.now();

          if (_callback) {
            _callback(true);
          }
        } else {
          this.requesting = false;
          this.lastfailed = true;
          this.lastrequestdate = Date.now();

          if (_callback) {
            _callback(false);
          }
        }
      }.bind(this), stillettOptions);
      return this.data;
    }
    return null;
  }

  tagWord(text, word, startindex, endindex) {

  }

  tagText(text, eventType, callback) {
    // If raw string is sent in convert to an array for each word.
    if (typeof text === "string") { text = Database.utils.crazyTokens(text); }
    if (typeof text === "object") {
      console.log("tagText", this.data);
      // Clone the object, we don't want to modify the real textstore for this.
      let words = text.slice(0);

      if (callback) {
        // Unbind first, not to get two events firing with one click if ran multiple times.
        // could be a regular click event "click.wordSpan" sets the namespace of the click to "wordSpan"
        // could also be a regular mouseenter event "mouseenter.wordSpan" sets the namespace of the mouseenter to "wordSpan"
        $(document).unbind(eventType + ".wordSpan");
        $(document).on(eventType + ".wordSpan", ".wordSpan", callback);
      }

      for (const index in words) {
        let synonyms = this.getSynonyms(words[index]);
        if (synonyms) {
          // Uses Jquery to create an object
          let span = $("<span>", { "data-word-id": index, "class": "wordSpan" }).text(words[index]);
          // Save it as HTML rather than an object, you can use Jquery parseHTML to convert it back!
          // The <div> stuff is needed because jquery is stupid, doesnt actaully get saved...
          words[index] = $("<div>").append(span.clone()).html();
        }
      }
      // TODO: DEBUG REMOVE!
      console.log(words);
      console.log(words.join(""));
      $("body").innerHTML = "";
      $("body").append(words.join(""));

      return words;
    }
    return null;
  }

  // @action
  getSynonyms(word, amount) {
    if (!amount) { amount = 3; }
    if (word in this.data) {
      // console.log(this.data[word].slice().sort((a, b) => { return b.level - a.level; }).splice(0, amount));
      return this.data[word].slice().sort((a, b) => { return b.level - a.level; }).splice(0, amount);
    }
    return null;
  }
};

// Decoration
Mobx.decorate(SynonymStore, {
  data: Mobx.observable,
  analyzeText: Mobx.action,
  synonyms: Mobx.action
});
