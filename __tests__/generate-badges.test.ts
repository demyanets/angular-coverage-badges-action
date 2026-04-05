import {jest} from '@jest/globals'
import fs from 'fs'
import {generateBadges} from '../src/generate-badges.js'
import {normalize, join, dirname} from 'path'
import {fileURLToPath} from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

describe('Generate badges tests', () => {
  const expected = [
    normalize(join(__dirname, 'temp/coverage.svg')),
    normalize(join(__dirname, 'temp/coverage-lines.svg')),
    normalize(join(__dirname, 'temp/coverage-statements.svg')),
    normalize(join(__dirname, 'temp/coverage-branches.svg')),
    normalize(join(__dirname, 'temp/coverage-functions.svg'))
  ]

  test('should generate', async () => {
    jest.spyOn(fs, 'writeFile').mockImplementation(((
      path: any,
      data: any,
      cb: any
    ) => {
      console.log(`Generate badges tests spy on: writeFile('${path}')`)
      if (expected.includes(path.toString())) {
        cb(null)
      } else {
        cb(new Error(`Unexpected path: ${path}`))
      }
    }) as any)

    const badgesPath = normalize(join(__dirname, 'temp'))
    const summaryPath = normalize(
      join(__dirname, 'assets/coverage-summary.json')
    )
    await generateBadges(summaryPath, badgesPath, true)
  })
})
