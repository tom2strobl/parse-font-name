const b = require('benny')
const { parseStyleFromName } = require('../lib')
const testFontNames = require('./testFontNames')

b.suite(
  'parseStyleFromName Benchmark',

  b.add('parseStyle from 100 font strings', () => {
    return parseStyleFromName(testFontNames)
  }),

  b.cycle(),
  b.complete(),
  b.save({ file: 'benchmark.style', version: '1.0.0' }),
  b.save({ file: 'benchmark.style', format: 'chart.html' })
)
