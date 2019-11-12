// Import Sign Offset
const signOffset = require('./src/signOffset')

// Import Sign Name converter
const { getSignName } = require('./src/getSignName')

// Import Sign Offset Converter
const { getSignOffset } = require('./src/getSignOffset')

// Import Position Units
const PositionDecimal = require('./src/PositionDecimal')
const PositionDegrees = require('./src/PositionDegrees')
const PositionSign = require('./src/PositionSign')

// Interlink Position Units to facilitate conversion
PositionDecimal.Sign = PositionSign
PositionDegrees.Sign = PositionSign
PositionSign.Decimal = PositionDecimal
PositionSign.Degrees = PositionDegrees
PositionDegrees.Decimal = PositionDecimal
PositionDecimal.Degrees = PositionDegrees

// Export All
module.exports = {
  ...signOffset, // Unfold Sign Names
  signNames: signOffset, // Object of Sign Names for easy lookup
  getSignName, // Function which converts longitude to name of sign
  PositionDecimal,
  PositionDegrees,
  PositionSign,
  getSignOffset
}