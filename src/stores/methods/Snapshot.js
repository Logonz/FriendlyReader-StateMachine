
// Source: https://hackernoon.com/accessing-nested-objects-in-javascript-f02f1bd6387f
const getNestedObject = (nestedObj, pathArr) => {
  return pathArr.reduce((obj, key) =>
    (obj && obj[key] !== "undefined") ? obj[key] : undefined, nestedObj);
};

export function resetSnapshot(snapshot, state) {
  console.log(snapshot, state);
  for (var store in snapshot) {
    let pathArray = store.split("/");
    var data = getNestedObject(state, pathArray);
    if (data) {
      for (var key in snapshot[store]) {
        data[key] = snapshot[store][key];
      }
    }
  }
  return state;
}

/*

let path = store.split("/");
let dataa = state;
for (let depth = 0; depth < path.length; depth += 1) {
  console.log(dataa, depth, path[depth], path.length);

  if (depth === path.length - 1) {
    console.log("inside");
    for (var data in snapshot[store]) {
      console.log(dataa, data);
      dataa[depth][data] = snapshot[store][data];
      // state[store][data] = snapshot[store][data];
    }
  } else {
    console.log("deeper");
    dataa = getNextDepth(dataa, path[depth]);
  }
}
/*
console.log(dataa, dataa.length);
for (var data in snapshot[store]) {
  state[store][data] = snapshot[store][data];
} */
