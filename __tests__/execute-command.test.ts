import {executeCommand} from '../src/execute-command'

describe('Execute command tests', () => {
  test('should execute', async () => {
    const cmd = 'echo Hello world'
    const result = await executeCommand(cmd)
    expect(result).toBeDefined()
    console.log(JSON.stringify(result))
    expect(result.length).toBe(2)
    expect(result[0].startsWith('Hello world')).toBeTruthy()
    expect(result[1]).toEqual('')
  })
})
