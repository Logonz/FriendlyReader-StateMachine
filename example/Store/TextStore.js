/// Globals
/* global Database */
var Mobx = Database.Mobx;

// TextStore
class TextStore {
  constructor(text) {
    // @observable
    this.tokenizedText = Database.utils.tokenizeText(text);
    console.log(this.tokenizedText);
  }

  // if someone sets this.tokenizedText directly, run this function also. (this.tokenizedText = XXX)
  set tokenizedText(text) {
    console.log("tokenizedText");
    this.newText(text);
  }

  // THIS IS NOT A FUNCTION usage "TextStore.text" just like a variable
  get text() {
    console.log("retriving class\n", this.tokenizedText[0]);
    return this.tokenizedText.join("");
  }

  // enables TextStore.text = " hej jag heter david", use like a variable
  set text(text) {
    console.log("text");
    this.newText(text);
  }

  // Sets the text
  newText(text) {
    console.log("newText");
    // If it's a string, split it into words
    if (typeof text === "string") {
      this.tokenizedText = Database.utils.tokenizeText(text);
    }
    // If it's an object just save it, PS. Keep in mind to have the same format array[index] = word
    if (typeof text === "object") {
      this.tokenizedText = text;
    }
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
  text: Mobx.computed,
  setWord: Mobx.action,
  getWord: Mobx.action
});
