import test from 'ava'
const PositionSign = require('./PositionSign')

const testDeg = 1e7 + 2
const testMin = 23
const testSec = 48
const testSgn = 30
const testSNm = 'Taurus'

const getTestInstance = (d = testDeg, m = testMin, s = testSec, sgn = testSgn) => new PositionSign(d, m, s, sgn)

test('constructor sets _degrees property to passed value', t =>
  t.assert( getTestInstance()._degrees === testDeg))

test('constructor sets _minutes property to passed value', t =>
  t.assert( getTestInstance()._minutes === testMin))

test('constructor sets _seconds property to passed value', t =>
  t.assert( getTestInstance()._seconds === testSec))

test('constructor sets _sign property to passed value', t =>
  t.assert( getTestInstance()._sign === testSgn))

const testSimpleGetter = (t, getInstance, propName, testValue) => {
  const testInstance = getInstance()
  const hiddenName = `_${propName}`
  testInstance[hiddenName] = testValue
  t.assert( testInstance[propName] === testInstance[hiddenName] )
}

test('degrees getter returns property value _degrees', t =>
  testSimpleGetter(t, getTestInstance, 'degrees', 324))

test('minutes getter returns property value _minutes', t =>
  testSimpleGetter(t, getTestInstance, 'minutes', 32))

test('seconds getter returns property value _seconds', t =>
  testSimpleGetter(t, getTestInstance, 'seconds', 23))

test('sign getter returns property value _sign', t => 
  testSimpleGetter(t, getTestInstance, 'sign', 120))

test('toJSON() returns object with sign, degrees, minutes, seconds === property values', t => {
  t.assert( getTestInstance().toJSON().degrees === testDeg )
  t.assert( getTestInstance().toJSON().minutes === testMin )
  t.assert( getTestInstance().toJSON().seconds === testSec )
  t.assert( getTestInstance().toJSON().sign === testSgn )
})

test('toString() returns DMSS formatted String', t =>
t.assert( getTestInstance().toString() === `${testDeg}\xB0 ${testMin}\u2032 ${testSec}\u2033 ${testSNm}` ))

test('toDegrees() calls PositionSign.Degrees.fromSign with dmss', t => {
  PositionSign.Degrees = {}
  PositionSign.Degrees.fromSign = (d, m, s, sig) => {
    t.assert( d === testDeg )
    t.assert( m === testMin )
    t.assert( s === testSec )
    t.assert( sig === testSgn )
  }
  getTestInstance().toDegrees()
  PositionSign.Degrees = undefined
})

test('toDegrees() calls PositionSign.Degrees.fromSign and returns the result', t => {
  PositionSign.Degrees = {}
  PositionSign.Degrees.fromSign = _ => 'foo'
  t.assert( getTestInstance().toDegrees() === 'foo' )
  PositionSign.Degrees = undefined
})

test('toDecimal() calls PositionSign.Decimal.fromSign with longitude', t => {
  PositionSign.Decimal = {}
  PositionSign.Decimal.fromSign = (d, m, s, sig) => {
    t.assert( d === testDeg )
    t.assert( m === testMin )
    t.assert( s === testSec )
    t.assert( sig === testSgn )
  }
  getTestInstance().toDecimal()
  PositionSign.Decimal = undefined
})

test('toDecimal() calls PositionSign.Decimal.fromSign and returns the result', t => {
  PositionSign.Decimal = {}
  PositionSign.Decimal.fromSign = _ => 'bar'
  t.assert( getTestInstance().toDecimal() === 'bar' )
  PositionSign.Decimal = undefined
})

test('static fromDecimal() returns a PositionSign instance', t => 
  t.assert( PositionSign.fromDecimal(0) instanceof PositionSign === true ))

test('static fromDegrees() returns a PositionSign instance', t => 
  t.assert( PositionSign.fromDegrees(0, 0, 0) instanceof PositionSign === true ))

test('static fromDecimal() correctly converts Longitude to DMSS', t => {
  t.assert( PositionSign.fromDecimal(40.5).degrees === 10 )
  t.assert( PositionSign.fromDecimal(40.5).minutes === 30 )
  t.assert( PositionSign.fromDecimal(40.5).seconds === 0 )
  t.assert( PositionSign.fromDecimal(40.5).sign === 30 )
})

test('static fromDegrees() correctly converts DMS to DMSS', t => {
  t.assert( PositionSign.fromDegrees(40, 15, 10).degrees === 10 )
  t.assert( PositionSign.fromDegrees(40, 15, 10).minutes === 15 )
  t.assert( PositionSign.fromDegrees(40, 15, 10).seconds === 10 )
  t.assert( PositionSign.fromDegrees(40, 15, 10).sign === 30 )
})
