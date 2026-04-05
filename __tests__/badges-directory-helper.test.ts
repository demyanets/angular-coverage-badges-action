import {jest} from '@jest/globals'
import {join, dirname} from 'path'
import {fileURLToPath} from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Mock fs module before importing modules that use it
const mockExistsSync = jest.fn<(path: string) => boolean>()
jest.unstable_mockModule('fs', () => {
  const actual = jest.requireActual('fs') as typeof import('fs')
  return {
    ...actual,
    existsSync: mockExistsSync
  }
})

// Mock @actions/core to suppress info() calls
jest.unstable_mockModule('@actions/core', () => ({
  info: jest.fn(),
  debug: jest.fn(),
  warning: jest.fn(),
  error: jest.fn(),
  setFailed: jest.fn(),
  startGroup: jest.fn(),
  endGroup: jest.fn()
}))

const {getBadgesDir} = await import('../src/badges-directory-helper.js')

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
    mockExistsSync.mockReset()
  })

  describe('if configured', () => {
    let summaryPath = ''
    beforeEach(() => {
      summaryPath = 'assets/coverage-summary.json'
    })

    test('and exists', async () => {
      mockExistsSync.mockReturnValue(true)
      const expected = join(__dirname, 'temp')
      const dir = await getBadgesDir(
        'temp',
        __dirname,
        summaryPath,
        makeDirMock,
        true
      )
      expect(dir).toEqual(expected)
      expect(makeDirMockCalled).toBeFalsy()
    })

    test('and does not exist', async () => {
      mockExistsSync.mockReturnValue(false)

      await expect(
        getBadgesDir('missing', __dirname, summaryPath, makeDirMock, true)
      ).rejects.toThrow()

      expect(mockExistsSync).toHaveBeenCalled()
      expect(makeDirMockCalled).toBeFalsy()
    })
  })

  describe('if not configured', () => {
    test('for src root assuming directory already exists', async () => {
      mockExistsSync.mockReturnValue(true)
      const summaryPath = 'assets/coverage-summary.json'
      const expected = join(__dirname, 'badges')
      const dir = await getBadgesDir(
        '',
        __dirname,
        summaryPath,
        makeDirMock,
        true
      )
      expect(mockExistsSync).toHaveBeenCalled()
      expect(dir).toEqual(expected)
      expect(makeDirMockCalled).toBeFalsy()
    })

    test('for library assuming directory does not exist', async () => {
      mockExistsSync.mockReturnValue(false)
      const summaryPath = 'assets/testlib/coverage-summary.json'
      const expected = join(__dirname, 'badges/testlib')
      const dir = await getBadgesDir(
        '',
        __dirname,
        summaryPath,
        makeDirMock,
        true
      )
      expect(mockExistsSync).toHaveBeenCalled()
      expect(dir).toEqual(expected)
      expect(makeDirMockCalled).toBeTruthy()
      expect(makeDirMockPath).toEqual(expected)
    })
  })
})
