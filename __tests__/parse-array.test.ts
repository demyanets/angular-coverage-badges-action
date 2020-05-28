import {parseArray} from '../src/parse-array'

describe('Parse array tests', () => {
  test('should parse', () => {
    const input = '["master", "develop"]'
    const result = parseArray(input)
    expect(result.length).toEqual(2)
    expect(result[0]).toEqual('master')
    expect(result[1]).toEqual('develop')
  })

  test('should parse empty array', () => {
    const input = '[]'
    const result = parseArray(input)
    expect(result.length).toEqual(0)
  })

  test('throws invalid array', () => {
    expect(() => parseArray('test')).toThrow()
  })
})
