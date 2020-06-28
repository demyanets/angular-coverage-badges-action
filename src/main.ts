import {info, setFailed} from '@actions/core'
import {mkdirP} from '@actions/io'
import {Inputs} from './inputs'
import {generateBadges} from './generate-badges'
import {updateRepository} from './update-repository'
import {getBranch, checkout, isBranchPushable} from './git-utilities'
import {runAndLog} from './run-and-log'
import {getBadgesDir} from './badges-directory-helper'
import {writeGitIgnore} from './write-git-ignore'

async function run(): Promise<void> {
  try {
    const inputs = new Inputs()
    if (inputs.gitSourceSettings) {
      const ref = inputs.gitSourceSettings.ref
      const badgeDir = await getBadgesDir(
        inputs.badgesDirectory,
        inputs.gitSourceSettings.repositoryPath,
        inputs.coverageSummaryPath,
        async path => {
          await mkdirP(path)
          await writeGitIgnore(path, inputs.writeDebugLogs)
          Promise.resolve()
        },
        inputs.writeDebugLogs
      )

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
