import * as core from '@actions/core'
import {parseArray} from './parseArray'

async function run(): Promise<void> {
  try {
    const coverageSummaryPath: string = core.getInput('coverage-summary-path')
    core.debug(`coverage-summary-path: ${coverageSummaryPath}`)

    const badgesDirectory: string = core.getInput('badges-directory')
    core.debug(`badges-directory: ${badgesDirectory}`)

    const protectedBranches: string = core.getInput('protected-branches')
    core.debug(`protected-branches: ${protectedBranches}`)

    const branches = await parseArray(protectedBranches)
    for (const branch of branches) {
      core.debug(branch)
      core.info(branch)
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
