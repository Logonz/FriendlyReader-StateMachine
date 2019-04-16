var utils = {};

function replaceBetween(start, end, text, replace) {
  return text.substring(0, start) + replace + text.substring(end);
};

function crazyTokens (string) { // Skapar en array med tokens (alltså alla möjliga ord tecken)
  var regex = /<[\w\s!"#$%&'()*+,\-./:;=?@[\\\]^_`{|}~”\u00C0-\u017F]+>|(&\w+;)|(\d+)|(\w+-)|([\w\u00C0-\u017F]+)|([\s.,!?()[\]:"”;-])/g;
  var stringArray = string.match(regex);
  return stringArray;
}

function getIndicesOf(searchStr, str, caseSensitive) {
  var searchStrLen = searchStr.length;
  if (searchStrLen === 0) {
    return [];
  }
  var startIndex = 0; var index; var indices = [];
  if (!caseSensitive) {
    str = str.toLowerCase();
    searchStr = searchStr.toLowerCase();
  }
  while ((index = str.indexOf(searchStr, startIndex)) > -1) {
    indices.push(index);
    startIndex = index + searchStrLen;
  }
  return indices;
}
utils["replaceBetween"] = replaceBetween;
utils["getIndicesOf"] = getIndicesOf;
utils["crazyTokens"] = crazyTokens;
