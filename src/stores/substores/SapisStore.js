import { observable, computed, action, decorate, reaction, when } from "mobx";
import { SAPISRequest } from "../../utils/ApiRequests";
// const requestt = require("request");

// SapisStore
export default class SapisStore {
  constructor() {
    this.requesting = false;
    this.lastrequestdate = Date.now();
    // @observable
    this.data = {};

    reaction(() => this.data, data => console.log("SAPIS: New data", this.data));

    // Does not work due to not being an observable
    // reaction(() => this.requesting, req => console.log("Requesting", this.requesting));
  }

  // @action
  analyzeText(data, stillettOptions) {
    if (!this.requesting) {
      this.requesting = true;
      if (!stillettOptions) { stillettOptions = "Feedback(-svo -pass2act -prox -quoteInv -split)"; }
      // Function(data) for callback, this.data modifies the state after the data is recived
      SAPISRequest(data, function(data) {
        this.data = data;
        this.requesting = false;
        this.lastrequestdate = Date.now();
      }.bind(this), stillettOptions);
      return true;
    }
    return false;
  }
};

// Decoration
decorate(SapisStore, {
  data: observable,
  analyzeText: action,
  sapisCallback: action
});
