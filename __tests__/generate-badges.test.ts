import fs from 'fs'
import {generateBadges} from '../src/generate-badges'
import {normalize, join} from 'path'

describe('Generate badges tests', () => {
  const expected = [
    normalize(join(__dirname, 'temp/coverage.svg')),
    normalize(join(__dirname, 'temp/coverage-lines.svg')),
    normalize(join(__dirname, 'temp/coverage-statements.svg')),
    normalize(join(__dirname, 'temp/coverage-branches.svg')),
    normalize(join(__dirname, 'temp/coverage-functions.svg'))
  ]

  test('should generate', async () => {
    jest.spyOn(fs, 'writeFile').mockImplementation((path, data, cb) => {
      console.log(`Generate badges tests spy on: writeFile('${path}')`)
      if (expected.includes(path.toString())) {
        cb(null)
      } else {
        cb(new Error(`Unexpected path: ${path}`))
      }
    })

    const badgesPath = normalize(join(__dirname, 'temp'))
    const summaryPath = normalize(
      join(__dirname, 'assets/coverage-summary.json')
    )
    await generateBadges(summaryPath, badgesPath, true)
  })
})
