# zodiac-units
Library to handle decimal degrees, degree-minute-second and degree-minute-second-sign celestial longitudes

# install
`npm i zodiac-units`

# usage
## components
```javascript
const {
  PositionSign,
  PositionDecimal,
  PositionDegrees
  Taurus
} = require('zodiac-units')

// These are equivalent
const position = new PositionSign(10, 20, 30, Taurus)
const position = new PositionSign(10, 20, 30, 30)
const position = (new PositionDecimal(40, 20, 30)).toSign()

console.log(position.toString())
/// 10º 20' 30" Taurus

```