import { compareTwoStrings } from './dice'

// raw map data export in case you want to manually do stuff with it

// I compiled this list from various sources including adobe, microsoft, java standard libraries and added lots of custom weights I encountered
export const numericFontWeightMap = {
  100: ['Thin', 'UltraThin', 'ExtraThin', 'Hairline', 'Flyweight'],
  200: ['ExtraLight', 'ExtraLite', 'UltraLight', 'Extraleicht', 'Bantamweight'],
  300: ['Light', 'Lite', 'Leicht', 'Blond', 'Featherweight'],
  400: ['Regular', 'Normal', 'Book', 'Roman', 'Text', 'Display', 'Buch', 'Lightweight'],
  500: ['Medium', 'Dark', 'Demi', 'Thick', 'Kräftig', 'Welterweight'],
  600: ['SemiBold', 'DemiBold', 'ExtraThick', 'ExtraDark', 'Halbfett', 'Middleweight'],
  700: ['Bold', 'Dreiviertelfett', 'Fett', 'Large', 'Headline', 'Cruiserweight'],
  800: ['ExtraBold', 'UltraBold', 'Heavyweight'],
  900: ['Black', 'Heavy', 'ExtraBlack', 'UltraBlack', 'Fat', 'Poster', 'Extrafett', 'Sumo']
} as const

// function overloading to allow for either a single string or an array of strings
export function parseNumericWeightFromName(fontStrings: string[], fallbackValue?: number): number[]
export function parseNumericWeightFromName(fontStrings: string, fallbackValue?: number): number

/**
 * Takes a single or array of font name strings and returns the numeric weight or the fallbackValue if not found.
 * eg. 'Helvetica Neue SemiBold' => 600
 *
 * @param {string | string[]} fontStrings A single string or array of font name strings to parse
 * @param {number} [fallbackValue=400] Optional fallback value to return if no numeric weight is found
 * @returns number | number[]
 */
export function parseNumericWeightFromName(fontStrings: string | string[], fallbackValue = 400) {
  // check for complete input
  if (!fontStrings) {
    throw new Error('no fontStrings provided')
  }
  // normalize single argument
  if (typeof fontStrings === 'string') {
    fontStrings = [fontStrings]
  }
  // iterate over the input
  const results = fontStrings.map((item) => {
    // matches if in the string there is a full number of 100-900, no X50 and no 1000
    // 1-9 means no 0 at the start, 00 means always followed by exactly two zeroes
    // and \b matches a word boundary, so 4th digits, end of lines or other chars are not matched
    const tripleDigitInName = item.match(/[1-9]00\b/gi)
    // convert map to multi-dimensional array to work better
    const fontMap = Object.entries(numericFontWeightMap)
    // find all matching weights
    const weights: [string, number][] = fontMap
      // filter out all the font weights that match the font string; Note using RegExp.test yields false positives
      .filter((pair) => pair[1].some((value) => item.toLowerCase().includes(value.toLowerCase())))
      // get the closest distance of the matches
      .map((pair) => {
        const [numeric, names] = pair
        const distances = names.map((name) => compareTwoStrings(item, name) as number)
        return [numeric, Math.min(...distances)]
      })
    // if we have one or more matches, return the one with the highest similarity
    if (weights.length) {
      const [closestNumeric] = weights.reduce((a, b) => (a[1] < b[1] ? b : a))
      return parseInt(closestNumeric, 10)
      // if there was no string match...
    } else if (tripleDigitInName && tripleDigitInName.length > 0) {
      // ...and we have a triple digit number in the name, return that
      return parseInt(tripleDigitInName[0], 10)
    }
    // otherwise return the fallback value
    return fallbackValue
  })
  // return single value if only one font string provided
  return results.length === 1 ? (results.pop() as number) : results
}

type FontStyleCSSString = 'normal' | 'oblique' | 'italic'

// function overloading to allow for either a single string or an array of strings and the correct fallbackValue depending on the format
export function parseStyleFromName(
  fontStrings: string,
  format?: 'cssString',
  fallbackValue?: FontStyleCSSString
): FontStyleCSSString
export function parseStyleFromName(
  fontStrings: string[],
  format?: 'cssString',
  fallbackValue?: FontStyleCSSString
): FontStyleCSSString[]
export function parseStyleFromName(fontStrings: string, format?: 'boolean', fallbackValue?: boolean): boolean
export function parseStyleFromName(fontStrings: string[], format?: 'boolean', fallbackValue?: boolean): boolean[]

/**
 * Takes a single or array of font name strings and returns, depending on desired format, either a boolean or the css font-style setting – or the fallbackValue if not found.
 * eg. 'Helvetica Neue Regular Italic' => 'italic'
 *
 * @param {string | string[]} fontStrings A single string or array of font name strings to parse
 * @param {'cssString' | 'boolean'} [format='cssString'] To return either true/false if italic or oblique or a css font-style setting of normal, italic or oblique
 * @param {'normal' | 'oblique' | 'italic' | boolean} [fallbackValue=false] Optional fallback value to return if parsing fails
 * @returns
 */
export function parseStyleFromName(
  fontStrings: string | string[],
  format = 'cssString',
  fallbackValue?: FontStyleCSSString | boolean
) {
  // check for complete input
  if (!fontStrings) {
    throw new Error('no fontStrings provided')
  }
  // normalize single argument
  if (typeof fontStrings === 'string') {
    fontStrings = [fontStrings]
  }
  // if no fallbackValue was provided, use one depending on the format provided
  if (!fallbackValue && format === 'boolean') {
    fallbackValue = false
  } else if (!fallbackValue && format === 'cssString') {
    fallbackValue = 'normal'
  }
  // iterate over inputs
  const results = fontStrings.map((item) => {
    // check if our keywords italic or oblique match
    if (item.toLowerCase().includes('italic') || item.toLowerCase().includes('kursiv')) {
      return format === 'boolean' ? true : 'italic'
    } else if (item.toLowerCase().includes('oblique') || item.toLowerCase().includes('schräg')) {
      return format === 'boolean' ? true : 'oblique'
    }
    return fallbackValue
  })
  // return single value if only one font string provided
  return results.length === 1 ? (results.pop() as FontStyleCSSString | boolean) : results
}
