import { observable, computed, action, decorate, reaction, when } from "mobx";

// TextStore
export default class TextStore {
  constructor() {
    // @observable
    this.currentText = {};

    // reaction(() => this.currentText, console.log(this.currentText));
  }
  // @action
  setText(text) {
    this.currentText = text;
  }

  // @action
  getText() {
    return this.currentText;
  }
};

// Decoration
decorate(TextStore, {
  currentText: observable,
  setText: action,
  getText: action
});
