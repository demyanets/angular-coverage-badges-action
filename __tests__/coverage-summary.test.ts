import {CoverageSummary} from '../src/coverage-summary'

describe('Coverage summary tests', () => {
  test('should parse', () => {
    const summary = CoverageSummary.read(
      './__tests__/assets/coverage-summary.json'
    )
    expect(summary).toBeDefined()
    const total = summary['total']
    expect(total).toBeDefined()
    expect(total.lines).toBeDefined()
    expect(total.lines.pct).toEqual(80)
  })

  test('should parse extended', () => {
    const summary = CoverageSummary.read(
      './__tests__/assets/extended-summary.json'
    )
    expect(summary).toBeDefined()
    const total = summary['total']
    expect(total).toBeDefined()
    expect(total.lines).toBeDefined()
    expect(total.lines.pct).toEqual(80)
  })

  test('throws if wrong path', () => {
    expect(() => CoverageSummary.read('wrong')).toThrow()
  })

  test('throws if broken file', () => {
    expect(() =>
      CoverageSummary.read('./__tests__/assets/broken-summary.json')
    ).toThrow()
  })
})
