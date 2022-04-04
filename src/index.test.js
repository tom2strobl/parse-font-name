import { parseNumericWeightFromName, parseStyleFromName } from './'

// numeric weight

test('numeric weight: fall back on no match to custom fallback', () => {
  expect(parseNumericWeightFromName('Akkurat Pro', 700)).toEqual(700)
})
test('numeric weight: parse single string value into single number', () => {
  expect(parseNumericWeightFromName('Helvetica Neue Light')).toEqual(300)
})
test('numeric weight: parse array string value into array number', () => {
  expect(parseNumericWeightFromName(['Akkurat Pro Regular', 'Akkurat Pro Fett Kursiv'])).toEqual([400, 700])
})
test('numeric weight: fall back on no match', () => {
  expect(parseNumericWeightFromName('Akkurat Pro Regular')).toEqual(400)
})
test('numeric weight: supplying no args throws', () => {
  expect(() => parseNumericWeightFromName()).toThrow('no fontStrings provided')
})

// style

test('style: boolean with keyword kursiv', () => {
  expect(parseStyleFromName('Akkurat Pro Fett Kursiv', 'boolean')).toEqual(true)
})
test('style: boolean with keyword italic', () => {
  expect(parseStyleFromName('Akkurat Pro Fett Italic', 'boolean')).toEqual(true)
})
test('style: boolean with keyword oblique', () => {
  expect(parseStyleFromName('Akkurat Pro Fett Oblique', 'boolean')).toEqual(true)
})
test('style: boolean with keyword schräg', () => {
  expect(parseStyleFromName('Akkurat Pro Fett Schräg', 'boolean')).toEqual(true)
})
test('style: boolean fallback', () => {
  expect(parseStyleFromName('Akkurat Pro Fett', 'boolean')).toEqual(false)
})
test('style: cssString fallback', () => {
  expect(parseStyleFromName('Akkurat Pro Fett', 'cssString')).toEqual('normal')
})
test('style: cssString custom fallback', () => {
  expect(parseStyleFromName('Akkurat Pro Fett', 'cssString', 'frank')).toEqual('frank')
})
test('style: cssString with keyword kursiv', () => {
  expect(parseStyleFromName('Akkurat Pro Fett Kursiv', 'cssString')).toEqual('italic')
})
test('style: cssString with keyword italic', () => {
  expect(parseStyleFromName('Akkurat Pro Fett Italic', 'cssString')).toEqual('italic')
})
test('style: cssString with keyword oblique', () => {
  expect(parseStyleFromName('Akkurat Pro Fett Oblique', 'cssString')).toEqual('oblique')
})
test('style: cssString with keyword schräg', () => {
  expect(parseStyleFromName('Akkurat Pro Fett Schräg', 'cssString')).toEqual('oblique')
})
test('style: parse array value with mixed results boolean', () => {
  expect(parseStyleFromName(['Akkurat Pro Fett Kursiv', 'Helvetica Neue Light'], 'boolean')).toEqual([true, false])
})
test('style: parse array value with mixed results cssString', () => {
  expect(
    parseStyleFromName(['Akkurat Pro Fett Kursiv', 'Helvetica Neue Light', 'San Francisco Medium Oblique'], 'cssString')
  ).toEqual(['italic', 'normal', 'oblique'])
})
test('style: supplying no args throws', () => {
  expect(() => parseStyleFromName()).toThrow('no fontStrings provided')
})
