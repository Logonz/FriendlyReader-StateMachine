/// Globals
/* global Database */
var Mobx = Database.Mobx;

// UNUSED!!!

// WordStore
class WordStore {
  constructor() {
    // @observable
    this.word = {};
  }

  // @action
  setWord(id, text) {
    this.word[id] = text;
  }

  // @action
  getWord(id) {
    if (id in this.word) {
      return this.word[id];
    }
    return null;
  }
};

// Decoration
Mobx.decorate(WordStore, {
  word: Mobx.observable,
  setWord: Mobx.action,
  getWord: Mobx.action
});
