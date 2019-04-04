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
    // @observable

    this.substores = mapStores(subStores); // After this global store class is instatiated via the constructor function,
    const disposer = deepObserve(this.substores, (change, path) => {
      if (change.type === "update") {
        let snap = {};
        snap[path] = {};
        snap[path][change["name"]] = change.newValue;
        console.log(change, path, "\n", snap);
        this.pushSnapshotAndSave(snap);
      }
    });
    /* for (const k in this.substores) {
      console.log(k);
      let d = observable(this.substores[k], { deep: true });
      reaction(() => this.substores[k], (d, reaction) => { console.log("G3", d, reaction); });
    } */
    // const obs = observable(this.substores);
    // this.test = observable.array(subStores, { deep: true });
    // this.lastSnapshot = _.cloneDeep(this.substores);
    // var { UndoStore } = this.substores; // you can even deconstruct the state immidiately after instantiation,
    // reaction(() => this.substores, data => console.log("test"));
    console.log(this.substores);
    // autorun(() => { console.log("gg1", this.substores); });
    // observe(this.substores, change => console.log("GG", change));
    // const disposer = autorun(reaction => { console.log("gg2", reaction); });
    // const component = observer(substores => { console.log("GG3"); });

    this.pushSnapshotAndSave = async snapshot => { //= async snapshot =>
      let { UndoStore } = this.substores;
      console.log("push", snapshot);
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

    /*
    reaction(() => this.test, (test, reaction) => {
      console.log("TEST");
      for (const r in reaction.observing) {
        let react = reaction.observing[r];
        console.log("REACT test", react.value, react);
      }
    });

    reaction(() => this.snapshot, (snapshot, reaction) => {
      for (const r in reaction.observing) {
        let react = reaction.observing[r];
        console.log("REACT snapshot", react.value, react);
      }
      this.pushSnapshotAndSave(snapshot);
      this.lastSnapshot = _.cloneDeep(this.substores);
    }); // and bind reactions to the global actions below */

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
    /* reaction(
      () => this.substores,
      substores => console.log("REACT", this.substores.NumberStore)
    ); */
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

  /* get change() {
    console.log("react change");
    return this.substores;
  }

  // @computed
  get snapshot() {
    return snapshotModel(this.substores, this.lastSnapshot);
  } */
}

decorate(GlobalStore, {
  substores: observable,
  // change: computed,
  // snapshot: computed,
  test: observable
});

export default new GlobalStore();
