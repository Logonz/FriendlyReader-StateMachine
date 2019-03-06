
export function snapshotModel({ NumberStore }) {
  return {
    number: NumberStore.currentNumber
  };
}

export function resetSnapshot(snapshot, state) {
  state.NumberStore.currentNumber = snapshot.number;
  return state;
}
