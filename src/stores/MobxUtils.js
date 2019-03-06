import _ from "lodash";

export const mapStores = (subStores) => {
  var mappedStores = {};
  _.forEach(subStores, (store, key) => {
    mappedStores[store.constructor.name] = store;
  });
  return mappedStores;
};
