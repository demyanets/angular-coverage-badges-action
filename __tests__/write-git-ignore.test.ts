import {existsSync, unlinkSync} from 'fs'
import {writeGitIgnore} from '../src/write-git-ignore.js'
import {normalize, join, dirname} from 'path'
import {mkdirP, rmRF} from '@actions/io'
import {fileURLToPath} from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

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
