import {debug, setFailed} from '@actions/core'
import {Inputs} from './inputs'
import {generateBadges} from './generate-badges'
import {updateRepository} from './update-repository'

async function run(): Promise<void> {
  try {
    const inputs = new Inputs()
    debug(`coverageSummaryPath: ${inputs.coverageSummaryPath}`)
    debug(`badgesDirectory: ${inputs.badgesDirectory}`)
    await generateBadges(inputs.coverageSummaryPath, inputs.badgesDirectory)
    await updateRepository(inputs.badgesDirectory, inputs.protectedBranches)
  } catch (error) {
    setFailed(error.message)
  }
}

run()
