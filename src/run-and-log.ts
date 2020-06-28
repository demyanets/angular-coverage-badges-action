import {info, startGroup, endGroup} from '@actions/core'
import {ExecOptionsStub} from './exec-options-stub'

export async function runAndLog(
  label: string,
  writeDebugLogs: boolean,
  foo: (ExecOptionsStub) => Promise<number>,
  stub: ExecOptionsStub = new ExecOptionsStub()
): Promise<number> {
  let exitCode: number | undefined = undefined
  try {
    exitCode = await foo(stub)
    return exitCode
  } finally {
    if (writeDebugLogs) {
      startGroup(`${label}`)
      info(`Stdout: ${stub.stdout.trim()}`)
      info(`Stderr: ${stub.stderr.trim()}`)
      info(`Exit code: ${exitCode}`)
      endGroup()
    }
  }
}
