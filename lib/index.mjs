function getStringDistance(a, b) {
  if (a.length == 0)
    return b.length;
  if (b.length == 0)
    return a.length;
  var matrix = [];
  var i;
  for (i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  var j;
  for (j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (i = 1; i <= b.length; i++) {
    for (j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) == a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          Math.min(
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          )
        );
      }
    }
  }
  return matrix[b.length][a.length];
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
    const fontMap = Object.entries(numericFontWeightMap);
    const weights = fontMap.filter((pair) => pair[1].some((value) => item.includes(value))).map((pair) => {
      const [numeric, names] = pair;
      const distances = names.map((name) => getStringDistance(item, name));
      return [numeric, Math.min(...distances)];
    });
    if (weights.length) {
      const [closestNumeric] = weights.reduce((a, b) => a[1] < b[1] ? a : b);
      return parseInt(closestNumeric, 10);
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

export { numericFontWeightMap, parseNumericWeightFromName, parseStyleFromName };
//# sourceMappingURL=index.mjs.map
