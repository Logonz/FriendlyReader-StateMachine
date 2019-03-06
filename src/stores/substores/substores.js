
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
      console.log(this.snapshots[0].header, "the previous Color is stored here");
    } else console.log("undefined snap");
  }

  // @action
  popSnapshot() {
    this.snapshots.shift();
    console.log(this.snapshots[0].header, "after resetting the state, the previous snap, before the one that was just reset, is stored here");
  }
}
decorate(UndoStore, {
  pushSnapshot: action,
  popSnapshot: action,
  snapshots: observable
});

export const subStores = [
  new UndoStore(),
  new UiStore()
];
