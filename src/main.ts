import {debug, setFailed} from '@actions/core'
import {Inputs} from './inputs'

async function run(): Promise<void> {
  try {
    const inputs = new Inputs()
    debug(`coverage-summary-path: ${inputs.coverageSummaryPath}`)
    debug(`badges-directory: ${inputs.badgesDirectory}`)
    for (const branch of inputs.protectedBranches) {
      debug(`Protected branch: ${branch}`)
    }
  } catch (error) {
    setFailed(error.message)
  }
}

run()
