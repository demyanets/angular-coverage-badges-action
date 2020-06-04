import {normalize} from 'path'
import {getDiffs} from '../src/git-utilities'
import {ExecOptions} from '@actions/exec'

describe('Git helper tests', () => {
  test('should return current branch', async () => {
    let stdout = ''
    let stderr = ''
    const options: ExecOptions = {
      listeners: {
        stdline: str => (stdout = str),
        debug: str => (stderr = str)
      }
    }

    const dir = normalize('__tests__/assets')
    const result = await getDiffs(dir)
    expect(result).toEqual(0)
    expect(stdout).toEqual('')
    expect(stderr).toEqual('')
    //const matches = (result[0].match(/\.svg/g) || []).length
    //console.log(`SVG matches: ${matches}`)
  })
})
