import {getDiffs, commitAsAction, push, addSvg} from './git-utilities'
import {info} from '@actions/core'
import {ExecOptionsStub} from './exec-options-stub'

export async function updateRepository(badgeDir: string): Promise<void> {
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
      await commitAsAction(badgeDir, commitStub.options)
      await push(commitStub.options)
    }
  }
}
