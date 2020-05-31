import fs from 'fs'
import {generateBadges} from '../src/generate-badges'
import {normalize} from 'path'

describe('Generate badges tests', () => {
  const expected = [
    normalize('__tests__/temp/coverage.svg'),
    normalize('__tests__/temp/coverage-lines.svg'),
    normalize('__tests__/temp/coverage-statements.svg'),
    normalize('__tests__/temp/coverage-branches.svg'),
    normalize('__tests__/temp/coverage-functions.svg')
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

    const badgesPath = './__tests__/temp'
    const summaryPath = './__tests__/assets/coverage-summary.json'
    await generateBadges(summaryPath, badgesPath)
  })
})
