import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env['INPUT_COVERAGE-SUMMARY-PATH'] =
    './coverage/coverage-summary.json'
  process.env['BADGES-DIRECTORY'] = './badges'
  process.env['INPUT_PROTECTED-BRANCHES'] = '["master", "develop"]'
  const options: cp.ExecSyncOptions = {
    env: process.env
  }
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const cmd = `node "${ip}"`
  console.log(cmd)
  var output = cp.execSync(cmd, options)
  console.log(output.toString())
})
