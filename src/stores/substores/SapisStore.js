import { observable, computed, action, decorate, reaction, when } from "mobx";
// const requestt = require("request");
import req from "request";

// SapisStore
export default class SapisStore {
  constructor() {
    // @observable
    this.data = 2;
    // reaction(() => this.currentNumber, console.log(this.currentNumber));
  }
  // @action
  request() {
    req("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY", { json: true }, (err, res, body) => {
      if (err) { return console.log(err); }
      console.log(body.url);
      console.log(body.explanation);
    });
  }
};

// Decoration
decorate(SapisStore, {
  currentNumber: observable,
  add: action
});
