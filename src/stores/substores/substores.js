
// import { observable, computed, action, reaction, when } from "mobx";
import { observable, computed, action, decorate, reaction, when } from "mobx";
import _ from "lodash";

/*
*   Welcome to the Substores.
*
*   Substores are usually kept in separate files, but for simplicity I put them all here.
*
*   - Substores each control a piece of the global application's state through observable values,
*
*   -  They can export their own actions and utitlity methods,
*
*   - They also emit derivations of the state based on the changes made to observables via @computed getter methods
*
*   They are instantiated and exported at the end of this file. You Must Only instantiate a substore once in an entire application!
* */

// NumberStore
class NumberStore {
  constructor() {
    // @observable
    this.currentNumber = 2;
  }
  // @action
  add() {
    this.currentNumber++;
    console.log("DEBUG:", this.currentNumber);
  }
}
decorate(NumberStore, {
  currentNumber: observable,
  add: action
});

// UiStore
class UiStore {
  constructor() {
    this.displayUndo = false;
    this.autoSaveDrafts = true;
  }
}
decorate(UiStore, {
  displayUndo: observable,
  autoSaveDrafts: observable
});

// Undostore
class UndoStore {
  // @observable snapshots = [];
  constructor() {
    this.snapshots = [];
  }

  // @action
  pushSnapshot(snap) {
    if (snap) {
      this.snapshots.unshift(snap);
      console.log(this.snapshots[0], "pushed");
    } else console.log("undefined snap");
  }

  // @action
  popSnapshot() {
    this.snapshots.shift();
    console.log(this.snapshots[0], "popped");
  }
}
decorate(UndoStore, {
  pushSnapshot: action,
  popSnapshot: action,
  snapshots: observable
});

export const subStores = [
  new NumberStore(),
  new UndoStore(),
  new UiStore()
];
