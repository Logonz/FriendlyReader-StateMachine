
export function resetSnapshot(snapshot, state) {
  console.log("resetSnapshot", snapshot, state);
  for (var store in snapshot) {
    for (var data in snapshot[store]) {
      console.log("SNAP", store, data, snapshot[store]);
      state[store][data] = snapshot[store][data];
    }
  }

  return state;
}
