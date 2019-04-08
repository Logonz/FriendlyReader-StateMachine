// This is to create shorthand and also show that these variables are set globally.
var Database = Database;
var Mobx = Database.Mobx;

// SynonymStore
class SynonymStore {
  constructor() {
    this.requesting = false;
    this.lastrequestdate = Date.now();
    // @observable
    this.data = {};
    this.options = {};

    Mobx.reaction(() => this.data, data => console.log("SynonymStore: New data", this.data));

    // Does not work due to not being an observable
    // reaction(() => this.requesting, req => console.log("Requesting", this.requesting));
  }

  // @action
  analyzeText(data) {
    if (!this.requesting) {
      this.requesting = true;
      let stillettOptions = "Synonyms";

      // Function(data) for callback, this.data modifies the state after the data is recived
      Database.API.SAPISRequest(data, function(data) {
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
Mobx.decorate(SynonymStore, {
  data: Mobx.observable,
  analyzeText: Mobx.action,
  synonyms: Mobx.action
});
