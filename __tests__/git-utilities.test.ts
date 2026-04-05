import {jest} from '@jest/globals'
import {join} from 'path'
import {ExecOptionsStub} from '../src/exec-options-stub.js'

const mockExec = jest.fn<typeof import('@actions/exec').exec>()
jest.unstable_mockModule('@actions/exec', () => ({exec: mockExec}))

const {getDiffs, getGitVersion, getBranch, isBranchPushable} = await import(
  '../src/git-utilities.js'
)

describe('Git helper tests', () => {
  test('get git version', async () => {
    const stub = new ExecOptionsStub()
    mockExec.mockImplementationOnce(async (_tool, _args, options) => {
      options?.listeners?.stdout?.(Buffer.from('git version 2.50.1\n'))
      return 0
    })
    const result = await getGitVersion(stub.options)
    expect(result).toEqual(0)
    expect(stub.stdout.startsWith('git version')).toBeTruthy()
    expect(stub.stderr).toEqual('')
  })

  test('get HEAD branch', async () => {
    const ref = 'refs/heads/master'
    const result = getBranch(ref)
    expect(result).toEqual('master')
  })

  test('should not find any differences', async () => {
    const stub = new ExecOptionsStub()
    const dir = join('__tests__', 'assets')
    mockExec.mockResolvedValueOnce(0)
    const result = await getDiffs(dir, stub.options)
    expect(result).toEqual(0)
    expect(stub.stdout).toEqual('')
    expect(stub.stderr).toEqual('')
  })

  describe('isBranchPushable', () => {
    test('feature should be pushable', () => {
      const ref = 'refs/heads/feature/test'
      const result = isBranchPushable(ref, ['master'])
      expect(result).toBeTruthy()
    })

    test('do not push to pull branch', () => {
      const ref = 'refs/pull/3/merge'
      const result = isBranchPushable(ref, [])
      expect(result).toBeFalsy()
    })

    test('do not push to master branch', () => {
      const ref = 'refs/heads/master'
      const result = isBranchPushable(ref, ['master'])
      expect(result).toBeFalsy()
    })
  })
})
