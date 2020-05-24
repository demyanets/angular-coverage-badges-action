import {parseArray} from '../src/parseArray'

test('should parse', async () => {
    const input = '["master", "develop"]'
    const result = await parseArray(input)
    expect(result.length).toEqual(2)
    expect(result[0]).toEqual('master')
    expect(result[1]).toEqual('develop')
})

test('should parse empty array', async () => {
    const input = '[]'
    const result = await parseArray(input)
    expect(result.length).toEqual(0)
})

test('throws invalid array', async () => {
    await expect(parseArray('test')).rejects.toThrow()
})
  