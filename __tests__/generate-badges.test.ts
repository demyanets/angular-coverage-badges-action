import {existsSync, unlinkSync} from 'fs'
import {generateBadges} from '../src/generate-badges'

describe('Generate badges tests', () => {
  const expected = [
    './__tests__/temp/coverage.svg',
    './__tests__/temp/coverage-lines.svg',
    './__tests__/temp/coverage-statements.svg',
    './__tests__/temp/coverage-branches.svg',
    './__tests__/temp/coverage-functions.svg'
  ]

  beforeEach(()=>{
    for (let file of expected) {
      expect(existsSync(file)).toBeFalsy()
    }
    
  })

  afterEach(()=>{
    for (let file of expected) {
      expect(existsSync(file)).toBeTruthy()
      unlinkSync(file)
    }
  })
  
  test('should generate', async () => {
    const badgesPath = './__tests__/temp'
    const summaryPath = './__tests__/assets/coverage-summary.json'
    await generateBadges(summaryPath, badgesPath)
  })
})
