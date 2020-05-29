import {getBadgePath} from '../src/get-badge-path'

describe('Get badge path tests', () => {
  let label: string
  let coverage: number

  beforeAll(() => {
    label = 'lines'
    coverage = 100
  })

  test('should succeed with label', () => {
    const expected =
      'https://img.shields.io/badge/Coverage:lines-100%25-brightgreen.svg'
    const result = getBadgePath(coverage, label)
    expect(result).toEqual(expected)
  })

  test('should succeed without label', () => {
    const expected =
      'https://img.shields.io/badge/Coverage-100%25-brightgreen.svg'
    const result = getBadgePath(coverage)
    expect(result).toEqual(expected)
  })
})
