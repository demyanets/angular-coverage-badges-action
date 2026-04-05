import {jest} from '@jest/globals'

// Mock @actions/core before importing modules that use it
const mockGetInput = jest.fn<(name: string) => string>()
jest.unstable_mockModule('@actions/core', () => ({
  getInput: mockGetInput,
  debug: jest.fn(),
  info: jest.fn(),
  warning: jest.fn(),
  error: jest.fn(),
  setFailed: jest.fn(),
  setOutput: jest.fn(),
  startGroup: jest.fn(),
  endGroup: jest.fn(),
  setSecret: jest.fn(),
  addPath: jest.fn(),
  exportVariable: jest.fn()
}))

const {Inputs} = await import('../src/inputs.js')

interface IMap<T> {
  [index: string]: T
}

describe('Inputs tests', () => {
  let inputs: IMap<string>

  beforeAll(() => {
    inputs = {}
    inputs['coverage-summary-path'] = './coverage/coverage-summary.json'
    inputs['badges-directory'] = './badges'
    inputs['protected-branches'] = '["master", "develop"]'
    inputs['repo-token'] = '12345678'

    mockGetInput.mockImplementation((name: string) => {
      return inputs[name]
    })
  })

  test('should recognize CI run', () => {
    mockGetInput.mockImplementation((name: string) => {
      if (name === 'angular-coverage-badges-ci-run') {
        return 'true'
      } else {
        return inputs[name]
      }
    })
    const result = new Inputs()
    expect(result.coverageSummaryPath).toEqual(inputs['coverage-summary-path'])
    expect(result.badgesDirectory).toEqual(inputs['badges-directory'])
    expect(result.protectedBranches[0]).toEqual('master')
    expect(result.protectedBranches[1]).toEqual('develop')
  })
})
