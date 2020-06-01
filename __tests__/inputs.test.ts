import * as core from '@actions/core'
import {Inputs} from '../src/inputs'

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

    // Mock getInput
    jest.spyOn(core, 'getInput').mockImplementation((name: string) => {
      return inputs[name]
    })
  })

  test('should recognize CI run', () => {
    // Mock getInput
    jest.spyOn(core, 'getInput').mockImplementation((name: string) => {
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
