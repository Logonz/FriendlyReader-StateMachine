import * as mobx from "mobx";
import { getObjectDiff, mapStores } from "../MobxUtils";
import _ from "lodash";
// import GlobalStore from "../store.js";

export function snapshotModel(substores, lastSnapshot) {
  console.log("Snapshot.js");
  let newSnapshot = {};
  let oldSnapshot = substores.UndoStore.lastSnapshot();

  const lastFullSnapshot = lastSnapshot;
  // Run through all the substores
  for (var subStore in substores) {
    // Ignore UndoStore, Otherwise we get infinate loops but we still want to keep it in the same scope to enable multiple state machines.
    if (subStore !== "UndoStore") {
      console.log("CHECKING", subStore, oldSnapshot);

      // If the old snapshot is empty, return an empty but initialized object.
      if (!(subStore in oldSnapshot)) {
        oldSnapshot = [];
      } else {
        oldSnapshot = oldSnapshot[subStore];
      }

      // Diff the two objects (Need to check how deep it checks)
      let changed = getObjectDiff(lastFullSnapshot[subStore], substores[subStore]);
      if (!_.isEmpty(changed)) { // Could skip this, but nice to only get logging when something actually happens.
        console.log("CHANGED", changed);

        // Run through all changed values compared to the old snapshot
        for (const key in changed) {
          let storeKey = changed[key];

          // Only save a snapshot if the variable is an observable
          if (mobx.isObservableProp(substores[subStore], storeKey)) {
            console.log("LOGON OBS:", mobx.isObservableProp(substores[subStore], storeKey), storeKey);
            let newVal = substores[subStore][storeKey];
            let oldVal = lastFullSnapshot[subStore][storeKey];
            if (newVal !== oldVal) { // Jag höll på att försöka lista ut en check från föregående state
              console.log("Changed value", storeKey, oldVal, "=>", newVal, "\nlastFullSnapshot", lastFullSnapshot, "currentState", substores[subStore]);
              if (!newSnapshot[subStore]) {
                newSnapshot[subStore] = {};
                newSnapshot[subStore][storeKey] = newVal;
              } else {
                newSnapshot[subStore][storeKey] = newVal;
              }
            }
          }
        }
      }
    }
  }

  if (!_.isEmpty(newSnapshot)) {
    return newSnapshot;
  } else {
    return null;
  }
}

export function resetSnapshot(snapshot, state) {
  console.log("resetSnapshot", snapshot, state);
  for (var store in snapshot) {
    for (var data in snapshot[store]) {
      console.log("SNAP", store, data, snapshot[store]);
      state[store][data] = snapshot[store][data];
    }
  }
  // state = snapshot.data; */
  return state;
}
