import {getDiffs, commitAsAction, push} from './git-utilities'
import * as gitCommandManager from './external/git-command-manager'
import {IGitSourceSettings} from './external/git-source-settings'
import {info} from '@actions/core'

export async function updateRepository(
  badgesDirectory: string,
  protectedBranches: string[],
  settings: IGitSourceSettings
): Promise<void> {
  // eslint-disable-next-line no-console
  console.log(`Ref: ${settings.ref}`)
  let isProtected = false
  for (const branch of protectedBranches) {
    if (settings.ref.endsWith(branch)) {
      isProtected = true
    }
  }
  // eslint-disable-next-line no-console
  console.log(`Is protected?: ${isProtected}`)

  if (!isProtected && !settings.ref.startsWith('refs/pull/')) {
    info(`Working directory is '${settings.repositoryPath}'`)
    const git = await gitCommandManager.createCommandManager(
      settings.repositoryPath,
      false
    )
    const list = await git.branchList(false)
    for (const l of list) {
      // eslint-disable-next-line no-console
      console.log(`Branch: ${l}`)
    }
    let result = await getDiffs(badgesDirectory)
    const matches = (result[0].match(/\.svg/g) || []).length
    // eslint-disable-next-line no-console
    console.log(`SVG matches: ${matches}`)
    if (matches > 0) {
      result = await commitAsAction(badgesDirectory)
      result = await push()
    }
  }
}
