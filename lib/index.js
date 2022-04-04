"use strict";
exports.__esModule = true;
exports.parseStyleFromName = exports.parseNumericWeightFromName = exports.numericFontWeightMap = void 0;
// raw map data export in case you want to manually do stuff with it
// I compiled this list from various sources including adobe, microsoft, java standard libraries and added lots of custom weights I encountered
exports.numericFontWeightMap = {
    100: ['Thin', 'UltraThin', 'ExtraThin', 'Hairline', 'Flyweight'],
    200: ['ExtraLight', 'ExtraLite', 'UltraLight', 'Extraleicht', 'Bantamweight'],
    300: ['Light', 'Lite', 'Leicht', 'Blond', 'Featherweight'],
    400: ['Regular', 'Normal', 'Book', 'Roman', 'Text', 'Display', 'Buch', 'Lightweight'],
    500: ['Medium', 'Dark', 'Demi', 'Thick', 'Kräftig', 'Welterweight'],
    600: ['SemiBold', 'DemiBold', 'ExtraThick', 'ExtraDark', 'Halbfett', 'Middleweight'],
    700: ['Bold', 'Dreiviertelfett', 'Fett', 'Large', 'Headline', 'Cruiserweight'],
    800: ['ExtraBold', 'UltraBold', 'Heavyweight'],
    900: ['Black', 'Heavy', 'ExtraBlack', 'UltraBlack', 'Fat', 'Poster', 'Extrafett', 'Sumo']
};
/**
 * Takes a single or array of font name strings and returns the numeric weight or the fallbackValue if not found.
 * eg. 'Helvetica Neue SemiBold' => 600
 *
 * @param {string | string[]} fontStrings A single string or array of font name strings to parse
 * @param {number} [fallbackValue=400] Optional fallback value to return if no numeric weight is found
 * @returns number | number[]
 */
function parseNumericWeightFromName(fontStrings, fallbackValue) {
    if (fallbackValue === void 0) { fallbackValue = 400; }
    // check for complete input
    if (!fontStrings) {
        throw new Error('no fontStrings provided');
    }
    // normalize single argument
    if (typeof fontStrings === 'string') {
        fontStrings = [fontStrings];
    }
    // iterate over the input
    var results = fontStrings.map(function (item) {
        // convert map to multi-dimensional array to work better
        var fontMap = Object.entries(exports.numericFontWeightMap);
        // find all matching weights
        var weight = fontMap
            // filter out all the font weights that match the font string
            .filter(function (pair) { return pair[1].some(function (value) { return new RegExp(value.toLowerCase(), 'i').test(item.toLowerCase()); }); })
            // and return the numeric value
            .map(function (each) { return +each[0]; });
        // if we have one ore more matches, return the highest match, otherwise return the fallbackValue
        return weight.length ? Math.max.apply(Math, weight) : fallbackValue;
    });
    // return single value if only one font string provided
    return results.length === 1 ? results.pop() : results;
}
exports.parseNumericWeightFromName = parseNumericWeightFromName;
/**
 * Takes a single or array of font name strings and returns, depending on desired format, either a boolean or the css font-style setting – or the fallbackValue if not found.
 * eg. 'Helvetica Neue Regular Italic' => 'italic'
 *
 * @param {string | string[]} fontStrings A single string or array of font name strings to parse
 * @param {'cssString' | 'boolean'} [format='cssString'] To return either true/false if italic or oblique or a css font-style setting of normal, italic or oblique
 * @param {'normal' | 'oblique' | 'italic' | boolean} [fallbackValue=false] Optional fallback value to return if parsing fails
 * @returns
 */
function parseStyleFromName(fontStrings, format, fallbackValue) {
    if (format === void 0) { format = 'cssString'; }
    // check for complete input
    if (!fontStrings) {
        throw new Error('no fontStrings provided');
    }
    // normalize single argument
    if (typeof fontStrings === 'string') {
        fontStrings = [fontStrings];
    }
    // if no fallbackValue was provided, use one depending on the format provided
    if (!fallbackValue && format === 'boolean') {
        fallbackValue = false;
    }
    else if (!fallbackValue && format === 'cssString') {
        fallbackValue = 'normal';
    }
    // iterate over inputs
    var results = fontStrings.map(function (item) {
        // check if our keywords italic or oblique match
        if (item.toLowerCase().includes('italic') || item.toLowerCase().includes('kursiv')) {
            return format === 'boolean' ? true : 'italic';
        }
        else if (item.toLowerCase().includes('oblique') || item.toLowerCase().includes('schräg')) {
            return format === 'boolean' ? true : 'oblique';
        }
        return fallbackValue;
    });
    // return single value if only one font string provided
    return results.length === 1 ? results.pop() : results;
}
exports.parseStyleFromName = parseStyleFromName;
