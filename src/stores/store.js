import { observable, computed, action, reaction, when, decorate } from "mobx";
import _ from "lodash";
import { snapshotModel, resetSnapshot } from "./methods/snapshot";
import { subStores } from "./substores/substores.js";

import { mapStores } from "./MobxUtils";

/**
 * This file is designed to funnel the global state of the application, accessible via the @observable substores object.
 */

class GlobalStore {
  constructor() {
    // @observable
    this.substores = mapStores(subStores); // After this global store class is instatiated via the constructor function,
    this.lastSnapshot = _.cloneDeep(this.substores);
    // var { UndoStore } = this.substores; // you can even deconstruct the state immidiately after instantiation,

    this.pushSnapshotAndSave = async snapshot => { //= async snapshot =>
      let { UndoStore } = this.substores;

      if (snapshot) { // && UiStore.autoSaveDrafts
        // console.log("TEST:", this.substores);
        UndoStore.pushSnapshot(snapshot);
        // UiStore.displayUndo = true;
        console.log("snapshot saved!", snapshot);
      } else {
        console.log("no snapshot saved!", snapshot);
      }
      // UndoStore.setLastFullSnapshot(this.substores);
    };

    reaction(() => this.snapshot, (snapshot, reaction) => {
      this.pushSnapshotAndSave(snapshot);
      this.lastSnapshot = _.cloneDeep(this.substores);
    }); // and bind reactions to the global actions below

    // map the substores to this object
    // this.pushSnapshotAndSave(this.snapshot);

    /* reaction(
      () => UndoStore.snapshots.length > 1,
      bool => (UiStore.displayUndo = bool)
    ); // or bind reactions to and from the substores */
    /* let reactList = {};

    for (var subStore in this.substores) {
      for (var data in this.substores[subStore]) {
        console.log("KAPPA", subStore, data);
        reactList[subStore] = reaction(
          () => this.substores[subStore][data],
          d => console.log("REACT", subStore, data, d)
        );
      }
    }
    console.log(reactList); */
    reaction(
      () => this.substores,
      substores => console.log("REACT", this.substores.NumberStore)
    );
  }

  resetState() {
    let { UndoStore, UiStore } = this.substores; // ColorStore
    let lastSnapshot = UndoStore.lastSnapshot();
    if (lastSnapshot) {
      // UiStore.autoSaveDrafts = false; // turn off the un-intended side-effect of saving state when

      // here is where the entire application state is reset based on the last snapshot, see Snapshot.js
      this.substores = resetSnapshot(lastSnapshot, this.substores);
      UndoStore.popSnapshot();

      // UiStore.autoSaveDrafts = true; // back on
    }
  }

  /* @action
  login = async () => {
    let { UserStore, UiStore } = this.substores;
    UserStore.currentUser = await Api.getCurrentUser(); // actions can be asynchronus
    UiStore.loggedIn = true;
  };

  @action
  logout() {
    let { UserStore, UiStore, ColorStore, WordStore } = this.substores;
    UserStore.currentUser = {}; // async
    UiStore.loggedIn = false;
  }

  @computed
  get phrase() {
    let { UserStore, FormStore } = this.substores;
    if (UserStore.currentUser.name) {
      return FormStore.header + ", " + UserStore.currentUser.name;
    } else {
      return null;
    }
  }

  @computed
  get searchedUsers() {
    var { UiStore, UserStore } = this.substores;
    return UserStore.users.filter(user =>
      user.name.toLowerCase().includes(UiStore.searchText.toLowerCase())
    );
  } */

  // @computed
  get snapshot() {
    return snapshotModel(this.substores, this.lastSnapshot);
  }
}
decorate(GlobalStore, {
  substores: observable,
  snapshot: computed
});

export default new GlobalStore();
