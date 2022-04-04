const b = require('benny')
const { parseNumericWeightFromName } = require('../lib')
const testFontNames = require('./testFontNames')

b.suite(
  'parseNumericWeightFromName Benchmark',

  b.add('parseNumericWeightFromName from 100 font strings', () => {
    return parseNumericWeightFromName(testFontNames)
  }),

  b.cycle(),
  b.complete(),
  b.save({ file: 'benchmark.weight', version: '1.0.0' }),
  b.save({ file: 'benchmark.weight', format: 'chart.html' })
)
