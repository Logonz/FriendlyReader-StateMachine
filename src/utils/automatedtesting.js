
export function wordTest(GlobalStore) {
  GlobalStore.substores.WordStore.setWord(1, "hej");
  if (GlobalStore.substores.WordStore.getWord(1) === "hej") {
    GlobalStore.substores.WordStore.setWord(1, "svej");

    if (GlobalStore.substores.WordStore.getWord(1) === "svej") {
      GlobalStore.resetState();
      if (GlobalStore.substores.WordStore.getWord(1) === "hej") {
        console.log("TEST1: SUCCESS!");
      }
    }
  }
}
