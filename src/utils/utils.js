
const debugLevel = 2;
const env = process.env.NODE_ENV;

export function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) { return false; }
  }
  return true;
}

// Junk, remove
export function print(...data) {
  console.log(data);
}

export function printVerbose(...data) {
  console.log("VERBOSE: ", data);
}

export function printDev(...data) {
  console.log("DEV", data);
}

export function printError(...data) {
  console.error(data);
}
