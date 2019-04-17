
export function tokenizeText (string) { // Skapar en array med tokens (alltså alla möjliga ord tecken)
  var regex = /<[\w\s!"#$%&'()*+,\-./:;=?@[\\\]^_`{|}~”\u00C0-\u017F]+>|(&\w+;)|(\d+)|(\w+-)|([\w\u00C0-\u017F]+)|([\s.,!?()[\]:"”;-])/g;
  var stringArray = string.match(regex);
  return stringArray;
}
