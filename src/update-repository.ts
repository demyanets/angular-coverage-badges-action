import {info} from '@actions/core'
import {getDiffs, commitAsAction, push, addSvg} from './git-utilities'
import {ExecOptionsStub} from './exec-options-stub'
import {runAndLog} from './run-and-log'

export async function updateRepository(
  badgeDir: string,
  writeDebugLogs: boolean
): Promise<void> {
  let exitCode = await runAndLog('addSvg', writeDebugLogs, async stub =>
    addSvg(badgeDir, stub.options)
  )

  const diffStub = new ExecOptionsStub()
  exitCode = await runAndLog(
    'getDiffs',
    writeDebugLogs,
    async stub => getDiffs(badgeDir, stub.options),
    diffStub
  )

  if (exitCode === 0) {
    const matches = (diffStub.stdout.match(/\.svg/g) || []).length
    if (writeDebugLogs) {
      info(`SVG matches: ${matches}`)
    }
    if (matches > 0) {
      exitCode = await runAndLog('commitAsAction', writeDebugLogs, async stub =>
        commitAsAction(badgeDir, stub.options)
      )
      exitCode = await runAndLog('push', writeDebugLogs, async stub =>
        push(stub.options)
      )
    }
  }
}
