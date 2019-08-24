import * as mobx from "mobx";
import { deepObserve } from "mobx-utils";
import _ from "lodash";
import { resetSnapshot } from "./methods/snapshot";
import UndoStore from "./UndoStore.js";

/**
 * This file is designed to funnel the global state of the application, accessible via the @observable substores object.
 */

// TODO: https://github.com/mobxjs/mobx/blob/gh-pages/docs/refguide/api.md#configure

export default class GlobalStore {
  constructor() {
    // After this global store class is instatiated via the constructor function,
    this.reseting = false;

    // @observable
    this.substores = {};

    // Observe all values in the store
    this.dispatch = deepObserve(this.substores, (changeObject, storeName) => {
      // console.log("STORE: changeObject.type:", changeObject.type, "NAME:", storeName);
      // We do not want snapshot on type ADD due to it being an inital state.
      // this.reseting is a way to hinder the function from recording snapshot when reseting the State
      // storename !== "" do not snapshot the addition or removal of stores.
      if (
        changeObject.type === "update" &&
        !this.reseting &&
        storeName !== ""
      ) {
        let snap = {};
        snap[storeName] = {};
        if (changeObject.index) {
          snap[storeName][changeObject.index] = changeObject.oldValue;
        } else {
          snap[storeName][changeObject.name] = changeObject.oldValue;
        }
        console.log(
          "DATA:",
          changeObject,
          "\nNAME:",
          storeName,
          "\nSNAPSHOT:",
          snap
        );
        this.pushSnapshotAndSave(snap);
      }
    });

    this.pushSnapshotAndSave = snapshot => {
      if (snapshot) {
        UndoStore.pushSnapshot(snapshot);
        console.info(
          "snapshot saved!",
          snapshot,
          "\ncurrentState:",
          _.cloneDeep(this.substores)
        );
      } else {
        console.log("no snapshot saved!", snapshot);
      }
    };
  }

  resetState() {
    this.reseting = true;
    let lastSnapshot = UndoStore.lastSnapshot();
    if (lastSnapshot) {
      // here is where the entire application state is reset based on the last snapshot, see Snapshot.js
      console.log(
        "reset state!\nSNAPSHOT:",
        lastSnapshot,
        "\nBEFORE:",
        _.cloneDeep(this.substores)
      );
      this.substores = resetSnapshot(lastSnapshot, this.substores);
      console.log("CURRENT:", _.cloneDeep(this.substores));
      UndoStore.popSnapshot();
      this.reseting = false;
      return true;
    } else {
      console.log("MOBX - No state to reset to.");
    }
    this.reseting = false;
    return false;
  }

  addStore(name, object) {
    if (!this.substores[name]) {
      this.substores[name] = object;
      this[name] = this.substores[name];
      console.log("Added store: ", name, object);
      UndoStore.storeLength = UndoStore.snapshots.length;
      return true;
    }
    console.error("Store with name already exists!", name);
    return false;
  }

  //
  removeStore(name) {
    if (this.substores[name]) {
      this[name] = null;
      this.substores[name] = null;
      console.log("Removed store with name: ", name);
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
  } */
}

mobx.decorate(GlobalStore, {
  substores: mobx.observable
});
