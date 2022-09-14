# parse-font-name

> Extract font weight (in steps of spec-valid 100s) and style (italic) data from the name of a font in a more robust way than most libraries do.

I'll be honest – font names are a bitch since they follow no actual standard at all and sometimes want to be creative in their naming which is not helpful for developers. Lots of implementations out there only catch the most regular font names, but I wanted to have something that catches more obscure and rare cases. Also anything that is not a multiple of 100 between 100 and 900 is simply not valid, so an attempt was made to clamp weights into these values. You can supply font-filenames with or without extensions, it doesn't matter.

Recognizing weights and styles of 100% of font names is obviously impossible, but the heart of this repo, the `numericFontWeightMap` has a lot more than you'd typically find out there in the internet. Feel free to open issues or direct PRs for more cases you found!

- *zero* dependencies
- *fully typed* in typescript
- *100%* code test *coverage* (100% Statements 28/28, 100% Branches 36/36, 100% Functions 7/7, 100% Lines 27/27)
- *small* footprint (2.2kb minified)
- CommonJS bundle, .mjs bundle, .d.ts bundle + type-checking & Source maps
- written in an actually readable way

## Installation

`npm i parse-font-name` or `yarn add parse-font-name`

## Usage

```typescript
import { parseNumericWeightFromName, parseStyleFromName, numericFontWeightMap } from 'parse-font-name'

// parse numeric weights
parseNumericWeightFromName('Helvetica Neue Light.ttf') // returns 300
parseNumericWeightFromName(['Akkurat Pro Regular', 'Akkurat Pro Fett Kursiv']) // returns [400, 700]
parseNumericWeightFromName('Bebas Neue') // returns 400 (fallbackValue)
parseNumericWeightFromName('Bebas Neue', 700) // returns 700 (fallbackValue)

// parse font styles
parseStyleFromName('Akkurat Pro Fett Italic') // returns 'italic'
parseStyleFromName('Akkurat Pro Fett Kursiv', 'boolean') // returns true
parseStyleFromName('Akkurat-Pro-Fett-Oblique.otf') // returns 'oblique'
parseStyleFromName(['Akkurat Pro Fett Kursiv', 'Helvetica Neue Light'], 'boolean') // returns [true, false]

// or just toy around with the hardcoded map, which is also exported as a type
console.log(numericFontWeightMap)
```

```typescript
parseNumericWeightFromName(
  fontStrings: string | string[],
  fallbackValue?: number // fallbackValue has a default of 400
) => number | number[] // providing strings gives you strings and is properly typed to do so
```

```typescript
parseStyleFromName(
  fontStrings: string | string[],
  format?: 'cssString' | 'boolean', // format has a default of 'cssString'
  fallbackValue?: boolean | ('normal' | 'oblique' | 'italic') // fallbackValue defaults to false or 'normal' depending on format
) => (boolean | ('normal' | 'oblique' | 'italic'))[]
```

See `src/index.test.js` for more examples and `src/index.ts` for types.

## Performance

`parseNumericWeightFromName` from 100 font strings `1 134 ops/s, ±0.62%`
`parseStyle` from 100 font strings `104 468 ops/s, ±0.13%`

Which is something that could be improved, but so far I didn't need to parse 100 fonts more than a thousand times a second, so whatever.
