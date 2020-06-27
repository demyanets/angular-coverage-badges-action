import fs from 'fs'
import {getBadgesDir} from '../src/badges-directory-helper'
import {join} from 'path'

describe('Get badges directory', () => {
  let makeDirMockCalled = false
  let makeDirMockPath = ''
  let makeDirMock: (path: string) => Promise<void>
  beforeEach(() => {
    makeDirMockCalled = false
    makeDirMockPath = ''
    makeDirMock = (path: string) => {
      makeDirMockCalled = true
      makeDirMockPath = path
      return Promise.resolve()
    }
  })

  describe('if configured', () => {
    let summaryPath = ''
    beforeEach(() => {
      summaryPath = 'assets/coverage-summary.json'
    })

    test('and exists', async () => {
      const expected = join(__dirname, 'temp')
      const dir = await getBadgesDir(
        'temp',
        __dirname,
        summaryPath,
        makeDirMock
      )
      expect(dir).toEqual(expected)
      expect(makeDirMockCalled).toBeFalsy()
    })

    test('and does not exist', async () => {
      const spy = jest.spyOn(fs, 'existsSync').mockImplementation(path => {
        return false
      })

      await expect(
        getBadgesDir('missing', __dirname, summaryPath, makeDirMock)
      ).rejects.toThrow()

      expect(spy).toHaveBeenCalled()
      expect(makeDirMockCalled).toBeFalsy()
    })
  })

  describe('if not configured', () => {
    test('for src root assuming directory already exists', async () => {
      const spy = jest.spyOn(fs, 'existsSync').mockImplementation(path => {
        return true
      })
      const summaryPath = 'assets/coverage-summary.json'
      const expected = join(__dirname, 'badges')
      const dir = await getBadgesDir('', __dirname, summaryPath, makeDirMock)
      expect(spy).toHaveBeenCalled()
      expect(dir).toEqual(expected)
      expect(makeDirMockCalled).toBeFalsy
    })

    test('for library assuming directory does not exist', async () => {
      const spy = jest.spyOn(fs, 'existsSync').mockImplementation(path => {
        return false
      })
      const summaryPath = 'assets/testlib/coverage-summary.json'
      const expected = join(__dirname, 'badges/testlib')
      const dir = await getBadgesDir('', __dirname, summaryPath, makeDirMock)
      expect(spy).toHaveBeenCalled()
      expect(dir).toEqual(expected)
      expect(makeDirMockCalled).toBeTruthy()
      expect(makeDirMockPath).toEqual(expected)
    })
  })
})
