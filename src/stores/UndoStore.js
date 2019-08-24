import { observable, computed, action, decorate, reaction, when } from "mobx";

// Undostore
class UndoStore {
  // @observable snapshots = [];
  constructor() {
    this.snapshots = [];
    this.storeLength = 0;
  }

  // @action
  lastSnapshot() {
    console.log("MOBX - Total Snapshots:", this.snapshots.length, this.storeLength);
    if (this.snapshots.length > 0) {
      return this.snapshots[0];
    } else {
      return null;
    }
  }

  // @action
  pushSnapshot(snap) {
    if (snap) {
      this.snapshots.unshift(snap);
      console.log("MOBX - Adding Snapshot Total:", this.snapshots.length, this.storeLength, snap);
      // console.log(this.snapshots[0], "pushed");
    } else console.log("undefined snap");
  }

  // @action
  popSnapshot() {
    this.snapshots.shift();
    console.log("MOBX - Popped snapshot Total:", this.snapshots.length, this.snapshots[0]);
  }
}
decorate(UndoStore, {
  pushSnapshot: action,
  popSnapshot: action,
  lastSnapshot: action
});

export default new UndoStore();
