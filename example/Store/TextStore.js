/// Globals
/* global Database */
var Mobx = Database.Mobx;

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

  // if someone sets this.tokenizedText directly, run this function also. (this.tokenizedText = XXX)
  set tokenizedText(text) {
    console.log("tokenizedText");
    this.newText(text);
  }

  get text() {
    console.log("retriving class\n", this.tokenizedText[0]);
    return this.tokenizedText.join("");
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
