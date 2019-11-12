import test from 'ava'
const PositionDegrees = require('./PositionDegrees')

const testDeg = 1e7 + 2
const testMin = 23
const testSec = 48

const getTestInstance = (d = testDeg, m = testMin, s = testSec) => new PositionDegrees(d, m, s)

test('constructor sets _degrees property to passed value', t =>
  t.assert( getTestInstance()._degrees === testDeg))

test('constructor sets _minutes property to passed value', t =>
  t.assert( getTestInstance()._minutes === testMin))

test('constructor sets _seconds property to passed value', t =>
  t.assert( getTestInstance()._seconds === testSec))

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

test('toJSON() returns object with degrees, minutes, seconds === property values', t => {
  t.assert( getTestInstance().toJSON().degrees === testDeg )
  t.assert( getTestInstance().toJSON().minutes === testMin )
  t.assert( getTestInstance().toJSON().seconds === testSec )
})

test('toString() returns DMS formatted String', t =>
t.assert( getTestInstance().toString() === `${testDeg}\xB0 ${testMin}\u2032 ${testSec}\u2033` ))

test('toSign() calls PositionDegrees.Sign.fromDegrees with dms', t => {
  PositionDegrees.Sign = {}
  PositionDegrees.Sign.fromDegrees = (d, m, s) => {
    t.assert( d === testDeg )
    t.assert( m === testMin )
    t.assert( s === testSec )
  }
  getTestInstance().toSign()
  PositionDegrees.Sign = undefined
})

test('toSign() calls PositionDegrees.Sign.fromDegrees and returns the result', t => {
  PositionDegrees.Sign = {}
  PositionDegrees.Sign.fromDegrees = _ => 'foo'
  t.assert( getTestInstance().toSign() === 'foo' )
  PositionDegrees.Sign = undefined
})

test('toDecimal() calls PositionDegrees.Decimal.fromDegrees with dms', t => {
  PositionDegrees.Decimal = {}
  PositionDegrees.Decimal.fromDegrees = (d, m, s) => {
    t.assert( d === testDeg )
    t.assert( m === testMin )
    t.assert( s === testSec )
  }
  getTestInstance().toDecimal()
  PositionDegrees.Decimal = undefined
})

test('toDecimal() calls PositionDegrees.Decimal.fromDegrees and returns the result', t => {
  PositionDegrees.Decimal = {}
  PositionDegrees.Decimal.fromDegrees = _ => 'bar'
  t.assert( getTestInstance().toDecimal() === 'bar' )
  PositionDegrees.Decimal = undefined
})

test('static fromDecimal() returns a PositionDegrees instance', t => 
  t.assert( PositionDegrees.fromDecimal(0) instanceof PositionDegrees === true ))

test('static fromSign() returns a PositionDegrees instance', t => 
  t.assert( PositionDegrees.fromSign(0, 0, 0, 0) instanceof PositionDegrees === true ))

test('static fromDecimal() correctly converts Longitude to DMS', t => {
  t.assert( PositionDegrees.fromDecimal(40.5).degrees === 40 )
  t.assert( PositionDegrees.fromDecimal(40.5).minutes === 30 )
  t.assert( PositionDegrees.fromDecimal(40.5).seconds === 0 )
})

test('static fromSign() correctly converts DMSS to DMS', t => {
  t.assert( PositionDegrees.fromSign(10, 15, 10, 30).degrees === 40 )
  t.assert( PositionDegrees.fromSign(10, 15, 10, 30).minutes === 15 )
  t.assert( PositionDegrees.fromSign(10, 15, 10, 30).seconds === 10 )
})
