// This is to create shorthand and also show that these variables are set globally.
var Database = Database;
var Mobx = Database.Mobx;
var utils = utils;

// TextStore
class TextStore {
  constructor(text) {
    // @observable
    this.tokenizedText = Database.utils.crazyTokens(text);
    console.log(this.tokenizedText);
  }

  newText(text) {
    console.log("newText");
    this.tokenizedText = Database.utils.crazyTokens(text);
  }

  set tokenizedText(text) {
    console.log("tokenizedText");
    this.newText(text);
  }

  get text() {
    console.log("retriving class\n", this.tokenizedText[0]);
    return this.tokenizedText.join("");
  }

  get untokenizedText() {
    console.log("untokenizedText");
    let data = $.parseHTML(this.tokenizedText.join(""));
    console.log(this.tokenizedText.join(""));
    let text = "";
    for (const key in this.tokenizedText) {
      text += $("<span class='wordSynonym' id='wordSpan" + key + "'>" + this.tokenizedText[key] + "</span>").html();
      // $.add("<span>");
    }
    console.log(text);
    console.log(data);
  }

  // @action
  setWord(id, text) {
    this.tokenizedText[id] = text;
  }

  // @action
  getWord(id) {
    if (id in this.tokenizedText) {
      return this.tokenizedText[id];
    }
    return null;
  }
};

// Decoration
Mobx.decorate(TextStore, {
  tokenizedText: Mobx.observable,
  newText: Mobx.action,
  untokenizedText: Mobx.computed,
  text: Mobx.computed,
  setWord: Mobx.action,
  getWord: Mobx.action
});
