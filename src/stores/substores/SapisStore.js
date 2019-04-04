import { observable, computed, action, decorate, reaction, when } from "mobx";
import { SAPISRequest } from "../../utils/ApiRequests";
// const requestt = require("request");

// SapisStore
export default class SapisStore {
  constructor() {
    // @observable
    this.data = {};
  }
  // @action
  analyzeText(data, stillettOptions) {
    if (!stillettOptions) { stillettOptions = "Feedback(-svo -pass2act -prox -quoteInv -split)"; }
    SAPISRequest(data, stillettOptions);
  }
};

// Decoration
decorate(SapisStore, {
  data: observable,
  analyzeText: action
});
