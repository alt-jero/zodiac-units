// Import Sign Name converter
const { getSignName } = require('./getSignName')
const signOffset = require('./signOffset')

class PositionSign {
  constructor(degrees, minutes, seconds, sign) {
    this._sign    = sign
    this._degrees = degrees
    this._minutes = minutes
    this._seconds = seconds
  }

  get sign()    { return this._sign    }
  get degrees() { return this._degrees }
  get minutes() { return this._minutes }
  get seconds() { return this._seconds }

  toDecimal() {
    const  { degrees, minutes, seconds, sign } = this
    return PositionSign.Decimal.fromSign(degrees, minutes, seconds, sign)
  }
  
  toDegrees() {
    const  { degrees, minutes, seconds, sign } = this
    return PositionSign.Degrees.fromSign(degrees, minutes, seconds, sign)
  }

  toJSON() {
    const  { sign, degrees, minutes, seconds } = this
    return { sign, degrees, minutes, seconds }
  }

  toString() {
    const { sign, degrees, minutes, seconds } = this
    return `${degrees}\xB0 ${minutes}\u2032 ${seconds}\u2033 ${getSignName(sign)}`
  }

  static fromDegrees(degrees, minutes, seconds) {
    const sign = getSignName(degrees)
    const offset = signOffset[sign]
    const longitude = degrees - offset
    return new PositionSign(longitude, minutes, seconds, offset)
  }

  static fromDecimal(longitude) {
    const sign = getSignName(longitude)
    const degrees = Math.floor(longitude % 30)
    const minutes = Math.floor(longitude % 1 * 60)
    const seconds = longitude % 1 * 60 % 1 * 60
    const offset = signOffset[sign]
    return new PositionSign(degrees, minutes, seconds, offset)
  }
}

module.exports = PositionSign