import {getDiffs, commitAsAction, push} from './git-utilities'
import * as gitCommandManager from './external/git-command-manager'
import {IGitSourceSettings} from './external/git-source-settings'
import {info} from '@actions/core'
import {join} from 'path'

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
    const badgeDir = join(settings.repositoryPath, badgesDirectory)
    const out = await git.diff(badgeDir)
    // eslint-disable-next-line no-console
    console.log(`Out: ${out}`)
    let result = await getDiffs(badgeDir)
    const matches = (result[0].match(/\.svg/g) || []).length
    // eslint-disable-next-line no-console
    console.log(`SVG matches: ${matches}`)
    if (matches > 0) {
      result = await commitAsAction(badgesDirectory)
      result = await push()
    }
  }
}
