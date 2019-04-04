import { observable, computed, action, autorun, reaction, when, decorate, observe, observer } from "mobx";
import { deepObserve } from "mobx-utils";
import _ from "lodash";
import { snapshotModel, resetSnapshot } from "./methods/snapshot";
import { subStores } from "./substores/substores.js";

import { mapStores } from "./MobxUtils";

/**
 * This file is designed to funnel the global state of the application, accessible via the @observable substores object.
 */

class GlobalStore {
  constructor() {
    // After this global store class is instatiated via the constructor function,
    // @observable
    this.substores = mapStores(subStores);
    // Observe all values in the store
    deepObserve(this.substores, (change, path) => {
      if (change.type === "update") {
        let snap = {};
        snap[path] = {};
        snap[path][change["name"]] = change.newValue;
        console.log(change, path, "\n", snap);
        this.pushSnapshotAndSave(snap);
      }
    });

    this.pushSnapshotAndSave = async snapshot => {
      let { UndoStore } = this.substores;
      console.log("push", snapshot);
      if (snapshot) {
        UndoStore.pushSnapshot(snapshot);
        console.log("snapshot saved!", snapshot);
      } else {
        console.log("no snapshot saved!", snapshot);
      }
    };
  }

  resetState() {
    let { UndoStore, UiStore } = this.substores; // ColorStore
    let lastSnapshot = UndoStore.lastSnapshot();
    if (lastSnapshot) {
      // here is where the entire application state is reset based on the last snapshot, see Snapshot.js
      this.substores = resetSnapshot(lastSnapshot, this.substores);
      UndoStore.popSnapshot();
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
}

decorate(GlobalStore, {
  substores: observable
});

export default new GlobalStore();
