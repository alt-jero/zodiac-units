class PositionDegrees {
  constructor(degrees, minutes, seconds) {
    this._degrees = degrees
    this._minutes = minutes
    this._seconds = seconds
  }

  get degrees() { return this._degrees }
  get minutes() { return this._minutes }
  get seconds() { return this._seconds }

  toDecimal() {
    const  { degrees, minutes, seconds } = this
    return PositionDegrees.Decimal.fromDegrees(degrees, minutes, seconds)
  }

  toSign() {
    const  { degrees, minutes, seconds } = this
    return PositionDegrees.Sign.fromDegrees(degrees, minutes, seconds)
  }

  toJSON() {
    const  { degrees, minutes, seconds } = this
    return { degrees, minutes, seconds }
  }

  toString() {
    const { degrees, minutes, seconds } = this
    return `${degrees}\xB0 ${minutes}\u2032 ${seconds}\u2033`
  }

  static fromSign(degrees, minutes, seconds, sign) {
    const longitude = degrees + sign
    return new PositionDegrees(longitude, minutes, seconds)
  }

  static fromDecimal(longitude) {
    const degrees = Math.floor(longitude % 360)
    const minutes = Math.floor(longitude % 1 * 60)
    const seconds = longitude % 1 * 60 % 1 * 60
    return new PositionDegrees(degrees, minutes, seconds)
  }
}

module.exports = PositionDegrees