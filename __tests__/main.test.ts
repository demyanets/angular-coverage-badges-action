import {env} from 'process'
import {ExecSyncOptions, execSync} from 'child_process'
import {join} from 'path'

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  env['INPUT_COVERAGE-SUMMARY-PATH'] = './coverage/coverage-summary.json'
  env['BADGES-DIRECTORY'] = './badges'
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
