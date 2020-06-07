import {normalize} from 'path'
import {getDiffs, getLog, getGitVersion} from '../src/git-utilities'
import {ExecOptionsStub} from '../src/exec-options-stub'
describe('Git helper tests', () => {
  test('get git version', async () => {
    const stub = new ExecOptionsStub()
    const result = await getGitVersion(stub.options)
    expect(result).toEqual(0)
    expect(stub.stdout.startsWith('git version')).toBeTruthy()
    expect(stub.stderr).toEqual('')
  })

  test('should not find any differences', async () => {
    const stub = new ExecOptionsStub()
    const dir = normalize('__tests__/assets')
    const result = await getDiffs(dir, stub.options)
    expect(result).toEqual(0)
    expect(stub.stdout).toEqual('')
    expect(stub.stderr).toEqual('')
    //const matches = (result[0].match(/\.svg/g) || []).length
    //console.log(`SVG matches: ${matches}`)
  })

  test('should log', async () => {
    const stub = new ExecOptionsStub('q')
    const dir = normalize('__tests__/assets')
    const result = await getLog(stub.options)
    expect(result).toEqual(0)
    expect(stub.stderr).toEqual('')
    console.log(stub.stdout)
  })
})
