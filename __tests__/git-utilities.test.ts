import {join} from 'path'
import {
  getDiffs,
  getGitVersion,
  getBranch,
  isBranchPushable
} from '../src/git-utilities.js'
import {ExecOptionsStub} from '../src/exec-options-stub.js'

describe('Git helper tests', () => {
  test('get git version', async () => {
    const stub = new ExecOptionsStub()
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
