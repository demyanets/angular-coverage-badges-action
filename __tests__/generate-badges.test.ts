import {existsSync, unlinkSync} from 'fs'
import {generateBadges} from '../src/generate-badges'

describe('Generate badges tests', () => {
  test('should generate', async () => {
    const badgesPath = './__tests__/temp'
    const summaryPath = './__tests__/assets/coverage-summary.json'
    const expected = [
      './__tests__/temp/coverage.svg',
      './__tests__/temp/coverage-lines.svg',
      './__tests__/temp/coverage-statements.svg',
      './__tests__/temp/coverage-branches.svg',
      './__tests__/temp/coverage-functions.svg'
    ]
    for (let file of expected) {
      expect(existsSync(file)).toBeFalsy()
    }
    await generateBadges(summaryPath, badgesPath)
    for (let file of expected) {
      expect(existsSync(file)).toBeTruthy()
    }
    for (let file of expected) {
      unlinkSync(file)
    }
  })
})
