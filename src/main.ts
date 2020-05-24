import * as core from '@actions/core'
import {wait} from './wait'

async function run(): Promise<void> {
  try {
    const coverageSummaryPath: string = core.getInput('coverage-summary-path')
    core.debug(`coverage-summary-path: ${coverageSummaryPath}`)

    const badgesDirectory: string = core.getInput('badges-directory')
    core.debug(`badges-directory: ${badgesDirectory}`)

    const protectedBranches: string = core.getInput('protected-branches')
    core.debug(`protected-branches: ${protectedBranches}`)

    const ms: string = core.getInput('milliseconds')
    core.debug(`Waiting ${ms} milliseconds ...`)

    core.debug(new Date().toTimeString())
    await wait(parseInt(ms, 10))
    core.debug(new Date().toTimeString())

    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
