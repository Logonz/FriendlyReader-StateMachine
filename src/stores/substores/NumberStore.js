import { observable, computed, action, decorate, reaction, when } from "mobx";

// NumberStore
export default class NumberStore {
  constructor() {
    // @observable
    this.currentNumber = 2;
    reaction(() => this.currentNumber, number => console.log("NumberStore", this.currentNumber));
  }
  // @action
  add() {
    this.currentNumber++;
  }
};

// Decoration
decorate(NumberStore, {
  currentNumber: observable,
  add: action
});
