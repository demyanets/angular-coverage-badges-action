import {setFailed} from '@actions/core'
import {Inputs} from './inputs'
import {generateBadges} from './generate-badges'
import {updateRepository} from './update-repository'

async function run(): Promise<void> {
  try {
    const inputs = new Inputs()
    /* eslint-disable no-console */
    console.log(`coverageSummaryPath: ${inputs.coverageSummaryPath}`)
    console.log(`badgesDirectory: ${inputs.badgesDirectory}`)
    /* eslint-enable no-console */
    await generateBadges(inputs.coverageSummaryPath, inputs.badgesDirectory)
    if (inputs.gitSourceSettings) {
      await updateRepository(
        inputs.badgesDirectory,
        inputs.protectedBranches,
        inputs.gitSourceSettings
      )
    }
  } catch (error) {
    setFailed(error.message)
  }
}

run()
