import { observable, computed, action, decorate, reaction, when } from "mobx";

// NumberStore
export default class NumberStore {
  constructor() {
    // @observable
    this.currentNumber = 2;
    // reaction(() => this.currentNumber, console.log(this.currentNumber));
  }
  // @action
  add() {
    this.currentNumber++;
    console.log("DEBUG:", this.currentNumber);
  }
};

// Decoration
decorate(NumberStore, {
  currentNumber: observable,
  add: action
});
