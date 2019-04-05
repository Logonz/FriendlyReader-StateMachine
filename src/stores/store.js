import { observable, computed, action, autorun, reaction, when, decorate, observe, observer } from "mobx";
import { deepObserve } from "mobx-utils";
import _ from "lodash";
import { snapshotModel, resetSnapshot } from "./methods/snapshot";
import { subStores } from "./substores/substores.js";

import { mapStores } from "./MobxUtils";

/**
 * This file is designed to funnel the global state of the application, accessible via the @observable substores object.
 */

export default class GlobalStore {
  constructor() {
    // After this global store class is instatiated via the constructor function,
    this.reseting = false;

    // @observable
    this.substores = mapStores(subStores);

    // Observe all values in the store
    deepObserve(this.substores, (changeObject, storeName) => {
      if (changeObject.type === "update" && !this.reseting) {
        let snap = {};
        snap[storeName] = {};
        snap[storeName][changeObject.name] = changeObject.oldValue;
        console.log("DATA:", changeObject, "\nNAME:", storeName, "\nSNAPSHOT:", snap);
        this.pushSnapshotAndSave(snap);
      }
    });

    this.pushSnapshotAndSave = snapshot => {
      let { UndoStore } = this.substores;

      if (snapshot) {
        UndoStore.pushSnapshot(snapshot);
        console.info("snapshot saved!", snapshot, "\ncurrentState:", _.cloneDeep(this.substores));
      } else {
        console.log("no snapshot saved!", snapshot);
      }
    };
  }

  resetState() {
    this.reseting = true;
    let { UndoStore } = this.substores; // ColorStore
    let lastSnapshot = UndoStore.lastSnapshot();
    if (lastSnapshot) {
      // here is where the entire application state is reset based on the last snapshot, see Snapshot.js
      console.log("reset state!\nSNAPSHOT:", lastSnapshot, "\nBEFORE:", _.cloneDeep(this.substores));
      this.substores = resetSnapshot(lastSnapshot, this.substores);
      console.log("CURRENT:", _.cloneDeep(this.substores));
      UndoStore.popSnapshot();
    }
    this.reseting = false;
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
  } */

  // @computed
  get Sapis() { // Named with uppercase due to it being more similar to a class reference
    return this.substores.SapisStore;
  }
  // @computed
  get text() {
    return this.substores.TextStore.currentText;
  }

  // @computed
  set text(data) {
    this.substores.TextStore.currentText = data;
  }
}

decorate(GlobalStore, {
  substores: observable,
  Sapis: computed,
  text: computed
});
