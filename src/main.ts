import {setFailed} from '@actions/core'
import {Inputs} from './inputs'
import {generateBadges} from './generate-badges'
import {updateRepository} from './update-repository'
import {ExecOptionsStub} from './exec-options-stub'
import {getBranch, checkout, isBranchPushable} from './git-utilities'
import {join} from 'path'

async function run(): Promise<void> {
  try {
    const inputs = new Inputs()
    // eslint-disable-next-line no-console
    console.log(`coverageSummaryPath: ${inputs.coverageSummaryPath}`)
    if (inputs.gitSourceSettings) {
      const badgeDir = join(
        inputs.gitSourceSettings.repositoryPath,
        inputs.badgesDirectory
      )

      // eslint-disable-next-line no-console
      console.log(`badgesDirectory: ${badgeDir}`)

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
          `Main generateBadges: ${inputs.coverageSummaryPath}, ${badgeDir}`
        )
        await generateBadges(inputs.coverageSummaryPath, badgeDir)

        // eslint-disable-next-line no-console
        console.log(`Main update repository: ${inputs.gitSourceSettings.ref}`)
        await updateRepository(badgeDir)
      }
    }
  } catch (error) {
    setFailed(error.message)
  }
}

run()
