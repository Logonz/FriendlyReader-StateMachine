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
      if (!stillettOptions) { stillettOptions = "Feedback(-svo -pass2act -prox -quoteInv -split)" + "\tLexicalMetrics()\tSurfaceMetrics()\tStructuralMetrics()\tSynonyms"; }

      // Function(data) for callback, this.data modifies the state after the data is recived
      SAPISRequest(data, function(data) {
        this.data = { data: data, options: stillettOptions };
        this.requesting = false;
        this.lastrequestdate = Date.now();
      }.bind(this), stillettOptions);
      return true;
    }
    return false;
  }

  // @action
  synonyms(word) {
    if (!(word in this.wordSynonyms)) {

    }
  }
};

// Decoration
decorate(SapisStore, {
  data: observable,
  analyzeText: action,
  synonyms: action
});
