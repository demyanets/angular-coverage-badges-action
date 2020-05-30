import {debug, setFailed} from '@actions/core'
import {Inputs} from './inputs'
import {generateBadges} from './generate-badges'

async function run(): Promise<void> {
  try {
    const inputs = new Inputs()
    debug(`coverageSummaryPath: ${inputs.coverageSummaryPath}`)
    debug(`badgesDirectory: ${inputs.badgesDirectory}`)
    await generateBadges(inputs.coverageSummaryPath, inputs.badgesDirectory)
  } catch (error) {
    setFailed(error.message)
  }
}

run()
