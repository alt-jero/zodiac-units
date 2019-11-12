module.exports = {
  getSignOffset(longitude) {
    return [
      0,
      30,
      60,
      90,
      120,
      150,
      180,
      210,
      240,
      270,
      300,
      330
    ][Math.floor(longitude % 360 / 30)]
  }
}