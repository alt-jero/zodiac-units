import test from 'ava'
const { getSignOffset } = require('./getSignOffset')

const genTest = (min, max) => {
  return [
    `${min} <= longitude < ${max} -> ${min}`,
    t => {
      t.assert(getSignOffset( min      ) === min)
      t.assert(getSignOffset( max - 0.1) === min)
      t.assert(getSignOffset( max      ) !== min)
      t.assert(getSignOffset( min - 0.1) !== min)
    }
  ]
}

test(...genTest(   0,  30 ))
test(...genTest(  30,  60 ))
test(...genTest(  60,  90 ))
test(...genTest(  90, 120 ))
test(...genTest( 120, 150 ))
test(...genTest( 150, 180 ))
test(...genTest( 180, 210 ))
test(...genTest( 210, 240 ))
test(...genTest( 240, 270 ))
test(...genTest( 270, 300 ))
test(...genTest( 300, 330 ))
test(...genTest( 330, 360 ))
