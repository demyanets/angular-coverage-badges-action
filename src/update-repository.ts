import {getDiffs, commitAsAction, push} from './git-utilities'
import {IGitSourceSettings} from './external/git-source-settings'
import {info, debug} from '@actions/core'
import {join} from 'path'
import {ExecOptionsStub} from './exec-options-stub'

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
    const badgeDir = join(settings.repositoryPath, badgesDirectory)

    const stub = new ExecOptionsStub()
    const exitCode = await getDiffs(badgeDir, stub.options)
    debug(`Diff stdout: ${stub.stdout}`)
    debug(`Diff stder: ${stub.stderr}`)
    if (exitCode === 0) {
      const matches = (stub.stdout.match(/\.svg/g) || []).length
      // eslint-disable-next-line no-console
      console.log(`SVG matches: ${matches}`)
      if (matches > 0) {
        await commitAsAction(badgesDirectory)
        await push()
      }
    }
  }
}
