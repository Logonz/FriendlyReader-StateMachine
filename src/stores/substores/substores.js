
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

// Stores
import NumberStore from "./NumberStore.js";
import TextStore from "./TextStore.js";
import SapisStore from "./SapisStore.js";
import UndoStore from "./UndoStore.js";

export const subStores = [
  new NumberStore(),
  new TextStore(),
  new SapisStore(),
  new UndoStore()
  // new UiStore()
];

/*

export const subStores = {
  NumberStore: new NumberStore(),
  TextStore: new TextStore(),
  SapisStore: new SapisStore(),
  UndoStore: new UndoStore()
  // new UiStore()
};
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
}); */
