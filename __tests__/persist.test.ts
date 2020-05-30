import {existsSync, unlinkSync} from 'fs'
import {persist} from '../src/persist'

describe('Persist tests', () => {
  test('should persist', async () => {
    const path = './__tests__/temp'
    const name = 'badge'
    const content =
      '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="106" height="20"></svg>'
    const expectedFilePath = './__tests__/temp/badge.svg'
    expect(existsSync(expectedFilePath)).toBeFalsy()
    await persist(path, name, content)
    expect(existsSync(expectedFilePath)).toBeTruthy()
    unlinkSync(expectedFilePath)
  })

  test('throws on invalid directory', async () => {
    await expect(persist(':', ':', ':')).rejects.toThrow()
  })
})
