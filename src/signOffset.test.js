import test from 'ava'
const {
  Aries,
  Taurus,
  Gemini,
  Cancer,
  Leo,
  Virgo,
  Libra,
  Scorpio,
  Sagittaurius,
  Capricorn,
  Aquarius,
  Pisces
} = require('./signOffset')

test(       'Aries offset = 0',   t => t.assert(        Aries === 0   ))
test(      'Taurus offset = 30',  t => t.assert(       Taurus === 30  ))
test(      'Gemini offset = 60',  t => t.assert(       Gemini === 60  ))
test(      'Cancer offset = 90',  t => t.assert(       Cancer === 90  ))
test(         'Leo offset = 120', t => t.assert(          Leo === 120 ))
test(       'Virgo offset = 150', t => t.assert(        Virgo === 150 ))
test(       'Libra offset = 180', t => t.assert(        Libra === 180 ))
test(     'Scorpio offset = 210', t => t.assert(      Scorpio === 210 ))
test('Sagittaurius offset = 240', t => t.assert( Sagittaurius === 240 ))
test(   'Capricorn offset = 270', t => t.assert(    Capricorn === 270 ))
test(    'Aquarius offset = 300', t => t.assert(     Aquarius === 300 ))
test(      'Pisces offset = 330', t => t.assert(       Pisces === 330 ))
