import * as core from '@actions/core'
import {Inputs} from './inputs'

async function run(): Promise<void> {
  try {
    const inputs = new Inputs()
    core.debug(`coverage-summary-path: ${inputs.coverageSummaryPath}`)
    core.debug(`badges-directory: ${inputs.badgesDirectory}`)
    for (const branch of inputs.protectedBranches) {
      core.debug(`Protected branch: ${branch}`)
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
