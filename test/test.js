import stringify from '../index.js'
import test from 'tape'
import fs from 'fs'

const sample = fs.readFileSync(new URL('sample.ass', import.meta.url), { encoding: 'utf8' })
const subtitle = JSON.parse(fs.readFileSync(new URL('sample.json', import.meta.url), { encoding: 'utf-8' }))

test('ass-stringify', t => {
  t.equal(stringify(subtitle), sample)
  t.end()
})
