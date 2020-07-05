import {existsSync, unlinkSync} from 'fs'
import {persist} from '../src/persist'
import {normalize, join} from 'path'

describe('Persist tests', () => {
  let expectedFilePath
  let path
  let fileName

  beforeEach(() => {
    path = normalize('__tests__/temp')
    fileName = 'coverage-badge.svg'
    expectedFilePath = normalize(join(path, fileName))
    if (existsSync(expectedFilePath)) {
      unlinkSync(expectedFilePath)
    }
  })

  test('should persist', async () => {
    const content =
      '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="106" height="20"></svg>'
    expect(existsSync(expectedFilePath)).toBeFalsy()
    const fullName = await persist(content, path, fileName, true)
    expect(fullName).toEqual(join(path, fileName))
    expect(existsSync(expectedFilePath)).toBeTruthy()
    unlinkSync(expectedFilePath)
  })

  test('throws on invalid directory', async () => {
    await expect(persist(':', ':', ':', true)).rejects.toThrow()
  })
})
