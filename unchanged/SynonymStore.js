import { observable, computed, action, decorate, reaction, when } from "mobx";
import { SAPISRequest } from "../../utils/ApiRequests";
// const requestt = require("request");

// SynonymStore
export default class SynonymStore {
  constructor() {
    this.requesting = false;
    this.lastrequestdate = Date.now();
    // @observable
    this.data = {};
    this.options = {};

    reaction(() => this.data, data => console.log("SynonymStore: New data", this.data));

    // Does not work due to not being an observable
    // reaction(() => this.requesting, req => console.log("Requesting", this.requesting));
  }

  // @action
  analyzeText(data) {
    if (!this.requesting) {
      this.requesting = true;
      let stillettOptions = "Synonyms";

      // Function(data) for callback, this.data modifies the state after the data is recived
      SAPISRequest(data, function(data) {
        this.data = data;
        this.options = stillettOptions;
        this.requesting = false;
        this.lastrequestdate = Date.now();
      }.bind(this), stillettOptions);
      return true;
    }
    return false;
  }

  // @action
  synonyms(word) {
    if (!(word in this.data)) {

    }
  }
};

// Decoration
decorate(SynonymStore, {
  data: observable,
  analyzeText: action,
  synonyms: action
});
