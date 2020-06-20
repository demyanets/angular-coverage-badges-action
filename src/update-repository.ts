import {getDiffs, commitAsAction, push, addSvg} from './git-utilities'
import {IGitSourceSettings} from './external/git-source-settings'
import {info} from '@actions/core'
import {join} from 'path'
import {ExecOptionsStub} from './exec-options-stub'

export async function updateRepository(
  badgesDirectory: string,
  settings: IGitSourceSettings
): Promise<void> {
  info(`Working directory is '${settings.repositoryPath}'`)
  const badgeDir = join(settings.repositoryPath, badgesDirectory)
  const addStub = new ExecOptionsStub()
  await addSvg(badgeDir, addStub.options)
  info(`Add stdout: ${addStub.stdout}`)
  info(`Add stder: ${addStub.stderr}`)
  const diffStub = new ExecOptionsStub()
  const exitCode = await getDiffs(badgeDir, diffStub.options)
  info(`Diff stdout: ${diffStub.stdout}`)
  info(`Diff stder: ${diffStub.stderr}`)
  if (exitCode === 0) {
    const matches = (diffStub.stdout.match(/\.svg/g) || []).length
    // eslint-disable-next-line no-console
    console.log(`SVG matches: ${matches}`)
    if (matches > 0) {
      const commitStub = new ExecOptionsStub()
      await commitAsAction(badgesDirectory, commitStub.options)
      await push(commitStub.options)
    }
  }
}
