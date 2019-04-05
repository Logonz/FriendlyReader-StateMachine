import { observable, computed, action, decorate, reaction, when } from "mobx";

// Undostore
export default class UndoStore {
  // @observable snapshots = [];
  constructor() {
    this.snapshots = [];
  }

  // @action
  lastSnapshot() {
    if (this.snapshots.length > 0) {
      return this.snapshots[0];
    } else {
      return [];
    }
  }

  // @action
  pushSnapshot(snap) {
    if (snap) {
      this.snapshots.unshift(snap);
      // console.log(this.snapshots[0], "pushed");
    } else console.log("undefined snap");
  }

  // @action
  popSnapshot() {
    console.log(this.snapshots[0], "popped");
    this.snapshots.shift();
  }
}
decorate(UndoStore, {
  pushSnapshot: action,
  popSnapshot: action,
  // snapshots: observable,
  lastSnapshot: action
});
