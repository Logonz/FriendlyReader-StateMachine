import GlobalStore from "./stores/store.js";
import * as mobx from "mobx";

// Get the "entire" program
export function getStore() {
  let store = new GlobalStore();

  return store;
}

// Export the mobx lib
export function getMobx() {
  return mobx;
}
