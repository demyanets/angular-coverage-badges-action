import {env} from 'process'
import {ExecSyncOptions, execSync} from 'child_process'
import {join, normalize} from 'path'
import {unlinkSync, existsSync} from 'fs'

describe('Main tests', () => {
  const expected = [
    normalize('__tests__/temp/coverage.svg'),
    normalize('__tests__/temp/coverage-lines.svg'),
    normalize('__tests__/temp/coverage-statements.svg'),
    normalize('__tests__/temp/coverage-branches.svg'),
    normalize('__tests__/temp/coverage-functions.svg')
  ]

  beforeEach(() => {
    for (let file of expected) {
      if (existsSync(file)) {
        unlinkSync(file)
      }
    }
  })

  /*
  afterEach(() => {
    for (let file of expected) {
      expect(existsSync(file)).toBeTruthy()
    }
  })
  */

  // shows how the runner will run a javascript action with env / stdout protocol
  test('test runs', () => {
    env['INPUT_COVERAGE-SUMMARY-PATH'] = normalize(
      '__tests__/assets/coverage-summary.json'
    )
    env['INPUT_BADGES-DIRECTORY'] = normalize('__tests__/temp/')
    env['INPUT_PROTECTED-BRANCHES'] = '["master", "develop"]'
    env['INPUT_ANGULAR-COVERAGE-BADGES-CI-RUN'] = 'true'
    env['INPUT_REPO-TOKEN'] = '12345678'
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
