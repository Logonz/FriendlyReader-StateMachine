import { observable, computed, action, decorate, reaction, when } from "mobx";

// WordStore
export default class WordStore {
  constructor() {
    // @observable
    this.words = {};

    // reaction(() => this.currentWord, console.log(this.currentWord));
  }
  // @action
  setWord(id, text) {
    this.words[id] = text;
  }

  // @action
  getWord(id) {
    if (id in this.words) {
      return this.words[id];
    }
    return null;
  }
};

// Decoration
decorate(WordStore, {
  currentWord: observable,
  setText: action,
  getText: action
});
