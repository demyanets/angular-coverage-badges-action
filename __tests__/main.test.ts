import {env} from 'process'
import {ExecSyncOptions, execSync} from 'child_process'
import {join} from 'path'
import { existsSync, unlinkSync } from 'fs'

describe('Main tests', () => {
  const expected = [
    './__tests__/temp/coverage.svg',
    './__tests__/temp/coverage-lines.svg',
    './__tests__/temp/coverage-statements.svg',
    './__tests__/temp/coverage-branches.svg',
    './__tests__/temp/coverage-functions.svg'
  ]

  beforeEach(()=>{
    for (let file of expected) {
      expect(existsSync(file)).toBeFalsy()
    }
    
  })

  afterEach(()=>{
    for (let file of expected) {
      expect(existsSync(file)).toBeTruthy()
      unlinkSync(file)
    }
  })

  // shows how the runner will run a javascript action with env / stdout protocol
  test('test runs', () => {
    env['INPUT_COVERAGE-SUMMARY-PATH'] =
      './__tests__/assets/coverage-summary.json'
    env['INPUT_BADGES-DIRECTORY'] = './__tests__/temp/'
    env['INPUT_PROTECTED-BRANCHES'] = '["master", "develop"]'
    const options: ExecSyncOptions = {
      env: env
    }
    const ip = join(__dirname, '..', 'lib', 'main.js')
    const cmd = `node "${ip}"`
    console.log(cmd)
    var output = execSync(cmd, options)
    console.log(output.toString())
  })
})
