import test from 'ava'
const PositionDecimal = require('./PositionDecimal')

test('constructor sets _longitude property to passed value', t =>
  t.assert( (new PositionDecimal(1e7+2))._longitude === 1e7 + 2))

test('longitude getter returns property value _longitude', t => {
  const testInstance = new PositionDecimal(1e7+2)
  t.assert( testInstance.longitude === testInstance._longitude )
})

test('toJSON() returns object with .longitude === original longitude', t =>
  t.assert( (new PositionDecimal(1e7+2)).toJSON().longitude === 1e7 + 2 ))

test('toString() returns original longitude as string', t =>
t.assert( (new PositionDecimal(1e7+2)).toString() === `${1e7 + 2}` ))

test('toDegrees() calls PositionDecimal.Degrees.fromDecimal with longitude', t => {
  const testValue = 1e9 + 2
  PositionDecimal.Degrees = {}
  PositionDecimal.Degrees.fromDecimal = spyValue => t.assert(spyValue === testValue)
  ;(new PositionDecimal(testValue)).toDegrees()
  PositionDecimal.Degrees = undefined
})

test('toDegrees() calls PositionDecimal.Degrees.fromDecimal and returns the result', t => {
  const testValue = 1e9 + 2
  function spy() { return 'foo' }
  PositionDecimal.Degrees = {}
  PositionDecimal.Degrees.fromDecimal = spy
  t.assert( (new PositionDecimal(testValue)).toDegrees() === 'foo' )
  PositionDecimal.Degrees = undefined
})

test('toSign() calls PositionDecimal.Sign.fromDecimal with longitude', t => {
  const testValue = 1e9 + 2
  PositionDecimal.Sign = {}
  PositionDecimal.Sign.fromDecimal = spyValue => t.assert(spyValue === testValue)
  ;(new PositionDecimal(testValue)).toSign()
  PositionDecimal.Sign = undefined
})

test('toSign() calls PositionDecimal.Sign.fromDecimal and returns the result', t => {
  const testValue = 1e9 + 2
  function spy() { return 'bar' }
  PositionDecimal.Sign = {}
  PositionDecimal.Sign.fromDecimal = spy
  t.assert( (new PositionDecimal(testValue)).toSign() === 'bar' )
  PositionDecimal.Sign = undefined
})

test('static fromSign() returns a PositionDecimal instance', t => 
  t.assert( PositionDecimal.fromSign(0, 0, 0, 0) instanceof PositionDecimal === true ))

test('static fromDegrees() returns a PositionDecimal instance', t => 
  t.assert( PositionDecimal.fromDegrees(0, 0, 0) instanceof PositionDecimal === true ))

test('static fromSign() correctly converts DMSS to Longitude', t => 
  t.assert( PositionDecimal.fromSign(10, 15, 900, 30).longitude === 40.5 ))

test('static fromDegrees() correctly converts DMS to Longitude', t => 
  t.assert( PositionDecimal.fromDegrees(10, 15, 900).longitude === 10.5 ))
