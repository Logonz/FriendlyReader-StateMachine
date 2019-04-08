import { observable, computed, action, decorate, reaction, when, autorun } from "mobx";

// WordStore
export default class WordStore {
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
decorate(WordStore, {
  word: observable,
  setWord: action,
  getWord: action
});
