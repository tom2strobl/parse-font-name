'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function compareTwoStrings(first, second) {
  first = first.replace(/\s+/g, "");
  second = second.replace(/\s+/g, "");
  if (first === second)
    return 1;
  if (first.length < 2 || second.length < 2)
    return 0;
  let firstBigrams = /* @__PURE__ */ new Map();
  for (let i = 0; i < first.length - 1; i++) {
    const bigram = first.substring(i, i + 2);
    const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) + 1 : 1;
    firstBigrams.set(bigram, count);
  }
  let intersectionSize = 0;
  for (let i = 0; i < second.length - 1; i++) {
    const bigram = second.substring(i, i + 2);
    const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) : 0;
    if (count > 0) {
      firstBigrams.set(bigram, count - 1);
      intersectionSize++;
    }
  }
  return 2 * intersectionSize / (first.length + second.length - 2);
}

const numericFontWeightMap = {
  100: ["Thin", "UltraThin", "ExtraThin", "Hairline", "Flyweight"],
  200: ["ExtraLight", "ExtraLite", "UltraLight", "Extraleicht", "Bantamweight"],
  300: ["Light", "Lite", "Leicht", "Blond", "Featherweight"],
  400: ["Regular", "Normal", "Book", "Roman", "Text", "Display", "Buch", "Lightweight"],
  500: ["Medium", "Dark", "Demi", "Thick", "Kr\xE4ftig", "Welterweight"],
  600: ["SemiBold", "DemiBold", "ExtraThick", "ExtraDark", "Halbfett", "Middleweight"],
  700: ["Bold", "Dreiviertelfett", "Fett", "Large", "Headline", "Cruiserweight"],
  800: ["ExtraBold", "UltraBold", "Heavyweight"],
  900: ["Black", "Heavy", "ExtraBlack", "UltraBlack", "Fat", "Poster", "Extrafett", "Sumo"]
};
function parseNumericWeightFromName(fontStrings, fallbackValue = 400) {
  if (!fontStrings) {
    throw new Error("no fontStrings provided");
  }
  if (typeof fontStrings === "string") {
    fontStrings = [fontStrings];
  }
  const results = fontStrings.map((item) => {
    const tripleDigitInName = item.match(/[1-9]00\b/gi);
    const fontMap = Object.entries(numericFontWeightMap);
    const weights = fontMap.filter((pair) => pair[1].some((value) => item.toLowerCase().includes(value.toLowerCase()))).map((pair) => {
      const [numeric, names] = pair;
      const distances = names.map((name) => compareTwoStrings(item, name));
      return [numeric, Math.min(...distances)];
    });
    if (weights.length) {
      const [closestNumeric] = weights.reduce((a, b) => a[1] < b[1] ? b : a);
      return parseInt(closestNumeric, 10);
    } else if (tripleDigitInName && tripleDigitInName.length > 0) {
      return parseInt(tripleDigitInName[0], 10);
    }
    return fallbackValue;
  });
  return results.length === 1 ? results.pop() : results;
}
function parseStyleFromName(fontStrings, format = "cssString", fallbackValue) {
  if (!fontStrings) {
    throw new Error("no fontStrings provided");
  }
  if (typeof fontStrings === "string") {
    fontStrings = [fontStrings];
  }
  if (!fallbackValue && format === "boolean") {
    fallbackValue = false;
  } else if (!fallbackValue && format === "cssString") {
    fallbackValue = "normal";
  }
  const results = fontStrings.map((item) => {
    if (item.toLowerCase().includes("italic") || item.toLowerCase().includes("kursiv")) {
      return format === "boolean" ? true : "italic";
    } else if (item.toLowerCase().includes("oblique") || item.toLowerCase().includes("schr\xE4g")) {
      return format === "boolean" ? true : "oblique";
    }
    return fallbackValue;
  });
  return results.length === 1 ? results.pop() : results;
}

exports.numericFontWeightMap = numericFontWeightMap;
exports.parseNumericWeightFromName = parseNumericWeightFromName;
exports.parseStyleFromName = parseStyleFromName;
//# sourceMappingURL=index.js.map
