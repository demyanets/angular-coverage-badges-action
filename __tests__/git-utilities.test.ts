import {normalize} from 'path'
import {getCurrentBranch, getDiffs} from '../src/git-utilities'

describe('Git helper tests', () => {
  test('should return current branch', async () => {
    const result = await getCurrentBranch()
    expect(result).toBeDefined()
    console.log(JSON.stringify(result))
    expect(result.length).toBe(2)
    expect(result[0].length).toBeGreaterThan(0)
    expect(result[1]).toEqual('')
    //const branch = result[0]
    //console.log(`Current branch: ${branch.trim()}`)
  })

  test('should return current branch', async () => {
    const dir = normalize('__tests__/assets')
    const result = await getDiffs(dir)
    expect(result).toBeDefined()
    console.log(JSON.stringify(result))
    expect(result[0]).toEqual('')
    expect(result[1]).toEqual('')
    //const matches = (result[0].match(/\.svg/g) || []).length
    //console.log(`SVG matches: ${matches}`)
  })
})
