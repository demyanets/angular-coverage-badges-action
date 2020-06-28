import {existsSync, unlinkSync} from 'fs'
import {writeGitIgnore} from '../src/write-git-ignore'
import {normalize, join} from 'path'
import {mkdirP, rmRF} from '@actions/io'

describe('writeGitIgnore tests', () => {
  test('should persist', async () => {
    const path = normalize(join(__dirname, 'temp/gitIgnoreTest'))
    await mkdirP(path)
    const expectedFilePath = normalize(
      join(__dirname, 'temp/gitIgnoreTest/.gitignore')
    )
    expect(existsSync(expectedFilePath)).toBeFalsy()
    const fullPath = await writeGitIgnore(path, true)
    expect(fullPath).toEqual(expectedFilePath)
    expect(existsSync(expectedFilePath)).toBeTruthy()
    unlinkSync(expectedFilePath)
    await rmRF(path)
  })
})
