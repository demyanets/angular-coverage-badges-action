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

      /* eslint-disable no-console */
      console.log(`Main checkout: ${branch}`)
      await checkout(branch, stub.options)

      console.log(
        `Main generateBadges: ${inputs.coverageSummaryPath}, ${inputs.badgesDirectory}`
      )
      await generateBadges(inputs.coverageSummaryPath, inputs.badgesDirectory)

      console.log(`Main update repository: ${inputs.gitSourceSettings.ref}`)
      await updateRepository(
        inputs.badgesDirectory,
        inputs.protectedBranches,
        inputs.gitSourceSettings
      )
      /* eslint-enable no-console */
    }
  } catch (error) {
    setFailed(error.message)
  }
}

run()
