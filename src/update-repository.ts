import {getDiffs, commitAsAction, push} from './git-utilities'
import {IGitSourceSettings} from './external/git-source-settings'
import {info, debug} from '@actions/core'
import {join} from 'path'
import {ExecOptions} from '@actions/exec'

export async function updateRepository(
  badgesDirectory: string,
  protectedBranches: string[],
  settings: IGitSourceSettings,
  githubWorkspacePath: string
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

    let stdout = ''
    let stderr = ''
    const options: ExecOptions = {
      cwd: githubWorkspacePath,
      listeners: {
        stdline: str => (stdout = str),
        debug: str => (stderr = str)
      }
    }
    const exitCode = await getDiffs(badgeDir, options)
    debug(stderr)
    if (exitCode === 0) {
      const matches = (stdout.match(/\.svg/g) || []).length
      // eslint-disable-next-line no-console
      console.log(`SVG matches: ${matches}`)
      if (matches > 0) {
        await commitAsAction(badgesDirectory)
        await push()
      }
    }
  }
}
