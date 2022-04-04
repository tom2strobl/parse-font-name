// quick randomness helper
const random = (arr) => arr[Math.floor(Math.random() * arr.length)]

const testFamilies = ['Helvetica Neue', 'Akkurat Pro', 'Akzidenz-Grotesk', 'Maison Neue', 'Messina Sans']
const testWeights = ['Light', 'Regular', 'Medium', 'Bold', 'Black']
const testStyles = ['Italic', 'italic', 'Oblique', 'Kursiv', '']

// construct 100 test font names
const testFontNames = [...Array(100)].map(() => {
  return `${random(testFamilies)} ${random(testWeights)} ${random(testStyles)}`
})

module.exports = testFontNames
