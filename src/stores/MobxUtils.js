import _ from "lodash";

export const mapStores = (subStores) => {
  var mappedStores = {};
  _.forEach(subStores, (store, key) => {
    mappedStores[store.constructor.name] = store;
  });
  return mappedStores;
};

/* Credit: https://stackoverflow.com/a/40610459
 * Compare two objects by reducing an array of keys in obj1, having the
 * keys in obj2 as the intial value of the result. Key points:
 *
 * - All keys of obj2 are initially in the result.
 *
 * - If the loop finds a key (from obj1, remember) not in obj2, it adds
 *   it to the result.
 *
 * - If the loop finds a key that are both in obj1 and obj2, it compares
 *   the value. If it's the same value, the key is removed from the result.
 */
export function getObjectDiff(obj1, obj2) {
  const diff = Object.keys(obj1).reduce((result, key) => {
    if (!obj2.hasOwnProperty(key)) {
      result.push(key);
    } else if (_.isEqual(obj1[key], obj2[key])) {
      const resultKeyIndex = result.indexOf(key);
      result.splice(resultKeyIndex, 1);
    }
    return result;
  }, Object.keys(obj2));

  return diff;
}
