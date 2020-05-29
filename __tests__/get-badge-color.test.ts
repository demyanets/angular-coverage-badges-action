import {getBadgeColor} from '../src/get-badge-color'

describe('Get badge color tests', () => {
  let thresholdRed: number
  let thresholdYellow: number

  beforeAll(() => {
    thresholdRed = 80
    thresholdYellow = 90
  })

  test('should be green', () => {
    const result = getBadgeColor(95, thresholdRed, thresholdYellow)
    expect(result).toEqual('brightgreen')
  })

  test('should be yellow', () => {
    const result = getBadgeColor(85, thresholdRed, thresholdYellow)
    expect(result).toEqual('yellow')
  })

  test('should be red', () => {
    const result = getBadgeColor(75, thresholdRed, thresholdYellow)
    expect(result).toEqual('red')
  })

  test('throws if red is greater than yellow', () => {
    expect(() => getBadgeColor(75, 90, 80)).toThrow()
  })

  test('throws if red threshold is negative', () => {
    expect(() => getBadgeColor(75, -80, 90)).toThrow()
  })

  test('throws if yellow threshold is negative', () => {
    expect(() => getBadgeColor(75, 80, -90)).toThrow()
  })

  test('throws if red threshold is above 100', () => {
    expect(() => getBadgeColor(75, 180, 90)).toThrow()
  })

  test('throws if yellow threshold is above 100', () => {
    expect(() => getBadgeColor(75, 80, 190)).toThrow()
  })
})
