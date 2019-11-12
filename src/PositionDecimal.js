const signOffset = require('./signOffset')

class PositionDecimal {
  constructor(longitude) {
    this._longitude = longitude
  }
  get longitude() { return this._longitude }

  toDegrees() {
    return PositionDecimal.Degrees.fromDecimal(this.longitude)
  }

  toSign() {
    return PositionDecimal.Sign.fromDecimal(this.longitude)
  }

  toJSON() {
    const  { longitude } = this
    return { longitude }
  }

  toString() {
    const { longitude } = this
    return `${longitude}`
  }

  static fromSign(degrees, minutes, seconds, sign) {
    const longitude = sign +
      degrees +
      minutes / 60 +
      seconds / 3600
    return new PositionDecimal(longitude)
  }

  static fromDegrees(degrees, minutes, seconds) {
    const longitude = degrees +
      minutes / 60 +
      seconds / 3600
    return new PositionDecimal(longitude)
  }
}

module.exports = PositionDecimal