import {setFailed} from '@actions/core'
import {Inputs} from './inputs'
import {generateBadges} from './generate-badges'
import {updateRepository} from './update-repository'
import {ExecOptionsStub} from './exec-options-stub'
import {getBranch, checkout} from './git-utilities'

async function run(): Promise<void> {
  try {
    const inputs = new Inputs()
    /* eslint-disable no-console */
    console.log(`coverageSummaryPath: ${inputs.coverageSummaryPath}`)
    console.log(`badgesDirectory: ${inputs.badgesDirectory}`)
    /* eslint-enable no-console */
    if (inputs.gitSourceSettings) {
      const stub = new ExecOptionsStub()
      const branch = getBranch(inputs.gitSourceSettings.ref)
      await checkout(branch, stub.options)
      await generateBadges(inputs.coverageSummaryPath, inputs.badgesDirectory)
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
