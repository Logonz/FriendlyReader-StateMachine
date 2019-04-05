
export function resetSnapshot(snapshot, state) {
  for (var store in snapshot) {
    for (var data in snapshot[store]) {
      state[store][data] = snapshot[store][data];
    }
  }
  return state;
}
