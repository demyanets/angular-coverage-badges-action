import {info, setFailed} from '@actions/core'
import {join} from 'path'
import {Inputs} from './inputs'
import {generateBadges} from './generate-badges'
import {updateRepository} from './update-repository'
import {getBranch, checkout, isBranchPushable} from './git-utilities'
import {runAndLog} from './run-and-log'

async function run(): Promise<void> {
  try {
    const inputs = new Inputs()
    if (inputs.writeDebugLogs) {
      info(`coverageSummaryPath: ${inputs.coverageSummaryPath}`)
    }
    if (inputs.gitSourceSettings) {
      const ref = inputs.gitSourceSettings.ref
      const badgeDir = join(
        inputs.gitSourceSettings.repositoryPath,
        inputs.badgesDirectory
      )

      if (inputs.writeDebugLogs) {
        info(`badgesDirectory: ${badgeDir}`)
      }
      if (isBranchPushable(ref, inputs.protectedBranches)) {
        const branch = getBranch(ref)
        if (inputs.writeDebugLogs) {
          info(`Checkout ref: ${ref}`)
          info(`Checkout branch: ${branch}`)
        }
        await runAndLog('checkout', inputs.writeDebugLogs, async stub =>
          checkout(branch, stub.options)
        )

        info(`Generate badges: ${inputs.coverageSummaryPath}, ${badgeDir}`)
        await generateBadges(
          inputs.coverageSummaryPath,
          badgeDir,
          inputs.writeDebugLogs
        )
        await updateRepository(badgeDir, inputs.writeDebugLogs)
      }
    }
  } catch (error) {
    setFailed(error.message)
  }
}

run()
