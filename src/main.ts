import {setFailed} from '@actions/core'
import {Inputs} from './inputs'
import {generateBadges} from './generate-badges'
import {updateRepository} from './update-repository'
import {ExecOptionsStub} from './exec-options-stub'
import {getBranch, checkout, isBranchPushable} from './git-utilities'

async function run(): Promise<void> {
  try {
    const inputs = new Inputs()
    // eslint-disable-next-line no-console
    console.log(`coverageSummaryPath: ${inputs.coverageSummaryPath}`)
    // eslint-disable-next-line no-console
    console.log(`badgesDirectory: ${inputs.badgesDirectory}`)
    if (inputs.gitSourceSettings) {
      if (
        isBranchPushable(inputs.gitSourceSettings.ref, inputs.protectedBranches)
      ) {
        const stub = new ExecOptionsStub()
        // eslint-disable-next-line no-console
        console.log(`Checkout ref: ${inputs.gitSourceSettings.ref}`)
        const branch = getBranch(inputs.gitSourceSettings.ref)

        // eslint-disable-next-line no-console
        console.log(`Checkout branch: ${branch}`)
        await checkout(branch, stub.options)

        // eslint-disable-next-line no-console
        console.log(
          `Main generateBadges: ${inputs.coverageSummaryPath}, ${inputs.badgesDirectory}`
        )
        await generateBadges(inputs.coverageSummaryPath, inputs.badgesDirectory)

        // eslint-disable-next-line no-console
        console.log(`Main update repository: ${inputs.gitSourceSettings.ref}`)
        await updateRepository(inputs.badgesDirectory, inputs.gitSourceSettings)
      }
    }
  } catch (error) {
    setFailed(error.message)
  }
}

run()
