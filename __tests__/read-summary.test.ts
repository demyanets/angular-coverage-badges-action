import {readSummary} from '../src/read-summary'

describe('Coverage summary tests', () => {
  test('should parse', async () => {
    const summary = await readSummary(
      './__tests__/assets/coverage-summary.json'
    )
    expect(summary).toBeDefined()
    const total = summary['total']
    expect(total).toBeDefined()
    expect(total.lines).toBeDefined()
    expect(total.lines.pct).toEqual(80)
  })

  test('should parse extended', async () => {
    const summary = await readSummary(
      './__tests__/assets/extended-summary.json'
    )
    expect(summary).toBeDefined()
    const total = summary['total']
    expect(total).toBeDefined()
    expect(total.lines).toBeDefined()
    expect(total.lines.pct).toEqual(80)
  })

  test('throws if wrong path', async () => {
    expect(readSummary('wrong')).rejects.toThrow()
  })

  test('throws if broken file', async () => {
    expect(
      readSummary('./__tests__/assets/broken-summary.json')
    ).rejects.toThrow()
  })
})
