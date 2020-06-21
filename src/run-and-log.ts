import {info, startGroup, endGroup} from '@actions/core'
import {ExecOptionsStub} from './exec-options-stub'

export async function runAndLog(
  label: string,
  writeDebugLogs: boolean,
  foo: (ExecOptionsStub) => Promise<number>,
  stub: ExecOptionsStub = new ExecOptionsStub()
): Promise<number> {
  try {
    const exitCode = await foo(stub)
    return exitCode
  } finally {
    if (writeDebugLogs) {
      startGroup(`${__filename}: ${label}`)
      info(`Stdout: ${stub.stdout}`)
      info(`Stderr: ${stub.stderr}`)
      endGroup()
    }
  }
}
